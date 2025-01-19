import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";


export default function ProfileLayout() {
  return (
    <>
      <Stack>
      <Stack.Screen name="friends"  options={{ title: "My Recommendations" }} />
        <Stack.Screen name="addFriends" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
      
    </>
  );
}