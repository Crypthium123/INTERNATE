var deferredPrompt = null;

function setupPWAInstall() {
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'flex';
  });
  window.addEventListener('appinstalled', function() {
    deferredPrompt = null;
    var btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'none';
  });
}

function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(result) {
    deferredPrompt = null;
    if (result.outcome === 'accepted') {
      var btn = document.getElementById('installBtn');
      if (btn) btn.style.display = 'none';
    }
  });
}

function getDefaultAvatar(name) {
  if (!name || !name.trim()) return '?';
  return name.trim().charAt(0).toUpperCase();
}

function getInitials(name) {
  if (!name) return '?';
  var parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
}

var unreadInterval = null;

function startNotificationPolling() {
  updateNotificationBadge();
  if (unreadInterval) clearInterval(unreadInterval);
  unreadInterval = setInterval(updateNotificationBadge, 15000);
}

function stopNotificationPolling() {
  if (unreadInterval) {
    clearInterval(unreadInterval);
    unreadInterval = null;
  }
}

function updateNotificationBadge() {
  var user = auth && auth.currentUser;
  if (!user) return;
  var badge = document.getElementById('notifBadge');
  if (!badge) return;
  db.collection('notifications').where('userId', '==', user.uid).where('read', '==', false).get().then(function(snap) {
    var count = snap.size;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }).catch(function() {});
}

function getCurrentUserEmail() {
  var user = auth && auth.currentUser;
  return user ? user.email : '';
}

function getUserDisplayName() {
  var user = auth && auth.currentUser;
  if (!user) return '';
  var name = user.displayName;
  if (name && name.trim()) return name.trim();
  if (user.email) return user.email.split('@')[0];
  return '';
}

var pageTransitionsDone = false;

function setupPageTransition() {
  if (pageTransitionsDone) return;
  pageTransitionsDone = true;
  var main = document.querySelector('.main, .main-content, .container');
  if (main) {
    main.style.animation = 'pageIn 0.4s ease both';
  }
}

function setupPullToRefresh() {
  var touchStartY = 0;
  var pulling = false;
  var overlay = document.getElementById('ptrOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'ptrOverlay';
    overlay.innerHTML = '<div class="ptr-spinner"></div>';
    document.body.appendChild(overlay);
  }
  document.addEventListener('touchstart', function(e) {
    if (window.scrollY === 0) {
      touchStartY = e.touches[0].clientY;
      pulling = true;
    }
  }, { passive: true });
  document.addEventListener('touchmove', function(e) {
    if (!pulling || window.scrollY > 0) return;
    var delta = e.touches[0].clientY - touchStartY;
    if (delta > 60) {
      overlay.classList.add('visible');
    }
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    if (!pulling) return;
    pulling = false;
    if (overlay.classList.contains('visible')) {
      overlay.classList.add('loading');
      setTimeout(function() {
        window.location.reload();
      }, 400);
    }
  }, { passive: true });
}

function getUserAvatarUrl(uid) {
  return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getUserDisplayName()) + '&background=6c63ff&color=fff&size=128';
}

function addGamificationXP(points, action) {
  var user = auth && auth.currentUser;
  if (!user) return Promise.resolve();
  var ref = db.collection('userStats').doc(user.uid);
  return ref.get().then(function(doc) {
    var data = doc.exists ? doc.data() : { xp: 0, level: 1, streak: 0, lastActive: null, totalActions: 0 };
    data.xp = (data.xp || 0) + points;
    data.totalActions = (data.totalActions || 0) + 1;
    var today = new Date().toDateString();
    if (data.lastActive !== today) {
      var yesterday = new Date(Date.now() - 86400000).toDateString();
      data.streak = data.lastActive === yesterday ? (data.streak || 0) + 1 : 1;
      data.lastActive = today;
    }
    var newLevel = Math.floor(data.xp / 500) + 1;
    var leveledUp = newLevel > (data.level || 1);
    data.level = newLevel;
    return ref.set(data, { merge: true }).then(function() {
      if (leveledUp) {
        showToast('🎉 Niveau ' + newLevel + ' atteint !', 'success');
        db.collection('notifications').add({
          userId: user.uid,
          type: 'levelup',
          title: 'Niveau supérieur !',
          body: 'Tu as atteint le niveau ' + newLevel + ' !',
          read: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    });
  });
}

function showToast(msg, type) {
  type = type || 'info';
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  var t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(function() { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; setTimeout(function() { t.remove(); }, 300); }, 3000);
}

function setupPage() {
  setupPWAInstall();
  setupPageTransition();
  updateNotificationBadge();
}

document.addEventListener('DOMContentLoaded', setupPage);
