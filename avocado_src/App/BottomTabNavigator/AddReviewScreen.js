import React, { useState } from 'react';
import { Image, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function AddReviewScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');


  const [searchRestaurantTerm, setSearchRestaurantTerm] = useState('');
  const [autocompleteRestaurantData, setAutocompleteRestaurantData] = useState([]);

  const [searchDishTerm, setSearchDishTerm] = useState('');
  const [autocompleteDishData, setAutocompleteDishData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);


  const restaurants = [
    { id: '1', title: 'Pizza Hut' },
    { id: '2', title: 'McDonalds' },
    { id: '3', title: 'KFC' },
    { id: '4', title: 'Burger King' },
  ];
  
  const dishes = [
    { id: '1', title: 'Pizza' },
    { id: '2', title: 'Pasta' },
    { id: '3', title: 'Salad' },
    { id: '4', title: 'Soup' },
  ];

  const handleInputChange = (text, type) => {
    if (type === 'restaurant') {
      setSearchRestaurantTerm(text);

      const filteredData = restaurants.filter((item) => {
        if (text === '') {
          return false;
        }

        return item.title.toLowerCase().includes(text.toLowerCase());
      });

      setAutocompleteRestaurantData(filteredData);
    } else {
      setSearchDishTerm(text);

      const filteredData = dishes.filter((item) => {
        if (text === '') {
          return false;
        }
        
        return item.title.toLowerCase().includes(text.toLowerCase());
      });

      setAutocompleteDishData(filteredData);
    }
  };

  const handleSelectItem = (item, type) => {
    if (type === 'restaurant') {
      setSearchRestaurantTerm(item.title);
      setAutocompleteRestaurantData([]);
    } else {
      setSearchDishTerm(item.title);
      setAutocompleteDishData([]);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
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
      <FlatList
        style={{ width: '100%' }}
        ListHeaderComponent={
          <>
            {/*Restaurant*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Restaurant</Text>
              <TextInput
                style={styles.input} 
                onChangeText={text => handleInputChange(text, 'restaurant')}
                value={searchRestaurantTerm}
                placeholder="Type an existing or new restaurant"
              />
              <FlatList
                style={styles.autocomplete}
                data={autocompleteRestaurantData}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItemContainer} onPress={() => handleSelectItem(item, 'restaurant')}>
                    <View style={styles.dropdownItem}>
                      <Text style={styles.dropdownText}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            {/*Dish*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Dish</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => handleInputChange(text, 'dish')}
                value={searchDishTerm}
                placeholder="Type an existing or new dish"
              />
              <FlatList
                style={styles.autocomplete}
                data={autocompleteDishData}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItemContainer} onPress={() => handleSelectItem(item, 'dish')}>
                    <View style={styles.dropdownItem}>
                      <Text style={styles.dropdownText}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            {/*Rating*/}
            <View style={styles.ratingContainer}>
              <Text style={styles.text}>Rating</Text>
              <View style={styles.ratingStarContainer}>
                <TouchableOpacity onPress={() => setRating(1)}>
                  <Ionicons
                    name="md-star"
                    size={30}
                    color={rating < 1 ? "#ccc" : "#EDB900"}
                    paddingLeft={2}
                  />          
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rating == 2 ? setRating(1) : setRating(2)}>
                  <Ionicons
                    name="md-star"
                    size={30}
                    color={rating < 2 ? "#ccc" : "#EDB900"}
                    paddingLeft={2}
                  />          
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rating == 3 ? setRating(2) : setRating(3)}>
                  <Ionicons
                    name="md-star"
                    size={30}
                    color={rating < 3 ? "#ccc" : "#EDB900"}
                    paddingLeft={2}
                  />          
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rating == 4 ? setRating(3) : setRating(4)}>
                  <Ionicons
                    name="md-star"
                    size={30}
                    color={rating < 4 ? "#ccc" : "#EDB900"}
                    paddingLeft={2}
                  />          
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rating == 5 ? setRating(4) : setRating(5)}>
                  <Ionicons
                    name="md-star"
                    size={30}
                    color={rating < 5 ? "#ccc" : "#EDB900"}
                    paddingLeft={2}
                  />          
                </TouchableOpacity>
              </View>
            </View>
            {/*Review*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Review</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Type your review here"
                onChangeText={text => setReview(text)}
                value={review}
                multiline={true}
                numberOfLines={6}
              />
            </View>
            {/*Image*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Image (optional)</Text>
              <TouchableOpacity style={{padding: 10}} onPress={pickImage}>    
                {selectedImage ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />  
                    <TouchableOpacity onPress={() => setSelectedImage('')}>
                      <Ionicons name="trash-bin" size={30} color="#727272" style={{ padding: 10}} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ backgroundColor: '#ccc', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="add" size={30} color="#fff" />
                  </View>
                )}      
              </TouchableOpacity>
            </View>
          </>
        }
        data={[]}
        renderItem={({ item }) => null}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Post review</Text>
          </TouchableOpacity>
        }
      />
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  autocomplete: {
    backgroundColor: '#fff',
    zIndex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  autocompleteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  descriptionInput: {
    height: 80,
  },
  addButton: {
    backgroundColor: "#9ABC06",
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
    padding: 10,
  },
  ratingStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  autocompleteContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: 50,
    zIndex: 1,
  },
  autocompleteInputContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 0,
    margin: 0,
  },
  dropdownItemContainer: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  dropdownItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 5, 
    marginBottom: 5, 
    backgroundColor: '#9ABC06', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 20 
  },
  dropdownText: {
    color: "#FFF", 
    fontSize: 15, 
    fontWeight: "bold"
  }

});

