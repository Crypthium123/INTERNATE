# INTERNATE

Plateforme web éducative avec authentification Firebase, outils de révision et gestion de cours.

## Structure

```
├── server.js                 ← Serveur HTTP local (Node.js)
├── package.json
├── demarrer.bat / stop.bat   ← Lanceurs Windows
│
├── public/
│   ├── index.html            ← Landing page
│   ├── css/style.css         ← Styles globaux (réutilisables)
│   ├── js/
│   │   ├── firebase-config.js        ← 🔑 Clés Firebase (IGNORÉ par git)
│   │   └── firebase-config.example.js ← Modèle à remplir
│   ├── auth/
│   │   ├── Login_Internate.html
│   │   └── Register_internate.html
│   ├── dashboard/
│   │   └── Connected_internate.html
│   ├── courses/
│   │   └── Ressources_ex.html
│   ├── legal/
│   │   └── Legal.html
│   └── tools/
│       ├── Calculatrice_Scientifique.html
│       ├── Convertisseur_Unites.html
│       ├── Fabricateur_Fiches.html
│       ├── Generateur_QCM.html
│       ├── Minuteur_Pomodoro.html
│       ├── Redacteur_Plan.html
│       └── Tableau_Blanc.html
```

## Démarrage rapide

```bash
# 1. Cloner le projet
git clone https://github.com/votre-utilisateur/internate.git
cd internate

# 2. Copier et configurer Firebase
cp public/js/firebase-config.example.js public/js/firebase-config.js
# Modifier public/js/firebase-config.js avec vos clés Firebase

# 3. Lancer le serveur
node server.js
# → http://localhost:3000

# Ou双击 demarrer.bat (Windows)
```

## Déploiement (Firebase Hosting)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # public/ → public
firebase deploy
```

## Configuration Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un projet (ou utiliser "internate")
3. Activer **Authentication** → Email/Password + Google
4. Activer **Firestore Database** → Démarrer en mode test
5. Copier les clés dans `public/js/firebase-config.js`
6. Ajouter les domaines d'hébergement dans Authentication → Authorized domains
