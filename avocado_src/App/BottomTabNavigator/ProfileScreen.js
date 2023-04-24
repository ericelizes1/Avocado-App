import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../firebase';
import { db } from '../../firebase';

import { profileBackend } from './ProfileScreen/ProfileBackend';
import NewPostButton from '../components/NewPostButton';
import ReviewCard from '../components/ReviewCard';

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [bioText, setBioText] = useState("This is the text in my bio on my profile. It is a lot of text and it word wraps.");
  const [numFollowing, setNumFollowing] = useState(2);
  const [numFollowers, setNumFollowers] = useState(5);
  const [profileImagePath, setProfileImagePath] = useState(require('../components/ReviewCard/guyfieri.png'));
  const navigation = useNavigation();


  const data = [
    { id: '1', title: 'Review 1', description: 'This is review 1' },
    { id: '2', title: 'Review 2', description: 'This is review 2' },
    { id: '3', title: 'Review 3', description: 'This is review 3' },
    { id: '4', title: 'Review 4', description: 'This is review 4' },
    { id: '5', title: 'Review 5', description: 'This is review 5' },
    { id: '6', title: 'Review 6', description: 'This is review 6' },
    { id: '7', title: 'Review 7', description: 'This is review 7' },
    { id: '8', title: 'Review 8', description: 'This is review 8' },
    { id: '9', title: 'Review 9', description: 'This is review 9' },
    { id: '10', title: 'Review 10', description: 'This is review 10' },
  ];

  const renderItem = ({ item }) => (
    <ReviewCard/>
  );

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message)); 
  }
  /*
  useEffect(() => {
    // Retrieve the user's bio from the Firebase database
    db.collection("profile").doc(auth.currentUser?.uid).get()
      .then(doc => {
        if (doc.exists) {
          setBioText(doc.data().bio || "");
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });  
  }, []);
  */
  
  //          <Text style={styles.displayName}>{displayName}</Text>
  //<Text>Name: incomplete </Text>
  //<Text>Email: {auth.currentUser?.email}</Text>
  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={{backgroundColor: '#c2c2c2', padding: 5, borderRadius: 5, alignItems: 'center'}}> 
            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.bioText}>{bioText}</Text>

      <Text style={{fontSize: 20, fontWeight: 'bold',}}>Your Reviews</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{width: '100%', borderTopWidth: 1, borderColor: '#c2c2c2'}}
      />
      <TouchableOpacity style={styles.button}
        onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
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