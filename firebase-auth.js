let authUser = null;

(function injectAuthStyles() {
  var style = document.createElement('style');
  style.textContent = `
    .auth-btn {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--paper-alt); border: 2px solid var(--ring);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 1.2rem; color: var(--ink, #333);
      transition: all .2s ease;
      box-shadow: 0 2px 8px var(--shadow);
    }
    .auth-btn:hover { transform: scale(1.1); box-shadow: 0 4px 16px var(--shadow); }
    .auth-btn.signed-in {
      width: auto; border-radius: 20px; padding: 2px 8px 2px 2px; gap: 6px;
      cursor: default; transform: none;
    }
    .auth-btn.signed-in:hover { transform: none; }
    .auth-info {
      display: flex; align-items: center; gap: 6px; flex-shrink: 1; min-width: 0;
    }
    .auth-avatar-small {
      width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
    }
    .auth-initial {
      width: 32px; height: 32px; border-radius: 50%;
      background: #4285f4; color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: bold; flex-shrink: 0;
    }
    .auth-name {
      font-size: 12px; line-height: 1.2;
      max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .auth-signout-link {
      font-size: 11px; color: var(--ink-red, #c0392b); cursor: pointer;
      white-space: nowrap; flex-shrink: 0;
    }
    .auth-signout-link:hover { text-decoration: underline; }
    .changelog-btn {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--paper-alt); border: 2px solid var(--ring);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 0.7rem; color: var(--ink, #333);
      font-family: var(--font-print); font-weight: bold;
      transition: all .2s ease;
      box-shadow: 0 2px 8px var(--shadow);
    }
    .changelog-btn:hover { transform: scale(1.1); box-shadow: 0 4px 16px var(--shadow); }
    .changelog-overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0.4);
      display: none; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .changelog-overlay.open { display: flex; }
    .changelog-modal {
      background: var(--paper); color: var(--ink);
      border-radius: 16px; padding: 32px 36px; max-width: 480px; width: 90%;
      max-height: min(70vh, 480px); overflow-y: auto;
      box-shadow: 0 12px 48px var(--shadow);
      font-family: var(--font-print); position: relative;
      scroll-behavior: smooth;
    }
    .changelog-modal::-webkit-scrollbar { width: 4px; }
    .changelog-modal::-webkit-scrollbar-thumb { background: var(--ring); border-radius: 2px; }
    .changelog-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
    }
    .changelog-modal h2 {
      font-size: 1rem; margin: 0; font-family: var(--font-heading);
      letter-spacing: 0.5px;
    }
    .changelog-modal ul {
      list-style: none; padding: 0; margin: 0;
    }
    .changelog-modal li {
      font-size: 0.8rem; line-height: 1.7; padding: 5px 0 5px 22px;
      position: relative; color: var(--ink);
    }
    .changelog-modal li::before {
      content: '—'; position: absolute; left: 0; color: var(--pencil); opacity: 0.6;
    }
    .changelog-modal li.changelog-version {
      font-size: 0.9rem; font-weight: bold; padding: 12px 0 4px 0; margin-top: 4px;
      font-family: var(--font-heading);
    }
    .changelog-modal li.changelog-version::before { content: none; }

    @media (max-height: 600px) {
      .changelog-modal { padding: 20px 24px; max-height: min(85vh, 360px); }
      .changelog-modal h2 { font-size: 0.9rem; }
      .changelog-modal li { font-size: 0.75rem; padding: 3px 0 3px 20px; }
    }
    @media (max-width: 420px) {
      .changelog-modal { padding: 20px 18px; }
    }

    .changelog-divider {
      border: none; border-top: 1px solid var(--ring); margin: 10px 0 6px;
      opacity: 0.3;
    }
    .changelog-close {
      font-size: 1.1rem; cursor: pointer; opacity: 0.4;
      position: absolute; top: 14px; right: 18px;
      background: none; border: none; color: var(--ink);
      transition: opacity .2s; line-height: 1;
    }
    .changelog-close:hover { opacity: 0.8; }
  `;
  document.head.appendChild(style);
})();

function getAuthBtn() {
  let btn = document.getElementById('auth-btn');
  if (!btn) {
    btn = document.createElement('div');
    btn.id = 'auth-btn';
    btn.className = 'auth-btn';
    btn.title = 'Войти через Google';
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;
    const headerBtns = document.querySelector('.header-buttons');
    if (headerBtns) {
      headerBtns.insertBefore(btn, headerBtns.firstChild);
    }
  }
  return btn;
}

var CHANGELOG = [
  'v1.1 — 31.05.2026',
  'Добавлены задачи для подготовки к НТК по физике',
  '',
  'v1.0 — 26.05.2026',
  'Авторизация через Google (аватарка в углу)',
  'Автоматическая синхронизация между устройствами',
  'Бесшовный мерж — данные подтягиваются без перезагрузки',
  '',
  'v0.9 — 12.04.2026',
  '29 билетов с подробными конспектами',
  'Система интервальных повторений',
  'Отслеживание прогресса по билетам',
  'Контрольная работа с задачами',
  'Режим экзаменационных задач',
  'Интегралы для тренировки',
  'Тёмная тема',
  'Ручное сохранение и загрузка прогресса',
  'Боковое меню с содержанием',
  'Адаптивная вёрстка (мобильные)'
];

