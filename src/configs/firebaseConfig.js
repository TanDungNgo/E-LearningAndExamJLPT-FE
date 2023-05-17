import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebase = initializeApp({
  apiKey: "AIzaSyCm_XvkP2q-5clHfZBHQP8UhS8ux-Ig9lE",
  authDomain: "e-learning-dpt.firebaseapp.com",
  projectId: "e-learning-dpt",
  storageBucket: "e-learning-dpt.appspot.com",
  messagingSenderId: "896351039188",
  appId: "1:896351039188:web:0cd503ee8ca4420f205541",
  measurementId: "G-DDD1TYE5EM",
});

// Firebase storage reference
const storageFirebase = getStorage(firebase);
export default storageFirebase;
