import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View } from 'react-native-web';

/**
 * 
 */
export default function App() {
  const [lupaMyonnetty, setLupaMyonnetty] = React.useState(false); // Lupa käyttää kameraa 
  const [skannaaData, setSkannaaData] = React.useState(); // Skannattu data

  useEffect(() => {

    (async() =>{
      const {tilanne} = await BarCodeScanner.requestPermissionsAsync(); // jos lupa myonnetty, niin tilanne = myonnetty
      setLupaMyonnetty(tilanne === "myonnetty");
    })

  }, [])

  // Jos lupaa ei ole myönnetty, niin kysytään sitä.
  if (!lupaMyonnetty) {
    return (
      <View>
        <Text>Voidaksesi käyttää sovellusta on sinun annettava sovellukselle lupa käyttää kameraa.</Text>
      </View>
    );
  }

  return (
    <View style = {StyleSheet.container}>
      <StatusBar style = "auto"></StatusBar>
    </View>
  );
}