const SYNC_KEYS = [
  'exam_manager_v9', 'semester1_progress',
  'kr_progress', 'exam_tasks_progress', 'integrals_progress'
];

let syncTimer = null;
const SYNC_DELAY = 1000;
let _reinitCallback = null;
let _skipSync = false;
let _snapshotUnsub = null;
let _isPushing = false;
let _firstSnapshotDone = false;

function collectLocalData() {
  var data = {};
  for (var i = 0; i < SYNC_KEYS.length; i++) {
    var key = SYNC_KEYS[i];
    var val = localStorage.getItem(key);
    if (val !== null) {
      data[key] = val;
    }
  }
  return data;
}

function pushLocalToFirestore() {
  if (!authUser || _skipSync) return;
  _isPushing = true;
  var data = collectLocalData();
  db.collection('users').doc(authUser.uid).set({
    progress: data,
    _updated: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function () {
    _isPushing = false;
    localStorage.setItem('sync_updated', Date.now().toString());
  }).catch(function (err) {
    _isPushing = false;
    console.error('Firestore sync error:', err);
  });
}

function scheduleFirestoreSync() {
  if (_skipSync || syncTimer) return;
  syncTimer = setTimeout(function () {
    syncTimer = null;
    pushLocalToFirestore();
  }, SYNC_DELAY);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
  if (authUser && !_skipSync) {
    localStorage.setItem('sync_updated', Date.now().toString());
    scheduleFirestoreSync();
  }
}

function removeFromStorage(key) {
  localStorage.removeItem(key);
  if (authUser && !_skipSync) {
    localStorage.setItem('sync_updated', Date.now().toString());
    scheduleFirestoreSync();
  }
}

function clearAuthProgress() {
  if (!authUser) return;
  db.collection('users').doc(authUser.uid).delete().catch(function (err) {
    console.error('Firestore delete error:', err);
  });
}

function reinitApp() {
  if (typeof _reinitCallback === 'function') {
    _skipSync = true;
    _reinitCallback();
    _skipSync = false;
  }
}

function onReinit(cb) {
  _reinitCallback = cb;
}

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
    var rp = remote.progress;
    for (var j = 0; j < SYNC_KEYS.length; j++) {
      var k = SYNC_KEYS[j];
      if (rp[k] !== undefined && rp[k] !== null) {
        localStorage.setItem(k, rp[k]);
      }
    }
    localStorage.setItem('sync_updated', remoteUpdated.toString());
    reinitApp();
  });
}

function unsubscribeFirestore() {
  if (_snapshotUnsub) { _snapshotUnsub(); _snapshotUnsub = null; }
}

function handleAuth(user) {
  if (user) {
    loadFromFirestore(user);
  } else {
    unsubscribeFirestore();
  }
}

function loadFromFirestore(user) {
  db.collection('users').doc(user.uid).get().then(function (doc) {
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
      var rp = remote.progress;
      for (var j = 0; j < SYNC_KEYS.length; j++) {
        var k = SYNC_KEYS[j];
        if (rp[k] !== undefined && rp[k] !== null) {
          localStorage.setItem(k, rp[k]);
        }
      }
      localStorage.setItem('sync_updated', remoteUpdated.toString());
      reinitApp();
    } else {
      pushLocalToFirestore();
    }
    subscribeToFirestore(user);
  }).catch(function (err) {
    console.error('Firestore load error:', err);
  });
}
