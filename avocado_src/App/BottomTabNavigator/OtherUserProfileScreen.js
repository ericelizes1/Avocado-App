import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { auth, getDoc } from '../../firebase';
import { db } from '../../firebase';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import NewPostButton from '../components/NewPostButton';
import ReviewCard from '../components/ReviewCard';



export default function ProfileScreen({route}) {
  const username = route.params.username;
  const name = route.params.name;
  const email = route.params.email;
  const profilePict = route.params.profilePic;
  const [bioText, setBioText] = useState("");
  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);
  const reviewCollection = collection(db, 'reviews');
  const profileCollection = collection(db, 'profile');
  const dishCollection = collection(db, 'dish');
  const restaurantCollection = collection(db, 'restaurant');
  const followsCollection = collection(db, 'followers');
  const [dishList, setDishList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [profileList , setProfileList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const profileImagePath = require('../components/ReviewCard/guyfieri.png');
  const navigation = useNavigation();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    console.log(email);
    console.log(username);

    getProfileData();
    getFollowData();
  }, []);

  const getProfileData = async () => {
    const reviewData = await getDocs(reviewCollection);
    const profileData = await getDocs(profileCollection);
    const dishData = await getDocs(dishCollection);
    const restaurantData = await getDocs(restaurantCollection);
    const docRef = doc(profileCollection, email);
    const docSnap = await getDoc(docRef);

    // This can be downloaded directly:
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'text';
    xhr.open('GET', docSnap.data().profilePic);
    xhr.send();

    xhr.onload = function(event) {
      if (xhr.status != 200) {
        // analyze HTTP status of the response
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      } else { // show the result
        console.log(`Received ${event.loaded} bytes`);
        setProfileImage(xhr.response);
      }
    };

    xhr.onerror = function() {
      console.log("Request failed");
    };           

  const filteredProfileData = profileData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })).filter((item) => item !== null && item.id === email);
  const filteredReviewData = reviewData.docs
    .map((doc) =>({
      ...doc.data(),
      id: doc.id,})
    )
    .filter((item) => item !== null && item.user === email);

    filteredReviewData.forEach((review) => {
      const dish = dishData.docs.find((dish) => dish.id === review.dish);
      const restaurant = restaurantData.docs.find(
        (restaurant) => restaurant.id === dish.data().restaurant
      );
      review.dishName = dish.data().name;
      review.restaurantName = restaurant.data().name;
    });

    setBioText(filteredProfileData[0].bio);
    setProfileList(filteredProfileData);
    setReviewList(sortByDate(filteredReviewData));
    console.log(filteredProfileData);
    console.log(filteredReviewData);
  }

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
  
  const getFollowData = async () => {
    const followsData = await getDocs(followsCollection);
    const filteredFollowsData = followsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })).filter((item) => item !== null && item.follower === auth.currentUser?.email && item.follows === email);
    if (filteredFollowsData.length > 0) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }

    const filteredFollowersData = followsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })).filter((item) => item !== null && item.follows === email);
    setNumFollowers(filteredFollowersData.length);

    const filteredFollowingData = followsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })).filter((item) => item !== null && item.follower === email);
    setNumFollowing(filteredFollowingData.length);
  }

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


  const handleFollow = async () => {
    const followsData = await getDocs(followsCollection);
    const existingFollow = followsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })).find((item) => item !== null && item.follower === auth.currentUser?.email && item.follows === email);


    if (existingFollow) {
      setIsFollowed(false);
      setNumFollowers(numFollowers - 1);
      await deleteDoc(doc(followsCollection, existingFollow.id));
    } else {
      setIsFollowed(true);
      setNumFollowers(numFollowers + 1);

      // Add a new document in collection "followers"
      await addDoc(collection(db, "followers"), {
        follower: auth.currentUser?.email,
        follows: email,
      });
    }
  };



  const handleGoBack = () => {
    navigation.goBack();
  }
  
  const data = reviewList;

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message)); 
  }

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={36} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>@{username}</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.basicInfoContainer}>
              {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />  
              ) : (
                <View style={{ backgroundColor: '#ccc', width: 90, height: 90, borderRadius: 75, margin:20, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="person-circle" size={50} color="#fff" />
                </View>
              )}
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
                <TouchableOpacity
                  onPress={handleFollow}
                  style={[styles.button, isFollowed ? styles.followed : styles.notFollowed]}
                >
                  <Ionicons
                    name={isFollowed ? 'checkmark-sharp' : 'add-sharp'}
                    size={20}
                    color={isFollowed ? 'black' : 'white'}
                  />
                  <Text style={[styles.text, {color: isFollowed ? 'black' : 'white'}]}>{isFollowed ? 'Followed' : 'Follow'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.bioText}>{bioText}</Text>
            <View style={{width: '100%', alignItems: 'center', borderTopWidth: 1, borderColor: '#ccc', borderBottomWidth: 1, padding: 10, marginTop: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold',}}>Reviews</Text>
            </View>
          </>
        }
        style={{width: '100%'}}
      />
      <StatusBar style="auto" />
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
  header: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
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
  button: {
    backgroundColor: '#154c05',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight:'700',
    fontSize: 16,
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 75,
    margin:20
  },
  followed: {
    backgroundColor: '#ccc',
  },
  notFollowed: {
    backgroundColor: '#154c05',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 5,
  },
});