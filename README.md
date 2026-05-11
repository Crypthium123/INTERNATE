# Internate

**Plateforme éducative collaborative** — Accède à tous tes cours, utilise des outils de révision intelligents et apprends avec ta classe, tout au même endroit.

![Internate](https://img.shields.io/badge/version-2.0.0-6c63ff) ![Firebase](https://img.shields.io/badge/Firebase-✓-00d4aa) ![License](https://img.shields.io/badge/license-MIT-6c63ff)

---

## But du projet

Internate est une plateforme web éducative conçue pour centraliser les ressources pédagogiques d'une classe. Elle permet aux élèves de :

- **Accéder** à leurs cours classés par matière, filière et niveau
- **Réviser** avec 11 outils interactifs intégrés (calculatrice, fiches, QCM…)
- **Partager** des ressources avec leurs camarades
- **Suivre** leur progression dans un espace personnel sécurisé

Le projet est né du besoin d'avoir une alternative gratuite, sans publicité et sans tracking, aux plateformes éducatives existantes.

---

## Fonctionnalités

### 🔐 Authentification
- Inscription et connexion par email/mot de passe
- Connexion via Google
- Espace personnel avec profil modifiable
- Base de données Firestore pour les utilisateurs

### 📚 Gestion de cours
- Ajout, modification et suppression de cours
- Filtres par filière (générale, technologique), année (2nde, 1ère, terminale), spécialité et matière
- Tri par date, titre ou matière
- Pièces jointes (URLs de fichiers)
- Stockage local (localStorage) persistant

### 🛠️ 11 outils de révision

| Outil | Description |
|-------|-------------|
| 🧮 Calculatrice Scientifique | Calculs avancés avec fonctions trigonométriques |
| 📊 Convertisseur d'Unités | Longueur, masse, température, vitesse, volume |
| 🗂️ Fabricateur de Fiches | Crée des fiches recto-verso personnalisées |
| 📋 Générateur de QCM | Crée et joue à des QCM personnalisés |
| ⏱️ Minuteur Pomodoro | Optimise ton temps d'étude |
| 📝 Rédacteur de Plan | Structure dissertations et exposés |
| 🎨 Tableau Blanc | Dessine, annoté et exporte des schémas |
| 🔍 Analyseur de Texte | Fréquence des mots, lisibilité, ton |
| 📈 Calculateur de Moyenne | Calcule la moyenne pondérée sur 20 |
| 📖 Conjugueur Français | Conjugue tous les verbes français |
| 💬 Générateur de Citations | Découvre des citations inspirantes |

### 🎨 Interface
- Design sombre moderne (dark mode)
- Animations fluides et orbes dynamiques
- Interface responsive (mobile + desktop)
- Navigation par sidebar ou topbar selon les pages

---

## Architecture du projet

```
├── server.js                 ← Serveur HTTP local (Node.js)
├── package.json              ← Métadonnées du projet
├── demarrer.bat              ← Lanceur Windows
├── stop.bat                  ← Arrêt du serveur
├── .gitignore                ← Fichiers ignorés par Git
├── firebase.json             ← Configuration Firebase Hosting
├── .firebaserc               ← Projet Firebase
│
└── public/
    ├── index.html            ← Landing page
    ├── 404.html              ← Page d'erreur personnalisée
    ├── contact.html          ← Page de contact
    ├── favicon.svg           ← Icône du site
    │
    ├── auth/
    │   ├── Login_Internate.html      ← Connexion
    │   └── Register_internate.html   ← Inscription
    │
    ├── dashboard/
    │   └── Connected_internate.html  ← Tableau de bord (connecté)
    │
    ├── courses/
    │   └── Ressources_ex.html        ← Gestion des cours (CRUD)
    │
    ├── profile/
    │   └── index.html                ← Profil utilisateur
    │
    ├── legal/
    │   └── Legal.html                ← Conditions d'utilisation & confidentialité
    │
    ├── tools/                        ← 11 outils de révision
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
    │   └── style.css                 ← Styles globaux
    │
    └── js/
        ├── firebase-config.js        ← 🔑 Clés Firebase (IGNORÉ par git)
        └── firebase-config.example.js ← Modèle à remplir
```

---

## Technologies utilisées

| Technologie | Rôle |
|-------------|------|
| **Firebase Auth** | Authentification (email + Google) |
| **Firebase Firestore** | Base de données utilisateurs |
| **Firebase Hosting** | Hébergement et déploiement |
| **Vanilla JS** | Aucun framework前端 — JavaScript pur |
| **CSS3** | Styles inline + feuille globale |
| **Node.js** | Serveur HTTP local (développement) |

---

## Démarrage rapide (développement local)

```bash
# 1. Cloner le projet
git clone https://github.com/Crypthium123/INTERNATE.git
cd INTERNATE

# 2. Copier et configurer Firebase
cp public/js/firebase-config.example.js public/js/firebase-config.js
# Modifier public/js/firebase-config.js avec vos clés Firebase

# 3. Lancer le serveur local
node server.js
# → http://localhost:3000

# Ou双击 demarrer.bat (Windows)
```

### Configuration Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un projet (ou utiliser "internate")
3. Activer **Authentication** → Email/Password + Google
4. Activer **Firestore Database** → Démarrer en mode test
5. Copier les clés dans `public/js/firebase-config.js`
6. Ajouter les domaines d'hébergement dans Authentication → Authorized domains

---

## Déploiement

Le site est déployé sur **Firebase Hosting** :

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # public/ → public, configurer comme SPA
firebase deploy
```

🔗 **Site en ligne :** [https://internate.web.app](https://internate.web.app)

---

## Captures d'écran

| Page | Aperçu |
|------|--------|
| Landing | Hero avec gradient + sections features et outils |
| Connexion | Split-screen avec formulaire et panneau informatif |
| Dashboard | Sidebar + grille d'outils + statistiques |
| Cours | CRUD complet avec filtres et tris |

---

## Licence

MIT © 2025 Internate

---

## Contact

Des retours, suggestions ou problèmes ?
- Email : [gc05122008@gmail.com](mailto:gc05122008@gmail.com)
- Site : [https://internate.web.app/contact.html](https://internate.web.app/contact.html)
