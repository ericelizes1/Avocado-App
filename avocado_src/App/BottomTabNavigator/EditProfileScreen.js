import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function EditProfileScreen() {



    return (
        <View style={styles.container} behavior="padding">   
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
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


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
