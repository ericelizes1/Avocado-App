// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-FPYCth9-xKy0-H_YBgQGw6fIxwWnWg4",
  authDomain: "avocadoapp356.firebaseapp.com",
  projectId: "avocadoapp356",
  storageBucket: "avocadoapp356.appspot.com",
  messagingSenderId: "389700638508",
  appId: "1:389700638508:web:bf63ca13e6ab48ef74be89",
  measurementId: "G-CDRHVF4WWZ"
};

// Initialize Firebase
let app;
if (firebase.app.length===0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export {auth};