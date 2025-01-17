import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from '@/constants/MapViewerStyle.json';

export default function MapViewer() {
  return (
    <View>
      <MapView
        style={styles.map}
        initialCamera={{
            center: {latitude: 1.3521, longitude: 103.8198}, // I set to this val for now
            pitch: 0, // Flat 2d view
            heading: 0,
            altitude: 1000, // height of the camera
            zoom: 11.5, // Initial zoom level
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        pitchEnabled={false} // Disable 3D tilt
        rotateEnabled={false} // Disable rotation
      />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});