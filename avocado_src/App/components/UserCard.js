import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import { collection, getDocs, addDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';


export default function UserCard(props) {
  const navigation = useNavigation();
  const profileCollection = collection(db, 'profile');
  const [profileImage, setProfileImage] = useState("");

  const handleProfile = () => {
    navigation.navigate('OtherUserProfile', {
      username: props.username,
      name: props.name,
      image: props.image,
      email: props.email,
      photo : props.photo,
    });
    
  };

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const profileData = await getDocs(profileCollection);

        const filteredProfileData = profileData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })).filter((item) => item !== null && item.id === props.email);

        filteredProfileData.forEach((profile) => {

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

      } catch (error) {
        console.error(error);
      }
    };
    getProfileImage();

  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleProfile}>
      <View style={styles.imageContainer}>
        {profileImage ? (
            <Image source={{ uri: profileImage }} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} />  
        ) : (
            <View style={{ backgroundColor: '#ccc', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="person-circle" size={45} color="#fff" />
            </View>
        )}
      </View>
      <View style={{paddingLeft: 10, }}>
        <Text style={{color: 'black', fontWeight: "bold", fontSize: 18}}>{props.name}</Text>
        <Text style={{color: "#727272", fontSize: 13}}>@{props.username}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 15,
    color: '#808080',
  }
});

