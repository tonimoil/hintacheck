import { Text, View, Button } from 'react-native';

//Testi-kommentti
export function Camera( {navigation} ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Kamera</Text>
        <Button
          title="Siirry hakuhistoriaan!"
          onPress={() => navigation.navigate('History')}
        />
      </View>
    );
}
