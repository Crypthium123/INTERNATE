
<p align="center">
  <img src="public/favicon.svg" width="80" alt="Internate">
</p>

<h1 align="center">Internate</h1>

<p align="center">
  <b>La plateforme éducative collaborative — par des lycéens, pour des lycéens.</b>
  <br>
  <a href="https://internate.web.app"><strong>internate.web.app »</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.0-6c63ff" alt="Version">
  <img src="https://img.shields.io/badge/Firebase-Auth%20|%20Firestore%20|%20Hosting-00d4aa" alt="Firebase">
  <img src="https://img.shields.io/badge/status-production-00d4aa" alt="Status">
  <img src="https://img.shields.io/badge/license-Custom-6c63ff" alt="License">
</p>

---

## 🌍 README

| Langue | Lien |
|--------|------|
| 🇫🇷 Français | **[README.md](README.md)** *(vous êtes ici)* |
| 🇬🇧 English | **[README.en.md](README.en.md)** |

---

## 📖 Aperçu du projet

Internate est une plateforme éducative collaborative conçue par et pour des lycéens. Elle centralise cours, fiches de révision, outils interactifs et espaces de classe collaboratifs, le tout synchronisé en temps réel via Firebase.

Née d'une frustration face au chaos numérique des cours partagés entre camarades, la plateforme a évolué d'un simple dossier HTML local à une application web multi-utilisateur complète avec authentification, base de données temps réel et gamification.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Firebase Hosting                    │
├─────────────────────────────────────────────────────┤
│            Service Worker (PWA / offline)            │
├─────────────────────────────────────────────────────┤
│       Pages HTML statiques (Vanilla JS / CSS)        │
├─────────────────────────────────────────────────────┤
│   Firebase Auth     │    Firebase Firestore (DB)     │
│   (Email/Google)    │    (cours, classes, users)     │
└─────────────────────────────────────────────────────┘
```

L'application suit une architecture **SPA-like** sans framework : chaque page est un fichier HTML statique qui se connecte directement à Firebase depuis le navigateur. Les données sont synchronisées en temps réel via Firestore, avec un fallback localStorage pour la résilience hors ligne.

---

## 🛠️ Stack technique

| Technologie | Rôle |
|-------------|------|
| **HTML5 / CSS3** | Structure et styles (variables CSS, animations, responsive) |
| **Vanilla JavaScript** | Aucun framework — JavaScript pur, ES6+ |
| **Firebase Authentication** | Authentification email/mot de passe + Google OAuth |
| **Firebase Firestore** | Base de données NoSQL temps réel |
| **Firebase Hosting** | Hébergement statique et déploiement CDN |
| **Firebase Storage** | Stockage d'images de profil |
| **Service Worker** | Cache offline, navigationPreload, page de fallback |
| **Node.js** | Serveur HTTP local pour le développement |

---

## 🚀 Setup et installation

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- Un projet Firebase (gratuit)

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Crypthium123/INTERNATE.git
cd INTERNATE

# 2. Configurer Firebase
cp public/js/firebase-config.example.js public/js/firebase-config.js
# → Éditer public/js/firebase-config.js avec les clés de votre projet Firebase

# 3. Lancer le serveur local
node server.js
# → http://localhost:3000
```

### Configuration Firebase

1. Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activer **Authentication** → Méthodes de connexion : Email/Password + Google
3. Activer **Firestore Database** → Démarrer en mode test
4. Activer **Storage** (pour les avatars de profil)
5. Copier les clés de configuration dans `public/js/firebase-config.js`
6. Ajouter les domaines autorisés dans Authentication → Paramètres → Domaines autorisés
7. Déployer les règles de sécurité Firestore :

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

### Déploiement

```bash
firebase deploy
```

