import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/components/Camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

/*
TODO: Navigaatio --> Tulokset --> jne..

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera } from './src/components/Camera.js'
import { History } from './src/components/History.js' 

const Stack = createNativeStackNavigator();

return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  </NavigationContainer>
);
*/


/**
 * Sovellus käynnistää kameran, jolla voidaan skannata viivakoodeja ja QR-koodeja.
 * Funktio kysyy ensin kameran käyttöoikeutta käyttäjältä, jonka jälkeen käyttää komponenttia
 * Camera ja siirtyy kameraan.
 * 
 * @returns componentin Camera
 */
export default function App() {

  const [lupaMyonnetty, setLupaMyonnetty] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setLupaMyonnetty(status === 'granted');
    })();
  }, []);

  if (!lupaMyonnetty) {
    return (
      <View style={styles.container}>
        <Text>Sovellus tarvitsee oikeuden käyttää kameraa toimiakseen oikein.</Text>
      </View>
    );
  }

  return <Camera />;
}
/**
 * Tyylit
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});