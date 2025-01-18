import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from 'expo-router';
import MapViewer from '@/components/MapViewer';
import MapView, { Marker, Callout, PROVIDER_DEFAULT} from 'react-native-maps'
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebase_auth } from "@/config/firebase"; 

export default function home() {
  const api1 = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const api2 = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;


  return (
    <View>
      <Text>Edit index.tsx to edit this screen.</Text>
      <MapViewer/>
    </View>
  );
}


const styles = StyleSheet.create({

});

