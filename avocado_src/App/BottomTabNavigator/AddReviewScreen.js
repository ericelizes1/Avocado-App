import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';

export default function AddReviewScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(1);
  const [dish, setDish] = useState('');
  const [restaurant, setRestaurant] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onDishSelected = (selectedDish) => {
    setDish(selectedDish);
  };

  const onRestaurantSelected = (selectedRestaurant) => {
    setRestaurant(selectedRestaurant);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="close" size={36} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Create review</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <ScrollView height='100%' width='100%' padding={15}>
        <Autocomplete
          style={styles.input}
          data={['Pizza', 'Burger', 'Pasta', 'Salad']}
          value={dish}
          placeholder="Dish"
          onChangeText={setDish}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onDishSelected(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Autocomplete
          style={styles.input}
          data={['McDonalds', 'KFC', 'Burger King', 'Pizza Hut']}
          value={restaurant}
          placeholder="Restaurant"
          onChangeText={setRestaurant}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onRestaurantSelected(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Review"
          multiline={true}
          numberOfLines={4}
        />
        <Text>
          
        </Text>
        <View style={styles.ratingContainer}>
          <TouchableOpacity onPress={() => rating == 1 ? setRating(0) : setRating(1)}>
            <Ionicons
              name="md-star"
              size={22}
              color={rating < 1 ? "#ccc" : "#EDB900"}
              paddingLeft={2}
            />          
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rating == 2 ? setRating(1) : setRating(2)}>
            <Ionicons
              name="md-star"
              size={22}
              color={rating < 2 ? "#ccc" : "#EDB900"}
              paddingLeft={2}
            />          
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rating == 3 ? setRating(2) : setRating(3)}>
            <Ionicons
              name="md-star"
              size={22}
              color={rating < 3 ? "#ccc" : "#EDB900"}
              paddingLeft={2}
            />          
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rating == 4 ? setRating(3) : setRating(4)}>
            <Ionicons
              name="md-star"
              size={22}
              color={rating < 4 ? "#ccc" : "#EDB900"}
              paddingLeft={2}
            />          
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rating == 5 ? setRating(4) : setRating(5)}>
            <Ionicons
              name="md-star"
              size={22}
              color={rating < 5 ? "#ccc" : "#EDB900"}
              paddingLeft={2}
            />          
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Create Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderWidth: 1,
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    height: 80,
  },
  addButton: {
    backgroundColor: "#9ABC06",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
