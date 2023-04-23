import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { auth, db } from '../../../firebase';

export default function HomeHeader() {
  const [username, setUsername] = useState("username");

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
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 25,
    paddingLeft: 10,
    fontWeight: 'bold',
  }
});
