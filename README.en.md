
<p align="center">
  <img src="public/favicon.svg" width="80" alt="Internate">
</p>

<h1 align="center">Internate</h1>

<p align="center">
  <b>The collaborative educational platform — by students, for students.</b>
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

| Language | Link |
|----------|------|
| 🇫🇷 French | **[README.md](README.md)** |
| 🇬🇧 English | **[README.en.md](README.en.md)** *(you are here)* |

---

## 📖 The Story

> We were in 10th grade (Seconde). Like every high school student, we were accumulating class notes, cheat sheets, links, PDFs — a digital mess. Every week, the same struggle: "Do you have the math lesson?" — "Wait, I'll send it…" — file not found, dead link, outdated version.

**Internate was born from this frustration.**

It started as a simple HTML folder on a hard drive. A page with links to our courses. Then we added a flashcard system, a unit converter, a calculator… The project grew, but stayed confidential — used by our class, and that was it.

Then came the redesign. Dark interface, dashboard, interactive tools. We discovered Firebase, authentication, hosting. The project became more serious. We shared it with our teachers, who showed it to other classes. The feedback was encouraging, but the localStorage system was showing its limits.

**2026 — V3 arrived.** Real-time Firestore sync, classroom spaces with chat, course comments, gamification (XP, levels, streaks). The project went from a class tool to a true multi-user platform. And we keep learning, coding, improving.

**Internate is this: a project that started on a corner of a table between two tests, and keeps evolving with us.**

---

## ✨ Features

### 🔐 Authentication & Accounts
| Feature | Details |
|---------|---------|
| Sign up / Login | Email + password, Google login |
| User profile | First name, last name, avatar, email |
| Password reset | Reset email |
| Email verification | Required at registration |
| Persistent session | Stay logged in between visits |

### 📚 Collaborative Courses
| Feature | Details |
|---------|---------|
| Add / Edit / Delete | Full CRUD on Firestore |
| Filters | By track, year, specialty, subject |
| Sorting | By date, title or subject |
| Real-time sync | Firestore `onSnapshot` |
| localStorage fallback | Works offline / when Firestore is down |
| Attachments | File URLs linked to courses |
| Comments | Real-time discussions on every course |

### 👥 Classroom Spaces
| Feature | Details |
|---------|---------|
| Create class | Unique invitation code auto-generated |
| Join class | By invitation code |
| Activate / Deactivate | Filtered view — see only active class courses |
| Real-time chat | Firestore `onSnapshot` — instant messages |
| Member list | Avatars, badges (creator, you), member count |
| Member management | Creator can remove a member |
| Code copy | One-click "Copy code" button |

### 🛠️ 11 Study Tools

| # | Tool | Description |
|---|------|-------------|
| 1 | 🧮 **Scientific Calculator** | Advanced calculations: trigonometry, logarithms, roots |
| 2 | 📊 **Unit Converter** | Length, mass, temperature, speed, volume, energy |
| 3 | 🗂️ **Flashcard Maker** | Create custom double-sided revision cards |
| 4 | 📋 **QCM Generator** | Create, play and grade custom quizzes |
| 5 | ⏱️ **Pomodoro Timer** | Pomodoro method integrated into the dashboard |
| 6 | 📝 **Essay Planner** | Structure your essays, presentations, reports |
| 7 | 🎨 **Whiteboard** | Draw, annotate and export diagrams |
| 8 | 🔍 **Text Analyzer** | Stats: word frequency, readability, tone |
| 9 | 📈 **Grade Calculator** | Calculate your weighted average out of 20 |
| 10 | 📖 **French Conjugator** | Conjugate all French verbs in all tenses |
| 11 | 💬 **Quote Generator** | Discover inspiring quotes |

### ⚡ Focus Mode + Pomodoro
- Full-screen mode: hides sidebar for concentration
- Floating Pomodoro timer (25 min work / 5 min break)
- Session counter
- XP reward: 10 XP per completed session
- Exit with Escape key

### 📊 Personalized Dashboard
- Stats cards: XP, level, streak, available courses
- XP evolution chart over 7 days
- Progress bars: XP, completed courses, used tools
- Quick actions: direct access to tools and courses
- Tool usage tracking

