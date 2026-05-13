# Internate

**Plateforme éducative collaborative** — centralise les cours, outils de révision et espaces de classe dans un environnement sécurisé, sans publicité et sans tracking.

![Version](https://img.shields.io/badge/version-3.0-6c63ff) ![Firebase](https://img.shields.io/badge/Firebase-Auth%20|%20Firestore%20|%20Hosting-00d4aa) ![License](https://img.shields.io/badge/license-MIT-6c63ff) ![Status](https://img.shields.io/badge/status-production-00d4aa)

🔗 **Site en ligne :** [https://internate.web.app](https://internate.web.app)

---

## À propos

Internate est une plateforme web éducative pensée pour les lycéens et leurs enseignants. Le projet est né d'un constat simple : les outils éducatifs existants sont soit payants, soit truffés de publicités, soit dispersés sur plusieurs plateformes. L'objectif est de tout réunir au même endroit, gratuitement.

**Évolution du projet :**

- **V1** — Prototype fonctionnel avec un système de cours en localStorage et quelques outils de révision basiques.
- **V2** — Refonte complète de l'interface (design sombre, animations, responsive), ajout du dashboard, de l'authentification Firebase, et extension à 11 outils de révision interactifs.
- **V3** — Migration multi-utilisateur : passage de localStorage à Firestore pour le stockage des cours, synchronisation en temps réel entre les comptes, système de classes avec chat et gestion des membres, page d'aide avec formulaire de retour, règles de sécurité Firestore, mode sombre permanent, et corrections générales.

---

## Fonctionnalités

### 🔐 Authentification & Comptes
- Inscription et connexion par email/mot de passe
- Connexion via Google
- Profil modifiable (prénom, nom)
- Réinitialisation du mot de passe
- Vérification d'email obligatoire
- Espace personnel sécurisé par Firebase Auth

### 📚 Gestion de cours collaborative
- Ajout, modification et suppression de cours
- Filtres par filière (générale, technologique), année (2nde, 1ère, terminale), spécialité et matière
- Tri par date, titre ou matière
- Stockage Firestore synchronisé entre tous les utilisateurs
- Fallback localStorage en cas d'indisponibilité Firestore
- Pièces jointes (URLs de fichiers)
- Partage de cours par lien direct

### 👥 Espaces de classe
- Création de classe avec code d'invitation unique
- Rejoindre une classe par code
- **Activation/Désactivation** d'une classe — mode vue filtrée
- **Chat en temps réel** dans chaque classe (Firestore `onSnapshot`)
- **Liste des membres** avec avatars et badges (créateur, vous)
- Gestion des membres : le créateur peut retirer un membre
- Copie du code d'invitation en un clic

### 💬 Discussions sur les cours
- Commentaires en temps réel sur chaque cours
- Affichage instantané des messages (Firestore `onSnapshot`)
- Horodatage des messages

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
- Animations fluides
- Interface responsive (mobile + desktop)
- Navigation par sidebar
- Service Worker pour mise en cache et résilience

---

## Architecture du projet

```
├── firebase.json                  ← Configuration Firebase Hosting
├── firestore.rules                ← Règles de sécurité Firestore
├── .firebaserc                    ← Projet Firebase
├── server.js                      ← Serveur HTTP local (Node.js)
├── package.json                   ← Métadonnées du projet
│
└── public/
    ├── index.html                 ← Landing page
    ├── 404.html                   ← Page d'erreur personnalisée
    ├── contact.html               ← Page de contact
    ├── favicon.svg                ← Icône du site
    ├── sw.js                      ← Service Worker
    │
    ├── auth/
    │   ├── Login_Internate.html          ← Connexion
    │   └── Register_internate.html       ← Inscription
    │
    ├── dashboard/
    │   └── Connected_internate.html      ← Tableau de bord
    │
    ├── courses/
    │   └── Ressources_ex.html            ← Gestion des cours (CRUD)
    │
    ├── classes/
    │   └── index.html                    ← Espaces de classe + chat
    │
    ├── profile/
    │   └── index.html                    ← Profil utilisateur
    │
    ├── help/
    │   └── index.html                    ← Aide & formulaire de retour
    │
    ├── legal/
    │   └── Legal.html                    ← Conditions d'utilisation
    │
    ├── tools/                            ← 11 outils de révision
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
    │   ├── style.css                     ← Styles globaux
    │   └── theme.css                     ← Variables et thème sombre
    │
    └── js/
        ├── firebase-config.js            ← 🔑 Clés Firebase (ignoré par git)
        ├── firebase-config.example.js    ← Modèle à remplir
        ├── pdf-export.js                 ← Export PDF
        └── theme.js                      ← Gestion du thème
```

---

## Technologies

| Technologie | Rôle |
|-------------|------|
| **Firebase Auth** | Authentification (email + Google) |
| **Firebase Firestore** | Base de données (cours, classes, messages, commentaires) |
| **Firebase Hosting** | Hébergement et déploiement |
| **Vanilla JS** | Aucun framework — JavaScript pur |
| **CSS3** | Styles globaux + variables CSS |
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
```

### Configuration Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un projet (ou utiliser "internate")
3. Activer **Authentication** → Email/Password + Google
4. Activer **Firestore Database** → Démarrer en mode test
5. Copier les clés dans `public/js/firebase-config.js`
6. Déployer les règles Firestore : `firebase deploy --only firestore:rules`
7. Ajouter les domaines d'hébergement dans Authentication → Authorized domains

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

## Licence

MIT © 2026 Internate

---

## Contact

- Site : [https://internate.web.app](https://internate.web.app)
- Aide : [https://internate.web.app/help/](https://internate.web.app/help/)
- Email : [internatesupport@gmail.com](mailto:internatesupport@gmail.com)