🔗 **Site en ligne :** [https://internate.web.app](https://internate.web.app)

---

## 📂 Structure du projet

```
INTERNATE/
├── .firebaserc                        # Projet Firebase
├── firebase.json                      # Configuration Firebase Hosting
├── firestore.rules                    # Règles de sécurité Firestore
├── firestore.indexes.json            # Index composés Firestore
├── server.js                          # Serveur HTTP local
├── package.json                       # Métadonnées du projet
├── SECURITY.md                        # Politique de sécurité
├── tests/                             # Tests de validation
│   └── validate.js                    # Validation HTML, sécurité, SW
│
└── public/
    ├── index.html                     # Landing page
    ├── 404.html                       # Page d'erreur
    ├── contact.html                   # Page de contact
    ├── offline.html                   # Page offline PWA
    ├── favicon.svg                    # Icône du site
    ├── manifest.json                  # Manifeste PWA
    ├── sw.js                          # Service Worker
    │
    ├── auth/                          # Authentification
    │   ├── Login_Internate.html
    │   └── Register_internate.html
    │
    ├── dashboard/                     # Tableau de bord connecté
    │   └── connected_internate.html
    │
    ├── courses/                       # Gestion des cours
    │   └── Ressources_ex.html
    │
    ├── classes/                       # Espaces de classe + chat
    │   └── index.html
    │
    ├── profile/                       # Profil utilisateur
    │   └── index.html
    │
    ├── admin/                         # Interface d'administration
    │   └── index.html
    │
    ├── help/                          # Aide et retours
    │   └── index.html
    │
    ├── legal/                         # Mentions légales et CGU
    │   └── Legal.html
    │
    ├── tools/                         # 11 outils de révision
    │   ├── Calculatrice_Scientifique.html
    │   ├── Convertisseur_Unites.html
    │   ├── Fabricateur_Fiches.html
    │   ├── Generateur_QCM.html
    │   ├── Minuteur_Pomodoro.html
    │   ├── Redacteur_Plan.html
    │   ├── Tableau_Blanc.html
    │   ├── Analyseur_Texte.html
    │   ├── Calculateur_Moyenne.html
    │   ├── Conjugueur_Francais.html
    │   └── Generateur_Citations.html
    │
    ├── css/
    │   ├── style.css                  # Styles globaux
    │   └── theme.css                  # Thème sombre et variables
    │
    └── js/
        ├── firebase-config.js         # 🔑 Clés Firebase (gitignoré)
        ├── firebase-config.example.js # Modèle de configuration
        ├── app.js                     # Fonctions partagées
        ├── escape.js                  # Fonctions d'échappement HTML
        ├── focus-mode.js             # Mode Focus + Pomodoro
        └── pdf-export.js             # Export PDF
```

---

## 🔒 Sécurité

### Firestore Rules
Les règles de sécurité Firestore (`firestore.rules`) implémentent :
- **Validation des accès** : lecture/écriture conditionnelle selon l'authentification
- **Propriété des données** : seuls les utilisateurs peuvent modifier leurs propres documents
- **Protection des données sensibles** : pas d'accès non authentifié aux profils utilisateurs
- **Limitation des écritures** : validation des champs pour prévenir les injections

### Authentification
- **Email vérifié** obligatoire pour accéder aux fonctionnalités
- **Session persistante** via Firebase Auth avec refresh tokens
- **Protection XSS** : fonctions `escapeHtml()`, `escapeAttr()`, `escapeJsStr()` sur toutes les pages qui manipulent du HTML dynamique
- **localStorage** limité à `uid` et `email` (pas de données personnelles stockées côté client)

### CI Validation
Le pipeline CI (`tests/validate.js`) vérifie automatiquement :
- `lang="fr"` sur tous les fichiers HTML
- `<!DOCTYPE html>` présent
- `charset="UTF-8"` présent
- Utilisation correcte des fonctions d'échappement
- Pas de données personnelles dans localStorage
- Service Worker correct (navigationPreload, offline.html)

---

## 📱 Fonctionnalités PWA

Internate est une **Progressive Web App** complète :

| Fonctionnalité | Détail |
|----------------|--------|
| **Manifest** | `manifest.json` avec icônes, thème couleur, orientation |
| **Service Worker** | `sw.js` avec cache stratégique (Cache First pour les assets) |
| **Navigation Preload** | Chargement anticipé des pages pour réduire la latence |
| **Page offline** | `offline.html` affichée quand le réseau est indisponible |
| **Installable** | Bannière d'installation (bouton "Installer l'app") |
| **Mise en cache** | Pages HTML, CSS, JS, polices Google et images en cache |
| **Stratégie** | Cache First pour les assets statiques, Network First pour les pages |

Le Service Worker précharge l'ensemble des pages clés au premier chargement, garantissant une expérience rapide et résiliente même en cas de coupure réseau.

---

## ✨ Fonctionnalités principales

- **📚 Cours collaboratifs** : CRUD complet, filtres, tri, partage de liens, commentaires
- **👥 Espaces de classe** : Création avec code unique, chat en temps réel, gestion des membres
- **🛠️ 11 outils de révision** : Calculatrice, fiches, QCM, Pomodoro, conjugueur et plus
- **🏆 Gamification** : XP, niveaux, streaks, classements
- **📊 Dashboard personnalisé** : Statistiques, progression, graphiques XP
- **⚡ Mode Focus + Pomodoro** : Plein écran pour la concentration
- **🌙 Thème sombre** : Interface dark design cohérente
- **📱 Responsive** : Mobile, tablette et desktop

---

## 📜 Licence

© 2026 Internate — Tous droits réservés

Le code source est visible publiquement à des fins éducatives et de collaboration. Toute utilisation commerciale ou redistribution sans autorisation est interdite.

---

## 📬 Contact

- **Site :** [https://internate.web.app](https://internate.web.app)
- **GitHub :** [Crypthium123/INTERNATE](https://github.com/Crypthium123/INTERNATE)
- **Aide :** [https://internate.web.app/help/](https://internate.web.app/help/)
- **Email :** [internatesupport@gmail.com](mailto:internatesupport@gmail.com)

---

<p align="center">
  <sub>Construit avec ❤️ par des lycéens, pour des lycéens.</sub>
  <br>
  <sub>🇫🇷 Projet français — Fierté nationale 🇫🇷</sub>
</p>
