/**
 * Tests pour les règles Firestore d'Internate.
 *
 * Prérequis:
 *   1. Java 11+ installé
 *   2. firebase-tools installé (npm install -g firebase-tools)
 *
 * Lancement:
 *   cd tests
 *   npm install
 *   npm test
 *
 * Ce fichier utilise @firebase/rules-unit-testing pour simuler
 * les requêtes Firestore et valider les règles de sécurité.
 */

const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const RULES_PATH = resolve(__dirname, '..', 'firestore.rules');

let testEnv;

async function setup() {
  const rules = readFileSync(RULES_PATH, 'utf-8');
  testEnv = await initializeTestEnvironment({
    projectId: 'internate-test',
    firestore: { rules }
  });
}

async function teardown() {
  await testEnv.cleanup();
}

// -- Auth helpers --
function authedContext(uid, email, emailVerified = true, admin = false) {
  const token = { email, email_verified: emailVerified, admin };
  return testEnv.authenticatedContext(uid, token);
}

function unauthedContext() {
  return testEnv.unauthenticatedContext();
}

// -- Tests --

async function testUsersCollection() {
  console.log('\n=== Tests /users ===\n');

  // Test 1: Lecture interdite pour utilisateur non connecté
  const unauth = unauthedContext();
  await assertFails(unauth.firestore().collection('users').doc('abc').get());
  console.log('  ✓ Lecture non-auth refusée');

  // Test 2: Lecture autorisée pour son propre userId
  const alice = authedContext('alice123', 'alice@test.com');
  await assertSucceeds(alice.firestore().collection('users').doc('alice123').get());
  console.log('  ✓ Lecture propre document autorisée');

  // Test 3: Lecture refusée pour un autre userId
  await assertFails(alice.firestore().collection('users').doc('bob456').get());
  console.log('  ✓ Lecture document autre utilisateur refusée');

  // Test 4: Création avec champs valides
  const validUser = {
    prenom: 'Alice',
    nom: 'Dupont',
    email: 'alice@test.com',
    role: 'student',
    createdAt: new Date()
  };
  await assertSucceeds(alice.firestore().collection('users').doc('alice123').set(validUser));
  console.log('  ✓ Création valide autorisée');

  // Test 5: Création avec champs invalides (role admin)
  const invalidUser = {
    ...validUser,
    role: 'superadmin'
  };
  await assertFails(alice.firestore().collection('users').doc('alice123').set(invalidUser));
  console.log('  ✓ Création role invalide refusée');
}

async function testCoursCollection() {
  console.log('\n=== Tests /cours ===\n');

  const alice = authedContext('alice123', 'alice@test.com');

  // Test 1: Création cours avec champs valides
  const validCourse = {
    title: 'Cours de maths',
    filiere: 'Scientifique',
    annee: '1ère',
    specialite: 'Maths',
    matiere: 'Mathématiques',
    classId: 'class123',
    matiereLabel: 'Maths',
    matiereIcon: 'calc',
    matiereColor: '#ff6600',
    description: 'Un super cours',
    fileUrl: 'https://drive.google.com/file/d/abc123/view',
    fileName: 'cours_maths.pdf',
    dateAdded: new Date(),
    userId: 'alice123'
  };
  await assertSucceeds(alice.firestore().collection('cours').doc('doc1').set(validCourse));
  console.log('  ✓ Création cours valide autorisée');

  // Test 2: URL invalide refusée
  const invalidUrl = {
    ...validCourse,
    fileUrl: 'https://evil-site.com/malware.pdf'
  };
  await assertFails(alice.firestore().collection('cours').doc('doc2').set(invalidUrl));
  console.log('  ✓ URL cours invalide refusée');
}

async function testClassChatCooldowns() {
  console.log('\n=== Tests /classChatCooldowns ===\n');

  const alice = authedContext('alice123', 'alice@test.com');

  // Test 1: Cooldown créé avec timestamp
  const cooldown = {
    lastMessageAt: new Date(),
    classId: 'class123'
  };
  await assertSucceeds(alice.firestore().collection('classChatCooldowns').doc('alice123').set(cooldown));
  console.log('  ✓ Cooldown création autorisée');

  // Test 2: Lecture cooldown refusée (sécurité)
  await assertFails(alice.firestore().collection('classChatCooldowns').doc('alice123').get());
  console.log('  ✓ Lecture cooldown refusée (read: false)');
}

async function testQuizResults() {
  console.log('\n=== Tests /quizResults ===\n');

  const alice = authedContext('alice123', 'alice@test.com');

  // Test 1: Score > 100 refusé
  const invalidScore = {
    userId: 'alice123',
    score: 150,
    total: 3,
    timestamp: new Date(),
    quizTitle: 'Test',
    classId: 'class123'
  };
  await assertFails(alice.firestore().collection('quizResults').doc('q1').set(invalidScore));
  console.log('  ✓ Score > 100 refusé');

  // Test 2: Score 0 accepté
  const validScore = { ...invalidScore, score: 0 };
  await assertSucceeds(alice.firestore().collection('quizResults').doc('q2').set(validScore));
  console.log('  ✓ Score 0 accepté');
}

async function run() {
  console.log('=== Tests de Règles Firestore — Internate ===');
  console.log('Prérequis: Java 11+, Firebase Emulator actif');
  console.log('Lancement: npm test');

  await setup();
  await testUsersCollection();
  await testCoursCollection();
  await testClassChatCooldowns();
  await testQuizResults();
  await teardown();

  console.log('\n✓ Tous les tests Firestore passés');
}

run().catch(err => {
  console.error('Test échoué:', err);
  process.exit(1);
});
