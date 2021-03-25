import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//Firebase config

var firebaseConfig = {
    apiKey: "AIzaSyBj1SyoNO6US-9dFozZ_Ajg_7Kh7vsd9Lw",
    authDomain: "libapp-2ee61.firebaseapp.com",
    databaseURL: "https://libapp-2ee61.firebaseio.com",
    projectId: "libapp-2ee61",
    storageBucket: "libapp-2ee61.appspot.com",
    messagingSenderId: "537566920730",
    appId: "1:537566920730:web:10e47905eacdce5f"
  };

//Initialise Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
