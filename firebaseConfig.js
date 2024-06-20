import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
const firebaseConfig = {
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'ketchat-e153e',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
  apiKey: "AIzaSyAxg5t8f6eF11NxwVWukeS9_1r3siregpg",
  authDomain: "ketchat-e153e.firebaseapp.com",
  projectId: "ketchat-e153e",
  storageBucket: "ketchat-e153e.appspot.com",
  messagingSenderId: "1052486157905",
  appId: "1:1052486157905:web:9ec6ea0cbb06c120559a70"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
