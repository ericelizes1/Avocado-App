import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';
import {db} from '../../firebase';
import {getDocs} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';



export default function HomeScreen() {
  const [reviewList, setReviewList] = useState([]);
  const reviewsCollection = collection(db, "reviews");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await getDocs(reviewsCollection);
        const filteredData = reviewData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReviewList(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, []);

  const renderItem = ({ item }) => (
    <ReviewCard
      rating={item.rating}
      text={item.text}
      user={item.user}
      photo={item.photo || null}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
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

