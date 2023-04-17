import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TopNavigationBar, SearchResult } from '../components/index';

export default function ResultsView ({ route }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (route.params && route.params.results) {
      setResults(route.params.results);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {results.map((result, index) => (
          <View key={index} style={styles.resultContainer}>
            <SearchResult product={result.Name} url={result.Url} key ={result.Name} />
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
  }
});
