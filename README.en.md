<p align="center">
  <img src="public/favicon.svg" width="80" alt="Internate">
</p>

<h1 align="center">Internate</h1>

<p align="center">
  <b>Collaborative educational platform — by students, for students.</b>
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
  <a href="README.md">🇫🇷 Français</a> ·
  <a href="#en-english">🇬🇧 English</a>
</p>

---

<a id="en-english"></a>

## Table of Contents

- [The Story](#the-story)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Deployment](#deployment)
- [Build & Tests](#build--tests)
- [Security](#security)
- [PWA](#pwa)
- [CI / CD](#ci--cd)
- [License](#license)
- [Contact](#contact)

---

## The Story

> We were in 10th grade (Seconde). Like every high school student, we were accumulating class notes, cheat sheets, links, PDFs — a digital mess. Every week, the same struggle: "Do you have the math lesson?" — "Wait, I'll send it…" — file not found, dead link, outdated version.

**Internate was born from this frustration.**

It started as a simple HTML folder on a hard drive. A page with links to our courses. Then we added a flashcard system, a unit converter, a calculator… The project grew, but stayed confidential — used by our class, and that was it.

Then came the redesign. Dark interface, dashboard, interactive tools. We discovered Firebase, authentication, hosting. The project became more serious. We shared it with our teachers, who showed it to other classes. The feedback was encouraging, but the localStorage system was showing its limits.

**2026 — V3 arrived.** Real-time Firestore sync, classroom spaces with chat, course comments, gamification (XP, levels, streaks). The project evolved from a class tool to a true multi-user platform. Automated build with Vite, next-gen Service Worker, validation tests, CI/CD.

---

## Features

### 🔐 Authentication

| Feature | Details |
|---------|---------|
| Email + password | Sign up and login |
| Google OAuth | One-click login |
| Email verification | Required at registration |
| Password reset | Reset email |
| Persistent session | Stay logged in between visits |
| Authorized domains | Firebase Auth secured |

### 📚 Collaborative Courses

| Feature | Details |
|---------|---------|
| Full CRUD | Add, edit, delete courses |
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
| Join class | Via invitation code |
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

### 🏆 Gamification System

- **XP** : earn points by using tools, sharing courses, helping others
- **Levels** : one level every 500 XP (calculated automatically)
- **Streaks** : consecutive daily activity
- **Notifications** : alert on each level up
- **Admin badge** : visible link for administrators

### 🎨 Interface

- Permanent dark theme (no light mode)
- Smooth animations (scroll reveal, hover, transitions)
- Responsive design (mobile, tablet, desktop)
- Sidebar navigation with sections
- Course search bar
- Toast notifications
- Custom 404 page

---

## Tech Stack

| Technology | Role |
|------------|------|
| **Vite 5** | Build tool: multi-page, HMR, code splitting |
| **HTML5 / CSS3** | Structure, styles, CSS variables, animations |
| **Vanilla JavaScript (ES6+)** | No framework — pure JS with ES modules |
| **Firebase Auth** | Email + Google OAuth authentication |
| **Firebase Firestore** | Real-time NoSQL database |
| **Firebase Hosting** | CDN hosting, continuous deployment |
| **Firebase Storage** | Profile picture storage |
| **Firebase Analytics** | Usage statistics (optional) |
| **Service Worker (v3)** | Offline cache, navigationPreload, offline fallback |
| **GitHub Actions** | CI: automatic validation on every push |
| **Node.js** | Runtime for build tools |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Browser (User)                          │
├──────────────────────────────────────────────────────────┤
│                    Vite (build + HMR)                      │
├──────────────────────────────────────────────────────────┤
│              Service Worker v3 (PWA / offline)             │
├──────────────────────────────────────────────────────────┤
│           Static HTML pages (ES modules)                   │
├───────────────────┬──────────────────┬───────────────────┤
│   Firebase Auth   │  Firebase DB     │  Firebase Hosting  │
│ (Email / Google)  │ (Firestore NoSQL)│  (CDN + deploy)    │
└───────────────────┴──────────────────┴───────────────────┘
```

**Vite multi-page architecture.** Each page is a static HTML file importing its Firebase dependencies via ES modules. The Vite build produces optimized bundles with code splitting, content hashing, and minification. Unlike a SPA, every page has its own entry point: no client-side routing, instant loading.

**Layered security:**
1. CSP headers (Firebase Hosting) restrict authorized sources
2. Firestore Rules validate every request (ownership, size, type)
3. Escape functions (`escapeHtml`, `escapeAttr`, `escapeJsStr`) prevent XSS
4. localStorage limited to `uid` and `email` (no personal data client-side)

---

## Project Structure

```
INTERNATE-V3/
├── .firebaserc                    # Firebase project target
├── .github/workflows/             # CI GitHub Actions
│   └── ci.yml                     # Automatic validation
├── firebase.json                  # Hosting config + CSP headers
├── firestore.rules                # Firestore security rules
├── firestore.indexes.json         # Firestore composite indexes
├── vite.config.js                 # Vite multi-page configuration
├── package.json                   # Dependencies and scripts
├── README.md                      # French documentation
├── README.en.md                   # English documentation
├── SECURITY.md                    # Security policy
├── CONSOLE-SETUP.md               # Firebase Console setup guide
├── tests/                         # Validation suites
│   ├── validate.js                # 10 tests (HTML, security, SW)
│   ├── firestore-rules-test.js    # Firestore rules tests
│   └── package.json               # Test dependencies
│
└── public/                        # Sources (site root)
    ├── index.html                 # Landing page
    ├── 404.html                   # Error page
    ├── contact.html               # Contact page
    ├── offline.html               # PWA fallback page
    ├── favicon.svg                # Site icon
    ├── manifest.json              # PWA manifest
    ├── sw.js                      # Service Worker (v3)
    │
    ├── auth/                      # Authentication
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
    ├── tools/                     # 11 study tools
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
    │   ├── style.css              # Global styles
    │   └── theme.css              # Dark theme + variables
    │
    └── js/
        ├── firebase-config.js     # 🔑 Firebase keys (gitignored)
        ├── firebase-config.example.js  # Template to fill in
        ├── app.js                 # Shared functions (XP, toast, escape)
        ├── escape.js              # HTML/JS escaping (tools without modules)
        └── focus-mode.js          # Focus Mode + Pomodoro Timer
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- A [Firebase](https://console.firebase.google.com) project (free tier)

### Quick setup

```bash
# 1. Clone
git clone https://github.com/Crypthium123/INTERNATE.git
cd INTERNATE-V3

# 2. Install dependencies
npm install

# 3. Configure Firebase
cp public/js/firebase-config.example.js public/js/firebase-config.js
# → Edit with your Firebase project keys

# 4. Start Vite dev server
npm run dev
# → http://localhost:3000
```

### Full Firebase setup

1. Create a project on [console.firebase.google.com](https://console.firebase.google.com)
2. **Authentication** → Enable Email/Password + Google
3. **Firestore Database** → Create database (production mode recommended)
4. **Storage** → Enable (profile avatars)
5. Copy configuration keys to `public/js/firebase-config.js`
6. **Authentication → Settings → Authorized domains** → Add `localhost` and `internate.web.app`
7. Deploy Firestore rules:
   ```bash
   npx firebase-tools deploy --only firestore:rules
   ```

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server (HMR) |
| `npm run build` | Production build (→ `dist/`) |
| `npm run preview` | Preview production build |
| `npm test` | Automated validation (10 tests) |
| `npm run test:rules` | Firestore rules tests |
| `npm run deploy` | Build + Firebase Hosting deploy |

---

## Deployment

```bash
# Full deployment
npm run deploy

# Or manually
npm run build
firebase deploy --only hosting
```

🔗 **Production site:** [https://internate.web.app](https://internate.web.app)

The deployment produces **40 optimized files** in `dist/`:
- 26 HTML pages (minified, with SRI)
- 12 JS bundles (code-split by page, content-hashed)
- 2 CSS files (variables + styles, content-hashed)
- Static assets (favicon, manifest, PWA icons)

---

## Build & Tests

### Vite Build

- **Multi-page** : each HTML page has its own entry point
- **Code splitting** : Firebase SDK separated from application code
- **Content hashing** : all output files have content hashes (immutable cache, 1 year)
- **Minification** : JS and CSS minified automatically
- **110 modules transformed** in ~3s

### Validation Tests (10 tests)

The `tests/validate.js` file automatically verifies:

| # | Test | Description |
|---|------|-------------|
| 1 | `lang="fr"` | All HTML files have `lang="fr"` |
| 2 | `<!DOCTYPE html>` | Doctype present everywhere |
| 3 | `charset="UTF-8"` | Encoding defined |
| 4 | escapeHtml access | Every file using `innerHTML` has access to `escapeHtml()` |
| 5 | localStorage PII | `currentUser` stores only `uid` + `email` |
| 6 | Firebase without CDN | No file uses `firebase.*` without importing Firebase |
| 7 | Tool auth check | Tools use `user.uid` for authentication |
| 8 | Navigation Preload | SW enables `navigationPreload` |
| 9 | Offline page | SW precaches `offline.html` |
| 10 | Escape functions | `app.js` contains `escapeHtml`, `escapeAttr`, `escapeJsStr` |

### Firestore Rules Tests

```bash
npm run test:rules
# → Requires Java Runtime (JRE) for Firestore emulator
```

### CI GitHub Actions

On every push, CI automatically runs:
- `npm test` → 10 validation tests
- Verifies that the build succeeds (simulation)

---

## Security

### Firestore Rules (`firestore.rules`)

The rules implement layered security:

- **Default deny** : any access not explicitly authorized is denied
- **Data ownership** : only authors can modify/delete their documents
- **Field validation** : maximum size, expected types, regex format
- **Rate limiting** : 5s cooldown between chat messages
- **Delete protection** : 24h window for classes
- **Admin claims** : special access for administrators
- **Server timestamps** : server-side timestamp (non-forgeable)

### Content Security Policy (CSP)

CSP headers (in `firebase.json`) strictly limit:

- `default-src 'self'` — everything starts from the same origin
- `base-uri 'self'` — no base URL hijacking
- `form-action 'self'` — forms only go to the same site
- `frame-ancestors 'self'` — no third-party iframe embedding
- `script-src` — limited to authorized Firebase and Google CDNs
- `style-src` — limited to self + Google Fonts
- `connect-src` — limited to Firebase and Google APIs

### XSS Protection

- **`escapeHtml()`** : escapes HTML for `innerHTML` (uses `textContent` + `createTextNode`)
- **`escapeAttr()`** : escapes HTML attributes (`&`, `"`, `'`, `<`, `>`)
- **`escapeJsStr()`** : escapes JavaScript strings (backslash, quotes, newlines, chevrons)
- Every page manipulating dynamic HTML has access to these functions (automatically tested)

### Personal Data

- **localStorage** : contains only `{ uid, email }` — no first name, last name, or photo
- **Firestore** : profiles store first name/last name/photo (user account data)
- **Authentication** : verified email required before accessing features
- **Session** : persistent via Firebase Auth (refresh tokens)

---

## PWA

Internate is a full **Progressive Web App**:

| Feature | Details |
|---------|---------|
| **Manifest** | `manifest.json` with icons (SVG 192 + 512), theme, orientation |
| **Service Worker v3** | Cache strategy with `allSettled` |
| **Navigation Preload** | Anticipated page loading (reduced latency) |
| **Offline page** | `offline.html` when network is unavailable |
| **Installable** | Install banner (`beforeinstallprompt`) |
| **Cache** | Cache-first for assets, Network-first with offline fallback |
| **Update** | Toast notification when a new version is available |
| **skipWaiting** | Immediate new SW activation on refresh |

### Cache Strategy

- **Cache-First** : static assets (CSS, JS, fonts, icons)
- **Network-First** : page navigation (with offline.html fallback)
- **Preloading** : main pages cached at install time
- **allSettled** : SW won't block if a resource fails
- **Duration** : immutable 1-year cache for hashed build assets

---

## CI / CD

### GitHub Actions (`.github/workflows/ci.yml`)

```yaml
Triggers : push on all branches, PR on master
Runner : ubuntu-latest, Node 20
Steps :
  1. npm ci (clean install)
  2. npm test (10 validation tests)
  3. Vite build simulation (verifies build succeeds)
```

---

## License

© 2026 Internate — All rights reserved.

The source code is publicly visible for educational and collaboration purposes. Any commercial use, redistribution, or reproduction without prior authorization is prohibited.

---

## Contact

- **Website:** [https://internate.web.app](https://internate.web.app)
- **GitHub repository:** [Crypthium123/INTERNATE](https://github.com/Crypthium123/INTERNATE)
- **Help:** [https://internate.web.app/help/](https://internate.web.app/help/)
- **Contact page:** [https://internate.web.app/contact.html](https://internate.web.app/contact.html)

---

<p align="center">
  <sub>Built with ❤️ by students, for students.</sub>
  <br>
  <sub>🇫🇷 A French project</sub>
</p>
