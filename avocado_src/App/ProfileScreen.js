import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const username = 'Username';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioHeader}>Bio</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Enter your bio here"
          multiline={true}
          numberOfLines={4}
        />
      </View>
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
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bioContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioInput: {
    height: 150,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
});