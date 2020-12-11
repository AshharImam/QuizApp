import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCq1GjpyAGGlK85Ga33n00Hfp6BKyvczWw",
  authDomain: "real-pmp.firebaseapp.com",
  databaseURL: "https://real-pmp.firebaseio.com",
  projectId: "real-pmp",
  storageBucket: "real-pmp.appspot.com",
  messagingSenderId: "740722059029",
  appId: "1:740722059029:web:3f60a4750a8bc5ac02ab1c",
  measurementId: "G-GR7ZBSG70M",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;

// export const firebaseConfig = {
//   apiKey: "AIzaSyCyZNvmRNYAeB_LnHKAzYLQrVhBHUny5zg",
//   authDomain: "quizapp-f36b7.firebaseapp.com",
//   databaseURL: "https://quizapp-f36b7.firebaseio.com",
//   projectId: "quizapp-f36b7",
//   storageBucket: "quizapp-f36b7.appspot.com",
//   messagingSenderId: "946638432874",
//   appId: "1:946638432874:web:708394cae85731cbaef813",
// };
