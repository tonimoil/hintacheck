import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TopNavigationBar({ buttons }) {
return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'grey', padding: 10 }}>
        {buttons.map((button, index) => (
            <TouchableOpacity key={index} onPress={button.onPress}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{button.label}</Text>
            </TouchableOpacity>
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'right',
        justifyContent: 'right',
    },
});
