import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Camera() {

  const [skannattuData, setSkannattuData] = React.useState();

  const viivakoodiLuettu = ({type, data}) => {
    setSkannattuData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});