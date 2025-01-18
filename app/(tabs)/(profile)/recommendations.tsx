

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ListItem = () => {
  return (
    <>
    <ScrollView> 
        {/* Start of card */}
        <TouchableOpacity>  
            <View style={styles.container}>
                    <Image
                    source={require('../../../assets/images/react-logo.png')} // Replace with your icon URL
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Name</Text>
                    <Text style={styles.description}>This is the description of the item.</Text>
                </View>
            
            </View>
        </TouchableOpacity> 
        {/* End of card */}
    </ScrollView>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 40, // Adjust the size of your icon
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Take up remaining space
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ListItem;