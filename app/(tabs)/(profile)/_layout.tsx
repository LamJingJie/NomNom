import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";


export default function ProfileLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="recommendations"  options={{ title: "My Recommendations" }} />
      </Stack>
      <StatusBar style="dark" />
      
    </>
  );
}
