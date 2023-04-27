import React, { useState, useEffect,  } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import NewPostButton from '../components/NewPostButton';
import ReviewCard from '../components/ReviewCard';
import { getDocs, collection } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';


export default function ProfileScreen() {
  const profileCollection = collection(db, 'profile');
  const reviewsCollection = collection(db, 'reviews');
  const dishCollection = collection(db, 'dish');
  const restaurantCollection = collection(db, 'restaurant');
  const [refreshing, setRefreshing] = useState(false);
  const [profileList , setProfileList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [bioText, setBioText] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dishList, setDishList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);
  const profileImagePath = require('../components/ReviewCard/guyfieri.png');
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfileData().then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProfileData();
      getFollowsData();
    }, [])
  );
  
  const getFollowsData = async () => {
    try {
      const followsCollection = collection(db, 'followers');
      const followsData = await getDocs(followsCollection);

      const filteredFollowersData = followsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })).filter((item) => item !== null && item.follows === auth.currentUser.email);
      setNumFollowers(filteredFollowersData.length);

      const filteredFollowingData = followsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })).filter((item) => item !== null && item.follower === auth.currentUser.email);
      setNumFollowing(filteredFollowingData.length);

    } catch (error) {
      console.log(error);
    }
  }

  const getProfileData = async () => {
    try {
      const dishData = await getDocs(dishCollection);
      const restaurantData = await getDocs(restaurantCollection);
      const profileData = await getDocs(profileCollection);
      const reviewData = await getDocs(reviewsCollection);

      const filteredProfileData = profileData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })).filter((item) => item !== null && item.id === auth.currentUser.email);     
      
      const filteredReviewData = reviewData.docs
        .map((doc) =>({
          ...doc.data(),
          id: doc.id,})
        )
        .filter((item) => item !== null && item.user === auth.currentUser.email);
      
      // Map dishes to reviews based on dish id
      filteredReviewData.forEach((review) => {
        const dish = dishData.docs.find((dish) => dish.id === review.dish);
        const restaurant = restaurantData.docs.find(
          (restaurant) => restaurant.id === dish.data().restaurant
        );
        review.dishName = dish ? dish.data().name : "Unknown Dish";
        review.restaurantName = restaurant
          ? restaurant.data().name
          : "Unknown Restaurant";
      });


      //map name to reviews based on user id in the profile collection
      filteredReviewData.forEach((review) => {
        const profile = profileData.docs.find((profile) => profile.id === review.user);
        review.userName = profile ? profile.data().name : "Unknown User";
      });

      setBioText(filteredProfileData[0].bio);
      setProfileList(filteredProfileData);
      setReviewList(filteredReviewData);
    } catch (error) {
      console.error(error);
    }
  };

  
  const data = reviewList;

  const renderItem = ({ item }) => {
    console.log(item.restaurantName)
    return (
      <ReviewCard
        id={item.id}
        rating={item.rating}
        text={item.text}
        user={item.user}
        photo={item.photo || null}
        name={item.userName}
        date={item.date}
        dish={item.dishName}
        restaurant={item.restaurantName}
      />
    );
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.basicInfoContainer}>
              <Image source={profileImagePath} style={styles.profileImage} />
              <View style={{flexDirection: 'column'}}>
                <View style={styles.basicInfoTextContainer}>
                  <View style={styles.statisticContainer}>
                    <Text style={styles.statisticValueText}>{numFollowing}</Text>
                    <Text style={styles.statisticLabel}>Following</Text>
                  </View>
                  <View style={styles.statisticContainer}>
                    <Text style={styles.statisticValueText}>{numFollowers}</Text>
                    <Text style={styles.statisticLabel}>Followers</Text>
                  </View>
                </View>
                <TouchableOpacity style={{backgroundColor: '#c2c2c2', padding: 5, borderRadius: 5, alignItems: 'center'}} onPress={handleEditProfile}> 
                  <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.bioText}>{bioText}</Text>
            <View style={{width: '100%', alignItems: 'center', borderTopWidth: 1, borderColor: '#ccc', borderBottomWidth: 1, padding: 10, marginTop: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold',}}>Your Reviews</Text>
            </View>
          </>
        }
        style={{width: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="auto" />
      <View style={styles.floatingButtonContainer}>
        <NewPostButton/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  basicInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  basicInfoTextContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'center',
    padding: 10,
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statisticContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  statisticValueText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  statisticLabel: {
    fontSize: 15,
  },
  bioText: {
    width: '100%',
    padding: 10,
    bottomBorderWidth: 1,
    borderColor: 'black',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#154c05',
    width: '60%',
    top: 260,
    padding: 15,
    borderRadius: 10,
    margintop: 40,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight:'700',
    fontSize: 16,
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    center: 0,
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 75,
  },
});