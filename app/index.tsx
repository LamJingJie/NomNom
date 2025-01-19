import {Image, View, Text ,StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState  } from 'react'
import { Link, useRouter  } from 'expo-router'
import {db, firebase_auth} from '../config/firebase'
import { style } from 'twrnc';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {setItem ,getItem} from "../utils/AsyncStorage";
import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import home from './(tabs)/home';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {

    // State
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const [user, setUser] = useState<any | null>(null);

    const [Id , setId] = useState<any>(null);
    const auth = firebase_auth;
    const router = useRouter()
    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);
            const usersRef = ref(db, "users");
            const emailQuery = query(usersRef, orderByChild("email"), equalTo(response.user.email));
            const snapshot = await get(emailQuery);

            // console.log(Object.keys(snapshot.val())[0]);
            AsyncStorage.setItem('userId', Object.keys(snapshot.val())[0]);

            router.replace('../home');

        } catch (error:any) {
            console.log(error);
            alert("Sign in failed:" + error.message)
        } finally{
            setLoading(false);
        }
    }
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text)=> setEmail(text)}></TextInput>
        <TextInput value={password} style={styles.input} placeholder='password' secureTextEntry={true} autoCapitalize='none' onChangeText={(text)=> setPassword(text)}></TextInput>
        {loading? (
            <ActivityIndicator size="large" color="#0000ff"/>
        ):(
            <>
            <TouchableOpacity onPress={signIn}>
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity> 
                <Link href="../signuppage">
                    <Text>
                        Signup
                    </Text>
                </Link>
            </TouchableOpacity>
            </>
        )
        }
        </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        flex:1,
        justifyContent:'center'
    },
    input:{
        marginVertical : 4, 
        height : 50 ,
        borderWidth : 1,
        borderRadius : 4,
        padding : 10 ,
        backgroundColor : '#FFF'
    }
})


