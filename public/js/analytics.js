(function () {
  const STORAGE_KEY = 'internate-analytics';
  let pendingPage = null;
  let pendingTools = [];
  let synced = false;

  function getLocal() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveLocal(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function trackLocal(type, data) {
    const store = getLocal();
    if (type === 'pageview') {
      const page = data.page;
      if (!store.pages) store.pages = {};
      if (!store.pages[page]) store.pages[page] = { views: 0, lastVisit: null };
      store.pages[page].views += 1;
      store.pages[page].lastVisit = new Date().toISOString();
      if (!store.sessions) store.sessions = [];
      store.sessions.push({ page, time: Date.now() });
      if (store.sessions.length > 500) store.sessions = store.sessions.slice(-500);
    } else if (type === 'tool') {
      if (!store.tools) store.tools = {};
      if (!store.tools[data.tool]) store.tools[data.tool] = { uses: 0, actions: [] };
      store.tools[data.tool].uses += 1;
      store.tools[data.tool].actions.push({ action: data.action, time: Date.now() });
      if (store.tools[data.tool].actions.length > 100) {
        store.tools[data.tool].actions = store.tools[data.tool].actions.slice(-100);
      }
    }
    saveLocal(store);
  }

  async function trackFirestore(type, data) {
    if (typeof firebase === 'undefined' || !firebase.app) return;
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;
      const doc = {
        userId: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (type === 'pageview') {
        doc.type = 'pageview';
        doc.page = data.page;
      } else if (type === 'tool') {
        doc.type = 'tool';
        doc.tool = data.tool;
        doc.action = data.action;
      }
      await firebase.firestore().collection('analytics').add(doc);
    } catch (e) {
      if (e.code !== 'failed-precondition' && e.code !== 'unavailable') {
        console.warn('Analytics Firestore error:', e.message);
      }
    }
  }

  function flushPending() {
    if (synced) return;
    const user = typeof firebase !== 'undefined' && firebase.app ? firebase.auth().currentUser : null;
    if (!user) return;
    if (pendingPage) {
      trackFirestore('pageview', { page: pendingPage });
      pendingPage = null;
    }
    while (pendingTools.length > 0) {
      const t = pendingTools.shift();
      trackFirestore('tool', t);
    }
    synced = true;
  }

  function initAuthListener() {
    if (typeof firebase === 'undefined' || !firebase.app) return;
    firebase.auth().onAuthStateChanged(user => {
      if (user) flushPending();
    });
  }

  function trackPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index';
    trackLocal('pageview', { page });
    pendingPage = page;
    flushPending();
  }

  function trackTool(toolName, action) {
    trackLocal('tool', { tool: toolName, action });
    pendingTools.push({ tool: toolName, action });
    flushPending();
  }

  function getLocalAnalytics() {
    return getLocal();
  }

  function clearLocalAnalytics() {
    localStorage.removeItem(STORAGE_KEY);
  }

  async function getGlobalAnalytics() {
    if (typeof firebase === 'undefined' || !firebase.app) return getLocal();
    try {
      const user = firebase.auth().currentUser;
      if (!user || user.email !== 'gc05122008@gmail.com') return getLocal();
      const snapshot = await firebase.firestore().collection('analytics')
        .orderBy('timestamp', 'desc')
        .limit(5000)
        .get();
      const data = { pages: {}, tools: {}, sessions: [] };
      snapshot.forEach(doc => {
        const d = doc.data();
        if (d.type === 'pageview' && d.page) {
          if (!data.pages[d.page]) data.pages[d.page] = { views: 0, lastVisit: null };
          data.pages[d.page].views += 1;
          if (d.timestamp) data.pages[d.page].lastVisit = d.timestamp.toDate().toISOString();
          data.sessions.push({ page: d.page, time: d.timestamp ? d.timestamp.toMillis() : Date.now() });
        } else if (d.type === 'tool' && d.tool) {
          if (!data.tools[d.tool]) data.tools[d.tool] = { uses: 0, actions: [] };
          data.tools[d.tool].uses += 1;
          data.tools[d.tool].actions.push({ action: d.action, time: d.timestamp ? d.timestamp.toMillis() : Date.now() });
        }
      });
      const local = getLocal();
      return { global: data, local: local };
    } catch (e) {
      console.warn('Analytics Firestore read error:', e.message);
      return getLocal();
    }
  }

  trackPage();
  initAuthListener();
  window.analytics = { trackTool, getLocalAnalytics, clearLocalAnalytics, getGlobalAnalytics };
})();
