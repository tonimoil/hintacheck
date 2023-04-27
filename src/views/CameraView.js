import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { Camera } from '../components/index';
import { MyContext } from "./MyContext";

export default function CameraView ({ navigation }) {
  const { myArray, setMyArray } = useContext(MyContext)

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#3FC3D2'}}>
      <Camera navigation={navigation} setMyArray={setMyArray} myArray={myArray}/>
    </SafeAreaView>
  );
};

