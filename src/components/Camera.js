import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function Camera({ navigation }) {
  const [scannedData, setScannedData] = React.useState();
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
  const readBarCode = ({type, data}) => {
    if (type != 32) { 
      alert("Viivakoodin tyyppi virheellinen tai skannaus ei onnistunut, kokeile uudelleen!")
      return
    }

    setScannedData(data);
    handleSearch(data);
  };

  const handleSearch = async (searchValue) => {
    try {
      const headers = {'Authorization' : 'Basic ' + process.env.AUTH}
      const apiUrl = Constants.expoConfig.extra.apiUrl;

      const response = await fetch(`${apiUrl}/search/${searchValue}`, {headers});

      if (response.status == 400) {
        alert("Viivakoodilla ei löytynyt tuloksia! Kokeile uudelleen.")
        return
      }

      if (response.status == 500) {
        alert("Virhe pyyntöä käsiteltäessä. Kokeile uudelleen tai kokeile eri tuotetta.")
        return
      }

      if (response.status == 503) {
        alert("Palvelin ei ole tällä hetkellä tavoitettavissa, kokeile uudelleen myöhemmin.")
        return
      }

      if (response.status = 200) {
        const results = await response.json();

        // lajitellaan tuotteet hinnan mukaan
        //const results = products.sort((a, b) => parseFloat(a.Hinta) - parseFloat(b.Hinta)); 

        navigation.navigate("Results", {"results" : results})
        return
      }

      alert("Tapahtui jokin virhe.")
      return
    } catch (error) {
      console.error(error);
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
    {isFocused ? 
    <View>
      
      <View style={styles.viivakoodi}>

        <BarCodeScanner style={{height: 400, width: 400}} onBarCodeScanned={scannedData ? undefined : readBarCode}>
        </BarCodeScanner>
      </View>
    
      <StatusBar style="auto" />

      <View>
        {scannedData && <Button title='Skannaa uudestaan?' onPress={() => setScannedData(undefined)}/>}
      </View>

    </View>
    : null}
    </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40E0D0',
    
  },

  viivakoodi: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    marginBottom: 10,
  }
});


