import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../firebase';
import { storage } from '../../firebase';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [bio, setBio] = useState('');
  const username="gamelyte";
  const email = 'ere29@case.edu';


  const [selectedImage, setSelectedImage] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSaveProfile = () => {

    alert("Profile saved!");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri, "test-image")
      .then(() => {
        Alert.alert("Success!");
      })
      .catch((error) => { //alerts can be deleted, for testing purposes
        Alert.alert(error);
      });
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="close" size={36} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        style={{ width: '100%'}}
        ListHeaderComponent={
          <>
            {/*Image*/}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={{padding: 10, }} onPress={pickImage}>    
                {selectedImage ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />  
                  </View>
                ) : (
                  <View style={{ backgroundColor: '#ccc', width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="person-circle" size={50} color="#fff" />
                  </View>
                )}      
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>

              <Text style={{fontSize: 18, fontWeight: 'bold'}}>@{username}</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{email}</Text>
            </View>
            {/*Bio*/}
            <View style={{borderTopWidth: 1, marginTop: 10, borderColor: '#ccc', borderBottomWidth: 1, marginBottom: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>Bio</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder= {bio == '' ? "Type your bio here" : bio}
                onChangeText={text => setBio(text)}
                value={bio}
                multiline={true}
                numberOfLines={6}
              />
            </View>
          </>
        }
        data={[]}
        renderItem={({ item }) => null}
        ListFooterComponent={
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={styles.saveButton} onPress={uploadImage}>
              <Text style={styles.buttonText}>Save profile</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
120
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  bioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    padding: 10,
  },
  descriptionInput: {
      height: 100,
  },
  bioInput: {
      height: 100,
      textAlignVertical: 'top',
  },
  imageContainer: {
      backgroundColor: 'red',
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
  },
  saveButton: {
    backgroundColor: "#9ABC06",
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
