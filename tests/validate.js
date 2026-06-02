const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

function globFiles(dir, pattern) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...globFiles(full, pattern));
    } else if (entry.name.endsWith(pattern)) {
      results.push(full);
    }
  }
  return results;
}

function readFile(p) {
  return fs.readFileSync(p, 'utf-8');
}

console.log('\n=== Validation des fichiers HTML ===\n');

const htmlFiles = globFiles(PUBLIC_DIR, '.html');

// Test 1: Tous les fichiers HTML ont une balise <html lang="fr">
test('Tous les fichiers HTML ont lang="fr"', () => {
  const missing = htmlFiles.filter(f => !readFile(f).includes('html lang="fr"'));
  if (missing.length > 0) {
    throw new Error(`Fichiers sans lang="fr": ${missing.map(f => path.relative(PUBLIC_DIR, f)).join(', ')}`);
  }
});

// Test 2: Tous les fichiers HTML ont <!DOCTYPE html>
test('Tous les fichiers HTML ont DOCTYPE', () => {
  const missing = htmlFiles.filter(f => !readFile(f).includes('<!DOCTYPE html>'));
  if (missing.length > 0) {
    throw new Error(`Fichiers sans DOCTYPE: ${missing.map(f => path.relative(PUBLIC_DIR, f)).join(', ')}`);
  }
});

// Test 3: Tous les fichiers HTML ont <meta charset="UTF-8">
test('Tous les fichiers HTML ont charset UTF-8', () => {
  const missing = htmlFiles.filter(f => !readFile(f).includes('charset="UTF-8"') && !readFile(f).includes("charset='UTF-8'"));
  if (missing.length > 0) {
    throw new Error(`Fichiers sans charset UTF-8: ${missing.map(f => path.relative(PUBLIC_DIR, f)).join(', ')}`);
  }
});

// Test 4: Vérifier la présence d'appels escapeHtml dans les fichiers qui génèrent du HTML
test('Les fichiers avec innerHTML ont escapeHtml accessible', () => {
  const riskyFiles = htmlFiles.filter(f => {
    const content = readFile(f);
    return content.includes('innerHTML') && !f.includes('sw.js');
  });
  const withoutEscape = riskyFiles.filter(f => {
    const content = readFile(f);
    if (content.includes('function escapeHtml') || content.includes('window.escapeHtml')) return false;
    if (content.includes('/js/app') || content.includes('/js/escape')) return false;
    if (content.includes('escapeHtml(')) return false;
    return true;
  });
  if (withoutEscape.length > 0) {
    const rel = withoutEscape.map(f => path.relative(PUBLIC_DIR, f));
    throw new Error(`Fichiers avec innerHTML mais sans escapeHtml: ${rel.join(', ')}`);
  }
});

// Test 5: Vérifier que les fichiers avec localStorage.setItem('currentUser'... ne stockent que uid + email
test('localStorage currentUser ne stocke que uid + email (pas de PII)', () => {
  const files = htmlFiles.filter(f => {
    const content = readFile(f);
    return content.includes('localStorage.setItem(\'currentUser\',')
        || content.includes('localStorage.setItem("currentUser",');
  });
  for (const f of files) {
    const content = readFile(f);
    const setItemRegex = /localStorage\.setItem\(['"]currentUser['"],\s*JSON\.stringify\(([^)]+)\)/g;
    let match;
    while ((match = setItemRegex.exec(content)) !== null) {
      const value = match[1];
      if (value.includes('prenom') || value.includes('nom') || value.includes('...')) {
        const rel = path.relative(PUBLIC_DIR, f);
        throw new Error(`${rel}: contient prenom/nom/spread dans localStorage.setItem(currentUser, ...)\n  Valeur: ${value.substring(0, 120)}`);
      }
    }
  }
});

// Test 6: Vérifier que les fichiers sans Firebase n'utilisent pas firebase.*
test('Fichiers sans Firebase ne référencent pas firebase.*', () => {
  const files = htmlFiles.filter(f => {
    const content = readFile(f);
    return !content.includes('firebase-app-compat.js') && !content.includes('firebase-app.js') && !content.includes("from 'firebase/") && !content.includes('from "firebase/') && !content.includes('firebase-config');
  });
  const offenders = files.filter(f => {
    const content = readFile(f);
    const lines = content.split('\n');
    return lines.some(line => line.includes('firebase.') && !line.includes('serviceWorker') && !line.includes('navigator'));
  });
  if (offenders.length > 0) {
    const rel = offenders.map(f => path.relative(PUBLIC_DIR, f));
    throw new Error(`Fichiers qui utilisent firebase.* sans charger Firebase: ${rel.join(', ')}`);
  }
});

// Test 7: Vérifier que les tool pages utilisent user.uid (pas user.email)
test('Tool pages utilisent user.uid pour auth check', () => {
  const toolFiles = htmlFiles.filter(f => f.includes('tools\\'));
  for (const f of toolFiles) {
    const content = readFile(f);
    if (content.includes('localStorage.getItem(\'currentUser\')') || content.includes('localStorage.getItem("currentUser")')) {
      if (content.includes('user.uid') && !content.includes('user.email')) {
        continue; // OK
      }
      if (content.includes('user && user.uid')) {
        continue; // OK (our new pattern)
      }
      const rel = path.relative(PUBLIC_DIR, f);
      if (content.includes('user.email') && !content.includes('user.uid')) {
        throw new Error(`${rel}: utilise encore user.email au lieu de user.uid`);
      }
    }
  }
});

console.log('\n=== Validation SW ===\n');

// Test 8: SW a navigationPreload
test('SW.js a navigation preload', () => {
  const swPath = path.join(PUBLIC_DIR, 'sw.js');
  const sw = readFile(swPath);
  if (!sw.includes('navigationPreload')) {
    throw new Error('navigationPreload manquant dans sw.js');
  }
  if (!sw.includes('event.preloadResponse')) {
    throw new Error('preloadResponse manquant dans sw.js');
  }
});

// Test 9: SW a offline.html dans le cache
test('SW.js précharge offline.html', () => {
  const swPath = path.join(PUBLIC_DIR, 'sw.js');
  const sw = readFile(swPath);
  if (!sw.includes('/offline.html')) {
    throw new Error('/offline.html manquant dans le précache SW');
  }
});

console.log('\n=== Validation Escape Functions ===\n');

// Test 10: Les 3 fonctions escape existent
test('Les 3 fonctions escape existent dans app.js', () => {
  const appPath = path.join(PUBLIC_DIR, 'js', 'app.js');
  const app = readFile(appPath);
  if (!app.includes('escapeHtml')) throw new Error('escapeHtml manquant');
  if (!app.includes('escapeAttr')) throw new Error('escapeAttr manquant');
  if (!app.includes('escapeJsStr')) throw new Error('escapeJsStr manquant');
});

console.log('\n=== Résultats ===\n');
console.log(`  Passé: ${passed}`);
console.log(`  Échoué: ${failed}`);
console.log(`  Total: ${passed + failed}`);
if (failed > 0) process.exit(1);
