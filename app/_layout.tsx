
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useAuth from "../hooks/useAuth"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebase_auth } from "@/config/firebase";
import {Stack} from "expo-router"

export default function RootLayout() {
  const [user,setUser] = useState<User | null>(null);
  useEffect(()=>{
    onAuthStateChanged(firebase_auth , (user)=>{
      console.log('user', user)
      setUser(user);
    })
  })
  return(

      <Stack>
       <Stack.Screen name="(tabs)" options={{ headerShown:false}} />  
       <Stack.Screen name="index" options={{headerShown:false}} /> 
       <Stack.Screen name="signuppage" options={{headerShown:false}}/>
      </Stack>

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
