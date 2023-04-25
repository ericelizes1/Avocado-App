import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserCard from '../components/UserCard';

export default function DiscoverScreen() {
  const [isSearchingReviews, setIsSearchingReviews] = useState(true);
  const Tab = createMaterialTopTabNavigator();


  const data = [
    { id: '1', title: 'Review 1', description: 'This is review 1' },
    { id: '2', title: 'Review 2', description: 'This is review 2' },
    { id: '3', title: 'Review 3', description: 'This is review 3' },
    { id: '4', title: 'Review 4', description: 'This is review 4' },
    { id: '5', title: 'Review 5', description: 'This is review 5' },
    { id: '6', title: 'Review 6', description: 'This is review 6' },
    { id: '7', title: 'Review 7', description: 'This is review 7' },
    { id: '8', title: 'Review 8', description: 'This is review 8' },
    { id: '9', title: 'Review 9', description: 'This is review 9' },
    { id: '10', title: 'Review 10', description: 'This is review 10' },
  ];

  const renderItem = ({ item }) => <ReviewCard review={item} />;
  
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="ReviewList" component={ReviewList}/>
        <Tab.Screen name="UserList" component={UserList}/>
      </Tab.Navigator>
      <View style={styles.floatingButtonContainer}>
        <NewPostButton/>
      </View>
    </>
  );
  /*
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.menuButton,
          {
            backgroundColor: isSearchingReviews ? 'white' : '#EBEBEB',
            borderBottomWidth: isSearchingReviews ? 2 : 1,
            borderBottomColor: isSearchingReviews ? "#9ABC06" : "#ccc",
          }]}
          onPress={() => setIsSearchingReviews(true)}
        >
          <Ionicons
            name={'checkmark-sharp'}
            size={20}
            color={isSearchingReviews ? '#727272' : '#EBEBEB'}
          />
          <Text style={styles.menuText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuButton,
            {
              backgroundColor: !isSearchingReviews ? 'white' : '#EBEBEB',
              borderBottomWidth: !isSearchingReviews ? 2 : 1,
              borderBottomColor: !isSearchingReviews ? "#9ABC06" : "#ccc",
            },
          ]}
          onPress={() => setIsSearchingReviews(false)}
        >
          <Ionicons
            name={'checkmark-sharp'}
            size={20}
            color={isSearchingReviews ? '#EBEBEB' : '#727272'}
          />
          <Text style={styles.menuText}>Users</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      />
      <View style={styles.floatingButtonContainer}>
        <NewPostButton/>
      </View>
    </View>
  );*/
}

function ReviewList() {
  
  const data = [
    { id: '1', title: 'Review 1', description: 'This is review 1' },
    { id: '2', title: 'Review 2', description: 'This is review 2' },
    { id: '3', title: 'Review 3', description: 'This is review 3' },
    { id: '4', title: 'Review 4', description: 'This is review 4' },
    { id: '5', title: 'Review 5', description: 'This is review 5' },
    { id: '6', title: 'Review 6', description: 'This is review 6' },
    { id: '7', title: 'Review 7', description: 'This is review 7' },
    { id: '8', title: 'Review 8', description: 'This is review 8' },
    { id: '9', title: 'Review 9', description: 'This is review 9' },
    { id: '10', title: 'Review 10', description: 'This is review 10' },
  ];

  const renderItem = ({ item }) => <ReviewCard review={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      />
    </View>
  );
}

function UserList() {

  const data = [
    { id: '1', username: 'User 1', email: 'email 1', image: '../components/ReviewCard/guyfieri.png' },
    { id: '2', username: 'User 2', email: 'email 2', image: '../components/ReviewCard/guyfieri.png' },
    { id: '3', username: 'User 3', email: 'email 3', image: '../components/ReviewCard/guyfieri.png' },
    { id: '4', username: 'User 4', email: 'email 4', image: '../components/ReviewCard/guyfieri.png' },
    { id: '5', username: 'User 5', email: 'email 5', image: '../components/ReviewCard/guyfieri.png' },
    { id: '6', username: 'User 6', email: 'email 6', image: '../components/ReviewCard/guyfieri.png' },
    { id: '7', username: 'User 7', email: 'email 7', image: '../components/ReviewCard/guyfieri.png' },
    { id: '8', username: 'User 8', email: 'email 8', image: '../components/ReviewCard/guyfieri.png' },
    { id: '9', username: 'User 9', email: 'email 9', image: '../components/ReviewCard/guyfieri.png' },
    { id: '10', username: 'User 10', email: 'email 10', image: '../components/ReviewCard/guyfieri.png' },
  ];
  
  const renderItem = ({ item }) => <UserCard user={item} />;
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#EBEBEB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    width: '50%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  menuText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#727272'
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    center: 0,
  },
});
