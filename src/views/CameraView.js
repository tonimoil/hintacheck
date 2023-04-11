import React from 'react';
import { View } from 'react-native';
import { Camera } from '../components/index';

export default function CameraView () {
  return (
    <View style={{flex: 1,
      width: undefined,
      height: undefined,}}>
      <Camera/>
    </View>
  );
};
