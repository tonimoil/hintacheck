import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from './MyContext';
import { API_URL, API_AUTH } from '@env';

/**
 * Tuotteiden esille tuominen AsyncStoragesta. Käytetään AsyncStorage pakettia.
 * Asennetaan:
 * npm install @react-native-async-storage/async-storage tai yarn add @react-native-async-storage/async-storage
 * 
 * Lisää tietoa: https://react-native-async-storage.github.io/async-storage/docs/api
 * Lisenssi: MIT
 */
export default function HistoryView({ navigation }) {
  const [scannedData, setScannedData] = useState([]);
  const { myArray, setMyArray } = useContext(MyContext);

  useEffect(() => {
    const saveData = async () => {     
      try {
        await AsyncStorage.setItem('myArray', JSON.stringify(myArray));
      } catch (error) {
        console.log(error);
      }
    };
    saveData();

    setScannedData(myArray);
  }, [myArray])

  const clearAsyncStorage = async () => {
    try {
      setMyArray([])
      await AsyncStorage.clear();
      setScannedData([]);
    } catch (error) {
      console.error(error);
    }
  };




  const HistoryResult = ({ean, name}) => {

    const handlePress = async () => {
      try {
        const headers = {'Authorization' : 'Basic ' + API_AUTH}
        const response = await fetch(`${API_URL}/search/${ean}`, {headers});

        if (response.status === 200) {
          const results = await response.json()
          navigation.navigate("Results", {"results" : results});
          return
        }
        alert("Tapahtui jokin virhe.");
        return
      } catch (error) {
        console.error(error);
      }
    };

    
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

    

    return(
      <View style={styles.historyContainer}>
      <View style={styles.image}></View>
      {(ean || name) && (
        <View style={styles.details}>
          <TouchableOpacity onPress={handlePress}>
          <Text style={styles.product}>{removeAfterBar(name)}</Text>
            <Text style={[styles.url, { textDecorationLine: 'underline' }]}>{}</Text>
          <Text style={styles.price}></Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    )
  }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        
        <View style={styles.resultContainer}>
          {scannedData.map((result) => (
            <HistoryResult name={result.name} ean={result.ean} key={result.ean}/>
          ))}
          </View>

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
    backgroundColor: '#00ced1',
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
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#00ced1',
    borderRadius: 5
  },
  historyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
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
