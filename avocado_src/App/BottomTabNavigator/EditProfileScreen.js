import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { firebase, auth, storage, db, doc, uploadString, ref, collection, getDoc, addDoc, updateDoc, getDownloadURL } from '../../firebase';
import { v4 } from "uuid";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState("");
  const [fname, setfName] = useState("");
  const profileCollection = collection(db, 'profile');
  const email = auth.currentUser.email;

  const [selectedImage, setSelectedImage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  var url;

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getProfileName = async () => {
      //set username to the username of the current user from the profile collection based on the user's email as the id
      const docRef = doc(profileCollection, auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      setUsername(docSnap.data().username);
      setfName(docSnap.data().name);
      setBio(docSnap.data().bio);
            // This can be downloaded directly:
        let xhr = new XMLHttpRequest();

        xhr.responseType = 'text';
        xhr.open('GET', docSnap.data().profilePic);
        xhr.send();

        xhr.onload = function(event) {
          if (xhr.status != 200) {
            // analyze HTTP status of the response
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
          } else { // show the result
            console.log(`Received ${event.loaded} bytes`);
            setSelectedImage(xhr.response);
          }
        };

        xhr.onerror = function() {
          console.log("Request failed");
        };           
    }
    getProfileName();

    if (auth.currentUser?.photoURL) {
      setPhotoURL(auth.currentUser.photoURL);
    }
    console.log(selectedImage);
    console.log(fname);
    
  }, [auth.currentUser]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("result is " + result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const updateProfile = async () => {
    if (!username || !fname) {
      alert("Username/Name cannot be empty");
      return;
    }
    const imageUrl = await uploadImage();

    try {
      const docref = doc(db, "profile", email);
      const data = { bio: bio, name: fname, username: username, profilePic: imageUrl};
      
      await updateDoc(docref, data);
      
  }
  catch (error) {
      alert(error.message + " " + fname + " " + username + " " + bio + " ");

  }
      navigation.goBack();


    if (selectedImage == null) return;
    const uri = selectedImage;
    let filename = uri.substring(uri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = `${v4()}.${extension}`;
    filename = name + Date.now(); + '.' + extension;

    const storageRef = ref(storage, 'profile/' + filename);
    const task = storageRef.putFile(uri);

    try {
      await task;
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const uploadImage = async () => {
    console.log(selectedImage);
    const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
    const storageRef = ref(storage, email + '/' + filename);

    await uploadString(storageRef, selectedImage).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    //set transferred state

    const url = await getDownloadURL(storageRef, selectedImage);
    return url;
};


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
              <TouchableOpacity style={{padding: 15, }} onPress={pickImage}>
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
            {/*Bio & other details*/}
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.inputTitle}>Username</Text>
                    <TextInput
                        onChangeText={(username) => setUsername(username.trim())}
                        value={username}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 18 }}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        onChangeText={(fname) => setfName(fname)}
                        value={fname}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 18 }}>
                  <Text style={styles.inputTitle}>Bio</Text>
                  <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder= {bio == '' ? "Type your bio here" : bio}
                    onChangeText={text => setBio(text)}
                    value={bio}
                    multiline={true}
                    numberOfLines={6}
                  />
                </View>
            </View>
            <View style={{borderTopWidth: 1, marginTop: 10, borderColor: '#ccc', borderBottomWidth: 1, marginBottom: 10}}>

            </View>
          </>
        }
        data={[]}
        renderItem={({ item }) => null}
        ListFooterComponent={
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
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
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
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
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
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
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5.
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

  inputContainer: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },  
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
