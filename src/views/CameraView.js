import React from 'react';
import { SafeAreaView } from 'react-native';
import { TopNavigationBar, Camera } from '../components/index';

export default function CameraView ({ navigation }) {
  /*
  const buttons = [
    { label: 'Results', onPress: () => navigation.navigate("History") }
  ];
  */

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#3FC3D2'}}>
      <Camera navigation={navigation}/>
    </SafeAreaView>
  );
};

