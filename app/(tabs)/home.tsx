import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import MapViewer from '@/components/MapViewer';

import 'react-native-get-random-values'
import * as Location from 'expo-location'

// Components
import SearchBar from '@/components/SearchBar';
import { useContext, useEffect, useState } from "react";

// Context
import { LocationContext } from '@/context/LocationContext';

export default function Home() {

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      if (status == 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        let userlat = location.coords.latitude
        let userlong = location.coords.longitude
        setLocation({
          "latitude": userlat,
          "longitude": userlong,
        });
      }

    }
    getCurrentLocation();

    const default_coords = { "latitude": 1.3521, "longitude": 103.8198 }; // center of singapore
    setLocation(default_coords);
  }, [])

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <View style={styles.component}>
      <LocationContext.Provider value={{ location, setLocation }}>

        <View style={styles.headerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.header_text}>NomNom</Text>
          </View>

          {/* Google Places Autocomplete */}
          <SearchBar />

        </View>

        {location ? (
          <MapViewer />
        ) : (
          <View style={styles.centeredContainer}>
            <Text style={styles.paragraph}>{text}</Text>
          </View>
        )}

      </LocationContext.Provider>
    </View>
  );
}


const styles = StyleSheet.create({
  component: {
    flex: 1,
  },

  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    paddingTop: 40,
    width: '100%',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Error
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },


});

