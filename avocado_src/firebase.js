// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'
import 'firebase/compat/storage'

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
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export { getDocs, ref, addDoc, setDoc, collection, getStorage, app, doc, getDoc, updateDoc, uploadString, getDownloadURL };
/*
//collection references
const usersCollection = db.collection('users');

//get collection data
const getUserInfo = document.querySelector('.getInfo') 
  getUserInfo.getDocs(usersCollection).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    }).catch((error) => {
        console.log("Error getting users: ", error);
    });
})

//adding stuff to the database
const addUsers = async (name, email, password) => {
    await usersCollection.add({
        name,
        email,
        password
    });
}

//delete stuff from the database
const deleteUsers = async (id) => {
    await usersCollection.doc(id).delete();
}
*/
