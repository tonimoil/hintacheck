import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Product = ({ img_url, name }) => {
    const removeAfterBar = (text) => {
        if (!text) {
          return "";
        }
        const index = text.indexOf('|');
        if (index !== -1) {
          return text.slice(0, index);
        }
        return text;
    }
  
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: img_url }} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{removeAfterBar(name)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    marginBottom: 8,
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 16,
    textShadowColor: '#ccc',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.5
},
});

export default Product;