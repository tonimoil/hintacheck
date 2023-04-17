import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, API_AUTH } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Camera({ navigation }) {
  const [scannedData, setScannedData] = React.useState();
  const [loading, setLoading] = React.useState(false)
  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get('window');


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
        const results = await response.json();
        console.log(results)

        // lajitellaan tuotteet hinnan mukaan
        //const results = products.sort((a, b) => parseFloat(a.Hinta) - parseFloat(b.Hinta)); 

        AsyncStorage.setItem(searchValue, JSON.stringify(results), (e)=> {
          if(e){
              console.log("Error: " + e);
              throw e;
          }
          console.log("Succes!");
        }).catch((e)=> {
            console.log("Error is: " + e);
        });

        try {
          const value = await AsyncStorage.getItem(searchValue);
          if (value !== null) {
              // We have data!!
              console.log("Data:");
              console.log(JSON.parse(value));
          }
      } catch (error) {
          // Error retrieving data
      }
      AsyncStorage.setItem(searchValue, JSON.stringify(results));
      navigation.navigate("Results", {"results" : results});
        return  
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
    { loading ? <Text>Loading...</Text> :
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
});


