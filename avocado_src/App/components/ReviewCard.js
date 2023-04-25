import React, { useEffect, useState } from 'react';
import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

export default function ReviewCard({id, rating, text, user, photo, name, date, dish, restaurant}) {
  const likesCollection = collection(db, 'Likes');
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getLiked = async () => {
      try {
        const likesData = await getDocs(likesCollection);
        const filteredData = likesData.docs.map((doc) => doc.data());
        const existingLike = filteredData.find((like) => like.review === id && like.user === user);
        
        setIsLiked(!!existingLike); // set isLiked to true/false based on whether existingLike is truthy
        console.log('existingLike', existingLike);
      } catch (error) {
        console.error(error);
      }
    };
  
    getLiked();
  }, []);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  
    // Check if the user has already liked the review
    const likesData = await getDocs(likesCollection);
    const filteredData = likesData.docs.map((doc) => doc.data());
    const existingLike = filteredData.find((like) => like.review === id && like.user === user);
  
    if (existingLike) {
      // Unlike the review if already liked
      await db.doc(`Likes/${existingLike.id}`).delete();
    } else {
      // Like the review if not already liked
      await likesCollection.add({
        review: id,
        user,
      });
    }
  };
  

  const handleProfile = () => {
    console.log('test')
    navigation.navigate('OtherUserProfile', {
      animation: 'slide_from_bottom',
    });
  };

  // create an array of stars based on the number of stars you want to display
  const num = rating; // number of stars you want to display
  const stars = [];
  for (let i = 0; i < num; i++) {
    stars.push(<Ionicons key={i} name="md-star" size={22} color="#EDB900" paddingLeft={2} />);
  }

  // create an array of tags based on the number of tags you want to display
  const tagsData = [dish, restaurant];
  const tagColors = ["#9ABC06", "#154C05"];
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
        <TouchableOpacity style={styles.profileButtonContainer} onPress={handleProfile}>
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
      <View style={{flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    justifyContent: 'flex-end',   
                    paddingHorizontal: 10 }}
      >
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
