import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SearchResult } from '../components/index';

export default function ResultsView ({ route }) {
  //const { results } = route.params;

  const results = [{Name : "testi", Url : "testi"}]

  return (
    <View style={{flex: 1,
      width: undefined,
      height: undefined,}}>
      <ScrollView style={{flex: 1,
      width: undefined,
      height: undefined,}}>
        {results.map((result, index) => (
          <View key={index} style={styles.resultContainer}>
            <SearchResult product={result.Name} url={result.Url} 
                //hinta={result.Hinta}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5
  }
});
