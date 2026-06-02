// firebase-config.example.js
// Template de configuration Firebase - À remplir avec vos clés
// ATTENTION: NE PAS COMMITER vos vraies clés API ! Utilisez firebase-config.js (privé)

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.firebasestorage.app",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_MEASUREMENT_ID"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Exportez les services
const auth = firebase.auth();
const db = firebase.firestore();

console.log("✅ Firebase initialisé avec succès !");
