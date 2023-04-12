import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import { db } from '../firebase';

import { profileBackend } from './ProfileScreen/ProfileBackend';

export default function ProfileScreen() {
  const username = 'Username';
  const displayName = 'Personal Information';
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message)); 
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text>Name: incomplete </Text>
        <Text>Email: {auth.currentUser?.email}</Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioHeader}>Bio</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="tell us about yourself"
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity style={styles.button}
        onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bioContainer: {
    position: 'absolute',
    top: 150,
    left: 0,
    padding: 10,
    width: '100%',
  },
  bioHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioInput: {
    height: 150,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
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
});