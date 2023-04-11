import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TopNavigationBar() {
    const navigation = useNavigation();
    const route = useRoute();

    const buttons = [
        { label: 'Historia', stack : 'History', onPress: () => navigation.navigate("History") },
        { label: 'Kamera', stack : 'Camera', onPress: () => navigation.navigate("Camera") },
        { label: 'Tulokset', stack : 'Results', onPress: () => navigation.navigate("Results") }
      ];

    return (
        <View style={{ flexDirection:'row', alignContent:'space-between' }}>
        {buttons.map((button, index) => (
            <TouchableOpacity key={index} onPress={button.onPress} style={{ marginLeft: 30 }}>
                {
                route.name == button.stack ? 
                <Text  style={{ }}>{button.label}</Text> 
                :
                <Text  style={{color:"red" }}>{button.label}</Text>
                }
                
            </TouchableOpacity>
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        ...Platform.select({
          web: {
            position: "fixed"
          }
        }),
        height: 60,
        width: '100%',
      }
});
