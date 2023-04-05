import React from 'react';
import { View } from 'react-native';
import Camera from '../components/Camera';

export default function CameraView (/*{ navigation }*/) {
  /*
  const buttons = [
    { label: 'Historia', onPress: () => navigation.navigate("History") }
  ];
  */

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
  
      <Camera /*navigation={navigation}*//>
    </View>
  );
};
