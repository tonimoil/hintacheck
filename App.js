import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NoPermissions } from './src/views/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from './src/components/TopNavigationBar';

export default function App() {
  const [permissions, setPermissions] = React.useState(false);
  
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
    <SafeAreaProvider>
      {permissions ?
        <TopBar/>
        :
        <NoPermissions/> 
      }
    </SafeAreaProvider>
);
}
