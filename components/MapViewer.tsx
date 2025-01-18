import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from '@/constants/MapViewerStyle.json';
import * as Location from 'expo-location'

// Context
import { LocationContext } from '@/context/LocationContext';
import { recommendations } from '@/assets/restaurantmarkers';


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


  const [selectedRestaurant, setSelectedRestaurant] = useState<{
    coordinate: { latitude: number; longitude: number };
    place_id: string;
    name: string;
    cuisine: string;
    friendList: { friendName: string }[];
    friendListReview: { friendName: string; review: string; rating: boolean }[];
  } | null>(null);

  const handleMarkerPress = (place_id: string) => {
    // Find matching restaurants in all reccommendations, and display at selected restaurant
    const matchingReviews = recommendations.find(
      (rec) => rec.place_id === place_id
    );
    if (matchingReviews) {
      setSelectedRestaurant(matchingReviews);
    }
  };

  const closeModal = () => setSelectedRestaurant(null);

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
          console.log(`Rendering Marker: ${place.place_id} ,${place.name}, Lat: ${place.geometry.location.lat}, Lng: ${place.geometry.location.lng}`);
          return (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              onPress={() => handleMarkerPress(place.place_id)}
              title={place.name}
            // pinColor="#00FF00" //green
            >

              <Image
                source={require('../assets/images/store.png')}
                style={{ width: 19, height: 19 }}
                resizeMode='contain'
              />
            </Marker>
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

      {selectedRestaurant && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!selectedRestaurant}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Friend Reviews</Text>
              <TouchableOpacity onPress={() => console.log('Navigate to another page')} style={{ position: 'absolute', right: 10, top: 10 }}>
                <Image
                  source={require('../assets/images/plus.png')}
                  style={{ width: 33, height: 33, marginRight: 10, marginTop: 7 }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <FlatList
                data={selectedRestaurant.friendListReview}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.reviewItem}>
                    <TouchableOpacity onPress={() => console.log(`Opening review for ${item.friendName}`)} >
                      <View style={styles.reviewItem}>
                        <Text style={styles.friendName}>{item.friendName}</Text>
                        <Text style={styles.review}>{item.review}</Text>
                        <Text style={styles.rating}>Rating: {item.rating ? "Good" : "Bad"}</Text>
                      </View>
                      {item.rating ? (
                        <Image
                          source={require('../assets/images/thumbsup.png')}
                          style={{ width: 30, height: 30, position: 'absolute', right: 15, top: 19 }}
                          resizeMode='contain'
                        />
                      ) : (
                        <Image
                          source={require('../assets/images/thumbsdown.png')}
                          style={{ width: 30, height: 30, position: 'absolute', right: 15, top: 19 }}
                          resizeMode='contain'
                        />
                      )}
                    </TouchableOpacity>

                  </View>
                )}
              />
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    backgroundColor: '#f2f2f2',
    margin: 7,
  },
  friendName: {
    fontWeight: 'bold',
  },
  review: {
    fontStyle: 'italic',
  },
  rating: {
    color: 'gray',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffc663',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});