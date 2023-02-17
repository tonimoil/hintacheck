import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera } from './src/components/Camera.js'
import { History } from './src/components/History.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
