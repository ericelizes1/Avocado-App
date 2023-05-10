import { FlatList, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';
import { db } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { collection, Timestamp } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const [reviewList, setReviewList] = useState([]);
  const [profileList, setProfileList] = useState([]);  
  const [dishList, setDishList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const profileCollection = collection(db, 'profile');
  const reviewsCollection = collection(db, 'reviews');
  const dishCollection = collection(db, 'dish');
  const restaurantCollection = collection(db, 'restaurant');
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getReviews().then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getReviews();
    }, [])
  );

  useEffect(() => {
    navigation.addListener('focus', () => {
      getReviews();
    });
  }, []);

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

      setProfileList(filteredProfileData);
      setDishList(filteredDishData);
      setRestaurantList(filteredRestaurantData);

      const updatedReviewList = filteredData.map((review) => {
        const userProfile = filteredProfileData.find(
          (profile) => profile.id === review.user
        );
        const userName = userProfile ? userProfile.name : 'Unknown User';

        const dish = filteredDishData.find(
          (dish) => dish.id === review.dish
        );
        const dishName = dish ? dish.name : 'Unknown Dish';

        const restaurant = filteredRestaurantData.find(
          (restaurant) => restaurant.id === dish.restaurant
        );
        const restaurantName = restaurant ? restaurant.name : 'Unknown Restaurant';

        return {
          ...review,
          userProfile,
          userName,
          dish,
          dishName,
          restaurantName,
        };
      });
      
      setReviewList(sortByDate(updatedReviewList));
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
        data={reviewList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
      <View style={styles.floatingButtonContainer}>
        <NewPostButton refresh={onRefresh}/>
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


