import { Text, View, Button } from 'react-native';

export function History( {navigation} ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Historia</Text>
        <Button
          title="Siirry kameraan"
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    );
}