function buildChangelogHTML() {
  var items = '';
  for (var i = 0; i < CHANGELOG.length; i++) {
    var line = CHANGELOG[i];
    if (line === '') {
      items += '<hr class="changelog-divider">';
    } else if (/^v\d/.test(line)) {
      items += '<li class="changelog-version">' + line + '</li>';
    } else {
      items += '<li>' + line + '</li>';
    }
  }
  return '<div class="changelog-modal">' +
    '<button class="changelog-close" onclick="closeChangelog()">✕</button>' +
    '<div class="changelog-header">' +
    '<h2>Что нового</h2>' +
    '</div>' +
    '<ul>' + items + '</ul>' +
    '</div>';
}

function showChangelog() {
  var overlay = document.getElementById('changelog-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'changelog-overlay';
    overlay.className = 'changelog-overlay';
    overlay.innerHTML = buildChangelogHTML();
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeChangelog();
    });
  }
  overlay.classList.add('open');
}

function closeChangelog() {
  var overlay = document.getElementById('changelog-overlay');
  if (overlay) overlay.classList.remove('open');
}

function getChangelogBtn() {
  var btn = document.getElementById('changelog-btn');
  if (!btn) {
    btn = document.createElement('div');
    btn.id = 'changelog-btn';
    btn.className = 'changelog-btn';
    btn.textContent = 'v1.0';
    btn.title = 'Что нового';
    btn.onclick = function (e) { e.stopPropagation(); showChangelog(); };
    var headerBtns = document.querySelector('.header-buttons');
    if (headerBtns) {
      headerBtns.insertBefore(btn, headerBtns.firstChild);
    }
  }
  return btn;
}

function updateAuthUI(user) {
  const btn = getAuthBtn();

  if (user) {
    btn.classList.add('signed-in');
    const photo = user.photoURL
      ? `<img src="${user.photoURL}" class="auth-avatar-small" alt="">`
      : `<span class="auth-initial">${(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</span>`;
    const name = user.displayName || user.email || 'User';
    btn.innerHTML = `
      <div class="auth-info">
        ${photo}
        <span class="auth-name" title="${name}">${name}</span>
      </div>
      <span class="auth-signout-link" onclick="event.stopPropagation();signOutUser()">Выйти</span>
    `;
    btn.title = '';
    btn.onclick = null;
  } else {
    btn.classList.remove('signed-in');
    btn.title = 'Войти через Google';
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;
    btn.onclick = function (e) { e.stopPropagation(); signInWithGoogle(); };
  }
}

function signInWithGoogle() {
  console.log('[auth] signInWithGoogle called');
  if (typeof auth === 'undefined') {
    console.error('[auth] Firebase auth not initialized');
    return;
  }
  auth.languageCode = 'ru';
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  auth.signInWithPopup(googleProvider).catch(function (error) {
    console.error('[auth] sign-in error:', error.code, error.message);
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      return;
    }
    if (error.code === 'auth/popup-blocked') {
      var el = document.getElementById('auth-popup-hint');
      if (!el) {
        el = document.createElement('div');
        el.id = 'auth-popup-hint';
        el.textContent = 'Пробую открыть страницу входа…';
        el.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--paper-alt);color:var(--ink);border:1px solid var(--ring);border-radius:8px;padding:10px 18px;font-size:0.8rem;font-family:var(--font-print);z-index:2000;box-shadow:0 4px 16px var(--shadow)';
        document.body.appendChild(el);
      }
      auth.signInWithRedirect(googleProvider).catch(function (err2) {
        console.error('[auth] redirect fallback error:', err2);
        el.textContent = 'Не удалось войти. Проверьте консоль браузера (F12).';
        setTimeout(function () { el.remove(); }, 5000);
      });
    }
  });
}

function signOutUser() {
  auth.signOut();
}

function initAuth() {
  console.log('[auth] initAuth started');
  try {
    getAuthBtn();
    getChangelogBtn();
    auth.languageCode = 'ru';

    if (auth.currentUser) {
      console.log('[auth] currentUser (sync):', auth.currentUser.email);
      authUser = auth.currentUser;
      updateAuthUI(auth.currentUser);
      if (typeof handleAuth === 'function') {
        handleAuth(auth.currentUser);
      }
    }

    auth.onAuthStateChanged(function (user) {
      console.log('[auth] onAuthStateChanged:', user ? user.email : 'null');
      authUser = user;
      updateAuthUI(user);
      if (typeof handleAuth === 'function') {
        handleAuth(user);
      }
    });
  } catch (e) {
    console.error('[auth] initAuth error:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}
