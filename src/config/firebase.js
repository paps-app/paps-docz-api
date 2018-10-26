import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBYFGdCUsdCEBeEzNG4FFI0756H3lScKTI",
  authDomain: "paps-internal.firebaseapp.com",
  databaseURL: "https://paps-internal.firebaseio.com",
  projectId: "paps-internal",
  storageBucket: "paps-internal.appspot.com",
  messagingSenderId: "407081980027"
};

firebase.initializeApp(config);
const saveApiKey = firebase.database().ref("APIKey");

export default saveApiKey;
