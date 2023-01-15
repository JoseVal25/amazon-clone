// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDn__eEHmS6WHri7awi392ushKi7mb1M1I",
  authDomain: "amzn-clone-5b461.firebaseapp.com",
  projectId: "amzn-clone-5b461",
  storageBucket: "amzn-clone-5b461.appspot.com",
  messagingSenderId: "240715647768",
  appId: "1:240715647768:web:237f87262c3b7eeb8eec6d",
  measurementId: "G-EBNDEX1MFL"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app

const db = app.fireStore()

export default db;