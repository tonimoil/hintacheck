import React from 'react';
import { View } from 'react-native';
//import { TopNavigationBar, History } from '../components/index';

import History from '../components/History';

export default function HistoryView ({ navigation }) {
  const buttons = [
    { label: 'Kamera', onPress: () => navigation.navigate("Camera") }
  ];

  return (
    <View>
      <History/>
    </View>
  );
};
