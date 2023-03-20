import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { History, NoPermissions } from './src/components/index';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CameraView, HistoryView, ResultsView } from './src/Views/index';

export default function App() {
  const [permissions, setPermissions] = React.useState(false);
  
  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermissions(status === 'granted');
    })();
  }, []);
  
  return (
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
