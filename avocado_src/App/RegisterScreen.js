import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db, collection, getDocs, ref, addDoc, setDoc, doc, storage, uploadBytes, getDownloadURL } from '../firebase'
import firestore from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as addProfilePhoto from 'expo-image-picker';


const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const usersCollection = collection(db, 'users');

    const navigation = useNavigation();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
                if(user) {
                    navigation.replace("Main");
                }
            })
    
            return unsub;
        }, [])

    const handleSignUp = async () => {
        if (!email || !password || !username || !name) {
            alert("Please fill in all the boxes");
            return;
        }
        const imageUrl = await uploadImage();

        if (imageUrl == null) {
            alert("Please upload an image");
            return;
        }

        const docref = doc(db, "profile", email);
        const data = { bio: "empty bio", username: username, name: name, profilePic: imageUrl};
        
        await setDoc(docref, data);

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        }).catch(error => alert(error.message + " " + username + " " + email + " "));
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri)
            .then(() => {
              console.log("Success!");
            })
            .catch((error) => { //alerts can be deleted, for testing purposes
              Alert.alert(error);
            });
          }
    }

    const uploadImage = async () => {
        if (selectedImage == null) return null;
            const uploadUri = selectedImage;
            let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

            const extension = filename.split('.').pop();
            const name = filename.split('.').slice(0, -1).join('.');
            filename = name + Date.now() + '.' + extension;

            setUploading(true);
            setTransferred(0);

            const storageRef = storage().ref("profile/" + email + "/" + filename);
            const task = storageRef.putFile(uploadUri);

            //set transferred state
            task.on('state_changed', (taskSnapshot) => {
                console.log(
                    `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                );

                setTransferred(
                    Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
                );
            });

            try {
                await task;
                const url = await storageRef.getDownloadURL();

                setUploading(false);
                setSelectedImage(null);
                Alert("Profile picture uploaded!");
                return url;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        };


    return (
        <View
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Text style={styles.greeting}>{`Welcome to Avocado App!\nSign up to get started.`}</Text>
                <TouchableOpacity style={{alignItems: 'center', paddingVertical: 30 }} onPress={pickImage}>    
                {selectedImage ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />  
                  </View>
                ) : (
                  <View style={{ backgroundColor: '#ccc', width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons
                        name="ios-add"
                        size={40}
                        color="#FFF"
                        style={{ marginLeft: 2 }}
                    ></Ionicons>
                  </View>
                )}      
              </TouchableOpacity>
            </View>

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
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput
                        onChangeText={(name) => setName(name)}
                        value={name}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 18 }}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        onChangeText={(email) => setEmail(email.trim())}
                        value={email}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 18 }}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput 
                        onChangeText={(password) => setPassword(password.trim())}
                        style={styles.input}
                        value={password}
                        secureTextEntry
                    ></TextInput>
                </View>
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity 
                onPress={handleSignUp}
                style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}
                onPress={() => navigation.navigate("Login")}>
                <Text style={{ color:"#414959", fontSize: 13 }}>
                    Already have an account? <Text style={{ fontWeight: "500", color: "#154c05" }}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        marginTop: 12,
        marginBottom: 2,
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        color: '#414959',
        fontWeight: 'bold'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#99201A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },

    avatar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50
    },

    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E1E2E6',
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5.
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#154c05',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#154c05',
        fontWeight: '700',
        fontSize: 16,

    },
})
