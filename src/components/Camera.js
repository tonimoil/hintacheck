import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

export default function Camera({ navigation }) {

  const [scannedData, setScannedData] = React.useState();
  const isFocused = useIsFocused();
  
  //TODO: tee url:n asetus jotenkin järkeväksi...
  const url = "192.168.32.181"

  /**
   * Luetaan viivakoodi
   * 
   * Lisätietoja: https://docs.expo.dev/versions/v48.0.0/sdk/bar-code-scanner/
   * 
   * @param {type} viivakoodin_tyyppi
   * @param {data} viivakoodin_data
   */
  const readBarCode = ({type, data}) => {
    setScannedData(data);
    handleSearch(data)
    //navigation.navigate("Results", {"data" : data, "type" : type})
    //console.log('Data: ' + data);
    //console.log('Type: '+ type);
  };

  //TODO: Tänne virheidenkäsittelyä..
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


