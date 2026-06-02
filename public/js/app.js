var deferredPrompt = null;

window.escapeHtml = function(str) {
  if (!str && str !== 0) return '';
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
};
window.escapeAttr = function(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};
window.escapeJsStr = function(str) {
  return String(str).replace(/\\/g,'\\\\').replace(/'/g,"\\u0027").replace(/"/g,'\\u0022').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/</g,'\\u003C').replace(/>/g,'\\u003E');
};

window.setupPWAInstall = function() {
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
};

window.installPWA = function() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(result) {
    deferredPrompt = null;
    if (result.outcome === 'accepted') {
      var btn = document.getElementById('installBtn');
      if (btn) btn.style.display = 'none';
    }
  });
};

window.getDefaultAvatar = function(name) {
  if (!name || !name.trim()) return '?';
  return name.trim().charAt(0).toUpperCase();
};

window.getInitials = function(name) {
  if (!name) return '?';
  var parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
};

var unreadListener = null;
var notifPollingUserId = null;

window.startNotificationPolling = function() {
  window.stopNotificationPolling();
  var user = auth && auth.currentUser;
  if (!user) return;
  notifPollingUserId = user.uid;
  window.updateNotificationBadge();
  unreadListener = db.collection('notifications').where('userId', '==', user.uid).where('read', '==', false).onSnapshot(function(snap) {
    var currentUser = auth && auth.currentUser;
    if (!currentUser || currentUser.uid !== notifPollingUserId) return;
    var badge = document.getElementById('notifBadge');
    if (!badge) return;
    var count = snap.size;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }, function(err) {
    console.error('Notification polling error:', err.message);
  });
};

window.stopNotificationPolling = function() {
  if (unreadListener) {
    unreadListener();
    unreadListener = null;
  }
  notifPollingUserId = null;
};

window.updateNotificationBadge = function() {
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
  }).catch(function(err) {
    console.error('updateNotificationBadge error:', err.message);
  });
};

window.getCurrentUserEmail = function() {
  var user = auth && auth.currentUser;
  return user ? user.email : '';
};

window.getUserDisplayName = function() {
  var user = auth && auth.currentUser;
  if (!user) return '';
  var name = user.displayName;
  if (name && name.trim()) return name.trim();
  if (user.email) return user.email.split('@')[0];
  return '';
};

var pageTransitionsDone = false;

function setupPageTransition() {
  if (pageTransitionsDone) return;
  pageTransitionsDone = true;
  var el = document.querySelector('.main, .main-content, .container, #tool-content');
  if (el) {
    el.style.animation = 'pageFadeIn 0.25s ease both';
  }
}

var pageFadeCSS = '@keyframes pageFadeIn{from{opacity:0.4;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}';
var pfStyle = document.createElement('style');
pfStyle.textContent = pageFadeCSS;
document.head.appendChild(pfStyle);

