import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchBar } from 'react-native-elements';
import { db } from '../../firebase';
import { getDocs, collection, Timestamp } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

import UserCard from '../components/UserCard';

export default function DiscoverScreen() {
  const Tab = createMaterialTopTabNavigator();
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <>
      <DiscoverHeader setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#9ABC06",
          tabBarInactiveTintColor: "#727272",
          tabBarLabelStyle: {
            fontWeight: "bold"
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#9ABC06"
          },
          tabBarStyle: {
            backgroundColor: "white"
          }
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
          onChangeText={(text) => setSearchTerm(text)}
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
  const [reviewList, setReviewList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [dishList, setDishList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const reviewsCollection = collection(db, 'reviews');
  const profileCollection = collection(db, 'profile');
  const dishCollection = collection(db, 'dish');
  const restaurantCollection = collection(db, 'restaurant');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getReviews().then(() => setRefreshing(false));
  }, []);

  
  useFocusEffect(
    React.useCallback(() => {
      getReviews();
    }, [])
  );

  const getReviews = async () => {
    try {
      const reviewData = await getDocs(reviewsCollection);
      const profileData = await getDocs(profileCollection);
      const dishData = await getDocs(dishCollection);
      const restaurantData = await getDocs(restaurantCollection);

      const filteredData = reviewData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredProfileData = profileData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredDishData = dishData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredRestaurantData = restaurantData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(filteredDishData);
      console.log(filteredData);

      setProfileList(filteredProfileData);
      setDishList(filteredDishData);
      setRestaurantList(filteredRestaurantData);

      const updatedReviewList = filteredData.map((review) => {
        const userProfile = filteredProfileData.find(
          (profile) => profile.id === review.user
        );
        const userName = userProfile ? userProfile.name : 'Unknown User';
        const email = userProfile ? userProfile.id : 'Unknown Email';

        const dish = filteredDishData.find(
          (dish) => dish.id === review.dish
        );
        const dishName = dish ? dish.name : 'Unknown Dish';

        console.log("dish data:" + filteredRestaurantData);
        const restaurant = filteredRestaurantData.find(
          (restaurant) => restaurant.id === dish.restaurant
        );
        const restaurantName = restaurant ? restaurant.name : 'Unknown Restaurant';

        return {
          ...review,
          userProfile,
          userName,
          email,
          dish,
          dishName,
          restaurantName,
        };
      });

      setReviewList(sortByDate(updatedReviewList));
      console.log("Review List: " + reviewList);
      console.log("Dish List: " + dishList);
      console.log("Restaurant List: " + restaurantList);
    } catch (error) {
      console.error(error);
    }
  };

  function sortByDate(updatedReviewList) {
    return updatedReviewList.sort(function(a, b) {
      var aSeconds = a.date.seconds;
      var bSeconds = b.date.seconds;
      var aNanoseconds = a.date.nanoseconds;
      var bNanoseconds = b.date.nanoseconds;
  
      if (aSeconds > bSeconds) {
        return -1;
      } else if (aSeconds < bSeconds) {
        return 1;
      } else {
        if (aNanoseconds > bNanoseconds) {
          return -1;
        } else if (aNanoseconds < bNanoseconds) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
  
  const filteredData = reviewList.filter((review) => {
    const searchTerm = props.searchTerm.toLowerCase();
    const userName = review.userName.toLowerCase();
    const dishName = review.dishName.toLowerCase();
    const restaurantName = review.restaurantName.toLowerCase();
    const text = review.text.toLowerCase();

    return (
      userName.includes(searchTerm) ||
      dishName.includes(searchTerm) ||
      restaurantName.includes(searchTerm) ||
      text.includes(searchTerm)
    );
  });

  const renderItem = ({ item }) => {
    const date = item.date;

    const timestamp = new Timestamp(
      date.seconds,
      date.nanoseconds
    ).toDate();

    return (
      <ReviewCard
        id={item.id}
        rating={item.rating}
        text={item.text}
        user={item.user}
        photo={item.photo || null}
        name={item.userName}
        date={timestamp}
        dish={item.dishName}
        restaurant={item.restaurantName}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

function UserList(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const usersCollection = collection(db, 'profile');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUsers().then(() => setRefreshing(false));
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      getUsers();
    }, [])
  );

  const getUsers = async () => {
    try {
      const usersData = await getDocs(usersCollection);

      const filteredData = usersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };


  const filteredData = data.filter((user) => {
    const searchTerm = props.searchTerm.toLowerCase();
    const username = user.username.toLowerCase();
    const name = user.name.toLowerCase();

    return (
      username.includes(searchTerm) ||
      name.includes(searchTerm)
    );
  });


  const renderItem = ({ item }) => (
    <UserCard
      username={item.username}
      name={item.name}
      image={item.image}
      email={item.id}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
