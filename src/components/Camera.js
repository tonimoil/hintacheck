import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

/**
 * 
 */
export default function App() {
  const [lupaMyonnetty, setLupaMyonnetty] = React.useState(false);

  return (
    <View style = {StyleSheet.container}>
      <Text>Test</Text>
      <StatusBar style = "auto"></StatusBar>
    </View>
  );
}