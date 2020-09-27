import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import store from "./store";

let config = {
  projectId: process.env.VUE_APP_PROJECTID,
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseUrl: process.env.VUE_APP_DATABASEURL,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

const db = firebase.initializeApp(config).firestore();
db.enablePersistence({ synchronizeTabs: true });

const { Timestamp } = firebase.firestore;
const auth = firebase.auth();
// const currentUser = auth.currentUser;
const companyCollection = db.collection("companies");
const newUser = uid => db.collection("users").doc(`${uid}`);

// For storing project extra files.
const storageRef = firebase.storage().ref();
const { TaskEvent, TaskState } = firebase.storage;
let currentUser;

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
  }
  store.dispatch("user/fetchUser", user, { root: true });
});

export {
  companyCollection,
  Timestamp,
  newUser,
  auth,
  currentUser,
  storageRef,
  TaskEvent,
  TaskState,
  firebase
};
export default db;
