import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryView() {
  const [scannedData, setScannedData] = useState([]);

  //TODO: Tyylittely
  //TODO: Tuotteiden järjestys muuttaa käänteiseksi
  //TODO: Automaattinen datan poisto, jos ylittää esim. 10 tuotetta AsyncStoragessa.
  //      Tällä hetkellä saattaa kaatua, jos muistiin jää liikaa dataa tai sitten johtuu
  //      vain Expo Go sovelluksesta.

  useEffect(() => {
    // Retrieve all keys from AsyncStorage
    AsyncStorage.getAllKeys()
      .then(async (keys) => {
        // Retrieve all values from AsyncStorage
        const values = await AsyncStorage.multiGet(keys);
        // Map over the values to parse the JSON and add them to the state
        const data = values.map((value) => JSON.parse(value[1]));
        setScannedData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setScannedData([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {scannedData.map((data, index) => (
          <View key={index}>
            {data.map((obj, index2) => (
              <View key={`${index}-${index2}`} style={styles.resultContainer}>
                <Text>Name: {obj.Name}</Text>
                <Text>Url: {obj.Url}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.clearButton} onPress={clearAsyncStorage}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  clearButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#ff6347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});