const firebaseConfig = {
  apiKey: "AIzaSyA62avwIJfVVMMLT2pqWMAIyehNlSXtBWY",
  authDomain: "marvin-tracker.firebaseapp.com",
  projectId: "marvin-tracker",
  storageBucket: "marvin-tracker.firebasestorage.app",
  messagingSenderId: "20475489581",
  appId: "1:20475489581:web:3aaf9464b99b7b7a0177a4",
  measurementId: "G-1P2BEGVC66"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();
const googleProvider = new firebase.auth.GoogleAuthProvider();
