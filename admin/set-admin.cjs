// admin/set-admin.js
// Usage: node admin/set-admin.js <email> <true|false>
// Requires: GOOGLE_APPLICATION_CREDENTIALS env variable pointing to service account key

const admin = require('firebase-admin');

const email = process.argv[2];
const isAdmin = process.argv[3] === 'true';

if (!email) {
  console.error('Usage: node admin/set-admin.js <email> <true|false>');
  console.error('Example: node admin/set-admin.js user@example.com true');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

admin.auth().getUserByEmail(email)
  .then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: isAdmin });
  })
  .then(() => {
    console.log(`✅ Admin claim ${isAdmin ? 'ajouté' : 'retiré'} pour ${email}`);
    console.log('ℹ️  L\'utilisateur doit se déconnecter puis reconnecter pour activer le changement.');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  });
