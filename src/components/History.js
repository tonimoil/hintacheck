import React from 'react';
import { View, Text } from 'react-native';

export default function History({ data }) {
  return (
    <View>
      {data && data.map(item => (
        <View key={item.id}>
          <Text>{item.Name}</Text>
          <Text>{item.Url}</Text>
        </View>
      ))}
    </View>
  );
}

