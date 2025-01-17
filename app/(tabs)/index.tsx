import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import MapViewer from '@/components/MapViewer';


export default function Index() {

  const api1 = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const api2 = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;


  return (
    <View>
      <Text>Edit index.tsx to edit this screen.</Text>
      <MapViewer />
    </View>
  );
}


const styles = StyleSheet.create({

});

