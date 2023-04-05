import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HistoryView from '../views/HistoryView';
import CameraView from '../views/CameraView';
import HistoryViewCopy from '../views/HistoryViewCopy';
//import ResultsView from '../views/ResultsView';
import SearchResult from './SearchResult';

const Tab = createMaterialTopTabNavigator();


// Sivun vaihtaminen jostain muusta näkymästä takaisin kameraan on hidasta. 
// Tämä johtunee siitä että kamera avataan aina uudestaan.
// Ratkaisuehdotus: Sovelluksen ollessa päällä kamera olisi kokoajan päällä.

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
      <Tab.Navigator
        initialRouteName="Scanner"
        screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: "#3FC3D2", marginTop: insets.top},
        }}
        >
        <Tab.Screen name="Scanner" component={CameraView}  />
        <Tab.Screen name="History" component={HistoryView} />

        <Tab.Screen name="Results" component={SearchResult} /> 
       
        <Tab.Screen name="History2" component={HistoryViewCopy} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TopBar;
