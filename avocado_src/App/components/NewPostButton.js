import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NewPostButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('AddReview', {
      animation: 'slide_from_bottom',
    });
  };

  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
      <Ionicons name="add" size={32} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#9ABC06",
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
});
