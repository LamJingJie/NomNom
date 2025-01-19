import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function AddFriendScreen() {
  const [searchId, setSearchId] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Friend</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Add by username"
          value={searchId}
          onChangeText={setSearchId}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Result */}
      <View style={styles.resultCard}>
        <View style={styles.userInfo}>
          <Image
            source={require("../../../assets/images/nerdydudepfp.png")} // Add a default avatar image
            style={styles.avatar}
          />
          <Text style={styles.userName}>Person 1</Text>
        </View>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => Alert.alert("Friend Request Sent")}
        >
          <Text style={styles.requestButtonText}>Send Friend Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchButton: {
    padding: 8,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee", // Placeholder color
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  requestButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
  },
  requestButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
