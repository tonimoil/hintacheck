import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function SearchResult({ tuote, url, hinta }) {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>
      <View style={styles.details}>
        <Text style={styles.tuote}>{tuote}</Text>
        <Text style={styles.url}>{url}</Text>
      </View>
      <Text style={styles.hinta}>{hinta.toFixed(2)} €</Text>
    </View>
  );
}

// tyylit
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  tuote: {
    textAlign: 'center',
  },
  url: {
    textAlign: 'center',
    marginTop: 5,
  },
  hinta: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
