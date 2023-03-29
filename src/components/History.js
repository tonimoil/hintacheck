import { Text, View, Button } from 'react-native';

export default function History( ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Historia</Text>
        <Button
          title="Siirry kameraan"
          onPress={() => console.log("testi")}
        />
      </View>
    );
}
