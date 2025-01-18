import React , {useState} from 'react'
import {Image, StyleSheet, Text, View , TextInput , TouchableOpacity } from "react-native";
import { Link , useLocalSearchParams } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import tw from 'twrnc'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { navigate } from 'expo-router/build/global-state/routing';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Tap to edit me");
  const {id} = useLocalSearchParams();


  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <> 
    <View style={tw`h-screen flex items-center mt-30 max-h-50`}>
    <Image source={require('../../../assets/images/profile.png')} style={tw`rounded-full flex items-center max-w-50 max-h-50`}/>
    </View>
    <View style={tw`flex items-center`}>
    {isEditing ? (
        <TextInput
        style={tw`max-w-50`}
          value={text}
          onChangeText={setText}
          onBlur={toggleEditing} 
          autoFocus={true} 
        />
      ) : (
        <View >
           <Text>{text || "Default Name"}</Text>  
        <TouchableOpacity onPress={toggleEditing}>
           <Image source={require('../../../assets/images/edit.png')}  style={tw` max-w-5 max-h-5`}/>          
        </TouchableOpacity>
        </View>

      )}
    <Text style={styles.grey}>Id:{id}</Text>
    </View>
    <View style={tw`flex items-center`}>
    <TouchableOpacity > 
      <Link href="/recommendations" style={tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-40 align-center`}>
      Recommendations
      </Link>
    </TouchableOpacity>
      <TouchableOpacity /* onpress()*/>
        <Link href="/" style={tw`bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-20 align-center mt-10`}>
          <Text >Logout</Text>
        </Link>
      </TouchableOpacity>
    </View>
    </>
   
  )
}


const styles = StyleSheet.create({
  grey:{
    color:"grey"
  },
  button:{ 
    backgroundColor: '#ff4d4d', color: 'white', borderRadius: '5px', cursor: 'pointer' }
});