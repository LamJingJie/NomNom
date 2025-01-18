import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from '@/constants/MapViewerStyle.json';
import * as Location from 'expo-location'

// Context
import { LocationContext } from '@/context/LocationContext';


export default function MapViewer() {

  const { location, setLocation } = useContext(LocationContext);
  const google_places_api = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

  // State
  const [places, setPlaces] = useState([]);
  const [mapKey, setMapKey] = useState(0);

  // Default location is the center of Singapore zoomed out
  const [region, setRegion] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // Refs
  const mapRef = useRef<MapView>(null);



  useEffect(() => {

    if (location) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setRegion(newRegion);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000); // Animate to the new region
      }

      // Fetch nearby places
      fetchNearbyPlaces(location.latitude, location.longitude);
      handleRerender();
    }
  }, [location]);



  const fetchNearbyPlaces = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=restaurant&key=${google_places_api}`
      );
      const data = await response.json();
      // console.log(response);
      if (data.results) {
        setPlaces(data.results);
        handleRerender();
      }

    } catch (err) {
      console.error(err);
    }
  }

  const handleRerender = () => {
    setMapKey(mapKey + 1);
  }

  return (

    <View style={styles.container}>

      <MapView
        key={mapKey}
        onMapReady={() =>
          console.log('Map is ready!')
        }
        ref={mapRef}
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        pitchEnabled={false} // Disable 3D tilt
        rotateEnabled={false} // Disable rotation
        zoomEnabled={true} // Enable zoom
      >
        {places.map((place: any, index: number) => {
          console.log(`Rendering Marker: ${place.name}, Lat: ${place.geometry.location.lat}, Lng: ${place.geometry.location.lng}`);
          return (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              pinColor="#00FF00" //green
            />
          );
        })}

        <Marker
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}
          title="You are here"
          pinColor="red"
        />

      </MapView>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 150,
    paddingHorizontal: 10,

  },
  map: {
    width: '100%',
    height: '100%',
  },
});