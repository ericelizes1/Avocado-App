import React, { useEffect, useState } from 'react';
import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';


export default function ReviewCard({rating, text, user, photo, name, date}) {
  const [isLiked, setIsLiked] = useState(false); // state to track the like button status

  const handleLike = () => {
    setIsLiked(!isLiked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // create an array of stars based on the number of stars you want to display
  const num = rating; // number of stars you want to display
  const stars = [];
  for (let i = 0; i < num; i++) {
    stars.push(<Ionicons key={i} name="md-star" size={22} color="#EDB900" paddingLeft={2} />);
  }

  // create an array of tags based on the number of tags you want to display
  const tagsData = ["Chicken Parmigiana", "Maxi's Bistro", "Cleveland, OH"];
  const tagColors = ["#9ABC06", "#154C05", "#964904"];
  const tags = [];
  for (let i = 0; i < tagsData.length; i++) {
    tags.push(
      <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginRight: 5, marginBottom: 5, backgroundColor: tagColors[i], paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
        <Text style={{color: "#FFF", fontSize: 15, fontWeight: "bold"}}>{tagsData[i]}</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      {/*Profile Bar*/}
      <View style={styles.profileBarContainer}>
        <TouchableOpacity style={styles.profileButtonContainer}>
          <Image source={require('./ReviewCard/guyfieri.png')} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text style={{fontWeight: "bold", fontSize: 18}}>{name}</Text>
            <Text style={{color: "#727272", fontSize: 13}}>@{user}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.ratingsBarContainer}>
          <View style={{flexDirection: "row",}}>
            {stars}
          </View>
          <Text style={{color: "#727272", fontSize: 13}}>{date}</Text>
        </View>
      </View>

      {/*Tag Bar*/}
      <View style={styles.tagBarContainer}>
        {tags}
      </View>

      {/*Review Content*/}
      <View style={styles.reviewContainer}>
        <Text style={{fontSize: 15, color: "#454545"}}>{text}</Text>
      </View>

      {/*Image*/}
      <View style={styles.imageContainer}>
        <Image source={require('./ReviewCard/chickenparm.jpg')} style={styles.reviewImage} />  
      </View>

      {/*Interact Bar*/}
      <View style={[styles.profileBarContainer, { paddingHorizontal: 10 }]}>
        <TouchableOpacity style={styles.profileButtonContainer} hitSlop={10}>
          <MaterialCommunityIcons name="arrow-right-bottom" size={30} color="black" />
          <Text style={{fontWeight: "bold", fontSize: 15}}>See Comments</Text>
        </TouchableOpacity>
        <View style={styles.profileButtonContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>102k</Text>
          <TouchableOpacity onPress={handleLike} hitSlop={10}>
            {isLiked ? (
              <MaterialCommunityIcons name="heart" size={30} color="red" />
            ) : (
              <MaterialCommunityIcons name="heart-outline" size={30} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  profileBarContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',  
  },
  profileButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  profileTextContainer: {
    paddingLeft: 5
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  ratingsBarContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  tagBarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reviewContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reviewImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
});
