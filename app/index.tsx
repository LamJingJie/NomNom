import {Image, View, Text ,StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React, { useState  } from 'react'
import { Link, useRouter  } from 'expo-router'
import {firebase_auth} from '../config/firebase'
import { style } from 'twrnc';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function index() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const auth = firebase_auth;
    const router = useRouter()
    const signIn = async () => {
        setLoading(true);
        try{
            const reponse = await signInWithEmailAndPassword(auth,email,password);
            console.log(reponse);
            router.replace('/home')
        } catch (error:any) {
            console.log(error);
            alert("Sign in failed:" + error.message)
        } finally{
            setLoading(false);
        }
    }
    const signUp = async () => {
        setLoading(true);
        try{
            const reponse = await createUserWithEmailAndPassword(auth,email,password);
            console.log(reponse);
            alert('Check your emails!')
        } catch (error:any) {
            console.log(error);
            alert("Registration failed:" + error.message)
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
                <Link href={"/signuppage"}>
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


