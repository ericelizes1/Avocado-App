import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';
import { db } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';

export default function HomeScreen() {
  const [reviewList, setReviewList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const profileCollection = collection(db, 'profile');
  const reviewsCollection = collection(db, 'reviews');

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await getDocs(reviewsCollection);
        const profileData = await getDocs(profileCollection);
        const filteredData = reviewData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const filteredProfileData = profileData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProfileList(filteredProfileData);
        const updatedReviewList = filteredData.map((review) => {
          const userProfile = filteredProfileData.find(
            (profile) => profile.id === review.user
          );
          const userName = userProfile ? userProfile.name : 'Unknown User';
          return {
            ...review,
            userProfile,
            userName,
          };
        });
        console.log(updatedReviewList)
        setReviewList(updatedReviewList);
      } catch (error) {
        console.error(error);
      }
    };

    getReviews();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ReviewCard
        rating={item.rating}
        text={item.text}
        user={item.user}
        photo={item.photo || null}
        name ={item.userName}
        date = {item.date}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      />
      <View style={styles.floatingButtonContainer}>
        <NewPostButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    center: 0,
  },
});


