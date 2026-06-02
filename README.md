<p align="center">
  <img src="public/favicon.svg" width="80" alt="Internate">
</p>

<h1 align="center">Internate</h1>

<p align="center">
  <b>Plateforme éducative collaborative — par des lycéens, pour des lycéens.</b>
  <br>
  <a href="https://internate.web.app"><strong>internate.web.app »</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.0-6c63ff" alt="Version">
  <img src="https://img.shields.io/badge/build-Vite-00d4aa" alt="Vite">
  <img src="https://img.shields.io/badge/Firebase-Auth%20|%20Firestore%20|%20Hosting-FFA000" alt="Firebase">
  <img src="https://img.shields.io/badge/PWA-ready-6c63ff" alt="PWA">
  <img src="https://img.shields.io/badge/tests-10%2F10-00d4aa" alt="Tests">
</p>

<p align="center">
  <a href="#fr-français">🇫🇷 Français</a> ·
  <a href="README.en.md">🇬🇧 English</a>
</p>

---

<a id="fr-français"></a>

## Sommaire

- [Histoire du projet](#histoire-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [Build & Tests](#build--tests)
- [Sécurité](#sécurité)
- [PWA](#pwa)
- [CI / CD](#ci--cd)
- [Licence](#licence)
- [Contact](#contact)

---

## Histoire du projet

> On était en Seconde. Comme tous les lycéens, on accumulait des cours, des fiches, des liens, des PDF — un vrai bazar numérique. Chaque semaine le même refrain : « T'as le cours de maths ? » — « Attends je t'envoie » — fichier introuvable, lien mort, version obsolète.

**Internate est né de cette frustration.**

Ça a commencé par un simple dossier HTML sur un disque dur. Une page avec des liens vers nos cours. Puis on a ajouté un système de fiches, un convertisseur d'unités, une calculatrice… Le projet a grandi, mais restait confidentiel — utilisé dans notre classe, point.

Puis est venue la refonte. Interface sombre, dashboard, outils interactifs. On a découvert Firebase, l'authentification, l'hébergement. Le projet est devenu plus sérieux. On l'a partagé à nos profs, qui l'ont montré à d'autres classes. Les retours étaient encourageants, mais le localStorage montrait ses limites.

**2026 — V3 : la révolution.** Synchronisation Firestore en temps réel, espaces de classe avec chat, commentaires sur les cours, gamification (XP, niveaux, streaks). Le projet est passé d'un outil de classe à une vraie plateforme multi-utilisateur. Build automatisé avec Vite, Service Worker nouvelle génération, tests de validation, CI/CD.

---

## Fonctionnalités

### 🔐 Authentification

| Fonctionnalité | Détail |
|----------------|--------|
| Email + mot de passe | Inscription et connexion |
| Google OAuth | Connexion en un clic |
| Vérification email | Requise à l'inscription |
| Réinitialisation mot de passe | Email de reset |
| Session persistante | Reste connecté entre les visites |
| Domaines autorisés | Sécurisé Firebase Auth |

### 📚 Cours collaboratifs

| Fonctionnalité | Détail |
|----------------|--------|
| CRUD complet | Ajouter, modifier, supprimer des cours |
| Filtres | Par filière, année, spécialité, matière |
| Tri | Par date, titre ou matière |
| Temps réel | Firestore `onSnapshot` |
| Fallback localStorage | Fonctionne hors ligne / si Firestore indisponible |
| Pièces jointes | URLs de fichiers liés aux cours |
| Commentaires | Discussions en temps réel sur chaque cours |

### 👥 Espaces de classe

| Fonctionnalité | Détail |
|----------------|--------|
| Création de classe | Code d'invitation unique auto-généré |
| Rejoindre une classe | Via le code d'invitation |
| Activer / Désactiver | Vue filtrée — uniquement les cours de la classe active |
| Chat temps réel | Firestore `onSnapshot` — messages instantanés |
| Liste des membres | Avatars, badges (créateur, vous), compteur |
| Gestion des membres | Le créateur peut retirer un membre |
| Copie du code | Bouton « Copier le code » en un clic |

### 🛠️ 11 outils de révision

| # | Outil | Description |
|---|-------|-------------|
| 1 | 🧮 **Calculatrice Scientifique** | Calculs avancés : trigonométrie, logarithmes, racines |
| 2 | 📊 **Convertisseur d'Unités** | Longueur, masse, température, vitesse, volume, énergie |
| 3 | 🗂️ **Fabricateur de Fiches** | Crée des fiches de révision recto/verso personnalisées |
| 4 | 📋 **Générateur de QCM** | Crée, joue et note des quiz personnalisés |
| 5 | ⏱️ **Minuteur Pomodoro** | Technique Pomodoro intégrée au dashboard |
| 6 | 📝 **Rédacteur de Plan** | Structure dissertations, exposés, comptes-rendus |
| 7 | 🎨 **Tableau Blanc** | Dessine, annote et exporte des schémas |
| 8 | 🔍 **Analyseur de Texte** | Statistiques : fréquence mots, lisibilité, tonalité |
| 9 | 📈 **Calculateur de Moyenne** | Calcule ta moyenne pondérée sur 20 |
| 10 | 📖 **Conjugueur Français** | Conjugue tous les verbes français à tous les temps |
| 11 | 💬 **Générateur de Citations** | Découvre des citations inspirantes |

### ⚡ Mode Focus + Pomodoro

- Plein écran : masque la barre latérale pour la concentration
- Minuteur Pomodoro flottant (25 min travail / 5 min pause)
- Compteur de sessions
- Récompense XP : 10 XP par session complétée
- Sortie avec la touche Échap

### 📊 Dashboard personnalisé

- Cartes statistiques : XP, niveau, streak, cours disponibles
- Graphique d'évolution XP sur 7 jours
- Barres de progression : XP, cours complétés, outils utilisés
- Actions rapides : accès direct aux outils et cours
- Suivi d'utilisation des outils

### 🏆 Système de gamification

- **XP** : gagne des points en utilisant les outils, en partageant des cours, en aidant les autres
- **Niveaux** : un niveau tous les 500 XP (calculé automatiquement)
- **Streaks** : série de jours consécutifs d'activité
- **Notifications** : alerte à chaque montée de niveau
- **Badge admin** : lien visible pour les administrateurs

### 🎨 Interface

- Thème sombre permanent (pas de mode clair)
- Animations fluides (scroll reveal, hover, transitions)
- Design responsive (mobile, tablette, desktop)
- Navigation par barre latérale avec sections
- Barre de recherche dans les cours
- Toasts de notification
- Page 404 personnalisée

---

## Stack technique

| Technologie | Rôle |
|-------------|------|
| **Vite 5** | Build tool multi-page, HMR, code splitting |
| **HTML5 / CSS3** | Structure, styles, variables CSS, animations |
| **Vanilla JavaScript (ES6+)** | Aucun framework — JavaScript pur en modules ES |
| **Firebase Auth** | Authentification email + Google OAuth |
| **Firebase Firestore** | Base de données NoSQL temps réel |
| **Firebase Hosting** | Hébergement statique CDN, déploiement continu |
| **Firebase Storage** | Stockage d'images de profil |
| **Firebase Analytics** | Statistiques d'usage (optionnel) |
| **Service Worker (v3)** | Cache offline, navigationPreload, offline fallback |
| **GitHub Actions** | CI : validation automatique à chaque push |
| **Node.js** | Environnement d'exécution pour les outils de build |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Utilisateur (navigateur)                │
├──────────────────────────────────────────────────────────┤
│                    Vite (build + HMR)                      │
├──────────────────────────────────────────────────────────┤
│            Service Worker v3 (PWA / offline)               │
├──────────────────────────────────────────────────────────┤
│           Pages HTML statiques (modules ES)                │
├───────────────────┬──────────────────┬───────────────────┤
│   Firebase Auth   │  Firebase DB     │  Firebase Hosting  │
│ (Email / Google)  │ (Firestore NoSQL)│  (CDN + déploiement)│
└───────────────────┴──────────────────┴───────────────────┘
```

**Architecture multi-pages avec Vite.** Chaque page est un fichier HTML statique qui importe ses dépendances Firebase via des modules ES. Le build Vite génère des bundles optimisés avec code splitting, hashage et minification. Contrairement à une SPA, chaque page a sa propre entrée : pas de routage côté client, chargement immédiat.

**Sécurité en couches :**
1. CSP headers (Firebase Hosting) limitent les sources autorisées
2. Firestore Rules valident chaque requête (propriété, taille, type)
3. Escape functions (`escapeHtml`, `escapeAttr`, `escapeJsStr`) préviennent les XSS
4. localStorage limité à `uid` et `email` (aucune donnée personnelle côté client)

---

## Structure du projet

```
INTERNATE-V3/
├── .firebaserc                    # Projet Firebase cible
├── .github/workflows/             # CI GitHub Actions
│   └── ci.yml                     # Validation automatique
├── firebase.json                  # Config hosting + headers CSP
├── firestore.rules                # Règles de sécurité Firestore
├── firestore.indexes.json         # Index composés Firestore
├── vite.config.js                 # Configuration Vite multi-page
├── package.json                   # Dépendances et scripts
├── README.md                      # Documentation française
├── README.en.md                   # Documentation anglaise
├── SECURITY.md                    # Politique de sécurité
├── CONSOLE-SETUP.md               # Configuration Firebase Console
├── tests/                         # Suites de validation
│   ├── validate.js                # 10 tests (HTML, sécurité, SW)
│   ├── firestore-rules-test.js    # Tests des règles Firestore
│   └── package.json               # Dépendances des tests
│
└── public/                        # Sources (root du site)
    ├── index.html                 # Landing page
    ├── 404.html                   # Page d'erreur
    ├── contact.html               # Page de contact
    ├── offline.html               # Page fallback PWA
    ├── favicon.svg                # Icône du site
    ├── manifest.json              # Manifeste PWA
    ├── sw.js                      # Service Worker (v3)
    │
    ├── auth/                      # Authentification
    │   ├── Login_Internate.html
    │   ├── Register_internate.html
    │   └── forgot-password.html
    │
    ├── dashboard/
    │   └── connected_internate.html
    │
    ├── courses/
    │   └── Ressources_ex.html
    │
    ├── classes/
    │   └── index.html
    │
    ├── profile/
    │   └── index.html
    │
    ├── admin/
    │   └── index.html
    │
    ├── help/
    │   └── index.html
    │
    ├── legal/
    │   └── Legal.html
    │
    ├── tools/                     # 11 outils de révision
    │   ├── Analyseur_Texte.html
    │   ├── Calculateur_Moyenne.html
    │   ├── Calculatrice_Scientifique.html
    │   ├── Conjugueur_Francais.html
    │   ├── Convertisseur_Unites.html
    │   ├── Fabricateur_Fiches.html
    │   ├── Generateur_Citations.html
    │   ├── Generateur_QCM.html
    │   ├── Minuteur_Pomodoro.html
    │   ├── Redacteur_Plan.html
    │   └── Tableau_Blanc.html
    │
    ├── css/
    │   ├── style.css              # Styles globaux
    │   └── theme.css              # Thème sombre + variables
    │
    └── js/
        ├── firebase-config.js     # 🔑 Clés Firebase (gitignoré)
        ├── firebase-config.example.js  # Modèle à remplir
        ├── app.js                 # Fonctions partagées (XP, toast, escape)
        ├── escape.js              # Échappement HTML/JS (outils sans module)
        └── focus-mode.js          # Mode Focus + Pomodoro
```

---

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- Un projet [Firebase](https://console.firebase.google.com) (gratuit)

### Configuration rapide

```bash
# 1. Cloner
git clone https://github.com/Crypthium123/INTERNATE.git
cd INTERNATE-V3

# 2. Installer les dépendances
npm install

# 3. Configurer Firebase
cp public/js/firebase-config.example.js public/js/firebase-config.js
# → Éditer avec les clés de ton projet Firebase

# 4. Lancer le serveur de développement Vite
npm run dev
# → http://localhost:3000
```

### Configuration Firebase complète

1. Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. **Authentication** → Activer Email/Mot de passe + Google
3. **Firestore Database** → Créer une base (mode production recommandé)
4. **Storage** → Activer (avatars de profil)
5. Copier les clés de configuration dans `public/js/firebase-config.js`
6. **Authentication → Paramètres → Domaines autorisés** → Ajouter `localhost` et `internate.web.app`
7. Déployer les règles Firestore :
   ```bash
   npx firebase-tools deploy --only firestore:rules
   ```

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite (HMR) |
| `npm run build` | Build production optimisé (→ `dist/`) |
| `npm run preview` | Prévisualisation du build |
| `npm test` | Validation automatisée (10 tests) |
| `npm run test:rules` | Tests des règles Firestore |
| `npm run deploy` | Build + déploiement Firebase Hosting |

---

## Déploiement

```bash
# Déploiement complet
npm run deploy

# Ou manuellement
npm run build
firebase deploy --only hosting
```

🔗 **Site en production :** [https://internate.web.app](https://internate.web.app)

Le déploiement produit **40 fichiers optimisés** dans `dist/` :
- 26 pages HTML (minifiées, avec SRI)
- 12 bundles JS (code splitting par page, hashés)
- 2 fichiers CSS (variables + styles, hashés)
- Assets statiques (favicon, manifeste, icônes PWA)

---

## Build & Tests

### Build Vite

- **Multi-page** : chaque page HTML a sa propre entrée
- **Code splitting** : Firebase SDK séparé du code applicatif
- **Hashage** : tous les fichiers produits ont un hash de contenu (cache immutable 1 an)
- **Minification** : JS et CSS minifiés automatiquement
- **110 modules transformés** en ~3s

### Tests de validation (10 tests)

Le fichier `tests/validate.js` vérifie automatiquement :

| # | Test | Description |
|---|------|-------------|
| 1 | `lang="fr"` | Tous les HTML ont l'attribut `lang="fr"` |
| 2 | `<!DOCTYPE html>` | Doctype présent partout |
| 3 | `charset="UTF-8"` | Encodage défini |
| 4 | escapeHtml accessible | Tout fichier avec `innerHTML` a accès à `escapeHtml()` |
| 5 | localStorage PII | `currentUser` stocke uniquement `uid` + `email` |
| 6 | Firebase sans CDN | Aucun fichier n'utilise `firebase.*` sans importer Firebase |
| 7 | Auth check outils | Les outils utilisent `user.uid` pour l'authentification |
| 8 | Navigation Preload | Le SW active `navigationPreload` |
| 9 | Offline page | Le SW précharge `offline.html` |
| 10 | Escape functions | `app.js` contient `escapeHtml`, `escapeAttr`, `escapeJsStr` |

### Tests des règles Firestore

```bash
npm run test:rules
# → Nécessite Java Runtime (JRE) pour l'émulateur Firestore
```

### CI GitHub Actions

À chaque push, la CI exécute automatiquement :
- `npm test` → 10 tests de validation
- Vérifie que le build passe (simulation)

---

## Sécurité

### Firestore Rules (`firestore.rules`)

Les règles implémentent une sécurité en couches :

- **Deny par défaut** : tout accès non explicitement autorisé est refusé
- **Propriété des données** : seuls les auteurs peuvent modifier/supprimer leurs documents
- **Validation des champs** : taille maximale, types attendus, format regex
- **Rate limiting** : cooldown de 5s entre les messages du chat
- **Protection des suppressions** : fenêtre de 24h pour les classes
- **Admin claims** : accès spécial pour les administrateurs
- **Server timestamps** : horodatage côté serveur (infalsifiable)

### Content Security Policy (CSP)

Les headers CSP (dans `firebase.json`) limitent strictement :

- `default-src 'self'` — tout part de la même origine
- `base-uri 'self'` — pas de détournement de base URL
- `form-action 'self'` — les formulaires ne vont que sur le site
- `frame-ancestors 'self'` — pas d'embarquement dans des iframes tierces
- `script-src` — limité aux CDN Firebase et Google autorisés
- `style-src` — limité à self + Google Fonts
- `connect-src` — limité aux API Firebase et Google

### Protection XSS

- **`escapeHtml()`** : échappe le HTML pour `innerHTML` (utilise `textContent` + `createTextNode`)
- **`escapeAttr()`** : échappe les attributs HTML (`&`, `"`, `'`, `<`, `>`)
- **`escapeJsStr()`** : échappe les chaînes JavaScript (backslash, quotes, newlines, chevrons)
- Toute page manipulant du HTML dynamique a accès à ces fonctions (testé automatiquement)

### Données personnelles

- **localStorage** : contient uniquement `{ uid, email }` — ni prénom, ni nom, ni photo
- **Firestore** : les profils stockent prénom/nom/photo (données du compte utilisateur)
- **Authentification** : email vérifié obligatoire avant accès aux fonctionnalités
- **Session** : persistante via Firebase Auth (refresh tokens)

---

## PWA

Internate est une **Progressive Web App** complète :

| Fonctionnalité | Détail |
|----------------|--------|
| **Manifest** | `manifest.json` avec icônes (SVG 192 + 512), thème, orientation |
| **Service Worker v3** | Cache stratégique avec `allSettled` |
| **Navigation Preload** | Chargement anticipé des pages (réduction latence) |
| **Page offline** | `offline.html` quand le réseau est indisponible |
| **Installable** | Bannière d'installation (`beforeinstallprompt`) |
| **Cache** | Cache-first pour les assets, Network-first avec fallback offline |
| **Mise à jour** | Notification toast quand une nouvelle version est disponible |
| **skipWaiting** | Activation immédiate du nouveau SW au refresh |

### Stratégie de cache

- **Cache-First** : assets statiques (CSS, JS, polices, icônes)
- **Network-First** : navigation vers les pages (avec fallback offline.html)
- **Préchargement** : pages principales mises en cache à l'installation
- **allSettled** : ne bloque pas le SW si une ressource échoue
- **Durée** : cache immutable 1 an pour les assets buildés (hashés)

---

## CI / CD

### GitHub Actions (`.github/workflows/ci.yml`)

```yaml
Déclencheurs : push sur toutes les branches, PR sur master
Runner : ubuntu-latest, Node 20
Étapes :
  1. npm ci (installation propre)
  2. npm test (10 tests de validation)
  3. Simulation de build Vite (vérifie que le build passe)
```

---

## Licence

© 2026 Internate — Tous droits réservés.

Le code source est visible publiquement à des fins éducatives et de collaboration. Toute utilisation commerciale, redistribution ou reproduction sans autorisation préalable est interdite.

---

## Contact

- **Site :** [https://internate.web.app](https://internate.web.app)
- **Dépôt GitHub :** [Crypthium123/INTERNATE](https://github.com/Crypthium123/INTERNATE)
- **Aide :** [https://internate.web.app/help/](https://internate.web.app/help/)
- **Page contact :** [https://internate.web.app/contact.html](https://internate.web.app/contact.html)

---

<p align="center">
  <sub>Construit avec ❤️ par des lycéens, pour des lycéens.</sub>
  <br>
  <sub>🇫🇷 Projet français</sub>
</p>
