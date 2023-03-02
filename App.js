import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera } from './src/components/Camera.js'
import { History } from './src/components/History.js'

const Stack = createNativeStackNavigator();

export default function App() {

  const [lupaMyonnetty, setLupaMyonnetty] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setLupaMyonnetty(status === 'myonnetty');
    })();
  }, []);

  if (!lupaMyonnetty) {
    return (
      <View style = {styles.container}>
        <Text>Voidaksesi käyttää sovellusta on sinun annettava sovellukselle lupa käyttää kameraa.</Text>
      </View>
    );
  }

  /*
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});