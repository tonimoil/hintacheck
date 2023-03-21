import React from 'react';
import { View } from 'react-native';
import { TopNavigationBar, SearchResult } from '../components/index';

export default function ResultsView ({ route, navigation }) {
    const { results } = route.params

    const buttons = [
        { label: 'Kamera', onPress: () => navigation.navigate("Camera") }
    ];

    return (
        <View>
            <TopNavigationBar buttons={buttons}/>
            {results.map((e, i) =>
                <SearchResult key={i} name={e["Name"]} url={e["Url"]}/>
            )}
        </View>
    );
};
