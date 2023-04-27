import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function UserCard(props) {
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate('OtherUserProfile', {
      username: props.username,
      name: props.name,
      image: props.image,
      email: props.email,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleProfile}>
      <View style={styles.imageContainer}>
        <Image source={props.image} style={styles.image}/>
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

