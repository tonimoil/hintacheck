import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NoPermissions, CameraView, HistoryView, ResultsView } from './src/views/index';

/**
 * TODO: puhelimeen varastoinnin tekeminen historiaa varten. Käytetään esimerkiksi
 * react-nativen AsyncStoragea https://reactnative.dev/docs/asyncstorage
 */
export default function App() {
  const [permissions, setPermissions] = React.useState(false);
  
  /**  
   * Välilehtien toimintaa varten, kts. 
   * https://reactnavigation.org/docs/getting-started/
   */
  const Stack = createNativeStackNavigator();

  //Odotetaan lupia käyttäjältä kameran käyttöön.
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermissions(status === 'granted');
    })();
  }, []);
  
  return (
    /**
     * NavigationContainer sisältää Stack.Screen komponentteja.
     * Komponenteille on defaulttina navigation niminen props, jota
     * componenteissa käytetään. navigationin avulla voidaan ohjata
     * käyttäjälle näytettäviä ruutuja.
     *
     * permissions muttujan ollessa false, eli käyttäjä ei ole antanut
     * oikeuksia kameraan, käyttäjä ohjataan ei oikeuksia sivulle.
     */

    <NavigationContainer>
    {permissions ?
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Camera" component={CameraView} />
      <Stack.Screen name="History" component={HistoryView} />
      <Stack.Screen name="Results" component={ResultsView} />
    </Stack.Navigator>
    :
    <NoPermissions/> 
    }
  </NavigationContainer>
);
}