### 🎨 Interface
- Permanent dark theme (no light mode)
- Smooth animations (scroll reveal, hover, transitions)
- Responsive design (mobile, tablet, desktop)
- Sidebar navigation with sections
- Service Worker for caching and resilience

---

## 📦 Technologies

| Technology | Usage |
|------------|-------|
| **HTML5 / CSS3** | Structure and styles (CSS variables, animations) |
| **Vanilla JavaScript** | No framework — pure JavaScript |
| **Firebase Auth** | Authentication (email + Google OAuth) |
| **Firebase Firestore** | Real-time database (courses, classes, messages) |
| **Firebase Hosting** | Hosting and continuous deployment |
| **Firebase Storage** | Profile picture storage |
| **Node.js** | Local HTTP server for development |
| **Service Worker** | Offline caching and resilience |

---

## 🗂️ Project Architecture

```
INTERNATE/
├── .firebaserc                          # Firebase project config
├── firebase.json                        # Firebase Hosting config
├── firestore.rules                      # Firestore security rules
├── server.js                            # Local HTTP server (Node.js)
├── package.json                         # Project metadata
├── README.md                            # French documentation
├── README.en.md                         # English documentation
│
└── public/
    ├── index.html                       # Landing page
    ├── 404.html                         # Custom error page
    ├── contact.html                     # Contact page
    ├── favicon.svg                      # Site icon
    ├── manifest.json                    # PWA manifest
    ├── sw.js                            # Service Worker
    │
    ├── auth/
    │   ├── Login_Internate.html         # Login
    │   └── Register_internate.html      # Registration
    │
    ├── dashboard/
    │   └── Connected_internate.html     # Personalized dashboard
    │
    ├── courses/
    │   └── Ressources_ex.html           # Course management (CRUD)
    │
    ├── classes/
    │   └── index.html                   # Classroom spaces + chat
    │
    ├── profile/
    │   └── index.html                   # User profile + avatar
    │
    ├── help/
    │   └── index.html                   # Help & feedback form
    │
    ├── legal/
    │   └── Legal.html                   # Terms of use
    │
    ├── tools/                           # 11 study tools
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
    │   ├── style.css                    # Global styles
    │   └── theme.css                    # Variables and dark theme
    │
    └── js/
        ├── firebase-config.js           # 🔑 Firebase keys (gitignored)
        ├── firebase-config.example.js   # Template to fill in
        ├── app.js                       # Shared functions (XP, toast, notifs)
        ├── focus-mode.js                # Focus Mode + Pomodoro Timer
        ├── pdf-export.js                # PDF export
        └── theme.js                     # Theme management (deprecated)
```

---

## 🚀 Deployment

The site is deployed on **Firebase Hosting**:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

🔗 **Live site:** [https://internate.web.app](https://internate.web.app)

---

## 💻 Local Development

```bash
# Clone the project
git clone https://github.com/Crypthium123/INTERNATE.git
cd INTERNATE

# Configure Firebase
cp public/js/firebase-config.example.js public/js/firebase-config.js
# → Edit with your Firebase keys

# Start local server
node server.js
# → http://localhost:3000
```

### Required Firebase Configuration

1. Create a project on [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password + Google
3. Enable **Firestore Database** → Start in test mode
4. Enable **Storage** (for profile avatars)
5. Copy keys to `public/js/firebase-config.js`
6. Deploy Firestore rules: `firebase deploy --only firestore:rules`
7. Add domains in Authentication → Authorized domains

---

## 📜 License

© 2026 Internate — All rights reserved

The source code is publicly visible for educational and collaboration purposes. Any commercial use or redistribution without authorization is prohibited.

---

## 📬 Contact

- **Website:** [https://internate.web.app](https://internate.web.app)
- **GitHub:** [Crypthium123/INTERNATE](https://github.com/Crypthium123/INTERNATE)
- **Help:** [https://internate.web.app/help/](https://internate.web.app/help/)
- **Email:** [internatesupport@gmail.com](mailto:internatesupport@gmail.com)

---

<p align="center">
  <sub>Built with ❤️ by students, for students.</sub>
  <br>
  <sub>🇫🇷 A French project — French pride 🇫🇷</sub>
</p>
