
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import useAuth from "../hooks/useAuth"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebase_auth } from "@/config/firebase";
import { Stack, useRouter } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);


  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user: any) => {
      console.log('user', user)
      setUser(user);
    })
  })
  return (
    <>
      <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signuppage" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="dark" />
      </GestureHandlerRootView>

    </>

  );
  //   const {user} = useAuth()
  //   if (user){
  //     <>
  //     <Stack>
  //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //         <Stack.Screen name="+not-found" />
  //       </Stack>
  //       <StatusBar style="dark" />
  //       </>
  //   } else {
  //   return (
  //     <>
  //       <Stack>
  //         <Stack.Screen name="login" options={{headerShown: false}} />
  //         <Stack.Screen name="+not-found" />
  //       </Stack>
  //       <StatusBar style="dark" />

  //     </>
  //   );
  // }
}
