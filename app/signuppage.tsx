import {Image, View, Text ,StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React, { useState  } from 'react'
import { Link, useRouter  } from 'expo-router'
import {db, firebase_auth} from '../config/firebase'
import { style } from 'twrnc';
import { createUserWithEmailAndPassword  } from 'firebase/auth';
import { child, Database, push, ref, set } from 'firebase/database';

export default function singuppage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordcheck,setPasswordcheck] = useState('');
    const [username , setUserName] = useState('')
    const [loading , setLoading] = useState(false);
    const auth = firebase_auth;
    const router = useRouter()

    const signUp = async () => {
        setLoading(true);
        if (password == passwordcheck){
            try{
                const reponse = await createUserWithEmailAndPassword(auth,email,password);
                alert('Check your emails!')
            } catch (error:any) {
                console.log(error);
                alert("Registration failed:" + error.message)
            } finally{
                setLoading(false);
            }
        } else{
            alert("Your password does not match")
            setLoading(false)
            
        }
    }
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <TextInput value={username} style={styles.input} placeholder='Username' autoCapitalize='none' onChangeText={(text)=> setUserName(text)}></TextInput>
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text)=> setEmail(text)}></TextInput>
        <TextInput value={password} style={styles.input} placeholder='password' secureTextEntry={true} autoCapitalize='none' onChangeText={(text)=> setPassword(text)}></TextInput>
        <TextInput value={passwordcheck} style={styles.input} placeholder='password' secureTextEntry={true} autoCapitalize='none' onChangeText={(text)=> setPasswordcheck(text)}></TextInput>
        
        {loading? (
            <ActivityIndicator size="large" color="#0000ff"/>
        ):(
            <>

            <TouchableOpacity onPress={signUp}>
                <Text>
                    Signup
                </Text>
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


