import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function SearchResult({ name, url }) {
  return (
    <View styles={styles.container}>
      <Text>Tuote: {name}</Text>
      <Text>Url: {url}</Text>
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
