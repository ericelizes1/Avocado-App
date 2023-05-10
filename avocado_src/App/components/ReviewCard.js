import React, { useEffect, useState } from 'react';
import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, getDocs, addDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function ReviewCard({id, rating, text, user, image, name, date, dish, restaurant}) {
  const profileCollection = collection(db, 'profile');
  const dishCollection = collection(db, 'dish');
  const likesCollection = collection(db, 'Likes');
  const reviewsCollection = collection(db, 'reviews');
  const restaurantCollection = collection(db, 'restaurant');
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [profileList, setProfileList] = useState([]);
  const [username, setUsername] = useState('');
  const email = user;
  const [profileImage, setProfileImage] = useState("");
  const [reviewPic, setReviewPic] = useState("");


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const docRef = doc(profileCollection, auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        const dishData = await getDocs(dishCollection);
        const profileData = await getDocs(profileCollection);
        const reviewData = await getDocs(reviewsCollection);  
        const restaurantData = await getDocs(restaurantCollection);


        const filteredProfileData = profileData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })).filter((item) => item !== null && item.id === user);
        setProfileList(filteredProfileData);

        filteredProfileData.forEach((profile) => {
          setUsername(profile.username);

          //fetches the profile picture from the database
          let xhr = new XMLHttpRequest();
          xhr.responseType = 'text';
          xhr.open('GET', profile.profilePic);
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

        });

        const filteredReviewData = reviewData.docs.map((doc) =>({
          ...doc.data(),
          id: doc.id,})
        ).filter((item) => item !== null && item.id === id);

        filteredReviewData.forEach((review) => {

          let xhr = new XMLHttpRequest();
          xhr.responseType = 'text';
          xhr.open('GET', review.image);
          xhr.send();
          xhr.onload = function(event) {
            if (xhr.status != 200) {
              // analyze HTTP status of the response
              console.log(`Error ${xhr.status}: ${xhr.statusText}`);
            } else { // show the result
              console.log(`Received ${event.loaded} bytes`);
              setReviewPic(xhr.response);
            }
          };

          xhr.onerror = function() {
            console.log("Request failed");
          };

          /*
          const dish = dishData.docs.find((dish) => dish.id === review.dish);
          const restaurant = restaurantData.docs.find(
            (restaurant) => restaurant.id === dish.data().restaurant
          );
          review.dishName = dish ? dish.data().name : "Unknown Dish";
          review.restaurantName = restaurant
            ? restaurant.data().name
            : "Unknown Restaurant";
            */
        });
      } catch (error) {
        console.error(error);
      }
    };
    getProfileData();

  }, []);

  const navigation = useNavigation();


  useFocusEffect(
    React.useCallback(() => {
      getLiked();
    }, [])
  );  

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const then = timestamp;
  
    const seconds = Math.floor((now - then) / 1000);
    if (seconds < 60) {
      return seconds + 's ago';
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + 'min ago';
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours + 'h ago';
    }
  
    const days = Math.floor(hours / 24);
    if (days < 31) {
      return days + 'd ago';
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
      return months + 'mon ago';
    }
  
    const years = Math.floor(months / 12);
    return years + 'y ago';
  }
  
  
  const getLiked = async () => {
    try {
      const currUser = auth.currentUser.email;
      const likesData = await getDocs(likesCollection);
      const filteredData = likesData.docs.map((doc) => doc.data());
      const existingLike = filteredData.find((like) => like.review === id && like.user === currUser);

      // Check if the user has already liked the review
      setIsLiked(existingLike !== undefined ? true : false);

      // Update the number of likes
      setNumLikes(filteredData.filter((like) => like.review === id).length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  
    const currUser = auth.currentUser.email;
    const likesData = await getDocs(likesCollection);
    const filteredData = likesData.docs.map((doc) => ({...doc.data(), id: doc.id}));
    const existingLike = filteredData.find((like) => like.review === id && like.user === currUser);

    // Check if the user has already liked the review
    if (existingLike) {
      console.log(existingLike.id);

      // Unlike the review if already liked
      setNumLikes(numLikes - 1);
      await deleteDoc(doc(likesCollection, existingLike.id));
    } else {
      // Like the review if not already liked
      setNumLikes(numLikes + 1);
      await addDoc(likesCollection, {
        review: id,
        user: currUser,
      });
    }
  };
  

  const handleProfile = () => {
    navigation.navigate('OtherUserProfile', {
      username: username,
      email: user,
      name: name,
      profilePhoto: profileImage,

    });
  };

  // create an array of stars based on the number of stars you want to display
  const num = rating; // number of stars you want to display
  const stars = [];
  for (let i = 0; i < num; i++) {
    stars.push(<Ionicons key={i} name="md-star" size={22} color="#EDB900" paddingLeft={2} />);
  }

  // create an array of tags based on the number of tags you want to display
  const tagsData = [dish, restaurant];
  const tagColors = ["#9ABC06", "#154C05"];
  const tags = [];
  for (let i = 0; i < tagsData.length; i++) {
    tags.push(
      <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginRight: 5, marginBottom: 5, backgroundColor: tagColors[i], paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
        <Text style={{color: "#FFF", fontSize: 15, fontWeight: "bold"}}>{tagsData[i]}</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      {/*Profile Bar*/}
      <View style={styles.profileBarContainer}>
        <TouchableOpacity style={styles.profileButtonContainer} onPress={handleProfile}>
          {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />  
          ) : (
            <View style={{ backgroundColor: '#ccc', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="person-circle" size={45} color="#fff" />
            </View>
          )}
          <View style={styles.profileTextContainer}>
            <Text style={{fontWeight: "bold", fontSize: 18}}>{name}</Text>
            <Text style={{color: "#727272", fontSize: 13}}>@{username}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.ratingsBarContainer}>
          <View style={{flexDirection: "row",}}>
            {stars}
          </View>
          <Text style={{color: "#727272", fontSize: 13}}>{getTimeAgo(date)}</Text>
        </View>
      </View>

      {/*Tag Bar*/}
      <View style={styles.tagBarContainer}>
        {tags}
      </View>

      {/*Review Content*/}
      <View style={styles.reviewContainer}>
        <Text style={{fontSize: 15, color: "#454545"}}>{text}</Text>
      </View>

      {/*Image*/}
      <View style={styles.imageContainer}>
        {reviewPic ? (
            <Image source={{ uri: reviewPic }} style={styles.reviewImage} />  
        ) : (
            <View style={{ backgroundColor: '#ccc', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="download" size={24} color='#808080'/>
            </View>
        )}
      </View>

      {/*Interact Bar*/}
      <View style={{flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    justifyContent: 'flex-end',   
                    paddingHorizontal: 10 }}
      >
        <View style={styles.profileButtonContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, paddingRight: 5 }}>{numLikes}</Text>
          <TouchableOpacity onPress={handleLike} hitSlop={10}>
            {isLiked ? (
              <MaterialCommunityIcons name="heart" size={30} color="red" />
            ) : (
              <MaterialCommunityIcons name="heart-outline" size={30} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  profileBarContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',  
  },
  profileButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  profileTextContainer: {
    paddingLeft: 5
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  ratingsBarContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  tagBarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reviewContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reviewImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    
  },
});
