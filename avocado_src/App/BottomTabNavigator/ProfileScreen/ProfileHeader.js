import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc } from 'firebase/firestore';

export default function HomeHeader() {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const profileCollection = collection(db, 'profile');
  
  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message)); 
  }

  useEffect(() => {
    const getProfileName = async () => {
      //set username to the username of the current user from the profile collection based on the user's email as the id
      const docRef = doc(profileCollection, auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      setUsername(docSnap.data().username);
    }
    getProfileName();
      
  }, []);
  


  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Text style={styles.text}>@{username}</Text>
        <TouchableOpacity
          onPress={handleSignOut}

        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    paddingLeft: 10,
    fontWeight: 'bold',
  }
});
