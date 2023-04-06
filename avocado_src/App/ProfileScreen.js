import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const username = 'Username';
  const displayName = 'Display Name';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.displayName}>{displayName}</Text>
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
      <View style={styles.circle}></View>
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
    width: '80%',
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
});