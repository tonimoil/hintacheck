import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { SearchResult } from '../components/index';
import { API_URL, API_AUTH } from '@env';
import Product from '../components/Product';

export default function ResultsView ({ route }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)

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
      setImage(route.params.metadata.image_url)
    
      if (route.params.metadata.price_searched === 1) {
        setLoading(false)
        return
      }
    }
    else {
      return
    }

    setLoading(true)

    const headers = {'Authorization' : 'Basic ' + API_AUTH}
    const api_url = (`${API_URL}/priceinfo/${route.params.metadata.ean}`);

    const fetchData = () => {
      fetch(api_url, {
        headers: headers})
        .then(response => response.json())
        .then(data => {
          if (data.price_searched === 0) {
            setTimeout(fetchData, 8000);
          } else if (data.price_searched === 1) {
            const search_url = (`${API_URL}/search/${route.params.metadata.ean}`);
            fetch(search_url, {headers: headers}).then(res => res.json()).then(newdata => {
              handleExit(newdata.results);
            });
          }
        })
        .catch(error => console.error(error));
    }
    
    fetchData();

    const handleExit = (newData) => {
      setLoading(false)
      setResults(newData)
    }

  }, [route.params]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? <LoadingText/> : <></>}
        {results[0] ? <Product name={results[0].name} key={results[0].name} img_url={image}></Product> : <></>}
        {results.map((result, index) => (
          <View key={index} style={styles.resultContainer}>
            <SearchResult url={result.url} key={result.name} price={result.price} />
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
    marginVertical: 3,
    padding: 7,
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
