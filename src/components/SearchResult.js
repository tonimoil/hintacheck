import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SearchResult({ product, url, price }) {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>
      <View style={styles.details}>
        <Text style={styles.product}>{product}</Text>
        <Text style={styles.url}>{url}</Text>
      </View>
      <Text styles={styles.price}></Text>
    </View>
  );
}

//<Text style={styles.price}>{price.toFixed(2)} €</Text>

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
  product: {
    textAlign: 'center',
  },
  url: {
    textAlign: 'center',
    marginTop: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
