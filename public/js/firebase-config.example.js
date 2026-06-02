// firebase-config.example.js
// Template de configuration Firebase (version Vite / modules ES)
// ATTENTION: NE PAS COMMITER vos vraies clés API !
// Copier ce fichier vers firebase-config.js et remplir les valeurs.

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.firebasestorage.app",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;
window.auth = firebase.auth();
window.db = firebase.firestore();

try { window.storage = firebase.storage(); } catch(e) { window.storage = null; }

if (typeof firebase.analytics === 'function') {
  window.analytics = firebase.analytics();
}
