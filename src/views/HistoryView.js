import React from 'react';
import { View } from 'react-native';
import { History } from '../components/index';

export default function CameraView () {
  return (
    <View style={{flex: 1,
      width: undefined,
      height: undefined,}}>
      <History/>
    </View>
  );
};
