import React from 'react';
import { StyleSheet, View, Text, Linking, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

// TODO: linkit avautumaan sovelluksen sisäisesti?

export default function SearchResult({ product, url, price, imageUrl }) {

const skaupatLogo = 'https://cdn.s-cloud.fi/v1/assets/dam-id/EyBwL1EH4AE9wuolG-Y23D.webp?height=600&width=600';
const kruokaLogo = 'https://d2csxpduxe849s.cloudfront.net/media/5D5099C4-3736-4D45-9906634B6D4EB2DC/EA75A04A-30D1-4EDC-BE238BBC92F4BB5D/webimage-4DFD149E-2368-4A7F-8D2F8DC6F43DC3E0.png';
const tokmanniLogo = 'https://upload.wikimedia.org/wikipedia/fi/7/7d/Tokmanni_logo.png?20150401153824';
const defaultlogo = 'https://cdn-icons-png.flaticon.com/512/263/263142.png'

// käsittelee käyttäjän painalluksen, kun URL-linkkiä painetaan
  const handlePress = () => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Avaaminen ei onnistu : " + url);
        }
      })
      .catch((error) => console.error('Virhe sivun hakemisessa', error));
  };

  // erittelee saadusta url-linkistä etu- ja takapäätteet pois
  // painettavassa linkissä vain kaupan nimi
  const displayUrl = () => {
    try {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)(?:\.com|\.fi)/;
      const matches = url.match(pattern);
  
      if (matches && matches[1]) {
        const domain = matches[1].toUpperCase();
        const logo = getLogoForDomain(domain);
        return { domain, logo };
      }
      return { domain: url };
    } catch (error) {
      console.error('Error parsing URL:', error);
      return { domain: url };
    }
  };
  
  const getLogoForDomain = (domain) => {
    switch (domain) {
      case 'S-KAUPAT':
        return skaupatLogo;
      case 'K-RUOKA':
        return kruokaLogo;
      case 'TOKMANNI':
        return tokmanniLogo;
      // tähän lisää caseja tarvittaessa.
      default:
        return defaultlogo;
    }
  };

  return (
    <View style={styles.container}>
      {(product || url) && (
        <View style={styles.details}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.urlContainer}>
              <Image
                source={{ uri: displayUrl().logo }}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={[styles.url, {textDecorationLine:'underline'}]}>
                {displayUrl().domain}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.price}>{price} €</Text>
    </View>
  );  
}

//<Text style={styles.price}>{price.toFixed(2)} €</Text>

// tyylit
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
    borderRadius: 2,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 8,
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
    marginTop: 0,
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  urlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
});
