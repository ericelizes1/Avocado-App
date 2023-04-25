import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchBar } from 'react-native-elements';

import UserCard from '../components/UserCard';

export default function DiscoverScreen() {
  const Tab = createMaterialTopTabNavigator();
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <>
      <DiscoverHeader setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#9ABC06',
          inactiveTintColor: '#727272',
          indicatorStyle: {
            backgroundColor: '#9ABC06',
          },
          labelStyle: {
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: 'white',
          },
        }}
      >
        <Tab.Screen name="Reviews">
          {() => <ReviewList searchTerm={searchTerm} />}
        </Tab.Screen>

        <Tab.Screen name="Users">
          {() => <UserList searchTerm={searchTerm} />}
        </Tab.Screen>

      </Tab.Navigator>
      <View style={styles.floatingButtonContainer}>
        <NewPostButton/>
      </View>
    </>
  );
}

function DiscoverHeader(props) {
  const setSearchTerm = (term) => {
    props.setSearchTerm(term);
  };
  
  return (
    <View style={styles.header}>
        <SearchBar
          placeholder='Search "avocado"'
          onChangeText={setSearchTerm}
          value={props.searchTerm}
          onCancel={() => setSearchTerm('')}
          onClear={() => setSearchTerm('')}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.text}
        />
    </View>
  );
}

function ReviewList(props) {
  console.log(props.searchTerm);

  const data = [
    { id: '1', name: 'John', user: 'johndoe', text: 'This is review 1', rating: 3, date: 'April 22, 2023', dish: 'Pizza', restaurant: 'Pizza Hut' },
    { id: '2', name: 'Jane', user: 'janedoe', text: 'This is review 2', rating: 4, date: 'April 21, 2023', dish: 'Burger', restaurant: 'McDonalds' },
    { id: '3', name: 'Bob', user: 'bobby', text: 'This is review 3', rating: 5, date: 'April 20, 2023', dish: 'Sushi', restaurant: 'Nobu' },
    { id: '4', name: 'Alice', user: 'alice', text: 'This is review 4', rating: 2, date: 'April 19, 2023', dish: 'Steak', restaurant: 'Ruths Chris' },
    { id: '5', name: 'Mark', user: 'mark', text: 'This is review 5', rating: 4, date: 'April 18, 2023', dish: 'Tacos', restaurant: 'Taco Bell' },
    { id: '6', name: 'Sarah', user: 'sarah', text: 'This is review 6', rating: 3, date: 'April 17, 2023', dish: 'Pasta', restaurant: 'Olive Garden' },
    { id: '7', name: 'Mike', user: 'mike', text: 'This is review 7', rating: 5, date: 'April 16, 2023', dish: 'Fish and Chips', restaurant: 'The Codfather' },
    { id: '8', name: 'Emily', user: 'emily', text: 'This is review 8', rating: 4, date: 'April 15, 2023', dish: 'Burrito', restaurant: 'Chipotle' },
    { id: '9', name: 'David', user: 'david', text: 'This is review 9', rating: 3, date: 'April 14, 2023', dish: 'Sushi', restaurant: 'Sushi Go' },
    { id: '10', name: 'Rachel', user: 'rachel', text: 'This is review 10', rating: 4, date: 'April 13, 2023', dish: 'Pasta', restaurant: 'Maggianos' },
  ];

  const filteredData = data.filter((item) => {
    if (props.searchTerm === '') {
      return true;
    }

    const searchTerm = props.searchTerm.toLowerCase();

    return (
      item.dish.toLowerCase().includes(searchTerm) ||
      item.restaurant.toLowerCase().includes(searchTerm) ||
      item.text.toLowerCase().includes(searchTerm) ||
      item.user.toLowerCase().includes(searchTerm)
    );
  });

  const renderItem = ({ item }) => (
    <ReviewCard
      name={item.name}
      user={item.user}
      text={item.text}
      rating={item.rating}
      date={item.date}
      dish={item.dish}
      restaurant={item.restaurant}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      />
    </View>
  );
}

function UserList(props) {
  console.log(props.searchTerm);

  const data = [
    { id: '1', username: 'johndoe', name: 'john', image: require('../components/ReviewCard/guyfieri.png') }, 
    { id: '2', username: 'janedoe', name: 'jane', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '3', username: 'bobby', name: 'gamer76', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '4', username: 'alice', name: 'aliceistheBEST', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '5', username: 'mark', name: 'markymark', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '6', username: 'sarah', name: 'daQUEEN', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '7', username: 'mike', name: 'mike', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '8', username: 'emily', name: 'emily', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '9', username: 'david', name: 'david', image: require('../components/ReviewCard/guyfieri.png') },
    { id: '10', username: 'rachel', name: 'rachel', image: require('../components/ReviewCard/guyfieri.png') },
  ];

  const filteredData = data.filter((item) => {
    if (props.searchTerm === '') {
      return true;
    }

    const searchTerm = props.searchTerm.toLowerCase();

    return (
      item.username.toLowerCase().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm) 
    );
  });

  const renderItem = ({ item }) => (
    <UserCard
      username={item.username}
      name={item.name}
      image={item.image}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
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
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    padding: 10,
    paddingTop: 30,
    alignItems: 'center'
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    height: 40,
    top: 7,
    borderRadius: 15,
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
