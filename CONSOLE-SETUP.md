# Configuration Firebase Console

## 1. Configurer l'admin (Custom Claims)

L'administration ne repose plus sur une adresse email hardcodée.

### Étape 1 : Générer une clé de service

1. Firebase Console → **Project Settings** → **Service Accounts**
2. **Generate new private key** → télécharger le JSON
3. Renommer `internate-service-account.json` et placer à la racine

### Étape 2 : Donner les droits admin

```bash
cd dev/INTERNATE-V3
npm install
GOOGLE_APPLICATION_CREDENTIALS="./internate-service-account.json" node admin/set-admin.js gc05122008@gmail.com true
```

> L'utilisateur doit se **déconnecter puis reconnecter** pour activer le token admin.

### Étape 3 : Ajouter d'autres admins

```bash
node admin/set-admin.js autre.email@gmail.com true
```

---

## 2. Activer reCAPTCHA Enterprise (App Check)

1. https://console.cloud.google.com/ → projet **internate**
2. **Security** → **reCAPTCHA Enterprise**
3. Créer une clé Site Web : `Internate App Check`, domaines : `internate.web.app`, `localhost`
4. Copier la clé → dé-commenter App Check dans `js/firebase-config.js`

## 3. Restreindre les méthodes de connexion

Firebase Console → **Authentication** → **Sign-in method**
- Désactiver Anonymous
- Activer Email/Password
- Activer Google (avec restriction domaine si souhaité)

## 4. Activer App Check

Firebase Console → **App Check** → **Get started** → reCAPTCHA Enterprise → **Enforce**

## 5. Déployer les nouvelles règles

```bash
firebase deploy --only firestore:rules
```

---

### Notes

- Les **Custom Claims** (`request.auth.token.admin`) remplacent l'email hardcodé.
- `'unsafe-eval'` retiré du CSP.
- Rate limiting chat : `classChatCooldowns/{userId}` (activé dans les rules).
- `firebase-config.js` dans `.gitignore`.
