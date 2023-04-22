import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { SearchResult } from '../components/index';
import { API_URL, API_AUTH } from '@env';

export default function ResultsView ({ route }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false)

  const LoadingText = () => {
    const [dots, setDots] = useState(1);

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((dots) => dots === 3 ? 1 : dots + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const emptyChars = Array(dots).fill(' ').join('');

    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>{emptyChars}Ladataan hintatietoja{'.'.repeat(dots)}</Text>
      </View>
    );
  }

  useEffect(() => { 
    if (route.params && route.params.results) {
      setResults(route.params.results);
    } else {
      return
    }

    let timeoutId;
    let fetchPrices = false;
    let count = 0;
    setLoading(true)

    const handleExit = (newData) => {
      setLoading(false)
      setResults(newData)
    }

    const checkForUpdates = async () => {
      try {
        if(route.params.searchValue) {
          const headers = {'Authorization' : 'Basic ' + API_AUTH}
          const response = await fetch(`${API_URL}/search/${route.params.searchValue}`, {headers});
          const data = await response.json();

          //Hack-ratkaisu, että saadaan poistettua queue.
          const filtered_results = data.filter((item) => item.hasOwnProperty('name'))

          if (JSON.stringify(filtered_results) !== JSON.stringify(route.params.results)) {
            handleExit(filtered_results)
            clearTimeout(timeoutId);
          }
          count = count + 1;
          timeoutId = setTimeout(checkForUpdates, 6000);
        }

        if (count === 3){
          clearTimeout(timeoutId);
        }

      } catch (error) {
        console.error('Error fetching price updates:', error);
        timeoutId = setTimeout(checkForUpdates, 6000);
      }
    };

    route.params.results.forEach((e) => {if (e.price === null){fetchPrices = true}})

    if (fetchPrices) {
      checkForUpdates();
    } else {
      setLoading(false)
    }
    
    return () => {
      clearTimeout(timeoutId);
    };

  }, [route.params]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? <LoadingText/> : <></>}
        {results.map((result, index) => (
          <View key={index} style={styles.resultContainer}>
            <SearchResult product={result.name} url={result.url} key={result.name} price={result.price} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ced1'
  },
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#00ced1',
    borderRadius: 5
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
