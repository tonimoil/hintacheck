import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function NoPermissions() {
return (
      <View style={styles.container}>
        <Text>
            Sovellus tarvitsee oikeuden käyttää kameraa toimiakseen oikein.
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
