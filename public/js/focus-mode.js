(function () {
  var PKEY = 'internate_pomodoro';

  function injectCSS() {
    var css = '\
#pomodoro{position:fixed;bottom:24px;right:24px;z-index:99998;\
background:var(--surface,#1a1a2e);border:1px solid var(--border,#2a2a3e);\
border-radius:16px;padding:16px 20px;min-width:200px;\
box-shadow:0 8px 32px rgba(0,0,0,0.4);display:none;flex-direction:column;gap:8px}\
#pomodoro.open{display:flex}\
#pomodoro .p-header{display:flex;align-items:center;justify-content:space-between}\
#pomodoro .p-header span{font-size:0.72rem;font-weight:600;text-transform:uppercase;\
letter-spacing:0.08em;color:var(--muted,#888)}\
#pomodoro .p-header button{width:24px;height:24px;border-radius:6px;border:none;\
background:var(--surface3,#2a2a3e);color:var(--muted,#888);cursor:pointer;font-size:0.7rem;\
display:flex;align-items:center;justify-content:center}\
#pomodoro .p-header button:hover{color:var(--text,#eee)}\
#pomodoro .p-time{font-family:"Syne",sans-serif;font-size:2.2rem;font-weight:700;\
text-align:center;letter-spacing:0.04em;color:var(--text,#eee);line-height:1.2}\
#pomodoro .p-controls{display:flex;gap:6px;justify-content:center}\
#pomodoro .p-controls button{padding:6px 16px;border-radius:8px;border:none;\
font-family:"DM Sans",sans-serif;font-size:0.75rem;font-weight:600;cursor:pointer;\
transition:all 0.15s}\
#pomodoro .p-controls .start{background:var(--accent,#6c63ff);color:#fff}\
#pomodoro .p-controls .start:hover{opacity:0.85}\
#pomodoro .p-controls .stop{background:var(--surface3,#2a2a3e);color:var(--muted,#888)}\
#pomodoro .p-controls .stop:hover{color:var(--red,#ff4757)}\
#pomodoro .p-mode{font-size:0.72rem;color:var(--muted,#888);text-align:center}\
#pomodoro .p-sessions{font-size:0.68rem;color:var(--muted,#666);text-align:center}\
.focus-mode #pomodoro{right:12px;bottom:80px}\
#pomodoroToggle{position:fixed;bottom:24px;right:70px;z-index:99998;\
padding:8px 14px;border-radius:10px;border:1px solid var(--border,#2a2a3e);\
background:var(--surface,#1a1a2e);color:var(--muted,#888);font-size:0.75rem;\
cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:5px;\
font-family:"DM Sans",sans-serif}\
#pomodoroToggle{box-shadow:0 2px 12px rgba(0,0,0,0.3)}\
#pomodoroToggle:hover{color:var(--text,#eee);border-color:var(--accent,#6c63ff);box-shadow:0 2px 16px rgba(108,99,255,0.2)}\
@media(max-width:600px){\
#pomodoro{right:8px;bottom:8px;min-width:170px}\
#pomodoroToggle{right:52px;bottom:8px;font-size:0.7rem;padding:6px 10px}}\
';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function createUI() {
    var d = document.createElement('div');
    d.innerHTML = '<button id="pomodoroToggle">⏱️ Pomodoro</button>' +
      '<div id="pomodoro">' +
      '<div class="p-header"><span>⏱️ Minuteur</span><button onclick="document.getElementById(\'pomodoro\').classList.remove(\'open\')">✕</button></div>' +
      '<div class="p-time" id="pTime">25:00</div>' +
      '<div class="p-controls"><button class="start" id="pStart">Démarrer</button><button class="stop" id="pReset">Réinitialiser</button></div>' +
      '<div class="p-mode" id="pMode">Travail</div>' +
      '<div class="p-sessions" id="pSessions">Sessions: 0</div>' +
      '</div>';
    while (d.children.length > 0) document.body.appendChild(d.firstChild);
  }

  var pomState = { mode: 'work', time: 25 * 60, running: false, interval: null, sessions: 0 };

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }

  function savePomodoro() {
    if (!pomState.running) {
      localStorage.removeItem(PKEY);
      return;
    }
    var data = {
      endTime: Date.now() + pomState.time * 1000,
      mode: pomState.mode,
      sessions: pomState.sessions
    };
    localStorage.setItem(PKEY, JSON.stringify(data));
  }

  function loadPomodoro() {
    var raw = localStorage.getItem(PKEY);
    if (!raw) return;
    try {
      var data = JSON.parse(raw);
      var elapsed = Math.floor((data.endTime - Date.now()) / 1000);
      if (elapsed <= 0) {
        pomState.mode = data.mode === 'work' ? 'break' : 'work';
        pomState.time = pomState.mode === 'work' ? 25 * 60 : 5 * 60;
        pomState.sessions = data.mode === 'work' ? (data.sessions || 0) + 1 : data.sessions || 0;
        localStorage.removeItem(PKEY);
        pomState.running = false;
      } else {
        pomState.mode = data.mode;
        pomState.time = elapsed;
        pomState.sessions = data.sessions || 0;
        pomState.running = true;
      }
    } catch (e) {
      localStorage.removeItem(PKEY);
    }
  }

  function updatePomodoroDisplay() {
    document.getElementById('pTime').textContent = formatTime(pomState.time);
    document.getElementById('pMode').textContent = pomState.mode === 'work' ? 'Travail' + (pomState.running ? ' en cours' : '') : 'Pause';
    document.getElementById('pSessions').textContent = 'Sessions: ' + pomState.sessions;
  }

  function tickPomodoro() {
    if (!pomState.running) return;
    pomState.time--;
    if (pomState.time <= 0) {
      pomState.running = false;
      clearInterval(pomState.interval);
      if (pomState.mode === 'work') {
        pomState.sessions++;
        pomState.mode = 'break';
        pomState.time = 5 * 60;
        addGamificationXP && addGamificationXP(10, 'pomodoro');
        showToast && showToast('🍅 Session terminée ! Prends 5 min de pause.', 'success');
      } else {
        pomState.mode = 'work';
        pomState.time = 25 * 60;
        showToast && showToast('✅ Pause finie, au travail !', 'info');
      }
      var ps = document.getElementById('pStart');
      if (ps) { ps.textContent = 'Démarrer'; ps.style.background = 'var(--accent,#6c63ff)'; }
      localStorage.removeItem(PKEY);
    } else {
      savePomodoro();
    }
    updatePomodoroDisplay();
  }

  function init() {
    if (!document.querySelector('.sidebar-logo')) return;
    injectCSS();
    createUI();

    var pt = document.getElementById('pomodoroToggle');
    var po = document.getElementById('pomodoro');
    var ps = document.getElementById('pStart');
    var pr = document.getElementById('pReset');

    loadPomodoro();
    if (pomState.running) {
      ps.textContent = 'Pause';
      ps.style.background = 'var(--accent,#6c63ff)';
      po.classList.add('open');
      if (pomState.interval) clearInterval(pomState.interval);
      pomState.interval = setInterval(tickPomodoro, 1000);
    }
    updatePomodoroDisplay();

    pt.onclick = function () { po.classList.toggle('open') };

    ps.onclick = function () {
      if (pomState.running) {
        pomState.running = false;
        clearInterval(pomState.interval);
        ps.textContent = 'Reprendre';
        ps.style.background = 'var(--accent2,#00d4aa)';
        localStorage.removeItem(PKEY);
        updatePomodoroDisplay();
        return;
      }
      pomState.running = true;
      ps.textContent = 'Pause';
      ps.style.background = 'var(--accent,#6c63ff)';
      if (pomState.interval) clearInterval(pomState.interval);
      pomState.interval = setInterval(tickPomodoro, 1000);
      savePomodoro();
      updatePomodoroDisplay();
    };

    pr.onclick = function () {
      pomState.running = false;
      clearInterval(pomState.interval);
      pomState.mode = 'work';
      pomState.time = 25 * 60;
      pomState.sessions = 0;
      ps.textContent = 'Démarrer';
      ps.style.background = 'var(--accent,#6c63ff)';
      localStorage.removeItem(PKEY);
      updatePomodoroDisplay();
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
