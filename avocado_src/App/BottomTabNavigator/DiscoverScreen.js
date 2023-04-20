import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ReviewCard from '../components/ReviewCard';
import NewPostButton from '../components/NewPostButton';

export default function DiscoverScreen() {

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

  const renderItem = ({ item }) => <ReviewCard review={item} />;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      />
      <View style={styles.floatingButtonContainer}>
        <NewPostButton/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#EBEBEB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#727272'
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    center: 0,
  },
});
