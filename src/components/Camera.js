import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

/**
 * Funktio Camera skannaa viivakoodit ja QR-koodit.
 * 
 * Käytössä Expo Barcode Scanner kirjasto.
 * Lisätietoja: https://docs.expo.dev/versions/v48.0.0/sdk/bar-code-scanner/
 * 
 * Tarkempi dokumentaatio: https://github.com/expo/expo/tree/sdk-48/packages/expo-barcode-scanner
 * 
 * Lisenssi ( MIT ):  https://github.com/expo/expo/blob/main/LICENSE
 * 
 * @returns viivakoodin
 */
export default function Camera() {

  const [skannattuData, setSkannattuData] = React.useState();

  /**
   * Tulostetaan skannattu data. 
   * BarCodeScanner tukee koodiformaatteja Androidilla:
   * [aztec, codabar, code39, code128, datamatrix, ean13, ean8, itf14, maxicode,
   * pdf417, rss14, rssexpanded, upc_a, upc_e, upc_ean, qr]
   * 
   * Lisätietoja: https://docs.expo.dev/versions/v48.0.0/sdk/bar-code-scanner/
   * 
   * @param {type} viivakoodin_tyyppi
   * @param {data} viivakoodin_data
   */
  const viivakoodiLuettu = ({type, data}) => {
    setSkannattuData(data);
    console.log('Data: ' + data);
    console.log('Type: '+ type);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={skannattuData ? undefined : viivakoodiLuettu}
        />
      {skannattuData && <Button title='Skannaa uudestaan?' onPress={() => setSkannattuData(undefined)} />}
      <StatusBar style="auto" />
    </View>
  );
}

/**
 * Tyylit
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


