import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import * as addProfilePhoto from 'expo-image-picker';


const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
                if(user) {
                    navigation.replace("Main");
                }
            })
    
            return unsub;
        }, [])

    const handleSignUp = () => {
        if (!email || !password) {
            alert("Please enter your email and password");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        }) 
        .catch(error => alert(error.message)) 
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    }

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
                    <Ionicons name="person-circle" size={50} color="#fff" />
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

                <View style={{ marginTop: 24 }}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        onChangeText={(email) => setEmail(email.trim())}
                        value={email}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 24 }}>
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
