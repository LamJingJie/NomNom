import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ListRenderItem,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from 'expo-router';

import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const DUMMY_FRIENDS = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://placeholder.com/150",
    recommendedRestaurants: [
      {
        id: "1",
        name: "Sushi Ko",
        cuisine: "Japanese",
        location: "placeholder for location",
        latitude: 50,
        longitude: 4555,
        review: "this sucks",
        recommend: true,
      },
      {
        id: "2",
        name: "Pasta House",
        cuisine: "Italian",
        location: "placeholder for location",
        latitude: 50,
        longitude: 4555,
        review: "this sucks",
        recommend: false,
      },
    ],
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "https://placeholder.com/150",
    recommendedRestaurants: [
      {
        id: "3",
        name: "Taco Place",
        cuisine: "Mexican",
        location: "placeholder for location",
        latitude: 50,
        longitude: 4555,
        review: "this sucks",
        recommend: true,
      },
      {
        id: "4",
        name: "Burger Spot",
        cuisine: "American",
        location: "placeholder for location",
        latitude: 50,
        longitude: 4555,
        review: "this sucks",
        recommend: true,
      },
    ],
  },
];
//add review, search for friend by ID and add friend
//things to change: lat, long, location and avatar (pfp), add distance away from user
// Define the Friend interface
interface Friend {
  id: string;
  name: string;
  avatar: string;
  recommendedRestaurants: Restaurant[];
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  latitude: number;
  longitude: number;
  review: string;
  recommend: boolean;
}

//API FOR SEARCHING FRIENDS
const API_URL = "https://api.example.com/friends";

export default function FriendsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [restaurantModalVisible, setRestaurantModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const openModal = (friend: Friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedFriend(null);
  };

  const openRestaurantModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    closeModal(); //close the first modal
    setRestaurantModalVisible(true); //show to restaurant modal
  };

  const closeRestaurantModal = () => {
    setSelectedRestaurant(null);
    setRestaurantModalVisible(false);
  };

  const handleDelete = (friend: Friend) => {
    //handle delete action
    Alert.alert("Delete", `Delete ${friend.name}`);
  };

  const navigation = useNavigation();


  const renderFriend: ListRenderItem<Friend> = ({ item }) => (
    /*<Swipeable
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={() => handleDelete(item)}
    >*/

    <TouchableOpacity style={styles.friendCard} onPress={() => openModal(item)}>
      <View style={styles.friendInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.recommendationCount}>
            {item.recommendedRestaurants.length} recommendations
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              "Delete Friend",
              `Are you sure you want to delete $(item.name) from your friends list?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => handleDelete(item),
                  style: "destructive",
                },
              ]
            );
          }}
        >
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  //for searchbar
  /*const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<unknown>(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_URL)
  }, []);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      
      console.log(json.results);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    } 
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add any additional search logic here
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong...</Text>
      </View>
    );
  }*/

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MY FRIENDSS</Text>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
      <View style={styles.searchContainer}>
        {/* Add Friends Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addFriends' as never)}>
          <Text style={styles.addButtonText}>
            <SimpleLineIcons name="user-follow" size={24} color="white" />
            </Text>
        </TouchableOpacity>
        {/* Search Box */}
        <TextInput
          placeholder="Search friends by name"
          clearButtonMode="always"
          style={styles.searchBox}
          autoCapitalize="none"
          autoCorrect={false}
          // value = {searchQuery}
          // onChangeText={(query) => handleSearch(query)}
        />
      </View>
      </SafeAreaView>
      <FlatList
        data={DUMMY_FRIENDS}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedFriend && (
              <>
                <Text style={styles.modalHeader}>
                  {selectedFriend.name}'s Recommendations
                </Text>
                <FlatList
                  data={selectedFriend.recommendedRestaurants}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.restaurantCard}
                      onPress={() => openRestaurantModal(item)}
                    >
                      <View style={styles.row}>
                        <Text style={styles.restaurantName}>{item.name}</Text>
                        {item.recommend ? (
                          <Feather
                            name="thumbs-up"
                            size={20}
                            color="green"
                            style={styles.icon}
                          />
                        ) : (
                          <Feather
                            name="thumbs-down"
                            size={20}
                            color="red"
                            style={styles.icon}
                          />
                        )}
                      </View>
                      <Text style={styles.cuisine}>{item.cuisine}</Text>
                      <Text style={styles.location}>{item.location}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={restaurantModalVisible}
        onRequestClose={closeRestaurantModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRestaurant && (
              <>
                <Text style={styles.modalHeader}>
                  {selectedRestaurant.name}
                </Text>
                <Text style={styles.restaurantDetail}>
                  Cuisine: {selectedRestaurant.cuisine}
                </Text>
                <Text style={styles.restaurantDetail}>
                  Location: {selectedRestaurant.location}
                </Text>
                <Text style={styles.restaurantDetail}>
                  Review: {selectedRestaurant.review}
                </Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={closeRestaurantModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },      
  searchBox: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  friendCard: {
    padding: 16,
    backgroundColor: "#D5A8FF",
    borderRadius: 8,
    marginBottom: 12,
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  recommendationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  recommendationCount: {
    marginTop: 10,
    textAlign: "left",
    color: "#F0F0F0",
  },
  textContainer: {
    flexDirection: "column", // Ensures name and recommendations are stacked
    justifyContent: "center", // Aligns vertically within the container
    alignItems: "flex-start", // Left-aligns the text
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  restaurantCard: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "500",
  },
  cuisine: {
    color: "#666",
    marginTop: 4,
  },
  restaurantDetail: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },

  recommendation: {
    fontSize: 16,
    marginTop: 8,
    color: "#444",
  },
  location: {
    color: "#666",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between name and icon
  },
  icon: {
    marginLeft: 8, // Optional, to add some spacing from the name
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#13FD1F",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  deleteButton: {
    marginLeft: "auto", // This pushes the button to the right
    padding: 8,
  },
});
