# RAPPORT DÉTAILLÉ — INTERNATE V3

**Version :** 3.0  
**Dernière mise à jour :** Mai 2026  
**Site :** https://internate.web.app  
**Contact :** internatesupport@gmail.com  
**GitHub :** https://github.com/Crypthium123/INTERNATE  
**Formulaire retour :** https://forms.gle/KzNnZrZNkXEyJFV16  

---

## TABLE DES MATIÈRES

1. [ARCHITECTURE GÉNÉRALE](#1-architecture-générale)
2. [LANDING PAGE (index.html)](#2-landing-page-indexhtml)
3. [PAGE 404](#3-page-404)
4. [AUTHENTIFICATION](#4-authentification)
5. [DASHBOARD](#5-dashboard)
6. [GESTION DES COURS](#6-gestion-des-cours)
7. [ESPACES DE CLASSE](#7-espaces-de-classe)
8. [PROFIL UTILISATEUR](#8-profil-utilisateur)
9. [PAGE D'AIDE](#9-page-daide)
10. [OUTILS DE RÉVISION](#10-outils-de-révision)
11. [PAGES LÉGALES](#11-pages-légales)
12. [CSS GLOBAL](#12-css-global)
13. [JAVASCRIPT GLOBAL](#13-javascript-global)
14. [INFRASTRUCTURE FIREBASE](#14-infrastructure-firebase)
15. [BASE DE DONNÉES FIRESTORE](#15-base-de-données-firestore)
16. [RÈGLES DE SÉCURITÉ](#16-règles-de-sécurité)
17. [FLUX UTILISATEUR DÉTAILLÉS](#17-flux-utilisateur-détaillés)
18. [GESTION DES ERREURS](#18-gestion-des-erreurs)
19. [DÉPLOIEMENT](#19-déploiement)

---

## 1. ARCHITECTURE GÉNÉRALE

### 1.1 Présentation

Internate est une application web éducative monopage (multi-pages sans framework) exclusivement en **vanilla HTML5 / CSS3 / JavaScript (ES6+)**. Aucune dépendance前端 (React, Vue, Angular, etc.). Le backend est entièrement géré par **Firebase** (Auth + Firestore + Hosting).

### 1.2 Principes d'architecture

| Principe | Description |
|----------|-------------|
| Aucun framework | Tout le code est du JavaScript pur, sans bibliothèque前端 |
| Stockage cloud | Firebase Firestore comme source de vérité |
| Fallback local | localStorage utilisé quand Firestore est indisponible |
| Auth centralisée | Firebase Auth gère toutes les sessions |
| Design sombre permanent | Pas de toggle clair/sombre |
| Pages autonomes | Chaque page est un HTML complet avec son CSS et JS embarqués |
| Pas de routeur | Navigation par liens HTML standards |

### 1.3 Arborescence complète des fichiers

```
V2/INTERNATE-main/
│
├── firebase.json                  # Configuration Firebase Hosting + Firestore + règles
├── firestore.rules                # Règles de sécurité Firestore
├── .firebaserc                    # Association au projet Firebase "internate"
├── .gitignore                     # Fichiers exclus du versionnement
│
├── server.js                      # Serveur HTTP local (Node.js, port 3000)
├── package.json                   # Métadonnées du projet Node
├── demarrer.bat                   # Script de démarrage Windows (double-clic)
├── stop.bat                       # Script d'arrêt Windows
├── SECURITY.md                    # Politique de sécurité
├── README.md                      # Documentation du projet
│
└── public/                        # RACINE DU SITE (ce qui est déployé)
    │
    ├── index.html                 # LANDING PAGE (page d'accueil publique)
    ├── 404.html                   # PAGE D'ERREUR 404
    ├── favicon.svg                # Icône du site
    ├── sw.js                      # Service Worker (cache statique)
    │
    ├── auth/                      # DOSSIER AUTHENTIFICATION
    │   ├── Login_Internate.html   # Page de connexion
    │   └── Register_internate.html# Page d'inscription
    │
    ├── dashboard/
    │   └── Connected_internate.html # Tableau de bord connecté
    │
    ├── courses/
    │   └── Ressources_ex.html     # Gestion des cours (CRUD + discussion + export)
    │
    ├── classes/
    │   └── index.html             # Espaces de classe
    │
    ├── profile/
    │   └── index.html             # Profil utilisateur
    │
    ├── help/
    │   └── index.html             # Centre d'aide + FAQ
    │
    ├── legal/
    │   └── Legal.html             # Mentions légales & CGU
    │
    ├── tools/                     # 11 OUTILS DE RÉVISION
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
    │   ├── style.css             # Styles globaux (navbar, footer, boutons, animations)
    │   └── theme.css             # Variables CSS du thème (couleurs, espacements, ombres)
    │
    └── js/
        ├── firebase-config.js    # 🔑 Clés Firebase (ignoré par Git)
        ├── firebase-config.example.js # Modèle des clés
        ├── pdf-export.js         # Fonction d'export PDF (utilisée par plusieurs outils)
        └── theme.js              # Script du thème (applique les variables CSS)
```

### 1.4 Technologies utilisées

| Technologie | Version | Rôle |
|-------------|---------|------|
| Firebase Auth | 10.7.0 (compat) | Authentification email/Google |
| Firebase Firestore | 10.7.0 (compat) | Base de données NoSQL |
| Firebase Hosting | - | Hébergement CDN |
| HTML5 | - | Structure des pages |
| CSS3 | - | Styles, animations, responsive |
| JavaScript ES6+ | - | Logique applicative |
| Google Fonts | - | Polices Syne + DM Sans |
| Google Forms | - | Formulaire de retour utilisateur |

---

## 2. LANDING PAGE (index.html)

### 2.1 Structure HTML

La page d'accueil est structurée en sections verticales :

```
body
├── div.bg-orbs (fond animé)
│   ├── div.orb.orb-1
│   ├── div.orb.orb-2
│   └── div.orb.orb-3
├── nav (barre de navigation)
│   ├── a.logo → index.html
│   ├── div.nav-links
│   │   ├── a → Login_Internate.html
│   │   └── a → Register_internate.html
│   └── div.nav-cta
│       ├── a.btn-outline → Login
│       └── a.btn-primary → Register
├── section.hero
│   ├── span.hero-badge "🌟 Plateforme éducative"
│   ├── h1 "Internate — La connaissance, partagée."
│   ├── p (sous-titre)
│   └── div.hero-cta
│       ├── a.btn-primary → Register
│       └── a.btn-outline → Login
├── section.section (stats)
│   └── div.stats-bar
│       ├── div.stat-item × 4
├── section.section (features)
│   └── div.features-grid
│       ├── div.feature-card × 3
├── section.tools-section (outils)
│   └── div.tools-inner
│       └── div.tools-list
│           ├── div.tool-item × 11
├── section.cta-section
│   ├── h2 "Prêt à réviser ?"
│   ├── p
│   └── div.cta-buttons
│       ├── a.btn-primary → Register
│       └── a.btn-outline → Login
└── footer
    ├── div.footer-links
    └── p.copyright
```

### 2.2 Éléments détaillés

#### 2.2.1 Arrière-plan (bg-orbs)

```css
/* 3 orbes animées en arrière-plan */
.orb-1 { /* violette, 500×500px, position top-left, animation float 8s */ }
.orb-2 { /* verte, 400×400px, position bottom-right, animation float 10s */ }
.orb-3 { /* rose, 350×350px, position center, animation float 12s */ }
/* animation float : translation aléatoire + rotation douce */
```

#### 2.2.2 Navigation (nav)

```css
/* Design : fixe en haut, fond semi-transparent avec backdrop-filter blur */
/* Sur mobile (<900px) : .nav-links disparaît (display:none) */
/* Boutons CTA : .btn-outline (bordure) et .btn-primary (plein) */
```

#### 2.2.3 Hero section

Le hero est le premier bloc visible. Il contient :
- Un badge "🌟 Plateforme éducative" avec fond violet transparent
- Un titre principal en deux lignes avec dégradé violet-vert
- Un sous-titre explicatif
- Deux boutons d'appel à l'action

```css
.hero h1 {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2.8rem, 6vw, 5rem);
  background: var(--gen-gradient); /* dégradé linéaire #6c63ff → #00d4aa */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### 2.2.4 Section statistiques

```html
<div class="stats-bar">
  <div class="stat-item">
    <div class="stat-number">50+</div>
    <div class="stat-label">Cours disponibles</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">11</div>
    <div class="stat-label">Outils intégrés</div>
  </div>
  <!-- ... -->
</div>
```

Les statistiques sont décoratives (valeur fixes) sur la landing page.

#### 2.2.5 Section features

Trois cartes disposées en grille :
1. **🌐 Multiplateforme** : accessible sur tous les appareils
2. **🧠 Outils intelligents** : 11 outils de révision interactifs
3. **🎁 Gratuit & ouvert** : 100% gratuit, sans abonnement

Chaque carte a :
- Une icône emoji
- Un titre
- Une description
- Une animation au scroll (classe `.reveal`)

#### 2.2.6 Section outils

Liste verticale des 11 outils avec :
- Icône dans un cercle coloré
- Nom de l'outil
- Description courte
- Effet de survol (fond illuminé)

Utilise `.tools-list` avec des `.tool-item` en flexbox.

#### 2.2.7 Appel à l'action final

```html
<section class="cta-section">
  <h2>Prêt à réviser ?</h2>
  <p>Rejoins Internate et accède à tous tes outils gratuitement.</p>
  <div class="cta-buttons">
    <a href="auth/Register_internate.html" class="btn btn-primary">C'est parti →</a>
    <a href="auth/Login_Internate.html" class="btn btn-outline">J'ai déjà un compte</a>
  </div>
</section>
```

#### 2.2.8 Footer

```html
<footer>
  <div class="footer-links">
    <a href="auth/Login_Internate.html">Connexion</a>
    <a href="auth/Register_internate.html">Inscription</a>
    <a href="legal/Legal.html">Mentions légales</a>
    <a href="contact.html">Contact</a>
  </div>
  <p class="copyright">© 2026 Internate — La connaissance, partagée.</p>
</footer>
```

### 2.3 Animations

```css
/* Animation au scroll (intersection observer) */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
```

### 2.4 JavaScript embarqué

```javascript
// Intersection Observer pour les animations au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### 2.5 Responsive Design

| Breakpoint | Changements |
|------------|-------------|
| ≤900px | Nav links cachés, hero réduit, features en 1 colonne, stats wrap |
| ≤600px | Padding réduit, tailles de police diminuées, boutons compacts |
| ≤400px | Hero encore réduit, features compacts, nav centrée |

---

## 3. PAGE 404

### 3.1 Structure

```html
<body>
  <div class="container">
    <div class="error-code">404</div>
    <h1>Page introuvable</h1>
    <p>Cette page n'existe pas ou a été déplacée.</p>
    <a href="index.html" class="btn">Retour à l'accueil</a>
  </div>
</body>
```

### 3.2 Design
- Fond sombre, grand "404" avec dégradé violet-vert
- Animation de fade-in
- Bouton de retour à l'accueil
- Responsive (mobile friendly)

---

## 4. AUTHENTIFICATION

### 4.1 Page de connexion (Login_Internate.html)

#### 4.1.1 Structure HTML détaillée

```
body (grid 2 colonnes)
├── div.left-panel (panneau gauche - informatif)
│   ├── a.panel-logo → index.html (logo "Internate")
│   └── div.panel-content
│       ├── div.panel-icon 🔐
│       ├── h2 "Heureux de te revoir !"
│       ├── p (message d'accueil)
│       └── div.panel-features
│           ├── div × 3 (features liste)
│           └── a.panel-link → Register_internate.html
│
└── div.right-panel (panneau droit - formulaire)
    ├── div.form-container
    │   ├── div.form-header
    │   │   ├── h1 "Connexion"
    │   │   └── p "Connecte-toi pour continuer"
    │   ├── div#loginAlert.alert.alert-error (caché par défaut)
    │   ├── form#loginForm
    │   │   ├── div.form-group
    │   │   │   ├── label "Email"
    │   │   │   └── input#loginEmail (type=email, required)
    │   │   ├── div.form-group
    │   │   │   ├── label "Mot de passe"
    │   │   │   └── input#loginPassword (type=password, required)
    │   │   ├── div.form-links
    │   │   │   └── a → "#" "Mot de passe oublié ?" (id=forgotPassword)
    │   │   └── button.btn-submit (type=submit) "Se connecter"
    │   ├── div.divider
    │   │   └── span "ou"
    │   └── button.btn-google (onclick=loginGoogle)
    │       └── img (logo Google) + "Continuer avec Google"
    └── div.form-footer
        └── "Pas encore de compte ?" a → Register_internate.html
```

#### 4.1.2 Fonctions JavaScript

##### `loginGoogle()`

```javascript
function loginGoogle() {
  // 1. Création du provider Google
  const provider = new firebase.auth.GoogleAuthProvider();
  // 2. Redirection vers Google (popup désactivé pour éviter les bloqueurs)
  firebase.auth().signInWithRedirect(provider);
}
```

**Détail :** Utilise `signInWithRedirect` plutôt que `signInWithPopup` car les popups sont souvent bloqués par les navigateurs. Après authentification, Firebase redirige automatiquement vers la page d'origine et `getRedirectResult()` récupère les infos.

##### Connexion email

```javascript
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  // Validation
  if (!email || !password) {
    showError('Veuillez remplir tous les champs.');
    return;
  }
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // Redirection vers le dashboard
    window.location.href = '../dashboard/Connected_internate.html';
  } catch (error) {
    // Gestion des erreurs Firebase traduites en français
    handleAuthError(error);
  }
});
```

##### Mot de passe oublié

```javascript
document.getElementById('forgotPassword').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  if (!email) {
    showError('Entre ton email d\'abord.');
    return;
  }
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    showSuccess('Email de réinitialisation envoyé ! Vérifie tes spams.');
  } catch (error) {
    handleAuthError(error);
  }
});
```

##### `handleAuthError(error)` — Traduction des erreurs Firebase

```javascript
function handleAuthError(error) {
  const messages = {
    'auth/user-not-found': 'Aucun compte avec cet email.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-email': 'Email invalide.',
    'auth/too-many-requests': 'Trop de tentatives. Réessaie plus tard.',
    'auth/email-already-in-use': 'Cet email est déjà utilisé.',
    'auth/weak-password': 'Mot de passe trop faible (6 caractères min).',
    'auth/popup-closed-by-user': 'Connexion annulée.'
  };
  showError(messages[error.code] || 'Erreur : ' + error.message);
}
```

#### 4.1.3 CSS détaillé

```css
/* Disposition en grille 2 colonnes (60% formulaire, 40% panneau) */
body {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  min-height: 100vh;
}

/* Panneau gauche : fond dégradé, centré verticalement */
.left-panel {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

/* Effet de forme géométrique en arrière-plan */
.left-panel::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  top: -100px;
  right: -100px;
}

/* Formulaire centré verticalement */
.right-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
}

/* Conteneur du formulaire (max 420px) */
.form-container {
  width: 100%;
  max-width: 420px;
}

/* Bouton submit avec dégradé */
.btn-submit {
  width: 100%;
  padding: 14px;
  background: var(--gen-gradient);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(108,99,255,0.3);
}

/* Bouton Google */
.btn-google {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
```

#### 4.1.4 Responsive

| Breakpoint | Changements |
|------------|-------------|
| ≤900px | Grille passe en 1 colonne, panneau gauche caché, formulaire plein écran |
| ≤400px | Padding réduit, champs plus compacts |

### 4.2 Page d'inscription (Register_internate.html)

Structure similaire à la connexion avec :
- **4 champs** : prénom, nom, email, mot de passe, confirmation
- Validation : prénom/nom requis, mots de passe identiques, 6 caractères min
- Création du compte + sauvegarde du profil Firestore

#### Fonction inscription

```javascript
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const prenom = document.getElementById('regPrenom').value.trim();
  const nom = document.getElementById('regNom').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;

  // Validations
  if (!prenom || !nom) { showError('Prénom et nom requis.'); return; }
  if (password.length < 6) { showError('6 caractères minimum.'); return; }
  if (password !== confirm) { showError('Les mots de passe ne correspondent pas.'); return; }

  try {
    // 1. Création Firebase Auth
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    // 2. Sauvegarde du profil dans Firestore
    await db.collection('users').doc(cred.user.uid).set({
      uid: cred.user.uid,
      email: email,
      prenom: prenom,
      nom: nom
    });
    // 3. Stockage local
    localStorage.setItem('currentUser', JSON.stringify({
      uid: cred.user.uid,
      email: email,
      prenom: prenom,
      nom: nom
    }));
    // 4. Redirection
    window.location.href = '../dashboard/Connected_internate.html';
  } catch (error) {
    handleAuthError(error);
  }
});
```

---

## 5. DASHBOARD (Connected_internate.html)

### 5.1 Structure HTML complète

```
body
├── aside.sidebar (navigation fixe gauche)
│   ├── a.sidebar-logo → "internate"
│   ├── div.nav-section-label "Principal"
│   ├── a.nav-item.active → Dashboard
│   ├── a.nav-item → Mes cours
│   ├── a.nav-item → Classes
│   ├── div.nav-section-label "Outils"
│   ├── a.nav-item × 11 (outils)
│   ├── div.sidebar-footer
│   │   ├── div.user-card
│   │   │   ├── div.avatar#avatarEl "?"
│   │   │   └── div.user-info
│   │   │       ├── strong#userNameEl "Utilisateur"
│   │   │       └── span#userEmailEl "—"
│   │   ├── button.logout-btn (déconnexion)
│   │   └── a.logout-btn → contact.html
│   └── (bouton toggle hamburger sur mobile)
│
├── button.menu-toggle ☰ (mobile seulement)
│
└── main.main
    ├── div.topbar
    │   ├── div.greeting
    │   │   ├── h1#greetingTitle "Bonjour, Prénom 👋"
    │   │   └── p#greetingDate (date du jour formatée)
    │   └── div.topbar-right
    │       └── div.search-bar
    │           ├── span 🔍
    │           └── input#dashboardSearch (placeholder="Rechercher…")
    │
    ├── div.stats-row
    │   ├── div.stat-card × 4
    │       ├── div.card-icon 📚
    │       ├── div.card-value (nombre dynamique)
    │       └── div.card-label (libellé)
    │
    ├── div.section-header
    │   ├── h2 "Outils de révision"
    │   └── span (vide)
    │
    ├── div.tools-grid
    │   └── a.tool-card × 11
    │       ├── div.tool-card-icon (emoji)
    │       ├── div.tool-card-name
    │       └── div.tool-card-desc
    │
    ├── div.section-header
    │   ├── h2 "Derniers cours"
    │   └── a.see-all "Tous les cours →"
    │
    └── div.cours-grid#dashboardCoursGrid
```

### 5.2 JavaScript détaillé

#### 5.2.1 Initialisation

```javascript
// Firebase Auth listener
auth.onAuthStateChanged(async function(user) {
  if (user) {
    // Masquer le loader
    document.getElementById('loadingOverlay').classList.add('hidden');
    
    // Charger les données utilisateur
    let userData = {};
    try {
      const userDoc = await db.collection('users').doc(user.uid).get();
      if (userDoc.exists) userData = userDoc.data();
    } catch (e) {
      // Fallback localStorage si Firestore indisponible
      console.warn("Firestore indisponible:", e.message);
      userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    
    // Sauvegarde locale
    localStorage.setItem("currentUser", 
      JSON.stringify({ uid: user.uid, email: user.email, ...userData }));
    
    // Mise à jour de l'interface
    const name = userData.prenom || user.displayName || "Utilisateur";
    document.getElementById("avatarEl").textContent = initials;
    document.getElementById("userNameEl").textContent = `${userData.prenom || ""} ${userData.nom || ""}`.trim() || name;
    document.getElementById("userEmailEl").textContent = userData.email || user.email || "";
    
    // Salutation personnalisée avec horaire
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
    document.getElementById("greetingTitle").textContent = `${greeting}, ${name} 👋`;
    
    // Date formatée en français
    const dateStr = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    document.getElementById('greetingDate').textContent = 
      dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    
    // Charger les cours du dashboard
    loadDashboardCourses();
  } else {
    window.location.href = "../auth/Login_Internate.html";
  }
});
```

#### 5.2.2 Filtre de recherche (`filterDashboard`)

```javascript
function filterDashboard() {
  const q = document.getElementById('dashboardSearch').value.toLowerCase();
  // Parcourt tous les outils et cours
  document.querySelectorAll('.tool-card, .cours-card').forEach(el => {
    // Cache/affiche selon si le texte contient la recherche
    el.style.display = el.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
```

#### 5.2.3 Chargement des cours dashboard (`loadDashboardCourses`)

```javascript
function loadDashboardCourses() {
  const grid = document.getElementById('dashboardCoursGrid');
  // Récupération depuis localStorage (déjà sync depuis Firestore par la page cours)
  const all = JSON.parse(localStorage.getItem('internate_courses') || '[]');
  // 3 derniers cours
  const recent = all.slice(-3).reverse();
  
  // Mise à jour du compteur de stats
  document.querySelector('#statsCoursCount').textContent = all.length || '0';
  
  if (!recent.length) {
    grid.innerHTML = '<div class="empty-state">...<p>Aucun cours pour le moment.</p></div>';
    return;
  }
  
  // Rendu des cartes (similaire à la page cours mais sans boutons d'action)
  grid.innerHTML = recent.map(c => `...`).join('');
}
```

#### 5.2.4 Sidebar toggle (mobile)

```javascript
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}
// Fermeture au clic en dehors
document.addEventListener('click', function(e) {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.menu-toggle');
  if (window.innerWidth <= 900 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});
```

### 5.3 CSS détaillé

#### 5.3.1 Sidebar

```css
/* Sidebar fixe à gauche, 240px de large */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 28px 16px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox - masquer scrollbar */
  -ms-overflow-style: none; /* IE - masquer scrollbar */
  z-index: 50;
}

/* Logo */
.sidebar-logo {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  background: var(--gen-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 4px 10px 20px;
  text-decoration: none;
  display: block;
}

/* Navigation items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.18s;
  text-decoration: none;
}
.nav-item:hover { 
  color: var(--text); 
  background: rgba(255,255,255,0.05); 
}
.nav-item.active { 
  color: var(--accent); 
  background: rgba(108,99,255,0.1); 
  font-weight: 600; 
}

/* User card en bas de sidebar */
.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gen-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  flex-shrink: 0;
}
```

#### 5.3.2 Stats cards

```css
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  transition: all 0.22s;
  border-left: 3px solid var(--card-accent, var(--accent));
}
.stat-card:hover {
  border-color: var(--border2);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.card-icon { font-size: 1.6rem; margin-bottom: 8px; }
.card-value { 
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--card-accent, var(--accent));
}
.card-label {
  font-size: 0.78rem;
  color: var(--muted);
  margin-top: 2px;
}
```

#### 5.3.3 Tool cards

```css
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 40px;
}

.tool-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px 18px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.22s;
  cursor: pointer;
}
.tool-card:hover {
  border-color: var(--tool-color, var(--accent));
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  background: var(--tool-bg);
}

.tool-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--tool-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-bottom: 12px;
}

.tool-card-name {
  font-weight: 600;
  font-size: 0.92rem;
  margin-bottom: 4px;
}

.tool-card-desc {
  font-size: 0.75rem;
  color: var(--muted);
  line-height: 1.4;
}
```

### 5.4 Responsive Dashboard

| Breakpoint | Changements |
|------------|-------------|
| ≤900px | Sidebar cachée (transform: translateX(-100%)), hamburger visible, grilles 2 colonnes |
| ≤600px | Stats 1 colonne, outils 1 colonne, cours 1 colonne, padding réduit |
| ≤400px | Stats compacts, sidebar 220px |

---

## 6. GESTION DES COURS (Ressources_ex.html)

### 6.1 Structure HTML

```
body
├── aside.sidebar (identique au dashboard)
├── button.menu-toggle ☰
└── main.main
    ├── div.page-header
    │   ├── div
    │   │   ├── h1 "📚 Mes cours"
    │   │   └── p "Ressources et supports pédagogiques"
    │   ├── button.btn-upload "📥 JSON" (onclick=exportJSON)
    │   ├── button.btn-upload "📥 CSV" (onclick=exportCSV)
    │   └── button.btn-upload "＋ Ajouter un cours"
    │
    ├── div.filter-bar
    │   ├── select#filterFiliere × 3 options
    │   ├── select#filterClasse (classes disponibles)
    │   ├── select#filterAnnee × 4 options
    │   ├── select#filterSpecialite (dynamique)
    │   ├── select#filterMatiere (dynamique)
    │   ├── button.filter-reset "Réinitialiser"
    │   ├── span#filterCount "0 cours"
    │   └── select#sortBy × 4 options (date, titre, matière)
    │
    ├── div.cours-grid#coursGrid
    │   └── div.cours-card × N (généré par JS)
    │
    ├── div#discussionSection (caché par défaut)
    │   ├── div.section-title
    │   │   ├── span "💬 Discussion"
    │   │   └── button "Fermer"
    │   └── div#discussionArea
    │       ├── div.empty-state (si aucun commentaire)
    │       ├── div.comment × N (généré par JS)
    │       └── div.comment-input-area
    │           ├── textarea#commentInput
    │           └── button "Envoyer"
    │
    ├── div.section-title "Accès rapide aux outils"
    └── div.tools-row
        └── a.tool-pill × 11
```

### 6.2 Modèle de données (Firestore collection `cours`)

```javascript
{
  id: "l3x8k2m9",           // ID unique local (Date.now().toString(36) + random)
  firestoreId: "abc123...",  // ID Firestore (doc.id)
  title: "Les vecteurs",     // Titre du cours
  filiere: "generale",       // "generale" | "technologique"
  annee: "1ere",             // "2nde" | "1ere" | "terminale"
  specialite: "Mathématiques", // Spécialité ou série
  matiere: "mathematiques",  // Identifiant matière
  matiereLabel: "Mathématiques", // Libellé affiché
  matiereIcon: "📐",         // Emoji
  matiereColor: "#6c63ff",   // Couleur
  description: "Cours sur les vecteurs dans le plan", // Description
  fileUrl: "https://...pdf", // URL du fichier
  fileName: "vecteurs.pdf",  // Nom du fichier
  dateAdded: "2026-05-10T14:30:00.000Z", // Date ISO
  userId: "eleve@email.com", // Email du créateur
  classId: "class_abc123"    // ID de la classe (optionnel)
}
```

### 6.3 JavaScript détaillé

#### 6.3.1 Variables globales

```javascript
const STORAGE_KEY = 'internate_courses';
let firestoreReady = false;
let editId = null;
const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
```

#### 6.3.2 Gestion du stockage local

```javascript
function getLocalCourses() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveLocalCourses(courses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}
```

#### 6.3.3 Synchronisation Firestore

```javascript
// Charger les cours depuis Firestore
async function syncCoursesFromFirestore() {
  if (typeof db === 'undefined') return;
  try {
    const snapshot = await db.collection('cours')
      .orderBy('dateAdded', 'desc')
      .get();
    const courses = [];
    snapshot.forEach(doc => {
      const d = doc.data();
      courses.push({ id: doc.id, firestoreId: doc.id, ...d });
    });
    // Synchronisation : on remplace le localStorage par Firestore
    saveLocalCourses(courses);
    firestoreReady = true;
    return courses;
  } catch (e) {
    if (e.code !== 'failed-precondition' && e.code !== 'unavailable') {
      console.warn('Firestore sync error:', e.message);
    }
    return null; // Fallback localStorage
  }
}

// Sauvegarder un cours dans Firestore
async function saveToFirestore(course) {
  if (typeof db === 'undefined') return false;
  try {
    if (course.firestoreId) {
      // UPDATE : on enlève les champs techniques avant de sauver
      const { firestoreId, id, ...data } = course;
      await db.collection('cours').doc(firestoreId).set(data, { merge: true });
    } else {
      // CREATE
      const { firestoreId, id, ...data } = course;
      const ref = await db.collection('cours').add(data);
      course.firestoreId = ref.id;
      course.id = ref.id;
    }
    return true;
  } catch (e) {
    console.warn('Firestore save error:', e.message);
    return false;
  }
}

// Supprimer un cours de Firestore
async function deleteFromFirestore(firestoreId) {
  if (typeof db === 'undefined' || !firestoreId) return;
  try {
    await db.collection('cours').doc(firestoreId).delete();
  } catch (e) {
    console.warn('Firestore delete error:', e.message);
  }
}
```

#### 6.3.4 CRUD complet

##### Ajout/Modification (`addCourse`)

```javascript
function addCourse() {
  // 1. Lecture des champs du formulaire
  const title = document.getElementById('formTitle').value.trim();
  const filiere = document.getElementById('formFiliere').value;
  const annee = document.getElementById('formAnnee').value;
  const specialite = document.getElementById('formSpecialite').value;
  const matiere = document.getElementById('formMatiere').value;
  const description = document.getElementById('formDescription').value.trim();
  const fileUrl = document.getElementById('formFileUrl').value.trim();
  const fileName = document.getElementById('formFileName').value.trim();

  // 2. Validations
  if (!title) { showToast('Veuillez saisir un titre.', 'error'); return; }
  if (!filiere) { showToast('Veuillez sélectionner une filière.', 'error'); return; }
  if (!annee) { showToast('Veuillez sélectionner une année.', 'error'); return; }
  if (!matiere) { showToast('Veuillez sélectionner une matière.', 'error'); return; }

  // 3. Récupération de la matière
  const matiereObj = MATIERES.find(m => m.value === matiere) || MATIERES[MATIERES.length - 1];
  const now = new Date().toISOString();

  if (editId) {
    // === MODE MODIFICATION ===
    const idx = courses.findIndex(c => c.id === editId);
    if (idx !== -1) {
      courses[idx] = {
        ...courses[idx],
        title, filiere, annee, specialite, matiere,
        matiereLabel: matiereObj.label,
        matiereIcon: matiereObj.icon,
        matiereColor: matiereObj.color,
        description, fileUrl, fileName: fileName || (fileUrl ? fileUrl.split('/').pop() : '')
      };
      saveCourses(courses);
      saveToFirestore(courses[idx]);
    }
    showToast('Cours modifié !', 'success');
  } else {
    // === MODE CRÉATION ===
    const newCourse = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title, filiere, annee, specialite, matiere,
      matiereLabel: matiereObj.label,
      matiereIcon: matiereObj.icon,
      matiereColor: matiereObj.color,
      description, fileUrl,
      fileName: fileName || (fileUrl ? fileUrl.split('/').pop() : ''),
      dateAdded: now,
      userId: user.email || 'unknown'
    };
    courses.push(newCourse);
    saveCourses(courses);
    saveToFirestore(newCourse);
    showToast('Cours ajouté !', 'success');
  }
  
  closeModal();
  renderCourses();
}
```

##### Suppression (`deleteCourse`)

```javascript
function deleteCourse(id) {
  showConfirm('Supprimer ce cours ?', () => {
    const all = getCourses();
    const target = all.find(c => c.id === id);
    const courses = all.filter(c => c.id !== id);
    saveCourses(courses);
    if (target) deleteFromFirestore(target.firestoreId || target.id);
    renderCourses();
    showToast('Cours supprimé.', 'success');
  });
}
```

##### Rendu des cours (`renderCourses`)

```javascript
function renderCourses() {
  const grid = document.getElementById('coursGrid');
  let courses = getCourses();
  
  // Application des filtres
  const filiere = document.getElementById('filterFiliere').value;
  const annee = document.getElementById('filterAnnee').value;
  const specialite = document.getElementById('filterSpecialite').value;
  const matiere = document.getElementById('filterMatiere').value;
  const classe = document.getElementById('filterClasse').value;
  const sort = document.getElementById('sortBy').value;
  
  courses = courses.filter(c => {
    if (filiere && c.filiere !== filiere) return false;
    if (annee && c.annee !== annee) return false;
    if (specialite && c.specialite !== specialite) return false;
    if (matiere && c.matiere !== matiere) return false;
    if (classe && c.classId !== classe) return false;
    return true;
  });
  
  // Tri
  courses.sort((a, b) => {
    if (sort === 'date-desc') return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sort === 'date-asc') return new Date(a.dateAdded) - new Date(b.dateAdded);
    if (sort === 'title') return (a.title || '').localeCompare(b.title || '');
    if (sort === 'matiere') return (a.matiereLabel || '').localeCompare(b.matiereLabel || '');
  });
  
  // Mise à jour du compteur
  document.getElementById('filterCount').textContent = `${courses.length} cours`;
  
  if (!courses.length) {
    grid.innerHTML = '<div class="empty-state">...</div>';
    return;
  }
  
  // Génération des cartes
  grid.innerHTML = courses.map(c => {
    // Couleur, métadonnées, section fichier, date, créateur
    return `
      <div class="cours-card" id="cours-${c.id}">
        <button class="edit-btn" onclick="openModal(...)">✎</button>
        <button class="delete-btn" onclick="deleteCourse('${c.id}')">✕</button>
        <button class="share-btn" onclick="shareCourse('${c.id}')">↗</button>
        <button class="discussion-btn" onclick="openDiscussion('${c.id}')">💬</button>
        <div class="cours-thumb" style="background:...">
          <span>${c.matiereIcon}</span>
          <div class="download-badge">${filiereLabel}</div>
        </div>
        <div class="cours-body">
          <div class="cours-matiere">${c.matiereLabel}</div>
          <div class="cours-title">${c.title}</div>
          ${c.description ? `<p>${c.description}</p>` : ''}
          <div class="cours-meta">${tags}${date}</div>
          <div class="cours-creator">👤 ${creator} ${!isOwner ? '<span>partagé</span>' : ''}</div>
        </div>
        ${fileSection}
      </div>`;
  }).join('');
}
```

#### 6.3.5 Partage de cours

```javascript
function shareCourse(id) {
  const url = window.location.origin + window.location.pathname + '#cours-' + id;
  navigator.clipboard.writeText(url).then(() => {
    showToast('🔗 Lien copié ! Partage-le avec tes camarades.', 'success');
  }).catch(() => {
    showToast('📋 Copie manuelle : ' + url, 'info');
  });
}

function checkUrlHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#cours-')) {
    const id = hash.replace('#cours-', '');
    const el = document.getElementById('cours-' + id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight');
        setTimeout(() => el.classList.remove('highlight'), 3000);
      }, 500);
    }
  }
}
```

#### 6.3.6 Discussion / Commentaires

```javascript
let currentDiscussionCourseId = null;

function openDiscussion(courseId) {
  currentDiscussionCourseId = courseId;
  document.getElementById('discussionSection').style.display = 'block';
  loadComments(courseId);
}

function closeDiscussion() {
  document.getElementById('discussionSection').style.display = 'none';
  currentDiscussionCourseId = null;
}

async function loadComments(courseId) {
  const area = document.getElementById('discussionArea');
  try {
    const snapshot = await db.collection('comments')
      .where('courseId', '==', courseId)
      .orderBy('timestamp', 'asc')
      .get();
    
    if (snapshot.empty) {
      area.innerHTML = `
        <div class="comment-input-area">
          <textarea id="commentInput" placeholder="Écris un commentaire..." rows="2"></textarea>
          <button onclick="addComment('${courseId}')">Envoyer</button>
        </div>
        <div class="empty-state"><p>Soyez le premier à commenter !</p></div>`;
      return;
    }
    
    let html = `
      <div class="comment-input-area">
        <textarea id="commentInput" placeholder="Écris un commentaire..." rows="2"></textarea>
        <button onclick="addComment('${courseId}')">Envoyer</button>
      </div>`;
    
    snapshot.forEach(doc => {
      const d = doc.data();
      const time = d.timestamp ? d.timestamp.toDate().toLocaleString('fr-FR') : '';
      html += `
        <div class="comment">
          <div class="comment-user">${d.userId}</div>
          <div class="comment-text">${d.text}</div>
          <div class="comment-time">${time}</div>
        </div>`;
    });
    
    area.innerHTML = html;
  } catch (e) {
    console.warn('Comments error:', e.message);
    area.innerHTML = '<div class="empty-state"><p>Erreur de chargement des commentaires.</p></div>';
  }
}

async function addComment(courseId) {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text) { showToast('Écris un message.', 'error'); return; }
  if (!firebase.auth().currentUser) { showToast('Connecte-toi pour commenter.', 'error'); return; }
  
  try {
    await db.collection('comments').add({
      courseId: courseId,
      userId: firebase.auth().currentUser.email,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    input.value = '';
    loadComments(courseId);
    showToast('💬 Commentaire ajouté !', 'success');
  } catch (e) {
    console.warn('Add comment error:', e.message);
    showToast('Erreur lors de l\'envoi.', 'error');
  }
}
```

#### 6.3.7 Export JSON / CSV

```javascript
function exportJSON() {
  const data = getCourses();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'internate_cours.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Export JSON téléchargé !', 'success');
}

function exportCSV() {
  const data = getCourses();
  if (!data.length) { showToast('Aucun cours à exporter.', 'error'); return; }
  
  // En-têtes CSV
  const headers = 'Titre,Matière,Filière,Année,Spécialité,Description,URL,Date';
  
  // Lignes (échappement des guillemets)
  const rows = data.map(c => 
    `"${c.title || ''}","${c.matiereLabel || ''}","${c.filiere || ''}","${c.annee || ''}",` +
    `"${c.specialite || ''}","${(c.description || '').replace(/"/g, '""')}","${c.fileUrl || ''}","${c.dateAdded || ''}"`
  );
  
  // UTF-8 BOM pour compatibilité Excel
  const csv = '\uFEFF' + [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'internate_cours.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Export CSV téléchargé !', 'success');
}
```

#### 6.3.8 Gestion des filtres

```javascript
function applyFilters() {
  updateFilterSpecialite();
  renderCourses();
}

function resetFilters() {
  document.getElementById('filterFiliere').value = '';
  document.getElementById('filterClasse').value = '';
  document.getElementById('filterAnnee').value = '';
  document.getElementById('filterSpecialite').innerHTML = '';
  document.getElementById('filterMatiere').value = '';
  document.getElementById('sortBy').value = 'date-desc';
  applyFilters();
}

function updateFilterSpecialite() {
  // Met à jour les options de spécialité selon filière + année
  const filiere = document.getElementById('filterFiliere').value;
  const annee = document.getElementById('filterAnnee').value;
  const select = document.getElementById('filterSpecialite');
  
  select.innerHTML = '<option value="">Toutes spécialités/séries</option>';
  
  if (!filiere || !annee || annee === '2nde') return;
  
  let options = [];
  if (filiere === 'generale' && SPECIALITES_GENERALE[annee]) {
    options = SPECIALITES_GENERALE[annee];
  } else if (filiere === 'technologique' && SERIES_TECHNOLOGIQUE[annee]) {
    options = SERIES_TECHNOLOGIQUE[annee];
  }
  
  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    select.appendChild(opt);
  });
}
```

#### 6.3.9 Modal d'ajout/modification

```javascript
function openModal(course) {
  editId = null;
  document.getElementById('modalTitle').textContent = 'Ajouter un cours';
  document.getElementById('modalOverlay').classList.add('show');
  
  if (course) {
    // Mode édition : pré-remplir
    editId = course.id;
    document.getElementById('modalTitle').textContent = 'Modifier le cours';
    document.getElementById('formTitle').value = course.title || '';
    document.getElementById('formFiliere').value = course.filiere || '';
    updateFormSpecialite();
    document.getElementById('formAnnee').value = course.annee || '';
    setTimeout(() => {
      document.getElementById('formSpecialite').value = course.specialite || '';
    }, 0);
    document.getElementById('formMatiere').value = course.matiere || '';
    document.getElementById('formDescription').value = course.description || '';
    document.getElementById('formFileUrl').value = course.fileUrl || '';
    document.getElementById('formFileName').value = course.fileName || '';
  } else {
    // Mode création : formulaire vide
    document.getElementById('formTitle').value = '';
    document.getElementById('formFiliere').value = '';
    document.getElementById('formAnnee').value = '';
    document.getElementById('formSpecialite').innerHTML = '';
    document.getElementById('formMatiere').value = '';
    document.getElementById('formDescription').value = '';
    document.getElementById('formFileUrl').value = '';
    document.getElementById('formFileName').value = '';
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  editId = null;
}

// Fermeture au clic sur l'overlay
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
```

#### 6.3.10 Toast notifications

```javascript
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  
  // Auto-suppression après 3 secondes
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease both';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
```

#### 6.3.11 Modal de confirmation

```javascript
let confirmCallback = null;

function showConfirm(message, callback) {
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmOverlay').classList.add('show');
  confirmCallback = callback;
}

function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('show');
  confirmCallback = null;
}

document.getElementById('confirmBtn').addEventListener('click', () => {
  if (confirmCallback) confirmCallback();
  closeConfirm();
});
```

### 6.4 CSS spécifique aux cours

```css
/* Grille de cours */
.cours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

/* Carte de cours */
.cours-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  transition: all 0.25s;
}
.cours-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  border-color: var(--border2);
}

/* Vignette du cours (dégradé de couleur) */
.cours-thumb {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;
}

/* Badge filière */
.download-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
}

/* Boutons d'action (edit, delete, share, discussion) */
.edit-btn, .delete-btn, .share-btn, .discussion-btn {
  position: absolute;
  top: 10px;
  width: 30px; height: 30px;
  border-radius: 8px;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; /* Visible au survol uniquement */
  transition: all 0.2s;
  z-index: 2;
  backdrop-filter: blur(4px);
}
.cours-card:hover .edit-btn,
.cours-card:hover .delete-btn,
.cours-card:hover .share-btn,
.cours-card:hover .discussion-btn { opacity: 1; }

.edit-btn { right: 44px; color: var(--accent2); }
.delete-btn { right: 78px; color: var(--accent3); }
.share-btn { right: 10px; color: var(--accent); }
.discussion-btn { right: 112px; color: var(--accent4); }

/* Highlight d'un cours partagé */
.cours-card.highlight {
  animation: highlightPulse 1.5s ease;
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(108,99,255,0.2);
}
@keyframes highlightPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(108,99,255,0.2); }
  50% { box-shadow: 0 0 40px rgba(108,99,255,0.4); }
}

/* Barre de filtres */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 24px;
}

.filter-select {
  padding: 8px 12px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.82rem;
  min-width: 140px;
  cursor: pointer;
}

/* Modal */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  align-items: center;
  justify-content: center;
}
.modal-overlay.show { display: flex; }

.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  width: 520px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalIn 0.25s ease both;
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Commentaires */
.comment {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
.comment-user {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
}
.comment-text {
  font-size: 0.85rem;
  color: var(--text2);
  margin-top: 4px;
  line-height: 1.5;
}
.comment-time {
  font-size: 0.7rem;
  color: var(--muted);
  margin-top: 2px;
}
.comment-input-area {
  display: flex;
  gap: 8px;
  padding: 16px 0;
}
.comment-input-area textarea {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  resize: vertical;
  min-height: 44px;
}
.comment-input-area button {
  padding: 10px 20px;
  border-radius: 8px;
  background: var(--accent);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
```

### 6.5 Classes de matières

```javascript
const MATIERES = [
  { value: 'mathematiques', label: 'Mathématiques', icon: '📐', color: '#6c63ff' },
  { value: 'physique-chimie', label: 'Physique-Chimie', icon: '🧪', color: '#00d4aa' },
  { value: 'francais', label: 'Français', icon: '📖', color: '#ffa94d' },
  { value: 'histoire-geo', label: 'Histoire-Géographie', icon: '🌍', color: '#a78bfa' },
  { value: 'anglais', label: 'Anglais', icon: '🇬🇧', color: '#ff6b6b' },
  { value: 'espagnol', label: 'Espagnol', icon: '🇪🇸', color: '#f97316' },
  { value: 'allemand', label: 'Allemand', icon: '🇩🇪', color: '#eab308' },
  { value: 'svt', label: 'SVT', icon: '🌿', color: '#22c55e' },
  { value: 'nsi', label: 'NSI', icon: '💻', color: '#3b82f6' },
  { value: 'ses', label: 'SES', icon: '📊', color: '#ec4899' },
  { value: 'philosophie', label: 'Philosophie', icon: '🤔', color: '#8b5cf6' },
  { value: 'arts', label: 'Arts', icon: '🎨', color: '#f472b6' },
  { value: 'eps', label: 'EPS', icon: '🏃', color: '#14b8a6' }
];
```

### 6.6 Spécialités et séries

```javascript
const SPECIALITES_GENERALE = {
  '1ere': [
    'Histoire Géographie, Géopolitique et Sciences politiques',
    'Humanités, Littérature et Philosophie',
    'Langues, Littératures et Cultures Étrangères',
    'Littérature, Langues et Cultures de l\'Antiquité',
    'Mathématiques',
    'Numérique et Sciences Informatiques',
    'Sciences de la vie et de la Terre',
    'Sciences de l\'ingénieur',
    'Sciences Économiques et Sociales',
    'Physique Chimie',
    // ... (13 spécialités)
  ],
  'terminale': [ /* mêmes 13 spécialités */ ]
};

const SERIES_TECHNOLOGIQUE = {
  '1ere': ['STMG', 'ST2S', 'STHR', 'STI2D', 'STL', 'STD2A', 'S2TMD', 'STAV'],
  'terminale': ['STMG', 'ST2S', 'STHR', 'STI2D', 'STL', 'STD2A', 'S2TMD', 'STAV']
};
```

### 6.7 Initialisation

```javascript
// ---- INIT ----
const uploadBtn = document.querySelector('.btn-upload');
if (uploadBtn) uploadBtn.addEventListener('click', openModal);

// Remplissage du filtre matières
const matiereFilter = document.getElementById('filterMatiere');
MATIERES.forEach(m => {
  const opt = document.createElement('option');
  opt.value = m.value;
  opt.textContent = m.label;
  matiereFilter.appendChild(opt);
});

// Chargement des classes pour le filtre
loadClasses();

// Rendu initial
renderCourses();

// Vérification du hash URL (lien partagé)
checkUrlHash();
```

---

## 7. ESPACES DE CLASSE (classes/index.html)

### 7.1 Structure HTML

```
body
├── aside.sidebar
│   ├── a.sidebar-logo "internate"
│   ├── a.nav-item → Dashboard
│   ├── a.nav-item → Mes cours
│   ├── a.nav-item.active → Classes
│   ├── ... outils ...
│   └── sidebar-footer
├── button.menu-toggle ☰
└── main.main
    ├── div.page-header
    │   ├── h1 "👥 Espaces de classe"
    │   └── p "Crée ou rejoins une classe"
    ├── div.classes-actions
    │   ├── div.action-card (Créer)
    │   │   ├── h3 "🏫 Créer une classe"
    │   │   ├── input#createClassName
    │   │   └── button "Créer"
    │   └── div.action-card (Rejoindre)
    │       ├── h3 "🔑 Rejoindre une classe"
    │       ├── input#joinCode (maxlength=6, auto uppercase)
    │       └── button "Rejoindre"
    └── div.classes-grid#classesGrid
        └── div.class-card × N
            ├── div.class-name
            ├── div.class-code
            ├── div.class-members
            ├── span.active-badge (si classe active)
            ├── button "Activer"
            └── button "Supprimer" (creator only)
```

### 7.2 JavaScript complet

```javascript
// ---- CRÉATION ----
async function createClass() {
  const name = document.getElementById('createClassName').value.trim();
  if (!name) { showToast('Donne un nom à ta classe.', 'error'); return; }
  
  const user = firebase.auth().currentUser;
  if (!user) { showToast('Connecte-toi d\'abord.', 'error'); return; }
  
  // Génération d'un code unique à 6 caractères
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans 0/O/1/I/L
  let code, exists;
  do {
    code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    // Vérification d'unicité
    const snap = await db.collection('classes').where('code', '==', code).get();
    exists = !snap.empty;
  } while (exists);
  
  try {
    // Création du document classe
    const ref = await db.collection('classes').add({
      name: name,
      code: code,
      creatorId: user.uid,
      memberCount: 1,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Ajout du créateur comme membre
    await db.collection('classMembers').add({
      classId: ref.id,
      userId: user.uid,
      userEmail: user.email,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    document.getElementById('createClassName').value = '';
    showToast(`✅ Classe créée ! Code : ${code}`, 'success');
    loadUserClasses();
  } catch (e) {
    console.warn('Create class error:', e.message);
    showToast('Erreur lors de la création.', 'error');
  }
}

// ---- ADHÉSION ----
async function joinClass() {
  const code = document.getElementById('joinCode').value.trim().toUpperCase();
  if (!code || code.length !== 6) { showToast('Code invalide (6 caractères).', 'error'); return; }
  
  const user = firebase.auth().currentUser;
  if (!user) { showToast('Connecte-toi d\'abord.', 'error'); return; }
  
  try {
    // Recherche de la classe par code
    const snap = await db.collection('classes').where('code', '==', code).get();
    if (snap.empty) { showToast('Code invalide. Vérifie et réessaie.', 'error'); return; }
    
    const classDoc = snap.docs[0];
    const classId = classDoc.id;
    
    // Vérification : déjà membre ?
    const memberSnap = await db.collection('classMembers')
      .where('classId', '==', classId)
      .where('userId', '==', user.uid)
      .get();
    if (!memberSnap.empty) { showToast('Tu es déjà membre de cette classe.', 'info'); return; }
    
    // Ajout du membre
    await db.collection('classMembers').add({
      classId: classId,
      userId: user.uid,
      userEmail: user.email,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Incrémentation du compteur
    await db.collection('classes').doc(classId).update({
      memberCount: firebase.firestore.FieldValue.increment(1)
    });
    
    document.getElementById('joinCode').value = '';
    showToast('✅ Rejoint la classe !', 'success');
    loadUserClasses();
  } catch (e) {
    console.warn('Join class error:', e.message);
    showToast('Erreur.', 'error');
  }
}

// ---- CHARGEMENT ----
async function loadUserClasses() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  
  const activeId = localStorage.getItem('activeClassId');
  const grid = document.getElementById('classesGrid');
  
  try {
    // Trouver toutes les classes dont l'utilisateur est membre
    const memberSnap = await db.collection('classMembers')
      .where('userId', '==', user.uid)
      .get();
    
    const classIds = memberSnap.docs.map(d => d.data().classId);
    
    if (classIds.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>Aucune classe pour le moment.</p></div>';
      return;
    }
    
    // Charger les documents des classes
    const classes = [];
    for (const id of classIds) {
      const doc = await db.collection('classes').doc(id).get();
      if (doc.exists) {
        classes.push({ id: doc.id, ...doc.data() });
      }
    }
    
    // Rendu
    grid.innerHTML = classes.map(c => `
      <div class="class-card ${c.id === activeId ? 'active' : ''}">
        <div class="class-header">
          <h3>${c.name}</h3>
          ${c.id === activeId ? '<span class="badge">Active</span>' : ''}
        </div>
        <div class="class-code" onclick="copyCode('${c.code}')" title="Copier le code">
          🔑 ${c.code}
        </div>
        <div class="class-meta">👥 ${c.memberCount} membre${c.memberCount > 1 ? 's' : ''}</div>
        <div class="class-actions">
          ${c.id !== activeId ? `<button class="btn-activate" onclick="switchActiveClass('${c.id}')">Activer</button>` : ''}
          ${c.creatorId === user.uid ? `<button class="btn-delete" onclick="deleteClass('${c.id}')">Supprimer</button>` : ''}
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.warn('Load classes error:', e.message);
    grid.innerHTML = '<div class="empty-state"><p>Erreur de chargement.</p></div>';
  }
}

// ---- CLASSE ACTIVE ----
function switchActiveClass(classId) {
  localStorage.setItem('activeClassId', classId);
  showToast('✅ Classe active changée !', 'success');
  loadUserClasses();
}

// ---- SUPPRESSION ----
async function deleteClass(classId) {
  if (!confirm('Supprimer cette classe ? Cette action est irréversible.')) return;
  try {
    // Supprimer tous les membres
    const members = await db.collection('classMembers')
      .where('classId', '==', classId).get();
    const batch = db.batch();
    members.forEach(doc => batch.delete(doc.ref));
    batch.delete(db.collection('classes').doc(classId));
    await batch.commit();
    
    if (localStorage.getItem('activeClassId') === classId) {
      localStorage.removeItem('activeClassId');
    }
    showToast('Classe supprimée.', 'success');
    loadUserClasses();
  } catch (e) {
    console.warn('Delete class error:', e.message);
    showToast('Erreur.', 'error');
  }
}

// ---- COPIER CODE ----
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast('📋 Code copié !', 'success');
  });
}
```

### 7.3 Modèle de données

**Collection `classes` :**
| Champ | Type | Exemple |
|-------|------|---------|
| `name` | string | "Terminale A" |
| `code` | string | "X7K2M9" |
| `creatorId` | string | "abc123..." (UID Firebase) |
| `memberCount` | number | 24 |
| `createdAt` | timestamp | serverTimestamp |

**Collection `classMembers` :**
| Champ | Type | Exemple |
|-------|------|---------|
| `classId` | string | doc.id de la classe |
| `userId` | string | UID Firebase |
| `userEmail` | string | "eleve@email.com" |
| `joinedAt` | timestamp | serverTimestamp |

---

## 8. PROFIL UTILISATEUR (profile/index.html)

### 8.1 Structure

```
body
├── aside.sidebar (identique aux autres pages)
├── main.main
│   ├── div.profile-header
│   │   ├── div.profile-avatar#profileAvatar "?"
│   │   ├── h1#profileName
│   │   └── p#profileEmail
│   ├── div#successAlert (caché)
│   ├── div#errorAlert (caché)
│   └── form#profileForm
│       ├── div.form-group
│       │   ├── label "Prénom"
│       │   └── input#inputPrenom
│       ├── div.form-group
│       │   ├── label "Nom"
│       │   └── input#inputNom
│       ├── div.form-group
│       │   ├── label "Email"
│       │   └── input#inputEmail (disabled)
│       └── button#saveBtn "Enregistrer"
```

### 8.2 JavaScript

```javascript
auth.onAuthStateChanged(async function(user) {
  document.getElementById('loadingOverlay').classList.add('hidden');
  
  if (user) {
    // Chargement Firestore avec fallback localStorage
    let userData = {};
    try {
      const userDoc = await db.collection('users').doc(user.uid).get();
      if (userDoc.exists) userData = userDoc.data();
    } catch (e) {
      console.warn('Firestore indisponible:', e.message);
      userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    
    // Mise à jour de l'affichage
    const prenom = userData.prenom || 'Utilisateur';
    const nom = userData.nom || '';
    const initial = (prenom[0] || '?').toUpperCase();
    
    document.getElementById('profileAvatar').textContent = initial;
    document.getElementById('profileName').textContent = (prenom + ' ' + nom).trim();
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('inputPrenom').value = prenom === 'Utilisateur' ? '' : prenom;
    document.getElementById('inputNom').value = nom;
    document.getElementById('inputEmail').value = user.email;
  } else {
    window.location.href = '../auth/Login_Internate.html';
  }
});

async function saveProfile(e) {
  e.preventDefault();
  const prenom = document.getElementById('inputPrenom').value.trim();
  const nom = document.getElementById('inputNom').value.trim();
  
  if (!prenom || !nom) {
    showToast('Veuillez remplir tous les champs.', 'error');
    return;
  }
  
  const btn = document.getElementById('saveBtn');
  btn.disabled = true;
  btn.textContent = 'Enregistrement...';
  
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Non connecté');
    
    await db.collection('users').doc(user.uid).update({
      prenom: prenom,
      nom: nom
    });
    
    localStorage.setItem('currentUser', JSON.stringify({
      ...JSON.parse(localStorage.getItem('currentUser') || '{}'),
      prenom, nom
    }));
    
    document.getElementById('profileName').textContent = prenom + ' ' + nom;
    document.getElementById('profileAvatar').textContent = prenom[0].toUpperCase();
    document.getElementById('avatarEl').textContent = prenom[0].toUpperCase();
    document.getElementById('userNameEl').textContent = prenom + ' ' + nom;
    
    showToast('Profil mis à jour !', 'success');
  } catch (err) {
    console.error('Erreur sauvegarde profil:', err);
    showToast('Erreur: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enregistrer';
  }
}
```

---

## 9. PAGE D'AIDE (help/index.html)

### 9.1 Structure

```
body
├── div.container
│   ├── div.hero-card
│   │   ├── div.icon 💬
│   │   ├── h1 "Centre d'aide"
│   │   ├── p (description)
│   │   └── div.links
│   │       ├── a.btn-primary "✍️ Envoyer un retour" (→ Google Forms)
│   │       └── a.btn-secondary "📧 Nous écrire" (mailto)
│   │
│   ├── div.faq-section
│   │   ├── h2.faq-title "❓ Questions fréquentes"
│   │   └── details.faq-item × 8 (questions/answers)
│   │       ├── summary.faq-question
│   │       └── div.faq-answer
│   │
│   └── a.back "← Retour à l'accueil"
```

### 9.2 FAQ - Questions et réponses

Les 8 questions utilisent la balise HTML native `<details>` / `<summary>` pour l'accordéon, sans JavaScript :

```html
<details class="faq-item">
  <summary class="faq-question">Comment créer un compte ?</summary>
  <div class="faq-answer">
    Rends-toi sur <a href="../auth/Register_internate.html">la page d'inscription</a>,
    remplis les champs (email + mot de passe) et valide. Tu peux aussi utiliser
    la connexion via Google. C'est gratuit et sans engagement.
  </div>
</details>
```

### 9.3 CSS FAQ

```css
details.faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: border-color 0.2s;
}
details.faq-item[open] { border-color: var(--accent); }

summary.faq-question {
  padding: 16px 20px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text);
  user-select: none;
}

/* Masquer le triangle natif du details */
summary.faq-question::-webkit-details-marker { display: none; }

/* Indicateur +/− */
summary.faq-question::after {
  content: '+';
  font-size: 1.3rem;
  color: var(--muted);
  margin-left: 12px;
}
details[open] summary.faq-question::after { content: '−'; }

.faq-answer {
  padding: 0 20px 16px;
  font-size: 0.88rem;
  color: var(--text2);
  line-height: 1.6;
}
.faq-answer a { color: var(--accent); text-decoration: none; }
.faq-answer a:hover { text-decoration: underline; }
```

---

## 10. OUTILS DE RÉVISION

Chaque outil est une page HTML autonome. Voici le détail de chacun.

### 10.1 Calculatrice Scientifique

**Fichier :** `tools/Calculatrice_Scientifique.html`

**Interface :** Grille de boutons (4 colonnes) + écran d'affichage.

**Fonctions :**
- Opérations de base : +, −, ×, ÷
- Fonctions scientifiques : sin, cos, tan, log, ln, √, x², x³, xⁿ, 1/x, n!
- Constantes : π, e
- Mémoire : MS, MR, MC, M+, M−
- Effacement : C (efface tout), CE (efface dernier)

**JavaScript :**
```javascript
// Évaluation sécurisée des expressions
function calculate() {
  try {
    const result = math.evaluate(expression); // Utilise math.js si présent
    // ou évaluation manuelle
    display.textContent = result;
  } catch (e) {
    display.textContent = 'Erreur';
  }
}
```

### 10.2 Convertisseur d'Unités

**Fichier :** `tools/Convertisseur_Unites.html`

**Catégories :**
- 📏 Longueur : m, km, cm, mm, µm, nm, pouces, pieds, yards, miles, milles marins
- ⚖️ Masse : g, kg, t, mg, µg, lb, oz
- 🌡️ Température : °C, °F, K
- 💨 Vitesse : m/s, km/h, mph, nœuds
- 📦 Volume : L, mL, m³, cm³, gal, fl oz

**Fonctionnement :**
```javascript
const conversions = {
  longueur: {
    m: 1, km: 1000, cm: 0.01, mm: 0.001,
    pouces: 0.0254, pieds: 0.3048, miles: 1609.34
  },
  temperature: {
    // Conversion spéciale (formule, pas de facteur linéaire)
    toBase: (v, from) => from === '°C' ? v : from === '°F' ? (v - 32) * 5/9 : v - 273.15,
    fromBase: (v, to) => to === '°C' ? v : to === '°F' ? v * 9/5 + 32 : v + 273.15
  }
};
```

### 10.3 Fabricateur de Fiches

**Fichier :** `tools/Fabricateur_Fiches.html`

**Fonctionnalités :**
- Création de fiches recto/verso avec titre
- Stockage dans localStorage
- Mode révision : affiche le recto, clique pour voir le verso
- Marquage des fiches maîtrisées (✓)
- Navigation aléatoire ou séquentielle
- Compteur : fiche X sur Y
- Export PDF de toutes les fiches

**Modèle de données :**
```javascript
{
  id: "fiche_1623456789",
  title: "Dates de la Révolution",
  recto: "Quelle année a débuté la Révolution française ?",
  verso: "1789",
  mastered: false, // ou null
  createdAt: "2026-05-10T..."
}
```

### 10.4 Générateur de QCM (avec quiz notés)

**Fichier :** `tools/Generateur_QCM.html`

**Fonctionnalités détaillées :**

#### Création de quiz
```javascript
function addQuestion() {
  const question = document.getElementById('qcmQuestion').value.trim();
  const answers = ['A', 'B', 'C', 'D'].map(l => 
    document.getElementById(`qcmAnswer${l}`).value.trim()
  ).filter(a => a);
  const correct = parseInt(document.getElementById('qcmCorrect').value);
  
  if (!question || answers.length < 2) {
    showToast('Question et au moins 2 réponses requises.', 'error');
    return;
  }
  
  currentQuiz.questions.push({ question, answers, correct });
  renderQuestions();
}

function startQuiz() {
  currentQuiz.title = document.getElementById('qcmTitle').value.trim() || 'QCM sans titre';
  currentQuiz.score = 0;
  currentQuiz.current = 0;
  document.getElementById('qcmEditor').style.display = 'none';
  document.getElementById('qcmPlayer').style.display = 'block';
  showQuestion();
}
```

#### Mode jeu
```javascript
let currentQuiz = { questions: [], score: 0, current: 0, title: '' };

function showQuestion() {
  if (currentQuiz.current >= currentQuiz.questions.length) {
    showResult();
    return;
  }
  const q = currentQuiz.questions[currentQuiz.current];
  // Affiche question + boutons de réponse
}

function selectAnswer(index) {
  const q = currentQuiz.questions[currentQuiz.current];
  if (index === q.correct) currentQuiz.score++;
  currentQuiz.current++;
  showQuestion();
}
```

#### Sauvegarde des scores (quiz notés)
```javascript
async function saveQuizResult() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  
  try {
    await db.collection('quizResults').add({
      userId: user.email,
      score: currentQuiz.score,
      total: currentQuiz.questions.length,
      quizTitle: currentQuiz.title || 'Sans titre',
      classId: localStorage.getItem('activeClassId') || '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) {
    console.warn('Quiz result save error:', e.message); // Non bloquant
  }
}
```

#### Affichage des scores
```javascript
async function showScores() {
  const user = firebase.auth().currentUser;
  if (!user) { showToast('Connecte-toi pour voir tes scores.', 'error'); return; }
  
  try {
    const snap = await db.collection('quizResults')
      .where('userId', '==', user.email)
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get();
    
    let html = '<table><tr><th>Date</th><th>Quiz</th><th>Score</th><th>Questions</th></tr>';
    snap.forEach(doc => {
      const d = doc.data();
      const date = d.timestamp ? d.timestamp.toDate().toLocaleDateString('fr-FR') : '—';
      html += `<tr><td>${date}</td><td>${d.quizTitle}</td><td>${d.score}/${d.total}</td><td>${d.total}</td></tr>`;
    });
    html += '</table>';
    
    document.getElementById('scoresContent').innerHTML = html;
    document.getElementById('scoresModal').classList.add('show');
  } catch (e) {
    console.warn('Scores load error:', e.message);
  }
}
```

### 10.5 Minuteur Pomodoro

**Fichier :** `tools/Minuteur_Pomodoro.html`

**Cycles :**
- Travail : 25 minutes
- Pause courte : 5 minutes
- Pause longue : 15 minutes (après 4 cycles)
- Notification sonore à la fin de chaque cycle

**JavaScript :**
```javascript
let timer = null;
let timeLeft = 25 * 60;
let phase = 'work'; // work | break
let cycleCount = 0;

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      playSound();
      cycleCount++;
      if (phase === 'work') {
        phase = 'break';
        timeLeft = (cycleCount % 4 === 0) ? 15 * 60 : 5 * 60;
      } else {
        phase = 'work';
        timeLeft = 25 * 60;
      }
      startTimer();
    }
  }, 1000);
}
```

### 10.6 Rédacteur de Plan

**Fichier :** `tools/Redacteur_Plan.html`

**Structure :**
- Introduction, Partie I/II/III, Conclusion
- Chaque partie peut avoir des sous-parties
- Ajout d'arguments et d'exemples
- Export du plan

### 10.7 Tableau Blanc

**Fichier :** `tools/Tableau_Blanc.html`

**Canvas HTML5 :**
```javascript
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#6c63ff';
let size = 3;

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);

function startDraw(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}
function draw(e) {
  if (!drawing) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}
```

**Outil Gomme :**
```javascript
function setEraser() {
  color = '#09090f'; // couleur du fond (simule une gomme)
  // Pas une vraie gomme, mais une "peinture" de la couleur du fond
}
```

**Export PNG :**
```javascript
function exportWhiteboard() {
  const link = document.createElement('a');
  link.download = 'tableau.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
```

### 10.8 Analyseur de Texte

**Fichier :** `tools/Analyseur_Texte.html`

**Métriques calculées :**
```javascript
function analyzeText(text) {
  const words = text.match(/\b\w+\b/g) || [];
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
  
  // Fréquence des mots
  const freq = {};
  words.forEach(w => {
    const lower = w.toLowerCase();
    freq[lower] = (freq[lower] || 0) + 1;
  });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  
  // Score de lisibilité (formule simple)
  const avgWordsPerSentence = words.length / (sentences.length || 1);
  const readability = Math.max(0, Math.min(100, 100 - avgWordsPerSentence * 5));
  
  // Détection du ton
  const posWords = ['bien', 'bon', 'excellent', 'super', 'génial', 'heureux'];
  const negWords = ['mal', 'mauvais', 'triste', 'horrible', 'terrible', 'désolé'];
  const pos = words.filter(w => posWords.includes(w.toLowerCase())).length;
  const neg = words.filter(w => negWords.includes(w.toLowerCase())).length;
  const tone = pos > neg ? 'Positif' : neg > pos ? 'Négatif' : 'Neutre';
  
  return { words: words.length, chars, sentences: sentences.length,
           paragraphs: paragraphs.length, freq: sorted.slice(0, 10),
           readability, tone };
}
```

### 10.9 Calculateur de Moyenne

**Fichier :** `tools/Calculateur_Moyenne.html`

**Fonctionnement :**
```javascript
const subjects = JSON.parse(localStorage.getItem('moyenne_subjects') || '[]');

function addSubject() {
  const name = document.getElementById('subjName').value.trim();
  const grade = parseFloat(document.getElementById('subjGrade').value);
  const coef = parseFloat(document.getElementById('subjCoef').value);
  
  if (!name || isNaN(grade) || isNaN(coef)) return;
  if (grade < 0 || grade > 20) { showToast('Note entre 0 et 20.', 'error'); return; }
  if (coef < 1) { showToast('Coefficient ≥ 1.', 'error'); return; }
  
  subjects.push({ name, grade, coef });
  localStorage.setItem('moyenne_subjects', JSON.stringify(subjects));
  renderSubjects();
  calculateAverage();
}

function calculateAverage() {
  const total = subjects.reduce((sum, s) => sum + s.grade * s.coef, 0);
  const coefs = subjects.reduce((sum, s) => sum + s.coef, 0);
  const avg = coefs > 0 ? (total / coefs) : 0;
  document.getElementById('averageDisplay').textContent = avg.toFixed(2) + '/20';
}
```

### 10.10 Conjugueur Français

**Fichier :** `tools/Conjugueur_Francais.html`

**Base de verbes :** 60+ verbes incluant :
- Auxiliaires : être, avoir
- 1er groupe : chanter, danser, parler, manger, commencer, jeter, appeler, etc.
- 2e groupe : finir, grandir, choisir, etc.
- 3e groupe : aller, faire, dire, pouvoir, vouloir, devoir, savoir, voir, venir, prendre, mettre, connaître, écrire, lire, etc.

**Temps supportés :**
- Indicatif : présent, imparfait, futur simple, passé simple, plus-que-parfait, passé composé
- Subjonctif : présent
- Conditionnel : présent
- Impératif : présent

**Règles de conjugaison :**
```javascript
function conjugate(verb, tense) {
  // Dictionnaire des verbes irréguliers
  const irregulars = {
    être: { présent: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], ... },
    avoir: { présent: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], ... },
    aller: { présent: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], ... }
  };
  
  // Règles générales
  const radical = verb.slice(0, -2); // enlever -er, -ir, -re
  const ending = verb.slice(-2);
  
  // Terminaisons par temps
  const endings = {
    'er': { présent: ['e', 'es', 'e', 'ons', 'ez', 'ent'], ... },
    'ir': { présent: ['is', 'is', 'it', 'issons', 'issez', 'issent'], ... }
  };
}
```

**Correction spéciale :** "nous mangons" → "nous mangeons" (règle de maintien du 'e' après 'g').

### 10.11 Générateur de Citations

**Fichier :** `tools/Generateur_Citations.html`

**Base de données :** 30+ citations intégrées de :
- Philosophes : Socrate, Descartes, Nietzsche, Sartre, Camus
- Écrivains : Hugo, Saint-Exupéry, Proust, Orwell
- Scientifiques : Einstein, Pasteur, Curie
- Artistes : Picasso, Mozart, Vinci

**Fonctionnement :**
```javascript
const citations = [
  { text: "Je pense, donc je suis.", author: "René Descartes" },
  { text: "L'imagination est plus importante que le savoir.", author: "Albert Einstein" },
  // ... 30+ citations
];

function generate() {
  const c = citations[Math.floor(Math.random() * citations.length)];
  document.getElementById('quoteText').textContent = `"${c.text}"`;
  document.getElementById('quoteAuthor').textContent = `— ${c.author}`;
  currentQuote = c;
}

function exportPDF() {
  if (window.exportPDF) {
    window.exportPDF(`"${currentQuote.text}" — ${currentQuote.author}`);
  }
}
```

---

## 11. PAGES LÉGALES

### legal/Legal.html

**Contenu :**
1. Conditions Générales d'Utilisation (CGU)
   - Acceptation des conditions
   - Description du service
   - Inscription et sécurité
   - Propriété intellectuelle
   - Responsabilité
   - Modification du service
2. Politique de confidentialité
   - Données collectées (email, nom, prénom, cours créés)
   - Utilisation des données
   - Partage avec des tiers (aucun)
   - Durée de conservation
   - Vos droits (accès, rectification, suppression)
3. Contact légal
4. Copyright 2026

---

## 12. CSS GLOBAL

### 12.1 style.css

Fichier de styles globaux importé par toutes les pages.

**Contenu principal :**
```css
/* Reset */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* Styles de base */
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

/* Sélections */
::selection { background: var(--accent); color: white; }

/* Classes utilitaires */
.hidden { display: none !important; }
```

### 12.2 theme.css

Variables CSS globales utilisées par toutes les pages.

```css
:root {
  /* Couleurs de fond */
  --bg: #09090f;
  --surface: #11111c;
  --surface2: #1a1a2e;
  
  /* Bordures */
  --border: rgba(255, 255, 255, 0.07);
  --border2: rgba(255, 255, 255, 0.12);
  
  /* Accents */
  --accent: #6c63ff;      /* Violet principal */
  --accent2: #00d4aa;     /* Vert secondaire */
  --accent3: #ff6b6b;     /* Rouge (erreurs, suppressions) */
  --accent4: #ffa94d;     /* Orange */
  
  /* Texte */
  --text: #e8e8f0;
  --text2: rgba(232, 232, 240, 0.75);
  --muted: #6b6b8a;
  
  /* Overlays (pour le thème sombre uniquement) */
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --hover-overlay-strong: rgba(255, 255, 255, 0.1);
  --overlay-accent: rgba(108, 99, 255, 0.12);
  
  /* Dégradés */
  --gen-gradient: linear-gradient(135deg, #6c63ff, #00d4aa);
  
  /* Ombres */
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.3);
  --shadow-btn: 0 4px 16px rgba(108, 99, 255, 0.25);
  --shadow-btn-hover: 0 8px 24px rgba(108, 99, 255, 0.35);
}
```

---

## 13. JAVASCRIPT GLOBAL

### 13.1 firebase-config.js

Configuration Firebase (ignorée par Git car contient les clés API).

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "internate.firebaseapp.com",
  projectId: "internate",
  storageBucket: "internate.firebasestorage.app",
  messagingSenderId: "129811302967",
  appId: "1:129811302967:web:..."
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
```

### 13.2 pdf-export.js

Fonction utilitaire d'export PDF utilisée par plusieurs outils.

```javascript
function exportPDF(content, filename = 'document') {
  // Utilisation de window.print() avec styles spécifiques
  const win = window.open('', '_blank');
  win.document.write(`
    <html><head><title>${filename}</title>
    <style>
      body { font-family: Arial; padding: 40px; }
      @media print { body { padding: 0; } }
    </style>
    </head><body>
    ${content}
    <script>window.print();window.close();</script>
    </body></html>
  `);
}
```

### 13.3 theme.js

Script de thème (actuellement minimal car le thème est fixe).

```javascript
// Thème sombre permanent - pas de toggle
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## 14. INFRASTRUCTURE FIREBASE

### 14.1 Firebase Hosting

Configuration dans `firebase.json` :

```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/sw.js", "destination": "/sw.js" }
    ]
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

**Propriétés :**
- `public` : dossier racine des fichiers statiques
- `ignore` : fichiers exclus du déploiement
- `rewrites` : réécriture d'URL pour le Service Worker

### 14.2 Firebase Auth

**Méthodes activées :**
- Email/Password
- Google (via redirect)

**Comportement des sessions :**
- Token JWT stocké dans IndexedDB par Firebase
- `onAuthStateChanged` callback pour détecter les changements d'état
- Persistance par défaut (localStorage)

### 14.3 SDK Firebase

Les SDK sont chargés via CDN en version compat :

```html
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>
```

La version compat permet d'utiliser la syntaxe `firebase.foo()` plutôt que `getFoo()`.

---

## 15. BASE DE DONNÉES FIRESTORE

### 15.1 Collection `users`

**Objectif :** Stockage des informations de profil utilisateur.

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `uid` | string | Oui | UID Firebase Authentication |
| `email` | string | Oui | Email de l'utilisateur |
| `prenom` | string | Oui | Prénom |
| `nom` | string | Oui | Nom |

**Règle :** Lecture/écriture uniquement par le propriétaire (`request.auth.uid == userId`).

**Taille estimée :** ~200 octets par document

### 15.2 Collection `cours`

**Objectif :** Stockage des cours partagés entre tous les utilisateurs.

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `id` | string | Oui | ID unique local (timestamp + random) |
| `title` | string | Oui | Titre du cours |
| `filiere` | string | Oui | "generale" ou "technologique" |
| `annee` | string | Oui | "2nde", "1ere", "terminale" |
| `specialite` | string | Non | Spécialité ou série |
| `matiere` | string | Oui | Identifiant matière |
| `matiereLabel` | string | Oui | Libellé matière affiché |
| `matiereIcon` | string | Oui | Emoji de la matière |
| `matiereColor` | string | Oui | Couleur hex de la matière |
| `description` | string | Non | Description du cours |
| `fileUrl` | string | Non | URL du fichier joint |
| `fileName` | string | Non | Nom du fichier |
| `dateAdded` | string | Oui | Date ISO d'ajout |
| `userId` | string | Oui | Email du créateur |
| `classId` | string | Non | ID de la classe associée |

**Règles :**
- Lecture : tout utilisateur authentifié
- Création : tout utilisateur authentifié
- Modification : uniquement par le créateur (`userId`)
- Suppression : uniquement par le créateur

### 15.3 Collection `classes`

**Objectif :** Groupes d'utilisateurs (espaces de classe).

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `name` | string | Oui | Nom de la classe |
| `code` | string | Oui | Code d'invitation (6 caractères, unique) |
| `creatorId` | string | Oui | UID Firebase du créateur |
| `memberCount` | number | Oui | Nombre de membres |
| `createdAt` | timestamp | Oui | Date de création |

### 15.4 Collection `classMembers`

**Objectif :** Lien entre les utilisateurs et les classes.

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `classId` | string | Oui | ID du document de la classe |
| `userId` | string | Oui | UID Firebase du membre |
| `userEmail` | string | Oui | Email du membre |
| `joinedAt` | timestamp | Oui | Date d'adhésion |

### 15.5 Collection `comments`

**Objectif :** Commentaires/discussion sur les cours.

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `courseId` | string | Oui | ID du cours concerné |
| `userId` | string | Oui | Email de l'auteur |
| `text` | string | Oui | Contenu du commentaire |
| `timestamp` | timestamp | Oui | Date du commentaire |

### 15.6 Collection `quizResults`

**Objectif :** Historique des scores de quiz.

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `userId` | string | Oui | Email de l'utilisateur |
| `score` | number | Oui | Nombre de bonnes réponses |
| `total` | number | Oui | Nombre total de questions |
| `quizTitle` | string | Non | Titre du quiz |
| `classId` | string | Non | ID de la classe (optionnel) |
| `timestamp` | timestamp | Oui | Date du quiz |

---

## 16. RÈGLES DE SÉCURITÉ

### firestore.rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Utilisateurs : chacun son document
    match /users/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
    
    // Cours : lecture pour tous, écriture pour le créateur
    match /cours/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null 
                    && request.auth.uid == resource.data.userId;
      allow delete: if request.auth != null 
                    && request.auth.uid == resource.data.userId;
    }
    
    // Classes : lecture pour tous, gestion par le créateur
    match /classes/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null 
                    && resource.data.creatorId == request.auth.uid;
      allow delete: if request.auth != null 
                    && resource.data.creatorId == request.auth.uid;
    }
    
    // Membres des classes : gestion par le membre ou le créateur
    match /classMembers/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        get(/databases/$(database)/documents/classes/$(resource.data.classId))
          .data.creatorId == request.auth.uid
      );
    }
    
    // Commentaires : chacun peut supprimer les siens
    match /comments/{document} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth != null 
                    && resource.data.userId == request.auth.uid;
    }
    
    // Résultats de quiz : lecture par l'utilisateur ou le prof
    match /quizResults/{document} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        get(/databases/$(database)/documents/classes/$(resource.data.classId))
          .data.creatorId == request.auth.uid
      );
    }
  }
}
```

---

## 17. FLUX UTILISATEUR DÉTAILLÉS

### 17.1 Parcours complet d'un nouvel utilisateur

1. **Découverte** : Atterrit sur la landing page (`index.html`)
2. **Inscription** : Clique "C'est parti" → `Register_internate.html`
3. **Création de compte** : Remplit prénom, nom, email, mot de passe
4. **Redirection** : Vers le dashboard (`Connected_internate.html`)
5. **Dashboard** : Voit les stats, les outils, les cours (vide pour l'instant)
6. **Premier cours** : Navigue vers "Mes cours" → `Ressources_ex.html`
7. **Ajout cours** : Clique "Ajouter un cours", remplit le formulaire
8. **Cours visible** : Le cours apparaît dans la grille + dans Firestore
9. **Exploration outils** : Teste la calculatrice, le QCM, etc.
10. **Profil** : Va sur son profil, modifie son prénom/nom
11. **Classe** : Crée ou rejoint une classe via `classes/index.html`
12. **Partage** : Copie un lien de cours, l'envoie à un camarade
13. **Discussion** : Commente sur un cours
14. **Quiz** : Fait un QCM, son score est sauvegardé
15. **Export** : Télécharge ses cours en JSON/CSV

### 17.2 Flux de connexion

```
1. Utilisateur arrive sur Login_Internate.html
2. Remplit email + mot de passe
3. Submit → firebase.auth().signInWithEmailAndPassword()
4. Firebase vérifie les identifiants
   ├── Succès → Redirection vers dashboard
   └── Échec → Message d'erreur traduit en français
```

### 17.3 Flux de synchronisation des cours

```
1. Page cours chargée
2. Vérification auth (user = localStorage.currentUser)
3. syncCoursesFromFirestore() appelé
   ├── Firestore disponible → récupère tous les cours, les met dans localStorage
   └── Firestore indisponible → utilise localStorage uniquement
4. renderCourses() → affiche les cours avec les filtres
5. À chaque ajout/modif/suppression :
   ├── Écriture dans localStorage (immédiate)
   └── saveToFirestore() / deleteFromFirestore() (asynchrone)
```

### 17.4 Flux de partage de cours

```
1. Utilisateur A clique "↗" sur un cours
2. Lien copié : .../Ressources_ex.html#cours-XXX
3. Envoie le lien à l'utilisateur B
4. Utilisateur B clique le lien
5. Page cours chargée
6. checkUrlHash() détecte #cours-XXX
7. Scrolle jusqu'à la carte + surbrillance (3 secondes)
```

### 17.5 Flux de discussion

```
1. Utilisateur clique "💬" sur un cours
2. discussionSection s'affiche
3. loadComments(courseId) :
   ├── Firestore : comments où courseId == X, triés par timestamp
   └── Rendu des commentaires + zone de saisie
4. Utilisateur écrit + clique "Envoyer"
5. addComment() :
   ├── Sauvegarde dans Firestore collection comments
   └── Recharge les commentaires
```

---

## 18. GESTION DES ERREURS

### 18.1 Erreurs Firebase Auth

| Code Firebase | Message affiché |
|--------------|-----------------|
| `auth/user-not-found` | "Aucun compte avec cet email." |
| `auth/wrong-password` | "Mot de passe incorrect." |
| `auth/invalid-email` | "Email invalide." |
| `auth/too-many-requests` | "Trop de tentatives. Réessaie plus tard." |
| `auth/email-already-in-use` | "Cet email est déjà utilisé." |
| `auth/weak-password` | "Mot de passe trop faible (6 caractères min)." |
| `auth/popup-closed-by-user` | "Connexion annulée." |
| Autres | "Erreur : [message original]" |

### 18.2 Erreurs Firestore

Toutes les opérations Firestore sont encapsulées dans des try/catch :

```javascript
try {
  await db.collection('cours').add(data);
} catch (e) {
  // Erreurs silencieuses pour les indisponibilités temporaires
  if (e.code !== 'failed-precondition' && e.code !== 'unavailable') {
    console.warn('Firestore error:', e.message);
  }
  // L'application continue de fonctionner avec localStorage
}
```

### 18.3 Erreurs réseau

- Firestore indisponible → fallback localStorage
- Service Worker non supporté → ignoré silencieusement
- API Clipboard indisponible → message informant l'utilisateur de copier manuellement

### 18.4 Validation des formulaires

Chaque formulaire a des validations côté client :
- Champs requis vérifiés avant soumission
- Messages d'erreur via `showToast()` (type 'error')
- Boutons désactivés pendant les opérations asynchrones

---

## 19. DÉPLOIEMENT

### 19.1 Commande de déploiement

```bash
firebase deploy --only hosting,firestore:rules
```

### 19.2 URLs et ressources

| Ressource | URL |
|-----------|-----|
| Site | https://internate.web.app |
| Connexion | https://internate.web.app/auth/Login_Internate.html |
| Inscription | https://internate.web.app/auth/Register_internate.html |
| Dashboard | https://internate.web.app/dashboard/Connected_internate.html |
| Cours | https://internate.web.app/courses/Ressources_ex.html |
| Classes | https://internate.web.app/classes/ |
| Profil | https://internate.web.app/profile/ |
| Aide | https://internate.web.app/help/ |
| Contact | https://internate.web.app/contact.html |
| Mentions légales | https://internate.web.app/legal/Legal.html |
| Formulaire retour | https://forms.gle/KzNnZrZNkXEyJFV16 |
| Email support | internatesupport@gmail.com |
| GitHub | https://github.com/Crypthium123/INTERNATE |

### 19.3 État du déploiement

**Dernier commit :** `0215602` (Ajout: upload fichiers, espaces de classe, discussion cours, quiz scores, export JSON/CSV)

**Fichiers déployés :** 29 fichiers dans `public/`

**Dernière mise à jour :** Mai 2026

---

*Fin du rapport. 100% vanilla JS. 100% gratuit. 100% éducatif.*
