import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
const { Timestamp } = firebase.firestore;
const auth = firebase.auth();
// const currentUser = auth.currentUser;

const newUser = uid => db.collection("users").doc(`${uid}`);

// For storing project extra files.
const storageRef = firebase.storage().ref();
const { TaskEvent, TaskState } = firebase.storage;
let currentUser;
db.enablePersistence({ synchronizeTabs: true });

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
  }
});

export {
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
