# Internate

**Plateforme éducative collaborative** — centralise les cours, outils de révision et ressources pédagogiques dans un espace sécurisé, sans publicité et sans tracking.

![Version](https://img.shields.io/badge/version-3.0-6c63ff) ![Firebase](https://img.shields.io/badge/Firebase-Auth%20|%20Firestore%20|%20Hosting-00d4aa) ![License](https://img.shields.io/badge/license-MIT-6c63ff) ![Status](https://img.shields.io/badge/status-production-00d4aa)

🔗 **Site en ligne :** [https://internate.web.app](https://internate.web.app)

---

## À propos

Internate est une plateforme web éducative pensée pour les lycéens et leurs enseignants. Le projet est né d'un constat simple : les outils éducatifs existants sont soit payants, soit truffés de publicités, soit dispersés sur plusieurs plateformes. L'objectif est de tout réunir au même endroit, gratuitement.

**Ce qui a été fait depuis le début :**

- **V1** — Prototype fonctionnel avec un système de cours en localStorage et quelques outils de révision basiques.
- **V2** — Refonte complète de l'interface (design sombre, animations, responsive), ajout du dashboard, de l'authentification Firebase, et extension à 11 outils de révision interactifs.
- **V3** — Migration multi-utilisateur : passage de localStorage à Firestore pour le stockage des cours, synchronisation en temps réel entre les comptes, page d'aide avec formulaire de retour, règles de sécurité Firestore, mode sombre permanent, et corrections générales.

---

## Fonctionnalités

### 🔐 Authentification & Comptes
- Inscription et connexion par email/mot de passe
- Connexion via Google
- Profil modifiable (prénom, nom)
- Réinitialisation du mot de passe
- Espace personnel sécurisé par Firebase Auth

### 📚 Gestion de cours collaborative
- Ajout, modification et suppression de cours
- Filtres par filière (générale, technologique), année (2nde, 1ère, terminale), spécialité et matière
- Tri par date, titre ou matière
- Stockage Firestore synchronisé entre tous les utilisateurs connectés
- Fallback localStorage en cas d'indisponibilité Firestore
- Pièces jointes (URLs de fichiers)

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
- Design sombre permanent
- Animations fluides et orbes dynamiques
- Interface responsive (mobile + desktop)
- Navigation par sidebar hamburger

---

## Architecture du projet

```
├── firebase.json                ← Configuration Firebase Hosting
├── firestore.rules              ← Règles de sécurité Firestore
├── .firebaserc                  ← Projet Firebase
│
└── public/
    ├── index.html               ← Landing page
    ├── 404.html                 ← Page d'erreur personnalisée
    ├── sw.js                    ← Service Worker
    │
    ├── auth/
    │   ├── Login_Internate.html       ← Connexion
    │   └── Register_internate.html    ← Inscription
    │
    ├── dashboard/
    │   └── Connected_internate.html   ← Tableau de bord
    │
    ├── courses/
    │   └── Ressources_ex.html         ← Gestion des cours (CRUD)
    │
    ├── profile/
    │   └── index.html                 ← Profil utilisateur
    │
    ├── help/
    │   └── index.html                 ← Aide & formulaire de retour
    │
    ├── legal/
    │   └── Legal.html                 ← Conditions d'utilisation
    │
    ├── tools/                         ← 11 outils de révision
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
    │   ├── style.css                  ← Styles globaux
    │   └── theme.css                  ← Variables et thème sombre
    │
    └── js/
        ├── firebase-config.js         ← 🔑 Clés Firebase (ignoré par git)
        ├── firebase-config.example.js ← Modèle à remplir
        ├── pdf-export.js              ← Export PDF
        └── theme.js                   ← Gestion du thème
```

---

## Technologies

| Technologie | Rôle |
|-------------|------|
| **Firebase Auth** | Authentification (email + Google) |
| **Firebase Firestore** | Base de données cours & analytics |
| **Firebase Hosting** | Hébergement et déploiement |
| **Vanilla JS** | Aucun framework — JavaScript pur |
| **CSS3** | Styles globaux + variables CSS |

---

## Futur

- 📱 Application mobile (PWA ou native)
- 🔔 Notifications push (nouveaux cours, rappels)
- 📤 Upload de fichiers (PDF, images) via Firebase Storage
- 👥 Espaces de classe avec invitations
- 📊 Statistiques de progression individuelles
- 🤖 Suggestions intelligentes de révision

---

## Retours et suggestions

Tu as une idée, un bug à signaler ou une suggestion ?

➡️ **Formulaire de retour :** [forms.gle/KzNnZrZNkXEyJFV16](https://forms.gle/KzNnZrZNkXEyJFV16)

---

## Licence

MIT © 2026 Internate

---

## Contact

- Site : [https://internate.web.app](https://internate.web.app)
- Aide : [https://internate.web.app/help/](https://internate.web.app/help/)
