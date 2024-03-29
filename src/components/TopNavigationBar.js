import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HistoryView from '../views/HistoryView';
import ResultsView from '../views/ResultsView';
import CameraView from '../views/CameraView';
import { MyProvider } from '../views/MyContext';
import { StatusBar } from 'react-native';

const Tab = createMaterialTopTabNavigator();

    //TODO: permissions
    //TODO: SMOOTH transitio cameran ja muiden välillä
    //Menee epäkuntoon, jos poistaa isFocused
    //TODO: sivun vaihto resultsviewiin
/**
 * Ylä/alapalkin navigaation toteutus. 
 * Jotta navigointi toimii kunnolla on asennettava tarvittavat paketit.
 * Paketit saa asennettua komennoilla:
 * 
 * npm install @react-navigation/material-top-tabs react-native-tab-view
 * npm install react-native-pager-view
 * 
 * Tarkempaa tietoa: https://reactnavigation.org/docs/material-top-tab-navigator/
 * Lisenssi: MIT
 */
const TopBar = () => {
    const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <MyProvider>
        <Tab.Navigator
          initialRouteName="Scanner"
          //tabBarPosition="bottom"
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarLabelStyle: { fontSize: 12 },// Jos koittaa palkkia alhaalla, niin poista; marginTop: insets.top
            tabBarStyle: { backgroundColor: "#3FC3D2",marginTop: insets.top},
          }}
          >
          
          <Tab.Screen name="Scanner" component={CameraView}  />
          <Tab.Screen name="Results" component={ResultsView} /> 
          <Tab.Screen name="History" component={HistoryView} />
        </Tab.Navigator>
      </MyProvider>
    </NavigationContainer>
  );
};

export default TopBar;
