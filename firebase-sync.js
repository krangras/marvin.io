const SYNC_KEYS = [
  'exam_manager_v9', 'semester1_progress',
  'kr_progress', 'exam_tasks_progress', 'integrals_progress',
  'physics_progress', 'physics_answers'
];

let syncTimer = null;
const SYNC_DELAY = 1000;
let _reinitCallback = null;
let _pendingReinit = false;
let _skipSync = false;
let _snapshotUnsub = null;
let _isPushing = false;
let _isLoading = false;
let _firstSnapshotDone = false;

// ── Safe localStorage ──────────────────────────────────────────────
function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); }
  catch (e) { console.warn('localStorage write failed:', key, e.message); }
}

function safeRemoveItem(key) {
  try { localStorage.removeItem(key); }
  catch (e) { console.warn('localStorage remove failed:', key, e.message); }
}

// ── Per-key version tracking ───────────────────────────────────────
function getKeyVersions() {
  try { return JSON.parse(localStorage.getItem('_keyVersions') || '{}'); }
  catch (e) { return {}; }
}

function bumpKeyVersion(key) {
  var v = getKeyVersions();
  v[key] = Date.now();
  safeSetItem('_keyVersions', JSON.stringify(v));
}

// ── Collect local data for push ────────────────────────────────────
function collectLocalData() {
  var data = {};
  var versions = getKeyVersions();
  for (var i = 0; i < SYNC_KEYS.length; i++) {
    var key = SYNC_KEYS[i];
    var val = localStorage.getItem(key);
    if (val !== null) {
      data[key] = val;
    }
  }
  return { data: data, versions: versions };
}

// ── Push local → Firestore ─────────────────────────────────────────
function pushLocalToFirestore() {
  if (!authUser || _skipSync) return;
  _isPushing = true;
  var collected = collectLocalData();
  db.collection('users').doc(authUser.uid).set({
    progress: collected.data,
    _keyVersions: collected.versions,
    _updated: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).then(function () {
    _isPushing = false;
    safeSetItem('sync_updated', Date.now().toString());
  }).catch(function (err) {
    _isPushing = false;
    console.error('Firestore sync error:', err);
  });
}

// ── Schedule debounced push ────────────────────────────────────────
function scheduleFirestoreSync() {
  if (_skipSync || syncTimer) return;
  syncTimer = setTimeout(function () {
    syncTimer = null;
    pushLocalToFirestore();
  }, SYNC_DELAY);
}

// ── localStorage write helpers ─────────────────────────────────────
function saveToStorage(key, value) {
  safeSetItem(key, value);
  if (authUser && !_skipSync) {
    bumpKeyVersion(key);
    safeSetItem('sync_updated', Date.now().toString());
    scheduleFirestoreSync();
  }
}

function removeFromStorage(key) {
  safeRemoveItem(key);
  if (authUser && !_skipSync) {
    bumpKeyVersion(key);
    safeSetItem('sync_updated', Date.now().toString());
    scheduleFirestoreSync();
  }
}

// ── Merge remote → local (per-key version comparison) ──────────────
function mergeRemoteData(remote) {
  var rp = remote.progress || {};
  var rv = remote._keyVersions || {};
  var lv = getKeyVersions();
  var merged = false;

  for (var j = 0; j < SYNC_KEYS.length; j++) {
    var k = SYNC_KEYS[j];
    if (rp[k] === undefined || rp[k] === null) continue;

    var remoteVer = rv[k] || 0;
    var localVer = lv[k] || 0;

    if (remoteVer >= localVer) {
      safeSetItem(k, rp[k]);
      merged = true;
    }
  }

  return merged;
}

// ── Reinit (with try/finally to prevent _skipSync leak) ───────────
function reinitApp() {
  if (typeof _reinitCallback === 'function') {
    try {
      _skipSync = true;
      _reinitCallback();
    } catch (e) {
      console.error('reinitApp callback error:', e);
    } finally {
      _skipSync = false;
    }
  } else {
    _pendingReinit = true;
  }
}

function onReinit(cb) {
  _reinitCallback = cb;
  if (_pendingReinit) {
    _pendingReinit = false;
    reinitApp();
  }
}

// ── Firestore snapshot subscription ────────────────────────────────
function subscribeToFirestore(user) {
  if (_snapshotUnsub) { _snapshotUnsub(); _snapshotUnsub = null; }
  _firstSnapshotDone = false;
  _snapshotUnsub = db.collection('users').doc(user.uid).onSnapshot(function (doc) {
    if (!_firstSnapshotDone) { _firstSnapshotDone = true; return; }
    if (_isPushing || _skipSync || !doc.exists || !doc.data().progress) return;

    var remote = doc.data();
    var remoteUpdated = remote._updated
      ? new Date(remote._updated.seconds * 1000).getTime()
      : 0;
    var localUpdated = parseInt(localStorage.getItem('sync_updated') || '0', 10);
    if (remoteUpdated <= localUpdated) return;

    var merged = mergeRemoteData(remote);
    if (merged) {
      safeSetItem('sync_updated', remoteUpdated.toString());
      reinitApp();
    }
  });
}

function unsubscribeFirestore() {
  if (_snapshotUnsub) { _snapshotUnsub(); _snapshotUnsub = null; }
}

// ── Auth handler ───────────────────────────────────────────────────
function handleAuth(user) {
  if (user) {
    loadFromFirestore(user);
  } else {
    unsubscribeFirestore();
  }
}

// ── Load + merge on login ──────────────────────────────────────────
function loadFromFirestore(user) {
  if (_isLoading) return;
  _isLoading = true;
  db.collection('users').doc(user.uid).get().then(function (doc) {
    _isLoading = false;
    if (!doc.exists || !doc.data().progress) {
      pushLocalToFirestore();
      subscribeToFirestore(user);
      return;
    }
    var remote = doc.data();
    var remoteUpdated = remote._updated
      ? new Date(remote._updated.seconds * 1000).getTime()
      : 0;
    var localUpdated = parseInt(localStorage.getItem('sync_updated') || '0', 10);

    if (remoteUpdated > localUpdated) {
      mergeRemoteData(remote);
      safeSetItem('sync_updated', remoteUpdated.toString());
      reinitApp();
    } else {
      pushLocalToFirestore();
    }
    subscribeToFirestore(user);
  }).catch(function (err) {
    _isLoading = false;
    console.error('Firestore load error:', err);
  });
}
