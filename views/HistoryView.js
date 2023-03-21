import React from 'react';
import { View } from 'react-native';
import { TopNavigationBar, History } from '../components/index';

export default function CameraView ({ navigation }) {
  const buttons = [
    { label: 'Kamera', onPress: () => navigation.navigate("Camera") }
  ];

  return (
    <View>
      <TopNavigationBar buttons={buttons} />
      <History/>
    </View>
  );
};
