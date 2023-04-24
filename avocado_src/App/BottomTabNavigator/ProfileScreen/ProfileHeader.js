import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomeHeader() {
  const [username, setUsername] = useState("username");
  const navigation = useNavigation();
  
  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message)); 
  }

  useEffect(() => {
    const user = auth.currentUser;
    
    if (user) {
            
      /*
      const unsubscribe = db.collection("profile").doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          } else {
            console.log("No such document!");
          }
        });
      return unsubscribe;*/
    }  
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
    borderColor: '#f2f2f2',
    borderWidth: 1,
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
