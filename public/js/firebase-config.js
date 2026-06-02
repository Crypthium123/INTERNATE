import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAhxjjX2elOAzCO2zCpeo0RHFgExY8f6T4",
  authDomain: "internate.firebaseapp.com",
  projectId: "internate",
  storageBucket: "internate.firebasestorage.app",
  messagingSenderId: "129811302967",
  appId: "1:129811302967:web:adeac85d6304e0d7720db2",
  measurementId: "G-RDH1X6M4PZ"
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;
window.auth = firebase.auth();
window.db = firebase.firestore();

try { window.storage = firebase.storage(); } catch(e) { window.storage = null; }

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(err) { console.error('Auth persistence error:', err.message); });

window.analytics = typeof firebase.analytics === 'function' ? firebase.analytics() : null;