window.addGamificationXP = function(points) {
  var user = auth && auth.currentUser;
  if (!user) return Promise.resolve();
  var ref = db.collection('userStats').doc(user.uid);
  return db.runTransaction(function(transaction) {
    return transaction.get(ref).then(function(doc) {
      var data = doc.exists ? doc.data() : {};
      var xp = (data.xp || 0) + points;
      var totalActions = (data.totalActions || 0) + 1;
      var today = new Date().toDateString();
      var streak = data.streak || 0;
      var lastActive = data.lastActive || null;
      var level = data.level || 1;
      if (lastActive !== today) {
        var yesterday = new Date(Date.now() - 86400000).toDateString();
        streak = lastActive === yesterday ? streak + 1 : 1;
        lastActive = today;
      }
      var newLevel = Math.floor(xp / 500) + 1;
      var leveledUp = newLevel > level;
      level = newLevel;
      transaction.set(ref, {
        xp: xp, level: level, streak: streak,
        lastActive: lastActive, totalActions: totalActions,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      if (leveledUp) {
        window.showToast('🎉 Niveau ' + newLevel + ' atteint !', 'success');
        db.collection('notifications').add({
          userId: user.uid, type: 'levelup',
          title: 'Niveau supérieur !',
          body: 'Tu as atteint le niveau ' + newLevel + ' !',
          read: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    });
  });
};

window.showToast = function(msg, type) {
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
};

window.goBack = function() {
  window.location.href = '/dashboard/connected_internate.html';
};

function injectBackButton() {
  if (!document.querySelector('.tool-topbar')) return;
  var h1 = document.querySelector('h1');
  if (!h1) return;
  if (document.querySelector('.back-dashboard-btn')) return;
  var btn = document.createElement('a');
  btn.href = '../dashboard/connected_internate.html';
  btn.className = 'back-dashboard-btn';
  btn.innerHTML = '← Dashboard';
  h1.parentNode.insertBefore(btn, h1.nextSibling);
}

var backBtnCSS = '.back-dashboard-btn{display:inline-flex;align-items:center;gap:4px;margin:6px 0 12px;padding:8px 16px;border-radius:8px;border:1px solid var(--border,#2a2a3e);background:var(--surface,#1a1a2e);color:var(--accent,#6c63ff);font-size:0.82rem;font-weight:600;text-decoration:none;cursor:pointer;transition:all 0.2s}.back-dashboard-btn:hover{background:var(--accent,#6c63ff);color:#fff;border-color:var(--accent,#6c63ff);box-shadow:0 2px 12px rgba(108,99,255,0.3)}';

var backBtnStyle = document.createElement('style');
backBtnStyle.textContent = backBtnCSS;
document.head.appendChild(backBtnStyle);

function prefetchLinks() {
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest('a');
    if (!a || !a.href || !a.href.startsWith(location.origin) || a.href === location.href) return;
    if (a.dataset.prefetched) return;
    a.dataset.prefetched = '1';
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = a.href;
    document.head.appendChild(l);
  }, { passive: true });
}

window.initAdminLink = function() {
  var link = document.getElementById('adminLink');
  if (!link) return;
  if (typeof auth === 'undefined') return;
  function checkAdmin(user) {
    if (!user) return;
    user.getIdTokenResult(true).then(function(t) {
      if (t.claims.admin === true) link.style.display = 'flex';
    }).catch(function(err) {
      console.error('Admin check failed:', err.message);
    });
  }
  auth.onAuthStateChanged(function(user) {
    if (user) checkAdmin(user);
  });
};

var swUpdateToast = null;

function setupSWUpdate() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      if (swUpdateToast) {
        swUpdateToast.remove();
        swUpdateToast = null;
      }
      var msg = document.createElement('div');
      msg.className = 'sw-update-toast';
      msg.innerHTML = '<span>Une mise à jour a été installée.</span><button onclick="applySWUpdate()">Appliquer</button>';
      document.body.appendChild(msg);
      swUpdateToast = msg;
      setTimeout(function() {
        if (msg && msg.parentNode) msg.remove();
      }, 15000);
    });
  }
}

window.applySWUpdate = function() {
  if (swUpdateToast) {
    swUpdateToast.remove();
    swUpdateToast = null;
  }
  window.location.reload();
};

var swUpdateCSS = '.sw-update-toast{position:fixed;bottom:20px;right:20px;z-index:99999;background:var(--surface,#1a1a2e);border:1px solid var(--accent,#6c63ff);border-radius:10px;padding:12px 18px;display:flex;align-items:center;gap:14px;font-size:0.85rem;color:var(--text,#e4e4ea);box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:slideUp 0.3s ease;max-width:360px}.sw-update-toast button{background:var(--accent,#6c63ff);color:#fff;border:none;border-radius:6px;padding:6px 14px;font-weight:600;font-size:0.8rem;cursor:pointer;white-space:nowrap;transition:background 0.2s}.sw-update-toast button:hover{background:#5a52e0}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';

var swStyle = document.createElement('style');
swStyle.textContent = swUpdateCSS;
document.head.appendChild(swStyle);

function setupPage() {
  window.setupPWAInstall();
  setupPageTransition();
  window.updateNotificationBadge();
  injectBackButton();
  prefetchLinks();
  window.initAdminLink();
  setupSWUpdate();
}

document.addEventListener('DOMContentLoaded', setupPage);

(function(){
  if(!document.querySelector('.sidebar-logo'))return;
  var scripts = document.getElementsByTagName('script');
  var base = '';
  for (var i = 0; i < scripts.length; i++) {
    if (/app\.js/.test(scripts[i].src)) {
      base = scripts[i].src.replace('app.js', 'focus-mode.js');
      break;
    }
  }
  if (base) {
    var s = document.createElement('script');
    s.src = base;
    s.async = true;
    document.body.appendChild(s);
  }
})();
