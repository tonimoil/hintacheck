import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, API_AUTH } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const readBarCode = ({type, data}) => {
    if (type != 32) { 
      alert("Viivakoodin tyyppi virheellinen tai skannaus ei onnistunut, kokeile uudelleen!");
      return
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

        // lajitellaan tuotteet hinnan mukaan
        //const results = products.sort((a, b) => parseFloat(a.Hinta) - parseFloat(b.Hinta)); 

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
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {isFocused ? (
            <View style={styles.container}>
              <View style={styles.cameraWrapper}>
               <BarCodeScanner style={styles.camera} ></BarCodeScanner> 
                {/* Overlay komponentti */}
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.5)', 'transparent', 'rgba(0, 0, 0, 0.5)']}
                  start={[0, 0]}
                  end={[0, 1]}
                  style={styles.overlay}
                >
                  <View style={styles.boxOutline} />
                </LinearGradient>
              </View>

              <View style={styles.cyanBlock}>
              <TouchableOpacity style={styles.placeholder} onPress={readBarCode}>
              {/* Tähän voi lisätä esim. kameran ikonin */}
              </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </>
      )}
    </>
  );
}

const { width, height } = Dimensions.get('window');
const cameraSize = Math.min(width, height) * 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cameraWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxOutline: {
    width: '80%',
    height: '20%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  cyanBlock: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 80,
    height: 80,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 40,
    overflow: 'hidden',
  },
});

