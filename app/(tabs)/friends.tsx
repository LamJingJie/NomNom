import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import { useNavigation } from "@react-navigation/native";


export default function FriendsScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>friends</Text>
    </View>
  )
}


const styles = StyleSheet.create({

});