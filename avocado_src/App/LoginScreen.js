import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        }).catch(error => alert(error.message))
    } 

    return (
        <View
            style={styles.container}
            behavior="padding"
        >   
            <Image
            source={require("../assets/logo.png")}
            style={{width: 100, height: 100, marginBottom: 50}}
            resizeMode="contain"/>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={handleLogin}
                style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
inputContainer: {
    width: '80%'
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
buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#154c05',
    borderWidth: 2,
},
buttonText: {
    color: 'white',
    fontWeight:'700',
    fontSize: 16,
},
buttonOutlineText: {
    color: '#154c05',
    fontWeight: '700',
    fontSize: 16,

},
})
