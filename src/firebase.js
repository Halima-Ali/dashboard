import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// import { initializeApp } from "firebase/app";
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDTLGTElwVxxsvYJ1Ru5tjFUFEGuMiikfw",
  authDomain: "dashboard-23a7b.firebaseapp.com",
  projectId: "dashboard-23a7b",
  storageBucket: "dashboard-23a7b.appspot.com",
  messagingSenderId: "261719898164",
  appId: "1:261719898164:web:fdbc2a42037fcec078b261"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const app = initializeApp(environment.firebaseConfig);


export { auth, db, firebaseApp };