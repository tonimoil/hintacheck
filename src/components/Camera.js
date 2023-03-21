import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

export default function Camera({ navigation }) {

  const [scannedData, setScannedData] = React.useState();
  const isFocused = useIsFocused();
  
  //TODO: tee url:n asetus jotenkin järkeväksi. Esimerkiksi ympäristömuuttuja.
  const url = "192.168.32.181"

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
    setScannedData(data);
    handleSearch(data)
  };

  //TODO: Tänne virheidenkäsittelyä..
  // - virheiden/ilmoitusten kartoitus ja niiden pohjalta toiminnan
  // rakentaminen. ts:
  // - statuscode == 400 -> mitä tehdään?
  // - statuscode == 500 -> mitä tehdään?
  // - tsekataan myös, että paluuarvo on jotenkin järkevä, eli [{tulos}, {tulos}, ..., {tulos}]
  // - jne.
  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(`http://${url}:5000/search/${searchValue}`);
      const results = await response.json();

      navigation.navigate("Results", {"results" : results})
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


