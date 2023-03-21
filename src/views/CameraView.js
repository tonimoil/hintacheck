import React from 'react';
import { View } from 'react-native';
import { TopNavigationBar, Camera } from '../components/index';

export default function CameraView ({ navigation }) {
  const buttons = [
    { label: 'Historia', onPress: () => navigation.navigate("History") }
  ];

  return (
    <View>
      <TopNavigationBar buttons={buttons} />
      <Camera navigation={navigation}/>
    </View>
  );
};
