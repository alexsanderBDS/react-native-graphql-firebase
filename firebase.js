import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY.toString(),
  authDomain: process.env.API_AUTHDOMAIN.toString(),
  projectId: process.env.API_PROJECTID.toString(),
  storageBucket: process.env.API_STORAGEBUCKET.toString(),
  messagingSenderId: process.env.API_MESSAGINGSENDERID.toString(),
  appId: process.env.API_APPID.toString(),
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
