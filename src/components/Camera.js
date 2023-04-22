import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, API_AUTH } from '@env';



export default function Camera({ navigation, setMyArray, myArray }) {
  const [scannedData, setScannedData] = React.useState();
  const [loading, setLoading] = React.useState(false)
  const isFocused = useIsFocused();

  /**
   * Luetaan viivakoodi ja suoritetaan haku.
   * 
   * TODO: tarkasta, että data on EAN13.
   * Jos ei ole, niin ilmoitus käyttäjälle, että viivakoodin luku ei
   * onnistunut, tai ohjelmisto ei tue viivakoodin tyyppiä. Tämän jälkeen
   * takaisin kameraan. vrt. painike "skannaa uudelleen".
   *  
   * Lisätietoja: https://docs.expo.dev/versions/v48.0.0/sdk/bar-code-scanner/
   * @param {type} viivakoodin_tyyppi
   * @param {data} viivakoodin_data
   */

  
  // tarkistaa, että skannattu koodi on tyyppiä ean13
  // jos tyyppi on muu, tulee virheilmoitus
  const readBarCode = ({ type, data }) => {
    if (type !== BarCodeScanner.Constants.BarCodeType.ean13) {
      setScannedData("error"); 
      alert(
        "Viivakoodin tyyppi virheellinen tai skannaus ei onnistunut",
        "Kokeile uudelleen!",
        [
          {
            text: "OK",
            onPress: () => setScannedData(undefined),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    setScannedData(data);
    handleSearch(data);
  };
  
  
  const handleSearch = async (searchValue) => {
    try {
      setLoading(true)  
      const headers = {'Authorization' : 'Basic ' + API_AUTH}
      const response = await fetch(`${API_URL}/search/${searchValue}`, {headers});

      if (response.status == 400) {
        alert("Viivakoodilla ei löytynyt tuloksia! Kokeile uudelleen.");
        return
      }

      if (response.status == 500) {
        alert("Virhe pyyntöä käsiteltäessä. Kokeile uudelleen tai kokeile eri tuotetta.");
        return
      }

      if (response.status == 503) {
        alert("Palvelin ei ole tällä hetkellä tavoitettavissa, kokeile uudelleen myöhemmin.");
        return
      }

      if (response.status = 200) {
        try {
          const results = await response.json()

          const index = myArray.findIndex((item) => item["ean"] === searchValue);

          const newArray = [...myArray]

          if (index >= 0) {
            const itemToMove = newArray.splice(index, 1)[0];
            newArray.unshift(itemToMove);
            setMyArray(newArray)
          } else {
            const newObject = {"name" : results[0].name, "ean" : searchValue}
            
            if (newArray.length >= 10) {
              newArray.pop()
            }

            newArray.unshift(newObject)
            setMyArray(newArray);
          }
          
          //Hack-ratkaisu, jotta saadaan queue:n pituus piilotettua. Renderöintiä varten.
          const filtered_results = results.filter((item) => item.hasOwnProperty('name'))

          navigation.navigate("Results", {"results" : filtered_results, "searchValue" : searchValue});
          return
        } catch (e) {
          console.log(e)
          alert("Tapahtui jokin virhe.");
          return
        }
      }

      alert("Tapahtui jokin virhe.");
      return
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  //Scan button
  const ScanButton = ({ onPress }) => {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <View />
      </TouchableOpacity>
    </View>
    );
  };

  //useIsFocused, muuttujana isFocused on navigation-paketin funktio, jolla
  //voidaan tarkistaa, onko "view"/"screen" fokusoitu. Kamera menee jostain
  //syystä epäkuntoon ilman tätä tarkistusta. Näytetään camera view, jos on
  //fokusoitu, palautetaan tyhjä view muussa tapauksessa. Ratkaisua ei ole
  //sen kummemmin tarkasteltu.
  //TODO: Onko ratkaisusta haittaa, ja selvitä toiminta tarkemmin.
  //
  //TODO: tyylittely kuntoon.
  return (
    <>
    { loading ? <View style={styles.loadingContainer}><Text style={styles.loadingtext}>Ladataan tietoja</Text></View> :
    <>
    {isFocused ? 
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch', backgroundColor: '#3FC3D2'}}>
          <BarCodeScanner style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,}} 
            onBarCodeScanned={scannedData === undefined ? readBarCode : undefined}></BarCodeScanner>
        </View>

        <View >
          {scannedData && <ScanButton onPress={() => setScannedData(undefined)}/>}
        </View>

      </View>
    : null}
    </>
    }
    </>
    )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 84,
    height: 84,
    borderRadius: 62,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: 'black',
    marginBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingtext: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});


