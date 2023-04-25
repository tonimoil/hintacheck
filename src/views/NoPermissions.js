import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function NoPermissions() {
return (
      <View style={styles.container}>
        <Text style={styles.text}>
            hintacheck
        </Text>

        <Text style={styles.notice}>
          Camera access is required to use this app.
        </Text>
      </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#3FC3D2'
    },
    text: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
    },
    notice: {
      flex: 1,
      fontSize: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 0,
      color: 'white',
    }
  });
