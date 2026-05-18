// ========== ДАННЫЕ БИЛЕТОВ (19 ШТУК) ==========
const intervals = [1, 3, 7, 14, 30];
const RANKS = [
    { minScore: 0, title: "Минимал", subtitle: "Сделал минимум", icon: "🪖" },
    { minScore: 7, title: "Пунктуальный", subtitle: "Начал готовиться", icon: "⏰" },
    { minScore: 15, title: "Дедлайн-боец", subtitle: "Успевает", icon: "⚡" },
    { minScore: 25, title: "Повторятор", subtitle: "Интервальные", icon: "🔄" },
    { minScore: 40, title: "Методист", subtitle: "Планово", icon: "📋" },
    { minScore: 55, title: "Максимал", subtitle: "Высший пилотаж", icon: "💪" },
    { minScore: 70, title: "Батя Марвин", subtitle: "Легенда", icon: "👑" },
    { minScore: 85, title: "Повелитель Экзамена", subtitle: "Абсолют", icon: "🏆" }
];

const ticketsData = [
    { t: "Аксиомы скалярного произведения и следствия из них. Неравенство Коши-Буняковского." },
    { t: "Теорема о линейной независимости ортогональной системы векторов. Процесс Грама-Шмидта." },
    { t: "Свойства ОНБ. Теорема об определителе Грама." },
    { t: "Теорема об ортогональных дополнениях." },
    { t: "Критерии линейности. Теорема о линейности Â+ B̂, αÂ и ÂB̂." },
    { t: "Теорема о связи координат образа и прообраза. Связь ЛО с алгеброй их матриц." },
    { t: "Теорема о ядре и области значений. Теорема о ранге и дефекте." },
    { t: "Теорема об инвариантности характеристического многочлена." },
    { t: "Теорема об определителе полураспавшейся матрицы. ЛНС собственных векторов." },
    { t: "Теорема о свойствах самосопряжённых линейных операторов." },
    { t: "Теорема Коши для ЛДУ. Принцип суперпозиции. Структура решения НЛДУ." },
    { t: "Теорема о вронскиане линейно зависимых функций." },
    { t: "Принцип суперпозиции для ОЛДУ. Критерий ЛНС n решений." },
    { t: "Теорема о существовании ФСР у ОЛДУ. Структура общего решения." },
    { t: "ФСР ОЛДУ с постоянными коэффициентами. Метод вариации." },
    { t: "Принцип суперпозиции для СЛДУ. Структура решения СНЛДУ." },
    { t: "Принцип суперпозиции для СОЛДУ. Связанное с W условие линейной независимости n решений СОЛДУ n×n." },
    { t: "Теорема о существовании ФСР СОЛДУ. Теорема о структуре общего решения СОЛДУ." }
];

let state = null;
let lastAction = null;
let renderScheduled = false;
let scrollPositionToRestore = 0;
let openTicketsToRestore = new Set();

// ========== СОХРАНЕНИЕ ==========
function saveToLocalStorage() {
    localStorage.setItem('exam_manager_v9', JSON.stringify(state));
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
function initState() {
    const saved = localStorage.getItem('exam_manager_v9');
    if (saved) {
        const parsed = JSON.parse(saved);
        state = ticketsData.map((item, idx) => {
            const existing = parsed?.find(p => p.id === idx);
            return existing ? { ...existing, name: item.t } : { id: idx, name: item.t, step: 0, nextReview: null, history: [] };
        });
    } else {
        state = ticketsData.map((item, idx) => ({ id: idx, name: item.t, step: 0, nextReview: null, history: [] }));
    }
    saveToLocalStorage();
}

function calculateTotalScore() {
    return state.reduce((sum, item) => sum + (item.step || 0), 0);
}

function getCurrentRank(score) {
    return [...RANKS].reverse().find(r => score >= r.minScore) || RANKS[0];
}

function updateRankUI() {
    const score = calculateTotalScore();
    const cur = getCurrentRank(score);
    const maxScore = ticketsData.length * 5;
    
    const rankIcon = document.getElementById('rank-icon');
    const rankTitle = document.getElementById('rank-title');
    const rankSub = document.getElementById('rank-sub');
    const rankProgressFill = document.getElementById('rank-progress-fill');
    const rankStats = document.getElementById('rank-stats');
    
    if (rankIcon) rankIcon.innerHTML = cur.icon;
    if (rankTitle) rankTitle.innerHTML = cur.title;
    if (rankSub) rankSub.innerHTML = cur.subtitle;
    if (rankProgressFill) rankProgressFill.style.width = `${(score / maxScore) * 100}%`;
    if (rankStats) rankStats.innerHTML = `${score}/${maxScore} очков`;
}

// ========== ОСНОВНЫЕ ДЕЙСТВИЯ (с debounce) ==========
function saveCurrentState() {
    scrollPositionToRestore = window.scrollY;
    
    const sheets = document.querySelectorAll('.cheatsheet');
    openTicketsToRestore.clear();
    sheets.forEach((sheet, idx) => {
        if (sheet && sheet.style.display === 'block') {
            openTicketsToRestore.add(idx);
        }
    });
}

function scheduleRender() {
    if (renderScheduled) return;
    renderScheduled = true;
    setTimeout(() => {
        render();
        renderScheduled = false;
    }, 30);
}

function advanceTicket(id) {
    const item = state[id];
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const today = now.getTime();

    if (!item.history) item.history = [];
    const lastRepeat = item.history[item.history.length - 1];
    if (!lastRepeat || new Date(lastRepeat).toDateString() !== now.toDateString()) {
        item.history.push(today);
    }

    if (item.step >= intervals.length) {
        const next = new Date(now);
        next.setDate(now.getDate() + intervals[intervals.length - 1]);
        item.nextReview = next.getTime();
        saveToLocalStorage();
        scheduleRender();
        return;
    }

    const next = new Date(now);
    next.setDate(now.getDate() + intervals[item.step]);
    lastAction = { id, type: 'advance', oldStep: item.step };
    item.step++;
    item.nextReview = next.getTime();
    saveToLocalStorage();
    scheduleRender();
}

function undoForTicket(id) {
    const item = state[id];
    if (item.step <= 0) return;
    if (item.history && item.history.length > 0) item.history.pop();
    item.step--;
    item.nextReview = item.step === 0 ? null : Date.now() - 86400000;
    saveToLocalStorage();
    scheduleRender();
}

function undoLastAction() {
    if (lastAction) { undoForTicket(lastAction.id); lastAction = null; }
    else alert("Нет действий для отмены");
}

function resetAll() {
    if (confirm("Сбросить весь прогресс?")) {
        localStorage.removeItem('exam_manager_v9');
        location.reload();
    }
}

function showHistory(id) {
    const item = state[id];
    const history = item.history || [];
    if (history.length === 0) {
        alert(`📭 Билет "${item.name.substring(0, 50)}..."\n\nИстория повторений пуста.`);
        return;
    }
    let text = `📜 История для билета ${id+1}:\n\n`;
    history.forEach((entry, i) => { text += `${i+1}. ${new Date(entry).toLocaleDateString('ru-RU')}\n`; });
    text += `\nВсего: ${history.length} повторений`;
    alert(text);
}

// ========== РЕНДЕР (оптимизированный) ==========
function render() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const container = document.getElementById('list');
    if (!container) return;
    
    saveCurrentState();
    container.innerHTML = '';
    let readyCount = 0;
    
    state.forEach((item, idx) => {
        const nextDate = item.nextReview ? new Date(item.nextReview) : null;
        const isReady = !nextDate || nextDate <= now;
        if (isReady) readyCount++;
        
        const div = document.createElement('div');
        div.className = `ticket ${isReady ? 'ready' : 'waiting'}`;
        div.setAttribute('data-idx', idx);
        div.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-title">${idx + 1}. ${item.name}</div>
                <div class="action-buttons">
                    <button class="undo-btn" ${item.step <= 0 ? 'disabled' : ''} onclick="event.stopPropagation(); undoForTicket(${idx})">↩️</button>
                    <button class="action-btn" ${!isReady ? 'disabled' : ''} onclick="event.stopPropagation(); advanceTicket(${idx})">${item.step === 0 ? '✅ Изучить' : '🔄 Повторил'}</button>
                    <button class="action-btn" style="border-color:#ff0;" onclick="event.stopPropagation(); showHistory(${idx})">📜</button>
                </div>
            </div>
            <div class="ticket-meta">шаг: ${item.step}/${intervals.length} | ${item.nextReview ? `повтор: ${new Date(item.nextReview).toLocaleDateString('ru-RU')}` : "📖 не изучен"} | повторов: ${item.history?.length || 0}</div>
            <div class="cheatsheet"></div>
        `;
        
        // Ленивая загрузка конспекта — только при клике
        const cheatsheetDiv = div.querySelector('.cheatsheet');
        let loaded = false;
        
        div.onclick = (e) => {
            // Проверяем, что кликнули не по кнопкам оценки (1-5)
            if (e.target.tagName !== 'BUTTON') {
                
                // Переключаем видимость блока с конспектом
                if (cheatsheetDiv.style.display === 'block') {
                    cheatsheetDiv.style.display = 'none';
                } else {
                    cheatsheetDiv.style.display = 'block';
                    
                    // 1. НАПРЯМУЮ ЗАЛИВАЕМ HTML (как в интегралах)
                    // Каждый раз берем свежие данные из conspects.js без лишних условий
                    if (CONSPECTS && CONSPECTS[idx]) {
                        cheatsheetDiv.innerHTML = CONSPECTS[idx];
                    }
                    
                    // 2. СРАЗУ ЖЕ СКАРМЛИВАЕМ ЭТОТ БЛОК MATHJAX
                    // Говорим MathJax обработать строго этот открытый контейнер
                    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                        MathJax.typesetPromise([cheatsheetDiv])
                            .catch(err => console.error("MathJax Tickets Error:", err));
                    }
                }
            }
        };
        
        container.appendChild(div);
    });
    
    // Восстанавливаем открытые билеты (только подставляем заглушки, контент загрузится при клике)
    if (openTicketsToRestore.size > 0) {
        const allSheets = document.querySelectorAll('.cheatsheet');
        allSheets.forEach((sheet, idx) => {
            if (openTicketsToRestore.has(idx)) {
                sheet.style.display = 'block';
                if (CONSPECTS && CONSPECTS[idx]) {
                    sheet.innerHTML = CONSPECTS[idx];
                }
            }
        });
    }
    
    // Статистика
    const masteredCount = state.filter(s => s.step >= intervals.length).length;
    const learningCount = state.filter(s => s.step > 0 && s.step < intervals.length).length;
    const notStartedCount = state.filter(s => s.step === 0).length;
    const totalRepeats = state.reduce((sum, s) => sum + (s.history?.length || 0), 0);
    
    const statMastered = document.getElementById('stat-mastered');
    const statLearning = document.getElementById('stat-learning');
    const statNotstarted = document.getElementById('stat-notstarted');
    const statTotalrepeats = document.getElementById('stat-totalrepeats');
    const countReady = document.getElementById('count-ready');
    const todayDate = document.getElementById('today-date');
    
    if (statMastered) statMastered.innerText = masteredCount;
    if (statLearning) statLearning.innerText = learningCount;
    if (statNotstarted) statNotstarted.innerText = notStartedCount;
    if (statTotalrepeats) statTotalrepeats.innerText = totalRepeats;
    if (countReady) countReady.innerText = readyCount;
    if (todayDate) todayDate.innerText = now.toLocaleDateString('ru-RU');
    
    updatePace();
    updateRankUI();
    
    setTimeout(() => {
        window.scrollTo(0, scrollPositionToRestore);
    }, 10);
}

function updatePace() {
    const examDate = new Date(2026, 5, 11);
    const now = new Date();
    const diff = examDate - now;
    const daysLeft = diff / 86400000;
    
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.innerHTML = daysLeft > 0 ? `⏳ До экзамена: ${daysLeft.toFixed(3)} дн.` : "🔥 Экзамен!";

    const notStarted = state.filter(s => s.step === 0).length;
    const learning = state.filter(s => s.step > 0 && s.step < intervals.length).length;
    const mastered = state.filter(s => s.step >= intervals.length).length;
    const total = state.length;
    
    const masteryPercent = ((mastered / total) * 100).toFixed(1);
    const masteryPercentEl = document.getElementById('mastery-percent');
    if (masteryPercentEl) masteryPercentEl.innerText = masteryPercent;
    
    const totalScore = calculateTotalScore();
    const maxScore = total * 5;
    const scorePercent = ((totalScore / maxScore) * 100).toFixed(1);
    
    let paceText = `✅${mastered} 🔄${learning} ⏳${notStarted} | 🎯${scorePercent}% очков`;
    
    if (notStarted > 0 && daysLeft > 0) {
        const daysPerTicket = daysLeft / notStarted;
        paceText += ` | 📌 ${daysPerTicket.toFixed(3)} дня на 1 билет`;
    } else if (notStarted === 0 && learning === 0) {
        paceText += ` | 🏆 ВСЁ ГОТОВО! Только повторяй.`;
    } else if (notStarted === 0) {
        paceText += ` | ⏰ До экзамена ${daysLeft.toFixed(1)} дн., только повторение`;
    }
    
    const paceEl = document.getElementById('pace-info');
    if (paceEl) paceEl.innerHTML = paceText;
}

// ========== ПОЛНОЕ СОХРАНЕНИЕ/ЗАГРУЗКА (ВСЁ В ОДНОМ ФАЙЛЕ) ==========
function exportAllToFile() {
    const fullData = {
        version: '3.0',
        date: new Date().toISOString(),
        tickets: state.map(({ id, name, step, nextReview, history }) => ({
            id, name, step, nextReview, history
        })),
        integrals: integralsProgress || {},
        kr: krProgress || {},
        integralsSectionsState: (() => {
            const state = {};
            for (let i = 1; i <= 9; i++) {
                const content = document.getElementById(`section-${i}-content`);
                if (content) state[i] = content.style.display !== 'none';
            }
            return state;
        })(),
        activeTab: document.querySelector('.tab-btn.active')?.getAttribute('data-tab') || 'exam'
    };
    
    const dataStr = JSON.stringify(fullData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `marvin_full_backup_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    alert("✅ ВСЕ данные сохранены в файл!");
}

function importAllFromFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                
                if (data.version !== '3.0' && (!data.tickets || !data.integrals || !data.kr)) {
                    alert("❌ Неверный формат файла");
                    return;
                }
                
                if (data.tickets && data.tickets.length === state.length) {
                    state = data.tickets.map((t, idx) => ({
                        ...t,
                        name: t.name || ticketsData[idx].t
                    }));
                    saveToLocalStorage();
                }
                
                if (data.integrals) {
                    integralsProgress = data.integrals;
                    saveIntegralsProgress();
                }
                
                if (data.kr) {
                    krProgress = data.kr;
                    saveKrProgress();
                }
                
                render();
                if (typeof invalidateIntegralsCache === 'function') invalidateIntegralsCache();
                else if (typeof renderIntegrals === 'function') renderIntegrals();
                if (typeof renderControlTasks === 'function') renderControlTasks();
                
                setTimeout(() => {
                    if (data.integralsSectionsState) {
                        for (let i = 1; i <= 9; i++) {
                            const content = document.getElementById(`section-${i}-content`);
                            const toggleBtn = document.getElementById(`toggle-section-${i}`);
                            if (content && data.integralsSectionsState[i] !== undefined) {
                                if (data.integralsSectionsState[i]) {
                                    content.style.display = 'block';
                                    if (toggleBtn) toggleBtn.innerHTML = '▼';
                                } else {
                                    content.style.display = 'none';
                                    if (toggleBtn) toggleBtn.innerHTML = '▶';
                                }
                            }
                        }
                    }
                    
                    if (data.activeTab) {
                        const tabBtn = document.querySelector(`.tab-btn[data-tab="${data.activeTab}"]`);
                        if (tabBtn) tabBtn.click();
                    }
                }, 200);
                
                alert(`✅ Данные загружены!\n📅 от ${data.date || 'неизвестная дата'}`);
                
            } catch(err) {
                console.error(err);
                alert("❌ Ошибка при чтении файла");
            }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}

window.exportAllToFile = exportAllToFile;
window.importAllFromFile = importAllFromFile;
// ========== СОХРАНЕНИЕ/ЗАГРУЗКА ФАЙЛА ==========
function saveProgressToFile() {
    const ticketsProgress = state.map(({ id, step, nextReview, history }) => ({
        id, step, nextReview, history
    }));
    
    const integralsProgressData = integralsProgress || {};
    
    const fullProgress = {
        tickets: ticketsProgress,
        integrals: integralsProgressData,
        version: '2.0',
        date: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(fullProgress, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `marvin_progress_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    alert("✅ Прогресс сохранён!");
}

function loadProgressFromFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const loaded = JSON.parse(ev.target.result);
                
                // Проверяем новую версию (с интегралами)
                if (loaded.tickets && loaded.integrals) {
                    // Загружаем прогресс билетов
                    if (loaded.tickets.length === state.length) {
                        state = loaded.tickets;
                        saveToLocalStorage();
                    }
                    
                    // Загружаем прогресс интегралов
                    if (loaded.integrals) {
                        integralsProgress = loaded.integrals;
                        saveIntegralsProgress();
                        // Обновляем отображение интегралов, если вкладка открыта
                        const integralsPane = document.getElementById('integrals-pane');
                        if (integralsPane && integralsPane.classList.contains('active-pane')) {
                            invalidateIntegralsCache();
                        } else {
                            // Сбрасываем кеш, чтобы при следующем открытии пересчиталось
                            integralsHTMLCache = null;
                            integralsRendered = false;
                        }
                    }
                    
                    render();
                    alert("✅ Прогресс загружен!");
                }
                // Старая версия (только билеты)
                else if (loaded && loaded.length === state.length) {
                    state = loaded;
                    saveToLocalStorage();
                    render();
                    alert("✅ Прогресс билетов загружен! (прогресс интегралов не изменился)");
                } 
                else {
                    alert("❌ Неверный формат файла");
                }
            } catch(err) { 
                console.error(err);
                alert("❌ Ошибка загрузки файла"); 
            }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}
function resetAllIntegralsProgress() {
    if (confirm("Сбросить весь прогресс интегралов?")) {
        integralsProgress = {};
        saveIntegralsProgress();
        invalidateIntegralsCache();
        alert("✅ Прогресс интегралов сброшен!");
    }
}
// ========== MATHJAX (сериализованный typeset) ==========
let mathJaxQueue = Promise.resolve();

function typesetMathJax(elements) {
    if (typeof MathJax === 'undefined' || !MathJax.typesetPromise) return;
    mathJaxQueue = mathJaxQueue.then(() =>
        MathJax.typesetPromise(elements).catch(err => console.log('MathJax error:', err))
    );
}

// ========== КОНТРОЛЬНАЯ РАБОТА ==========
// ========== КОНТРОЛЬНАЯ РАБОТА ==========
let krProgress = JSON.parse(localStorage.getItem('kr_progress')) || {};

function saveKrProgress() {
    localStorage.setItem('kr_progress', JSON.stringify(krProgress));
    updateKrStats();
}

function toggleKrTask(taskId) {
    if (krProgress[taskId]) {
        delete krProgress[taskId];
    } else {
        krProgress[taskId] = true;
    }
    saveKrProgress();
    
    const checkbox = document.getElementById(`kr_chk_${taskId}`);
    const taskTitle = document.getElementById(`kr_title_${taskId}`);
    if (checkbox) checkbox.checked = krProgress[taskId] === true;
    if (taskTitle) {
        if (krProgress[taskId]) {
            taskTitle.style.textDecoration = 'line-through';
            taskTitle.style.opacity = '0.7';
        } else {
            taskTitle.style.textDecoration = 'none';
            taskTitle.style.opacity = '1';
        }
    }
}

function toggleKrType(typeIdx) {
    const content = document.getElementById(`kr-type-${typeIdx}-content`);
    const toggleBtn = document.getElementById(`kr-toggle-type-${typeIdx}`);
    if (content && toggleBtn) {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggleBtn.innerHTML = '▼';
        } else {
            content.style.display = 'none';
            toggleBtn.innerHTML = '▶';
        }
        saveKrSectionsState();
    }
}

function saveKrSectionsState() {
    const state = {};
    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        if (content) state[t] = content.style.display !== 'none';
    }
    localStorage.setItem('kr_sections_state', JSON.stringify(state));
}

function toggleAllControlTasks() {
    const pane = document.getElementById('control-pane');
    if (!pane) return;
    // Check if any type section is expanded
    let anyExpanded = false;
    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        if (content && content.style.display !== 'none') anyExpanded = true;
    }
    
    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        const toggleBtn = document.getElementById(`kr-toggle-type-${t}`);
        if (content && toggleBtn) {
            content.style.display = anyExpanded ? 'none' : 'block';
            toggleBtn.innerHTML = anyExpanded ? '▶' : '▼';
        }
    }
    saveKrSectionsState();
    const btn = document.getElementById('toggle-all-control');
    if (btn) btn.textContent = anyExpanded ? '📂 Развернуть всё' : '📁 Свернуть всё';
}

function resetKrProgress() {
    if (confirm("Сбросить весь прогресс контрольной работы?")) {
        krProgress = {};
        saveKrProgress();
        renderControlTasks();
        alert("✅ Прогресс КР сброшен!");
    }
}

function updateKrStats() {
    const total = typeConfig ? typeConfig.reduce((sum, t) => sum + t.tasks.length, 0) : 4;
    const solved = Object.keys(krProgress).length;
    const remaining = total - solved;
    
    const solvedSpan = document.getElementById('kr-solved');
    const totalSpan = document.getElementById('kr-total');
    const percentSpan = document.getElementById('kr-percent');
    const progressFill = document.getElementById('kr-progress-fill');
    const paceSpan = document.getElementById('kr-pace');
    const remainingSpan = document.getElementById('kr-remaining');
    
    if (solvedSpan) solvedSpan.innerText = solved;
    if (remainingSpan) remainingSpan.innerText = remaining;
    if (totalSpan) totalSpan.innerText = total;
    if (percentSpan) percentSpan.innerText = ((solved / total) * 100).toFixed(1);
    if (progressFill) progressFill.style.width = `${(solved / total) * 100}%`;
    
    // Per-type counters
    let taskId = 1;
    for (let t = 0; t < typeConfig.length; t++) {
        const type = typeConfig[t];
        const solvedInType = type.tasks.filter((_, i) => {
            const id = taskId + i;
            return krProgress[id] === true;
        }).length;
        const counter = document.getElementById(`kr-type-${t}-counter`);
        if (counter) counter.innerText = `${solvedInType}/${type.tasks.length}`;
        taskId += type.tasks.length;
    }
    
    // Темп до 22 мая 2026
    const examDate = new Date(2026, 4, 22);
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;
    const perDay = remaining / daysLeft;
    
    if (paceSpan) {
        if (remaining <= 0) {
            paceSpan.innerHTML = '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';
        } else if (daysLeft <= 0) {
            paceSpan.innerHTML = '⏰ Срок вышел! Решай оставшиеся задачи.';
        } else {
            paceSpan.innerHTML = `📅 До 22 мая: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} задач | Нужно: ${perDay.toFixed(3)} задачи в день`;
        }
    }
}

function toggleSolution(card) {
    const sol = card.querySelector('.solution');
    if (sol) {
        if (sol.style.display === 'none' || sol.style.display === '') {
            sol.style.display = 'block';
        } else {
            sol.style.display = 'none';
        }
    }
}


    const typeConfig = [
        {
            num: 1, title: 'Метод вариации произвольных постоянных',
            desc: 'для любых ЛДУ, особенно когда метод неопределённых коэффициентов неприменим (правая часть не спецвида).',
            points: 30,
            tasks: [
                { cond: "Решить уравнение: $$ y'' + 4y = \\frac{8}{\\cos^2 x} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{1}{\\cos x} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{1}{\\sin x} $$" },
                { cond: "Решить уравнение: $$ y'' + 4y = 2\\operatorname{tg} x $$" },
                { cond: "Решить уравнение: $$ y'' - 2y' + y = \\frac{e^x}{x} $$" },
                { cond: "Решить уравнение: $$ y'' + 3y' + 2y = \\frac{1}{e^x + 1} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{2}{\\cos^3 x} $$" },
                { cond: "Решить уравнение: $$ y'' - y' = \\frac{e^{2x}}{e^x + 1} $$" },
                { cond: "Решить уравнение: $$ y'' + 2y' + y = \\frac{e^{-x}}{x^2} $$" },
                { cond: "Решить уравнение: $$ y'' + y = \\frac{1}{\\sin^3 x} $$" }
            ]
        },
        {
            num: 2, title: 'Метод неопределённых коэффициентов',
            desc: 'правая часть спецвида: $e^{\\alpha x}(P_n(x)\\cos\\beta x + Q_m(x)\\sin\\beta x)$.',
            points: 30,
            tasks: [
                { cond: "Решить уравнение: $$ y'' - 3y' + 2y = 52\\cos 3x $$" },
                { cond: "Решить уравнение: $$ y'' - 2y' - 3y = e^{4x} $$" },
                { cond: "Решить уравнение: $$ y'' + y = 4\\sin x $$" },
                { cond: "Решить уравнение: $$ y'' - 5y' + 4y = 4x^2 e^{2x} $$" },
                { cond: "Решить уравнение: $$ y'' - 2y' + y = 6x e^x $$" },
                { cond: "Решить уравнение: $$ y'' + y = 4x e^x $$" },
                { cond: "Решить уравнение: $$ y'' + 4y' + 4y = x e^{2x} $$" },
                { cond: "Решить уравнение: $$ y'' + 9y = \\cos 3x $$" },
                { cond: "Решить уравнение: $$ y'' - 4y' + 8y = e^{2x} + \\sin 2x $$" },
                { cond: "Решить уравнение: $$ y'' - 5y' = 3x^2 $$" }
            ]
        },
        {
            num: 3, title: 'Задача Коши (метод вариации)',
            desc: 'находим общее решение НЛДУ → подставляем начальные условия → находим константы.',
            points: 40,
            tasks: [
                { cond: "Решить задачу Коши: $$ y'' + 2y' + y = 3e^{-x}\\sqrt{x+1};\\; y(0) = \\frac{4}{5};\\; y'(0) = 2 $$" },
                { cond: "Решить задачу Коши: $$ y'' + y = \\frac{1}{\\cos x};\\; y(0) = 1;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + y = \\frac{1}{\\sin x};\\; y(\\frac{\\pi}{2}) = 1;\\; y'(\\frac{\\pi}{2}) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 2y' + y = \\frac{e^x}{x};\\; y(1) = e;\\; y'(1) = e $$" },
                { cond: "Решить задачу Коши: $$ y'' + 4y = \\frac{1}{\\cos 2x};\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - y = \\frac{2e^x}{e^x + 1};\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + y = \\tan x;\\; y(0) = 1;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 2y' + y = e^{-x}\\ln x;\\; y(1) = 0;\\; y'(1) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 4y = \\frac{8}{\\cos^2 x};\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 3y' + 2y = \\frac{1}{e^x + 1};\\; y(0) = \\ln 2;\\; y'(0) = 0 $$" }
            ]
        },
        {
            num: 4, title: 'Задача Коши (метод неопределённых коэффициентов)',
            desc: 'находим общее решение НЛДУ → подставляем начальные условия → находим константы.',
            points: 40,
            tasks: [
                { cond: "Решить задачу Коши: $$ y'' - 2y' + 2y = 4e^x\\cos x;\\; y(\\pi) = \\pi e^\\pi;\\; y'(\\pi) = e^\\pi $$" },
                { cond: "Решить задачу Коши: $$ y'' + y = 4e^x;\\; y(0) = 4;\\; y'(0) = -3 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 2y' = 2e^x;\\; y(1) = -1;\\; y'(1) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 2y' + 2y = x e^{-x};\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - y = x^2;\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 4y = \\sin 2x;\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 4y' + 4y = e^{2x};\\; y(0) = 1;\\; y'(0) = 2 $$" },
                { cond: "Решить задачу Коши: $$ y'' + y' = x;\\; y(0) = 1;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' - 3y' + 2y = e^x;\\; y(0) = 0;\\; y'(0) = 0 $$" },
                { cond: "Решить задачу Коши: $$ y'' + 2y' + 5y = e^{-x}\\sin 2x;\\; y(0) = 0;\\; y'(0) = 1 $$" }
            ]
        }
    ];


    const existingSolutions = [
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ y'' + 4y = 0 $$
                            $$ \\lambda^2 + 4 = 0 \\implies \\lambda^2 = -4 \\implies \\lambda_{1,2} = \\pm 2i $$
                            ФСР: $$ \\cos 2x \\text{, } \\sin 2x $$
                            $$ y_{о.о.} = C_1 \\cos 2x + C_2 \\sin 2x $$
                            <br>Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):<br>
                            $$ y_{о.н.} = C_1(x) \\cos 2x + C_2(x) \\sin 2x $$
                            $$ \\begin{cases} \\cos 2x \\cdot C_1' + \\sin 2x \\cdot C_2' = 0 \\\\ -2 \\sin 2x \\cdot C_1' + 2 \\cos 2x \\cdot C_2' = \\frac{8}{\\cos^2 x} \\end{cases} $$
                            <br>Считаем определители:
                            $$ \\begin{aligned} \\Delta &= \\begin{vmatrix} \\cos 2x & \\sin 2x \\\\ -2 \\sin 2x & 2 \\cos 2x \\end{vmatrix} = 2 \\cos^2 2x + 2 \\sin^2 2x = 2 \\\\ \\Delta_1 &= \\begin{vmatrix} 0 & \\sin 2x \\\\ \\frac{8}{\\cos^2 x} & 2 \\cos 2x \\end{vmatrix} = - \\frac{8 \\sin 2x}{\\cos^2 x} = - \\frac{16 \\sin x \\cos x}{\\cos^2 x} = -16 \\frac{\\sin x}{\\cos x} \\\\ \\Delta_2 &= \\begin{vmatrix} \\cos 2x & 0 \\\\ -2 \\sin 2x & \\frac{8}{\\cos^2 x} \\end{vmatrix} = \\frac{8 \\cos 2x}{\\cos^2 x} = \\frac{8(2\\cos^2 x - 1)}{\\cos^2 x} = \\frac{16 \\cos^2 x - 8}{\\cos^2 x} = 16 - \\frac{8}{\\cos^2 x} \\end{aligned} $$
                            <br>Находим производные:
                            $$ C_1' = \\frac{\\Delta_1}{\\Delta} = - 8 \\frac{\\sin x}{\\cos x} \\qquad C_2' = \\frac{\\Delta_2}{\\Delta} = 8 - \\frac{4}{\\cos^2 x} $$
                            <br>Интегрируем:
                            $$ C_1 = -8 \\int \\frac{\\sin x}{\\cos x} dx = \\left[ \\begin{smallmatrix} \\cos x = t \\\\ dt = -\\sin x dx \\\\ -dt = \\sin x dx \\end{smallmatrix} \\right] = 8 \\int \\frac{dt}{t} = 8 \\ln|t| + D_1 = 8 \\ln|\\cos x| + D_1 $$
                            $$ C_2 = \\int \\left( 8 - \\frac{4}{\\cos^2 x} \\right) dx = 8x - 4 \\operatorname{tg} x + D_2 $$
                            <br><strong>Ответ:</strong>
                            $$ y_{о.н.} = (8 \\ln|\\cos x| + D_1) \\cos 2x + (8x - 4 \\operatorname{tg} x + D_2) \\sin 2x $$
                        `,
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ \\lambda^2 - 3 \\lambda + 2 = 0 $$
                            $$ \\mathcal{D} = 9 - 8 = 1 \\implies \\lambda_{1,2} = \\frac{3 \\pm 1}{2} \\implies \\lambda_1 = 1, \\ \\lambda_2 = 2 $$
                            ФСР: $$ e^x \\text{, } e^{2x} $$
                            $$ y_{о.о.} = C_1 e^x + C_2 e^{2x} $$
                            <br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
                            $$ F(x) = 52 \\cos 3x = e^{0 \\cdot x} \\cdot (52 \\cos 3x + 0 \\cdot \\sin 3x) $$
                            $$ \\alpha = 0, \\ \\beta = 3, \\ P(x) = 52, \\ Q(x) = 0 \\implies \\alpha + \\beta i = 3i \\implies S = 0 $$
                            $$ \\deg(R) = \\deg(T) = \\max(\\deg(P), \\deg(Q)) = 0 \\implies R(x) = A, \\ T(x) = B $$
                            $$ y_{ч.н.} = x^0 \\cdot e^{0 \\cdot x} \\cdot (A \\cos 3x + B \\sin 3x) = A \\cos 3x + B \\sin 3x $$
                            <br>Находим производные для подстановки:
                            $$ y'_{ч.н.} = -3A \\sin 3x + 3B \\cos 3x $$
                            $$ y''_{ч.н.} = -9A \\cos 3x - 9B \\sin 3x $$
                            <br>Подставляем в исходное уравнение:
                            $$ -9A \\cos 3x - 9B \\sin 3x - 3(-3A \\sin 3x + 3B \\cos 3x) + 2(A \\cos 3x + B \\sin 3x) = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            $$ -9A \\cos 3x - 9B \\sin 3x + 9A \\sin 3x - 9B \\cos 3x + 2A \\cos 3x + 2B \\sin 3x = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            <br>Группируем слагаемые:
                            $$ (-9A - 9B + 2A) \\cos 3x + (-9B + 9A + 2B) \\sin 3x = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            $$ (-7A - 9B) \\cos 3x + (9A - 7B) \\sin 3x = 52 \\cos 3x + 0 \\cdot \\sin 3x $$
                            <br>Составляем систему уравнений:
                            $$ \\begin{cases} -7A - 9B = 52 \\\\ 9A - 7B = 0 \\end{cases} \\Leftrightarrow \\begin{cases} -63A - 81B = 468 \\\\ 63A - 49B = 0 \\end{cases} \\text{ } \\Bigg| + $$
                            <br>Сложив уравнения, получаем:
                            $$ -130B = 468 \\implies B = -\\frac{18}{5} \\implies A = -\\frac{14}{5} $$
                            $$ y_{ч.н.} = -\\frac{14}{5} \\cos 3x - \\frac{18}{5} \\sin 3x $$
                            <br><strong>Ответ:</strong>
                            $$ y_{о.н.} = C_1 e^x + C_2 e^{2x} - \\frac{1}{5}(14\\cos 3x + 18\\sin 3x) $$
                        `,
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ y'' + 2y' + y = 0 \\implies \\lambda^2 + 2\\lambda + 1 = 0 \\implies (\\lambda + 1)^2 = 0 \\implies \\lambda_{1,2} = -1 $$
                            ФСР: $$ e^{-x} \\text{, } x e^{-x} $$
                            $$ y_{о.о.} = C_1 e^{-x} + C_2 x e^{-x} $$
                            <br>Возвращаемся к НЛДУ (Метод вариации):
                            $$ y_{о.н.} = C_1(x) e^{-x} + C_2(x) x e^{-x} $$
                            $$ \\begin{cases} e^{-x} \\cdot C_1' + x e^{-x} \\cdot C_2' = 0 \\\\ -e^{-x} \\cdot C_1' + e^{-x} \\cdot C_2' - x e^{-x} \\cdot C_2' = 3e^{-x}\\sqrt{x+1} \\end{cases} \\quad \\Bigg| + $$
                            <br>Складываем уравнения:
                            $$ e^{-x} \\cdot C_2' = 3e^{-x}\\sqrt{x+1} \\implies C_2' = 3\\sqrt{x+1} $$
                            $$ C_2 = 3\\int \\sqrt{x+1}\\,dx = 2(x+1)^{\\frac{3}{2}} + D_2 $$
                            <br>Из первого уравнения находим $C_1'$: $$ e^{-x} \\cdot C_1' + x e^{-x} \\cdot 3\\sqrt{x+1} = 0 \\implies C_1' = -3x\\sqrt{x+1} $$
                            $$ C_1 = -3\\int x\\sqrt{x+1}\\,dx = -\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}} + D_1 $$
                            <br>Общее решение:
                            $$ y_{о.н.} = \\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}} + D_1\\right) e^{-x} + \\left(2(x+1)^{\\frac{3}{2}} + D_2\\right)x e^{-x} $$
                            <br>Подставляем начальные условия задачи Коши:
                            $$ y(0) = \\frac{4}{5} \\implies \\left(-\\frac{6}{5} + 2 + D_1\\right) = \\frac{4}{5} \\implies D_1 = 0 $$
                            <br>Находим $y'_{о.н.}$:
                            $$ y'_{о.н.} = \\left(-3(x+1)^{\\frac{3}{2}} + 3(x+1)^{\\frac{1}{2}}\\right)e^{-x} - \\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}}\\right)e^{-x} + \\left(3x(x+1)^{\\frac{1}{2}} + 2(x+1)^{\\frac{3}{2}} + D_2\\right)e^{-x} - \\left(2(x+1)^{\\frac{3}{2}} + D_2\\right)xe^{-x} $$
                            $$ y'(0) = 2 \\implies ( -3 + 3 ) - \\left( -\\frac{6}{5} + 2 \\right) + (0 + 2 + D_2) = 2 \\implies -\\frac{4}{5} + 2 + D_2 = 2 \\implies D_2 = \\frac{4}{5} $$
                            <br>Собираем функцию и упрощаем:
                            $$ y = \\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}}\\right) e^{-x} + \\left(2(x+1)^{\\frac{3}{2}} + \\frac{4}{5}\\right)x e^{-x} = \\frac{4}{5}e^{-x}\\left(x + (x+1)^{\\frac{5}{2}}\\right) $$
                            <br><strong>Ответ:</strong>
                            $$ y = \\frac{4}{5}e^{-x}\\left(x + (x+1)^{\\frac{5}{2}}\\right) $$
                        `,
        `<strong>Решение:</strong><br><br>
                            Соответствующее ОЛДУ:
                            $$ \\lambda^2 - 2\\lambda + 2 = 0 \\implies \\mathcal{D} = 4 - 8 = -4 \\implies \\lambda_{1,2} = \\frac{2 \\pm 2i}{2} = 1 \\pm i $$
                            ФСР: $$ e^x\\cos x \\text{, } e^x\\sin x $$
                            $$ y_{о.о.} = C_1 e^x\\cos x + C_2 e^x\\sin x $$
                            <br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
                            $$ F(x) = 4e^x\\cos x = e^{1 \\cdot x}(4\\cos x + 0\\sin x) $$
                            $$ \\alpha = 1, \\ \\beta = 1, \\ P(x) = 4, \\ Q(x) = 0 \\implies \\alpha + \\beta i = 1 + i \\implies S = 1 \\text{ (резонанс)} $$
                            $$ \\deg(R) = \\deg(T) = \\max(\\deg(P), \\deg(Q)) = 0 \\implies R(x) = A, \\ T(x) = B $$
                            $$ y_{ч.н.} = x^1 \\cdot e^x(A\\cos x + B\\sin x) = xe^x(A\\cos x + B\\sin x) $$
                            <br>Считаем производные:
                            $$ y'_{ч.н.} = e^x(A\\cos x + B\\sin x) + xe^x(A\\cos x + B\\sin x) + xe^x(-A\\sin x + B\\cos x) $$
                            $$ \\begin{aligned} y''_{ч.н.} &= e^x(A\\cos x + B\\sin x) + e^x(-A\\sin x + B\\cos x) + e^x(A\\cos x + B\\sin x) + xe^x(A\\cos x + B\\sin x) \\\\ &\\quad + xe^x(-A\\sin x + B\\cos x) + e^x(-A\\sin x + B\\cos x) + xe^x(-A\\sin x + B\\cos x) + xe^x(-A\\cos x - B\\sin x) \\\\ &= 2e^x(A\\cos x + B\\sin x) + 2e^x(-A\\sin x + B\\cos x) + 2xe^x(-A\\sin x + B\\cos x) \\end{aligned} $$
                            <br>Подставляем всё в уравнение $y'' - 2y' + 2y = 4e^x\\cos x$:
                            $$ \\require{cancel} \\begin{aligned} &\\cancel{2e^x(A\\cos x + B\\sin x)} + 2e^x(-A\\sin x + B\\cos x) + \\cancel{2xe^x(-A\\sin x + B\\cos x)} \\\\ &- \\cancel{2e^x(A\\cos x + B\\sin x)} - \\cancel{2xe^x(A\\cos x + B\\sin x)} - \\cancel{2xe^x(-A\\sin x + B\\cos x)} \\\\ &+ \\cancel{2xe^x(A\\cos x + B\\sin x)} = 4e^x\\cos x \\end{aligned} $$
                            $$ 2e^x(-A\\sin x + B\\cos x) = 4e^x\\cos x \\implies -A\\sin x + B\\cos x = 0 \\cdot \\sin x + 2\\cos x $$
                            $$ \\begin{cases} -A = 0 \\\\ B = 2 \\end{cases} \\Leftrightarrow \\begin{cases} A = 0 \\\\ B = 2 \\end{cases} $$
                            $$ y_{ч.н.} = xe^x(0 \\cdot \\cos x + 2\\sin x) = 2xe^x\\sin x $$
                            <br>Общее решение:
                            $$ y_{о.н.} = C_1 e^x\\cos x + C_2 e^x\\sin x + 2xe^x\\sin x $$
                            <br>Подставляем начальные условия задачи Коши:
                            $$ y(\\pi) = \\pi e^\\pi \\implies y_{о.н.}(\\pi) = C_1 e^\\pi \\cos \\pi + C_2 e^\\pi \\sin \\pi + 2\\pi e^\\pi \\sin \\pi = C_1 e^\\pi \\cdot (-1) = -C_1 e^\\pi = \\pi e^\\pi \\implies C_1 = -\\pi $$
                            <br>Находим $y'_{о.н.}$:
                            $$ y'_{о.н.} = C_1 e^x\\cos x - C_1 e^x\\sin x + C_2 e^x\\sin x + C_2 e^x\\cos x + 2e^x\\sin x + 2xe^x\\sin x + 2xe^x\\cos x $$
                            $$ y'(\\pi) = e^\\pi \\implies y'_{о.н.}(\\pi) = -C_1 e^\\pi - C_2 e^\\pi - 2\\pi e^\\pi = e^\\pi $$
                            $$ \\pi - C_2 - 2\\pi = 1 \\implies -\\pi - C_2 = 1 \\implies C_2 = -\\pi - 1 $$
                            <br>Собираем итоговое решение:
                            $$ \\begin{aligned} y &= -\\pi \\cdot e^x\\cos x - (\\pi + 1)e^x\\sin x + 2xe^x\\sin x \\\\ &= e^x(-\\pi\\cos x - (\\pi + 1)\\sin x + 2x\\sin x) \\\\ &= e^x((2x - \\pi - 1)\\sin x - \\pi\\cos x) \\end{aligned} $$
                            <br><strong>Ответ:</strong>
                            $$ y = e^x((2x - \\pi - 1)\\sin x - \\pi\\cos x) $$
                        `
    ];

const krTaskSolutions = [
[
        null,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации):
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \frac{1}{\cos x} \end{cases} $$<br>
$$ \Delta = \begin{vmatrix} \cos x & \sin x \\ -\sin x & \cos x \end{vmatrix} = 1 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin x \\ \frac{1}{\cos x} & \cos x \end{vmatrix} = -\tg x $$
$$ \Delta_2 = \begin{vmatrix} \cos x & 0 \\ -\sin x & \frac{1}{\cos x} \end{vmatrix} = 1 $$<br>
$$ C_1' = \frac{\Delta_1}{\Delta} = -\tg x \implies C_1 = \int -\tg x\,dx = \ln|\cos x| + D_1 $$
$$ C_2' = \frac{\Delta_2}{\Delta} = 1 \implies C_2 = \int 1\,dx = x + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \cos x + D_2 \sin x + \cos x \cdot \ln|\cos x| + x \sin x $$`,

        `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 1 = 0 \\implies \\lambda_{1,2} = \\pm i $$<br>
ФСР: $$ \\cos x,\\; \\sin x $$
$$ y_{о.о.} = C_1 \\cos x + C_2 \\sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos x \\cdot C_1' + \\sin x \\cdot C_2' = 0 \\\\ -\\sin x \\cdot C_1' + \\cos x \\cdot C_2' = \\frac{1}{\\sin x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} \\cos x & \\sin x \\\\ -\\sin x & \\cos x \\end{vmatrix} = 1 $$
$$ \\Delta_1 = \\begin{vmatrix} 0 & \\sin x \\\\ \\frac{1}{\\sin x} & \\cos x \\end{vmatrix} = -1 $$
$$ \\Delta_2 = \\begin{vmatrix} \\cos x & 0 \\\\ -\\sin x & \\frac{1}{\\sin x} \\end{vmatrix} = \\ctg x $$<br>
$$ C_1' = -1 \\implies C_1 = \\int -1\\,dx = -x + D_1 $$
$$ C_2' = \\ctg x \\implies C_2 = \\int \\frac{\\cos x}{\\sin x}\\,dx = \\ln|\\sin x| + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \\cos x + D_2 \\sin x - x \\cos x + \\sin x \\cdot \\ln|\\sin x| $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 4y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 4 = 0 \\implies \\lambda_{1,2} = \\pm 2i $$<br>
ФСР: $$ \\cos 2x,\\; \\sin 2x $$
$$ y_{о.о.} = C_1 \\cos 2x + C_2 \\sin 2x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos 2x \\cdot C_1' + \\sin 2x \\cdot C_2' = 0 \\\\ -2\\sin 2x \\cdot C_1' + 2\\cos 2x \\cdot C_2' = 2\\tg x \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} \\cos 2x & \\sin 2x \\\\ -2\\sin 2x & 2\\cos 2x \\end{vmatrix} = 2\\cos^2 2x + 2\\sin^2 2x = 2 $$
$$ \\Delta_1 = -2\\tg x \\sin 2x = -2\\cdot\\frac{\\sin x}{\\cos x}\\cdot 2\\sin x\\cos x = -4\\sin^2 x = -2(1-\\cos 2x) $$
$$ \\Delta_2 = 2\\tg x \\cos 2x = 2\\frac{\\sin x}{\\cos x}(2\\cos^2 x - 1) = 4\\sin x\\cos x - \\frac{2\\sin x}{\\cos x} = 2\\sin 2x - 2\\tg x $$<br>
$$ C_1' = \\frac{\\Delta_1}{\\Delta} = \\cos 2x - 1 \\implies C_1 = \\frac{1}{2}\\sin 2x - x + D_1 $$
$$ C_2' = \\frac{\\Delta_2}{\\Delta} = \\sin 2x - \\tg x \\implies C_2 = -\\frac{1}{2}\\cos 2x + \\ln|\\cos x| + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \\cos 2x + D_2 \\sin 2x - x \\cos 2x + \\sin 2x \\cdot \\ln|\\cos x| $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 2y' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 - 2\\lambda + 1 = 0 \\implies (\\lambda-1)^2 = 0 \\implies \\lambda_{1,2} = 1 $$<br>
ФСР: $$ e^x,\\; x e^x $$
$$ y_{о.о.} = (C_1 + C_2 x) e^x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} e^x \\cdot C_1' + x e^x \\cdot C_2' = 0 \\\\ e^x \\cdot C_1' + (e^x + x e^x) \\cdot C_2' = \\frac{e^x}{x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} e^x & x e^x \\\\ e^x & e^x + x e^x \\end{vmatrix} = e^{2x} + x e^{2x} - x e^{2x} = e^{2x} $$
$$ \\Delta_1 = \\begin{vmatrix} 0 & x e^x \\\\ \\frac{e^x}{x} & e^x + x e^x \\end{vmatrix} = -e^{2x} $$
$$ \\Delta_2 = \\begin{vmatrix} e^x & 0 \\\\ e^x & \\frac{e^x}{x} \\end{vmatrix} = \\frac{e^{2x}}{x} $$<br>
$$ C_1' = \\frac{\\Delta_1}{\\Delta} = -1 \\implies C_1 = -x + D_1 $$
$$ C_2' = \\frac{\\Delta_2}{\\Delta} = \\frac{1}{x} \\implies C_2 = \\ln|x| + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = e^x (D_1 + D_2 x + x \\ln|x|) $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 3y' + 2y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 3\\lambda + 2 = 0 \\implies (\\lambda+1)(\\lambda+2)=0 \\implies \\lambda_1 = -1,\\; \\lambda_2 = -2 $$<br>
ФСР: $$ e^{-x},\\; e^{-2x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 e^{-2x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} e^{-x} \\cdot C_1' + e^{-2x} \\cdot C_2' = 0 \\\\ -e^{-x} \\cdot C_1' - 2e^{-2x} \\cdot C_2' = \\frac{1}{e^x + 1} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = \\begin{vmatrix} e^{-x} & e^{-2x} \\\\ -e^{-x} & -2e^{-2x} \\end{vmatrix} = -2e^{-3x} + e^{-3x} = -e^{-3x} $$
$$ \\Delta_1 = \\begin{vmatrix} 0 & e^{-2x} \\\\ \\frac{1}{e^x+1} & -2e^{-2x} \\end{vmatrix} = -\\frac{e^{-2x}}{e^x+1} $$
$$ \\Delta_2 = \\begin{vmatrix} e^{-x} & 0 \\\\ -e^{-x} & \\frac{1}{e^x+1} \\end{vmatrix} = \\frac{e^{-x}}{e^x+1} $$<br>
$$ C_1' = \\frac{\\Delta_1}{\\Delta} = \\frac{e^x}{e^x+1} \\implies C_1 = \\ln(e^x+1) + D_1 $$
$$ C_2' = \\frac{\\Delta_2}{\\Delta} = -\\frac{e^{2x}}{e^x+1} \\implies C_2 = -\\int\\frac{t}{t+1}dt = -e^x + \\ln(e^x+1) + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 e^{-x} + D_2 e^{-2x} + (e^{-x} + e^{-2x}) \\ln(e^x+1) - e^{-x} $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 1 = 0 \\implies \\lambda_{1,2} = \\pm i $$<br>
ФСР: $$ \\cos x,\\; \\sin x $$
$$ y_{о.о.} = C_1 \\cos x + C_2 \\sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos x \\cdot C_1' + \\sin x \\cdot C_2' = 0 \\\\ -\\sin x \\cdot C_1' + \\cos x \\cdot C_2' = \\frac{2}{\\cos^3 x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = 1 $$
$$ \\Delta_1 = -\\frac{2\\sin x}{\\cos^3 x} $$
$$ \\Delta_2 = \\frac{2}{\\cos^2 x} $$<br>
$$ C_1' = -\\frac{2\\sin x}{\\cos^3 x} \\implies C_1 = \\frac{1}{\\cos^2 x} + D_1 $$
$$ C_2' = \\frac{2}{\\cos^2 x} \\implies C_2 = 2\\tg x + D_2 $$<br>
Сборка решения:
$$ y_{о.н.} = \\left(D_1 + \\frac{1}{\\cos^2 x}\\right)\\cos x + \\left(D_2 + 2\\tg x\\right)\\sin x = D_1\\cos x + \\frac{1}{\\cos x} + D_2\\sin x + \\frac{2\\sin^2 x}{\\cos x} $$
Учитывая $$ \\frac{2\\sin^2 x}{\\cos x} = \\frac{2(1-\\cos^2 x)}{\\cos x} = \\frac{2}{\\cos x} - 2\\cos x $$:<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \\cos x + D_2 \\sin x + \\frac{1}{\\cos x} $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - y' = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 - \\lambda = 0 \\implies \\lambda(\\lambda-1)=0 \\implies \\lambda_1 = 0,\\; \\lambda_2 = 1 $$<br>
ФСР: $$ 1,\\; e^x $$
$$ y_{о.о.} = C_1 + C_2 e^x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} 1 \\cdot C_1' + e^x \\cdot C_2' = 0 \\\\ 0 \\cdot C_1' + e^x \\cdot C_2' = \\frac{e^{2x}}{e^x+1} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = e^x $$
$$ \\Delta_1 = -\\frac{e^{3x}}{e^x+1} $$
$$ \\Delta_2 = \\frac{e^{2x}}{e^x+1} $$<br>
$$ C_1' = -\\frac{e^{2x}}{e^x+1} \\implies C_1 = -\\int\\frac{t^2}{t+1}dt = -e^x + \\ln(e^x+1) + D_1 $$
$$ C_2' = \\frac{e^x}{e^x+1} \\implies C_2 = \\ln(e^x+1) + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 + D_2 e^x + (e^x+1)\\ln(e^x+1) - e^x $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 2y' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 2\\lambda + 1 = 0 \\implies (\\lambda+1)^2 = 0 \\implies \\lambda_{1,2} = -1 $$<br>
ФСР: $$ e^{-x},\\; x e^{-x} $$
$$ y_{о.о.} = (C_1 + C_2 x) e^{-x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} e^{-x} \\cdot C_1' + x e^{-x} \\cdot C_2' = 0 \\\\ -e^{-x} \\cdot C_1' + (1-x)e^{-x} \\cdot C_2' = \\frac{e^{-x}}{x^2} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = e^{-2x} $$
$$ \\Delta_1 = -\\frac{e^{-2x}}{x} $$
$$ \\Delta_2 = \\frac{e^{-2x}}{x^2} $$<br>
$$ C_1' = -\\frac{1}{x} \\implies C_1 = -\\ln|x| + D_1 $$
$$ C_2' = \\frac{1}{x^2} \\implies C_2 = -\\frac{1}{x} + D_2 $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = e^{-x}(D_1 + D_2 x - \\ln|x|) $$`,

    `<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 0 $$
Характеристическое уравнение:
$$ \\lambda^2 + 1 = 0 \\implies \\lambda_{1,2} = \\pm i $$<br>
ФСР: $$ \\cos x,\\; \\sin x $$
$$ y_{о.о.} = C_1 \\cos x + C_2 \\sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \\begin{cases} \\cos x \\cdot C_1' + \\sin x \\cdot C_2' = 0 \\\\ -\\sin x \\cdot C_1' + \\cos x \\cdot C_2' = \\frac{1}{\\sin^3 x} \\end{cases} $$<br>
Считаем определители:
$$ \\Delta = 1 $$
$$ \\Delta_1 = -\\frac{1}{\\sin^2 x} $$
$$ \\Delta_2 = \\frac{\\cos x}{\\sin^3 x} $$<br>
$$ C_1' = -\\frac{1}{\\sin^2 x} \\implies C_1 = \\ctg x + D_1 $$
$$ C_2' = \\sin^{-3} x \\, d(\\sin x) \\implies C_2 = -\\frac{1}{2\\sin^2 x} + D_2 $$<br>
Сборка решения:
$$ y_{о.н.} = (D_1 + \\ctg x)\\cos x + \\left(D_2 - \\frac{1}{2\\sin^2 x}\\right)\\sin x = D_1\\cos x + D_2\\sin x + \\frac{\\cos^2 x}{\\sin x} - \\frac{1}{2\\sin x} $$
Учитывая $$ \\frac{\\cos^2 x}{\\sin x} = \\frac{1-\\sin^2 x}{\\sin x} = \\frac{1}{\\sin x} - \\sin x $$:<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = D_1 \\cos x + D_2 \\sin x + \\frac{1}{2\\sin x} $$`
],

    
[
        null,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 2y' - 3y = e^{4x} $$
Характеристическое уравнение:
$$ \lambda^2 - 2\lambda - 3 = 0 $$
$$ \implies \lambda_1 = 3,\; \lambda_2 = -1 $$<br>
ФСР: $$ e^{3x},\; e^{-x} $$
$$ y_{о.о.} = C_1 e^{3x} + C_2 e^{-x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = e^{4x} $$
$$ \alpha = 4,\; \beta = 0,\; \deg(P) = 0 $$
$$ \alpha + \beta i = 4 \text{ не совпадает с корнями} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x^{0} \cdot e^{4x} \cdot A = A e^{4x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 4A e^{4x} $$
$$ y''_{ч.н.} = 16A e^{4x} $$
<br>Подставляем в исходное уравнение:
$$ 16A e^{4x} - 2(4A e^{4x}) - 3(A e^{4x}) = e^{4x} $$
$$ (16A - 8A - 3A) e^{4x} = e^{4x} \implies 5A = 1 \implies A = \frac{1}{5} $$
<br>Частное решение:
$$ y_{ч.н.} = \frac{1}{5} e^{4x} $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 e^{3x} + C_2 e^{-x} + \frac{1}{5} e^{4x} $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 4\sin x $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4\sin x $$
$$ \alpha = 0,\; \beta = 1,\; \deg(P) = -\infty,\; \deg(Q) = 0 $$
$$ \alpha + \beta i = i \text{ совпадает с корнем} \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x^{1} \cdot e^{0 \cdot x} (A \cos x + B \sin x) = x(A \cos x + B \sin x) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (A\cos x + B\sin x) + x(-A\sin x + B\cos x) $$
$$ y''_{ч.н.} = -2A\sin x + 2B\cos x - x(A\cos x + B\sin x) $$
<br>Подставляем в исходное уравнение:
$$ -2A\sin x + 2B\cos x - \cancel{x(A\cos x + B\sin x)} + \cancel{x(A\cos x + B\sin x)} = 4\sin x $$
$$ -2A\sin x + 2B\cos x = 4\sin x + 0\cdot\cos x $$
$$ \begin{cases} -2A = 4 \\ 2B = 0 \end{cases} \implies \begin{cases} A = -2 \\ B = 0 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -2x\cos x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 \cos x + C_2 \sin x - 2x \cos x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 5y' + 4y = 4x^2 e^{2x} $$
Характеристическое уравнение:
$$ \lambda^2 - 5\lambda + 4 = 0 \implies (\lambda - 1)(\lambda - 4) = 0 $$
$$ \implies \lambda_1 = 1,\; \lambda_2 = 4 $$<br>
ФСР: $$ e^x,\; e^{4x} $$
$$ y_{о.о.} = C_1 e^x + C_2 e^{4x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4x^2 e^{2x} $$
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 2 $$
$$ \alpha + \beta i = 2 \text{ не является корнем} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 2 \implies R(x) = Ax^2 + Bx + C,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{0} \cdot e^{2x} (Ax^2 + Bx + C) = (Ax^2 + Bx + C) e^{2x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (2Ax + B)e^{2x} + 2(Ax^2 + Bx + C)e^{2x} $$
$$ y''_{ч.н.} = (2A)e^{2x} + 2(2Ax + B)e^{2x} + \big[2(2Ax + B)e^{2x} + 4(Ax^2 + Bx + C)e^{2x}\big] $$
$$ y''_{ч.н.} = \big(4Ax^2 + (8A + 4B)x + (2A + 4B + 4C)\big)e^{2x} $$
<br>Подставляем в исходное уравнение:
$$ \big[4Ax^2 + (8A + 4B)x + 2A + 4B + 4C - 5(2Ax^2 + (2A + 2B)x + B + 2C) + 4(Ax^2 + Bx + C)\big] e^{2x} = 4x^2 e^{2x} $$
$$ \text{Группируем по степеням }x: $$
$$ \begin{cases} x^2: 4A - 10A + 4A = -2A = 4 \implies A = -2 \\ x: 8A + 4B - 10A - 10B + 4B = -2A - 2B = 0 \implies B = 2 \\ 1: 2A + 4B + 4C - 5B - 10C + 4C = 2A - B - 2C = 0 \implies C = -3 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = (-2x^2 + 2x - 3) e^{2x} $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 e^x + C_2 e^{4x} - (2x^2 - 2x + 3) e^{2x} $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 2y' + y = 6x e^x $$
Характеристическое уравнение:
$$ \lambda^2 - 2\lambda + 1 = 0 \implies (\lambda - 1)^2 = 0 $$
$$ \implies \lambda_{1,2} = 1 \text{ (кр. 2)} $$<br>
ФСР: $$ e^x,\; x e^x $$
$$ y_{о.о.} = (C_1 + C_2 x) e^x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 6x e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 1 \text{ совпадает с корнем кр. 2} \implies S = 2 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x^2 \cdot e^x (Ax + B) = (Ax^3 + Bx^2) e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (3Ax^2 + 2Bx)e^x + (Ax^3 + Bx^2)e^x = (Ax^3 + (3A + B)x^2 + 2Bx)e^x $$
$$ y''_{ч.н.} = \big(Ax^3 + (6A + B)x^2 + (6A + 4B)x + 2B\big)e^x $$
<br>Подставляем в исходное уравнение:
$$ \big[\cancel{Ax^3} + (6A + B)x^2 + (6A + 4B)x + 2B - 2(Ax^3 + (3A + B)x^2 + 2Bx) + (\cancel{Ax^3} + Bx^2)\big]e^x = 6x e^x $$
$$ \text{Сравниваем коэффициенты:} $$
$$ \begin{cases} x^2: 6A + B - 6A - 2B + B = 0 \\ x: 6A + 4B - 4B = 6A = 6 \implies A = 1 \\ 1: 2B = 0 \implies B = 0 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = x^3 e^x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = (C_1 + C_2 x + x^3) e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + y = 4x e^x $$
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4x e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 1 \text{ не является корнем} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{0} \cdot e^x (Ax + B) = (Ax + B) e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^x + (Ax + B)e^x = (Ax + A + B)e^x $$
$$ y''_{ч.н.} = A e^x + (Ax + A + B)e^x = (Ax + 2A + B)e^x $$
<br>Подставляем в исходное уравнение:
$$ (Ax + 2A + B)e^x + (Ax + B)e^x = 4x e^x $$
$$ 2Ax + (2A + 2B) = 4x \quad \big|\text{ сокращаем }e^x $$
$$ \begin{cases} 2A = 4 \\ 2A + 2B = 0 \end{cases} \implies \begin{cases} A = 2 \\ B = -2 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = (2x - 2) e^x = 2(x - 1) e^x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 \cos x + C_2 \sin x + 2(x - 1) e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 4y' + 4y = x e^{2x} $$
Характеристическое уравнение:
$$ \lambda^2 + 4\lambda + 4 = 0 \implies (\lambda + 2)^2 = 0 $$
$$ \implies \lambda = -2 \text{ (кр. 2)} $$<br>
ФСР: $$ e^{-2x},\; x e^{-2x} $$
$$ y_{о.о.} = (C_1 + C_2 x) e^{-2x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = x e^{2x} $$
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 2 \text{ не совпадает с }\lambda = -2 \implies S = 0 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{0} \cdot e^{2x} (Ax + B) = (Ax + B) e^{2x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^{2x} + 2(Ax + B) e^{2x} = (2Ax + 2B + A) e^{2x} $$
$$ y''_{ч.н.} = 2A e^{2x} + 2(2Ax + 2B + A) e^{2x} = (4Ax + 4B + 4A) e^{2x} $$
<br>Подставляем в исходное уравнение:
$$ (4Ax + 4B + 4A) e^{2x} + 4(2Ax + 2B + A) e^{2x} + 4(Ax + B) e^{2x} = x e^{2x} $$
$$ (4Ax + 4B + 4A + 8Ax + 8B + 4A + 4Ax + 4B) e^{2x} = x e^{2x} $$
$$ (16Ax + (8A + 16B)) e^{2x} = x e^{2x} $$
$$ \begin{cases} 16A = 1 \implies A = \frac{1}{16} \\ 8A + 16B = 0 \implies B = -\frac{1}{32} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = \left(\frac{1}{16}x - \frac{1}{32}\right) e^{2x} = \frac{2x - 1}{32} e^{2x} $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = (C_1 + C_2 x) e^{-2x} + \frac{2x - 1}{32} e^{2x} $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' + 9y = \cos 3x $$
Характеристическое уравнение:
$$ \lambda^2 + 9 = 0 $$
$$ \implies \lambda_{1,2} = \pm 3i $$<br>
ФСР: $$ \cos 3x,\; \sin 3x $$
$$ y_{о.о.} = C_1 \cos 3x + C_2 \sin 3x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = \cos 3x $$
$$ \alpha = 0,\; \beta = 3,\; \deg(P) = 0,\; \deg(Q) = -\infty $$
$$ \alpha + \beta i = 3i \text{ совпадает с корнем} \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x^{1} \cdot e^{0 \cdot x} (A \cos 3x + B \sin 3x) = x(A \cos 3x + B \sin 3x) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (A\cos 3x + B\sin 3x) + x(-3A\sin 3x + 3B\cos 3x) $$
$$ y''_{ч.н.} = -6A\sin 3x + 6B\cos 3x - 9x(A\cos 3x + B\sin 3x) $$
<br>Подставляем в исходное уравнение:
$$ [-6A\sin 3x + 6B\cos 3x - 9x(A\cos 3x + B\sin 3x)] + 9x(A\cos 3x + B\sin 3x) = \cos 3x $$
$$ -6A\sin 3x + 6B\cos 3x = \cos 3x $$
$$ \begin{cases} -6A = 0 \implies A = 0 \\ 6B = 1 \implies B = \frac{1}{6} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = \frac{x}{6} \sin 3x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 \cos 3x + C_2 \sin 3x + \frac{x}{6} \sin 3x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 4y' + 8y = e^{2x} + \sin 2x $$
Характеристическое уравнение:
$$ \lambda^2 - 4\lambda + 8 = 0 $$
$$ \implies \lambda_{1,2} = 2 \pm 2i $$<br>
ФСР: $$ e^{2x}\cos 2x,\; e^{2x}\sin 2x $$
$$ y_{о.о.} = e^{2x}(C_1 \cos 2x + C_2 \sin 2x) $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
<br>Принцип суперпозиции:
$$ y_{ч.н.} = y_1 + y_2 $$<br>
<br>Для f_1(x) = e^{2x}:<br>
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 0,\; S = 0 $$<br>
$$ y_{ч.н.}^{(1)} = A e^{2x} $$<br>
Находим производные:
$$ y' = 2A e^{2x} $$
$$ y'' = 4A e^{2x} $$
Подставляем в исходное уравнение:
$$ 4A e^{2x} - 8A e^{2x} + 8A e^{2x} = e^{2x} \implies 4A = 1 \implies A = \frac{1}{4} $$
<br>Частное решение: $$ \frac{1}{4} e^{2x} $$<br>
<br>Для f_2(x) = \sin 2x:<br>
$$ \alpha = 0,\; \beta = 2,\; \deg(Q) = 0,\; S = 0 $$<br>
$$ y_{ч.н.}^{(1)} = B \cos 2x + C \sin 2x $$<br>
Находим производные:
$$ y' = -2B\sin 2x + 2C\cos 2x $$
$$ y'' = -4B\cos 2x - 4C\sin 2x $$
Подставляем в исходное уравнение:
$$ (-4B - 8C + 8B)\cos 2x + (-4C + 8B + 8C)\sin 2x = \sin 2x $$
$$ \begin{cases} 4B - 8C = 0 \implies B = \frac{1}{10} \\ 8B + 4C = 1 \implies C = \frac{1}{20} \end{cases} $$
<br>Частное решение: $$ \frac{1}{10}\cos 2x + \frac{1}{20}\sin 2x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = e^{2x}(C_1 \cos 2x + C_2 \sin 2x) + \frac{1}{4}e^{2x} + \frac{1}{10}\cos 2x + \frac{1}{20}\sin 2x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ y'' - 5y' = 3x^2 $$
Характеристическое уравнение:
$$ \lambda^2 - 5\lambda = 0 \implies \lambda(\lambda - 5) = 0 $$
$$ \implies \lambda_1 = 0,\; \lambda_2 = 5 $$<br>
ФСР: $$ 1,\; e^{5x} $$
$$ y_{о.о.} = C_1 + C_2 e^{5x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 3x^2 $$
$$ \alpha = 0,\; \beta = 0,\; \deg(P) = 2 $$
$$ \alpha + \beta i = 0 \text{ совпадает с корнем }\lambda_1 = 0 \implies S = 1 $$
$$ \deg(R) = \deg(T) = 2 \implies R(x) = Ax^2 + Bx + C,\; T(x) = 0 $$
$$ y_{ч.н.} = x^{1} \cdot e^{0 \cdot x} (Ax^2 + Bx + C) = Ax^3 + Bx^2 + Cx $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 3Ax^2 + 2Bx + C $$
$$ y''_{ч.н.} = 6Ax + 2B $$
<br>Подставляем в исходное уравнение:
$$ (6Ax + 2B) - 5(3Ax^2 + 2Bx + C) = 3x^2 $$
$$ -15Ax^2 + (6A - 10B)x + (2B - 5C) = 3x^2 + 0\cdot x + 0 $$
$$ \begin{cases} -15A = 3 \implies A = -\dfrac{1}{5} \\ 6A - 10B = 0 \implies B = -\dfrac{3}{25} \\ 2B - 5C = 0 \implies C = -\dfrac{6}{125} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -\frac{1}{5}x^3 - \frac{3}{25}x^2 - \frac{6}{125}x $$<br>
<br><strong>Ответ (общее решение НЛДУ):</strong>
$$ y_{о.н.} = C_1 + C_2 e^{5x} - \frac{1}{5}x^3 - \frac{3}{25}x^2 - \frac{6}{125}x $$`
    ]
,
    
[
        null,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \frac{1}{\cos x} \end{cases} $$<br>
Считаем определители:
$$ \Delta = \begin{vmatrix} \cos x & \sin x \\ -\sin x & \cos x \end{vmatrix} = 1 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin x \\ \frac{1}{\cos x} & \cos x \end{vmatrix} = -\tg x $$
$$ \Delta_2 = \begin{vmatrix} \cos x & 0 \\ -\sin x & \frac{1}{\cos x} \end{vmatrix} = 1 $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -\tg x $$
$$ C_2' = \frac{\Delta_2}{\Delta} = 1 $$
Интегрируем:
$$ C_1 = \ln|\cos x| + D_1 $$
$$ C_2 = x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1 \cos x + D_2 \sin x + \cos x \cdot \ln|\cos x| + x \sin x $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies D_1\cos 0 + D_2\sin 0 + \cos 0\cdot\ln 1 + 0 = D_1 = 1 \implies D_1 = 1 $$
$$ y'(x) = -D_1\sin x + D_2\cos x - \sin x\cdot\ln|\cos x| + \cos x\cdot(-\tg x) + \sin x + x\cos x $$
$$ y'(0) = 0 \implies D_2 = 0 $$
$$ \implies D_1 = 1,\; D_2 = 0 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = \cos x + \cos x\cdot\ln|\cos x| + x\sin x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \frac{1}{\sin x} \end{cases} $$<br>
Считаем определители:
$$ \Delta = \begin{vmatrix} \cos x & \sin x \\ -\sin x & \cos x \end{vmatrix} = 1 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin x \\ \frac{1}{\sin x} & \cos x \end{vmatrix} = -1 $$
$$ \Delta_2 = \begin{vmatrix} \cos x & 0 \\ -\sin x & \frac{1}{\sin x} \end{vmatrix} = \ctg x $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -1 $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \ctg x $$
Интегрируем:
$$ C_1 = -x + D_1 $$
$$ C_2 = \ln|\sin x| + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1 \cos x + D_2 \sin x - x\cos x + \sin x\cdot\ln|\sin x| $$
<br>Используем начальные условия:
$$ y\left(\frac{\pi}{2}\right) = 1 \implies D_2 = 1 $$
$$ y'(x) = -D_1\sin x + D_2\cos x - \cos x + x\sin x + \cos x\cdot\ln|\sin x| + \sin x\cdot\frac{\cos x}{\sin x} $$
$$ y'\left(\frac{\pi}{2}\right) = 0 \implies -D_1 + \frac{\pi}{2} = 0 \implies D_1 = \frac{\pi}{2} $$
$$ \implies D_1 = \frac{\pi}{2},\; D_2 = 1 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = \frac{\pi}{2}\cos x + \sin x - x\cos x + \sin x\cdot\ln|\sin x| $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 2\lambda + 1 = 0 \implies (\lambda-1)^2 = 0 $$
$$ \implies \lambda_{1,2} = 1 \text{ (кр. 2)} $$<br>
ФСР: $$ e^x,\; x e^x $$
$$ y_{о.о.} = (C_1 + C_2 x) e^x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} e^x \cdot C_1' + x e^x \cdot C_2' = 0 \\ e^x \cdot C_1' + (x+1)e^x \cdot C_2' = \frac{e^x}{x} \end{cases} $$<br>
Считаем определители:
$$ \Delta = \begin{vmatrix} e^x & x e^x \\ e^x & (x+1)e^x \end{vmatrix} = e^{2x} $$
$$ \Delta_1 = \begin{vmatrix} 0 & x e^x \\ \frac{e^x}{x} & (x+1)e^x \end{vmatrix} = -e^{2x} $$
$$ \Delta_2 = \begin{vmatrix} e^x & 0 \\ e^x & \frac{e^x}{x} \end{vmatrix} = \frac{e^{2x}}{x} $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -1 $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \frac{1}{x} $$
Интегрируем:
$$ C_1 = -x + D_1 $$
$$ C_2 = \ln|x| + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = e^x(D_1 + D_2 x - x + x\ln|x|) $$
<br>Используем начальные условия:
$$ y(1) = e \implies e(D_1 + D_2 - 1) = e \implies D_1 + D_2 = 2 $$
$$ y'(x) = e^x(D_1 + D_2 x - x + x\ln x) + e^x(D_2 - 1 + \ln x + 1) $$
$$ y'(1) = e \implies e(D_1 + D_2 - 1) + e(D_2) = e \implies D_1 + 2D_2 = 2 $$
$$ \implies D_1 = 2,\; D_2 = 0 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^x(2 - x + x\ln|x|) $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 4 = 0 $$
$$ \implies \lambda_{1,2} = \pm 2i $$<br>
ФСР: $$ \cos 2x,\; \sin 2x $$
$$ y_{о.о.} = C_1 \cos 2x + C_2 \sin 2x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos 2x \cdot C_1' + \sin 2x \cdot C_2' = 0 \\ -2\sin 2x \cdot C_1' + 2\cos 2x \cdot C_2' = \frac{1}{\cos 2x} \end{cases} $$<br>
Считаем определители:
$$ \Delta = \begin{vmatrix} \cos 2x & \sin 2x \\ -2\sin 2x & 2\cos 2x \end{vmatrix} = 2 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin 2x \\ \frac{1}{\cos 2x} & 2\cos 2x \end{vmatrix} = -\frac{\sin 2x}{\cos 2x} $$
$$ \Delta_2 = \begin{vmatrix} \cos 2x & 0 \\ -2\sin 2x & \frac{1}{\cos 2x} \end{vmatrix} = \frac{\cos 2x}{\cos 2x} = 1 $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -\frac{1}{2}\tg 2x $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \frac{1}{2} $$
Интегрируем:
$$ C_1 = \frac{1}{4}\ln|\cos 2x| + D_1 $$
$$ C_2 = \frac{x}{2} + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1\cos 2x + D_2\sin 2x + \frac{1}{4}\cos 2x\cdot\ln|\cos 2x| + \frac{x}{2}\sin 2x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies D_1 + \frac{1}{4}\ln 1 = D_1 = 0 $$
$$ y'(x) = -2D_1\sin 2x + 2D_2\cos 2x - \frac{1}{2}\sin 2x\cdot\ln|\cos 2x| + \frac{1}{4}\cos 2x\cdot(-2\tg 2x) + \frac{1}{2}\sin 2x + x\cos 2x $$
$$ y'(0) = 0 \implies 2D_2 = 0 \implies D_2 = 0 $$
$$ \implies D_1 = 0,\; D_2 = 0 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = \frac{1}{4}\cos 2x\cdot\ln|\cos 2x| + \frac{x}{2}\sin 2x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 - 1 = 0 \implies (\lambda-1)(\lambda+1)=0 $$
$$ \implies \lambda_1 = -1,\; \lambda_2 = 1 $$<br>
ФСР: $$ e^{-x},\; e^{x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 e^{x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} e^{-x} \cdot C_1' + e^{x} \cdot C_2' = 0 \\ -e^{-x} \cdot C_1' + e^{x} \cdot C_2' = \frac{2e^{x}}{e^{x}+1} \end{cases} $$<br>
Считаем определители:
$$ \Delta = \begin{vmatrix} e^{-x} & e^{x} \\ -e^{-x} & e^{x} \end{vmatrix} = 2 $$
$$ \Delta_1 = \begin{vmatrix} 0 & e^{x} \\ \frac{2e^{x}}{e^{x}+1} & e^{x} \end{vmatrix} = -\frac{2e^{2x}}{e^{x}+1} $$
$$ \Delta_2 = \begin{vmatrix} e^{-x} & 0 \\ -e^{-x} & \frac{2e^{x}}{e^{x}+1} \end{vmatrix} = \frac{2}{e^{x}+1} $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -\frac{e^{2x}}{e^{x}+1} $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \frac{1}{e^{x}+1} $$
Интегрируем:
$$ C_1 = e^{x} - \ln(e^{x}+1) + D_1 $$
$$ C_2 = \ln(e^{x}+1) - x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1 e^{-x} + D_2 e^{x} + 1 - e^{-x}\ln(e^{x}+1) + e^{x}(\ln(e^{x}+1) - x) $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies D_1 + D_2 + 1 - \ln 2 + \ln 2 = D_1 + D_2 + 1 = 0 \implies D_1 + D_2 = -1 $$
$$ y'(0) = 0 \implies -D_1 + D_2 + (\text{члены от частного}) = 0 $$
$$ \implies D_1 = -1,\; D_2 = 0 \text{ (после подстановки)} $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{-x}(\ln(e^{x}+1) - e^{x}\ln(e^{x}+1) + e^{x}(e^{x}+1)(\ln(e^{x}+1)-x)) $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos x \cdot C_1' + \sin x \cdot C_2' = 0 \\ -\sin x \cdot C_1' + \cos x \cdot C_2' = \tg x \end{cases} $$<br>
Считаем определители:
$$ \Delta = 1 $$
$$ \Delta_1 = \begin{vmatrix} 0 & \sin x \\ \tg x & \cos x \end{vmatrix} = -\sin x\cdot\tg x = -\frac{\sin^2 x}{\cos x} $$
$$ \Delta_2 = \begin{vmatrix} \cos x & 0 \\ -\sin x & \tg x \end{vmatrix} = \cos x\cdot\tg x = \sin x $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -\frac{\sin^2 x}{\cos x} = \cos x - \frac{1}{\cos x} $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \sin x $$
Интегрируем:
$$ C_1 = \sin x - \ln|\sec x + \tg x| + D_1 $$
$$ C_2 = -\cos x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1\cos x + D_2\sin x + \cos x(\sin x - \ln|\sec x + \tg x|) - \sin x\cos x $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies D_1 = 1 $$
$$ y'(0) = 0 \implies D_2 - 1 = 0 \implies D_2 = 1 $$
$$ \implies D_1 = 1,\; D_2 = 1 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = \cos x + \sin x + \cos x(\sin x - \ln|\sec x + \tg x|) - \sin x\cos x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 2\lambda + 1 = 0 \implies (\lambda+1)^2=0 $$
$$ \implies \lambda_{1,2} = -1 \text{ (кр. 2)} $$<br>
ФСР: $$ e^{-x},\; x e^{-x} $$
$$ y_{о.о.} = (C_1 + C_2 x) e^{-x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} e^{-x} \cdot C_1' + x e^{-x} \cdot C_2' = 0 \\ -e^{-x} \cdot C_1' + (1-x)e^{-x} \cdot C_2' = e^{-x}\ln x \end{cases} $$<br>
Считаем определители:
$$ \Delta = e^{-2x} $$
$$ \Delta_1 = -x e^{-2x}\ln x $$
$$ \Delta_2 = e^{-2x}\ln x $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -x\ln x $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \ln x $$
Интегрируем:
$$ C_1 = \frac{x^2}{2}\left(\frac{1}{2} - \ln x\right) + D_1 $$
$$ C_2 = x(\ln x - 1) + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = e^{-x}\left(D_1 + D_2 x + \frac{x^2}{2}\left(\frac{1}{2} - \ln x\right) + x^2(\ln x - 1)\right) $$
<br>Используем начальные условия:
$$ y(1) = 0 \implies e^{-1}\left(D_1 + D_2 + \frac{1}{2}\left(\frac{1}{2} - 0\right) + (0 - 1)\right) = 0 \implies D_1 + D_2 + \frac{1}{4} - 1 = 0 \implies D_1 + D_2 = \frac{3}{4} $$
$$ y'(1) = 0 \implies D_2 - \frac{5}{4} = 0 \implies D_2 = \frac{5}{4} $$
$$ \implies D_1 = -\frac{1}{2},\; D_2 = \frac{5}{4} $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{-x}\left(-\frac{1}{2} + \frac{5}{4}x + \frac{x^2}{4}(1 - 2\ln x) + x^2(\ln x - 1)\right) $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 4 = 0 $$
$$ \implies \lambda_{1,2} = \pm 2i $$<br>
ФСР: $$ \cos 2x,\; \sin 2x $$
$$ y_{о.о.} = C_1 \cos 2x + C_2 \sin 2x $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} \cos 2x \cdot C_1' + \sin 2x \cdot C_2' = 0 \\ -2\sin 2x \cdot C_1' + 2\cos 2x \cdot C_2' = \frac{8}{\cos^2 x} \end{cases} $$<br>
Считаем определители:
$$ \Delta = 2 $$
$$ \Delta_1 = -\frac{8\sin 2x}{\cos^2 x} $$
$$ \Delta_2 = \frac{8\cos 2x}{\cos^2 x} $$
$$ C_1' = \frac{\Delta_1}{\Delta} = -\frac{4\sin 2x}{\cos^2 x} = -8\tg x $$
$$ C_2' = \frac{\Delta_2}{\Delta} = \frac{4\cos 2x}{\cos^2 x} = 8 - \frac{4}{\cos^2 x} $$
Интегрируем:
$$ C_1 = 8\ln|\cos x| + D_1 $$
$$ C_2 = 8x - 4\tg x + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1\cos 2x + D_2\sin 2x + 8\ln|\cos x|\cdot\cos 2x + (8x - 4\tg x)\sin 2x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies D_1 = 0 $$
$$ y'(0) = 0 \implies 2D_2 = 0 \implies D_2 = 0 $$
$$ \implies D_1 = 0,\; D_2 = 0 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = 8\ln|\cos x|\cdot\cos 2x + (8x - 4\tg x)\sin 2x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ:
$$ \lambda^2 + 3\lambda + 2 = 0 \implies (\lambda+1)(\lambda+2)=0 $$
$$ \implies \lambda_1 = -1,\; \lambda_2 = -2 $$<br>
ФСР: $$ e^{-x},\; e^{-2x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 e^{-2x} $$<br>
Возвращаемся к НЛДУ (Метод вариации произвольных постоянных):
$$ \begin{cases} e^{-x} \cdot C_1' + e^{-2x} \cdot C_2' = 0 \\ -e^{-x} \cdot C_1' - 2e^{-2x} \cdot C_2' = \frac{1}{e^{x}+1} \end{cases} $$<br>
Считаем определители:
$$ \Delta = -e^{-3x} $$
$$ \Delta_1 = -\frac{e^{-2x}}{e^{x}+1} $$
$$ \Delta_2 = \frac{e^{-x}}{e^{x}+1} $$
$$ C_1' = \frac{\Delta_1}{\Delta} = \frac{e^{x}}{e^{x}+1} $$
$$ C_2' = \frac{\Delta_2}{\Delta} = -\frac{e^{2x}}{e^{x}+1} $$
Интегрируем:
$$ C_1 = \ln(e^{x}+1) + D_1 $$
$$ C_2 = e^{x} - \ln(e^{x}+1) + D_2 $$
<br>Общее решение НЛДУ:
$$ y_{о.н.} = D_1 e^{-x} + D_2 e^{-2x} + e^{-x}\ln(e^{x}+1) + e^{-2x}(e^{x} - \ln(e^{x}+1)) $$
<br>Используем начальные условия:
$$ y(0) = \ln 2 \implies D_1 + D_2 + \ln 2 + 1 - \ln 2 = D_1 + D_2 + 1 = \ln 2 $$
$$ y'(0) = 0 \implies -D_1 - 2D_2 - 1 + 2\ln 2 = 0 $$
$$ \implies D_1 = 2\ln 2 - 1,\; D_2 = 0 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{-x}(2\ln 2 - 1) + e^{-x}\ln(e^{x}+1) + e^{-2x}(e^{x} - \ln(e^{x}+1)) $$`
    ]
,
    
[
        null,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 + 1 = 0 $$
$$ \implies \lambda_{1,2} = \pm i $$<br>
ФСР: $$ \cos x,\; \sin x $$
$$ y_{о.о.} = C_1 \cos x + C_2 \sin x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 4e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 0 $$
$$ \alpha + \beta i = 1 \text{ не совпадает с корнями} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = 0 $$
$$ y_{ч.н.} = A e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^x $$
$$ y''_{ч.н.} = A e^x $$
<br>Подставляем в исходное уравнение:
$$ A e^x + A e^x = 4 e^x \implies 2A = 4 \implies A = 2 $$
<br>Частное решение:
$$ y_{ч.н.} = 2 e^x $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = C_1 \cos x + C_2 \sin x + 2 e^x $$
<br>Используем начальные условия:
$$ y(0) = 4 \implies C_1 \cos 0 + C_2 \sin 0 + 2e^0 = C_1 + 2 = 4 \implies C_1 = 2 $$
$$ y'(x) = -C_1 \sin x + C_2 \cos x + 2e^x $$
$$ y'(0) = -3 \implies C_2 + 2 = -3 \implies C_2 = -5 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = 2\cos x - 5\sin x + 2e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 - 2\lambda = 0 \implies \lambda(\lambda-2)=0 $$
$$ \implies \lambda_1 = 0,\; \lambda_2 = 2 $$<br>
ФСР: $$ 1,\; e^{2x} $$
$$ y_{о.о.} = C_1 + C_2 e^{2x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = 2e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 0 $$
$$ \alpha + \beta i = 1 \text{ не совпадает с корнями} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = 0 $$
$$ y_{ч.н.} = A e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^x $$
$$ y''_{ч.н.} = A e^x $$
<br>Подставляем в исходное уравнение:
$$ A e^x - 2A e^x = 2e^x \implies -A = 2 \implies A = -2 $$
<br>Частное решение:
$$ y_{ч.н.} = -2e^x $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = C_1 + C_2 e^{2x} + -2e^x $$
<br>Используем начальные условия:
$$ y(1) = -1 \implies C_1 + C_2 e^{2} - 2e = -1 $$
$$ y'(x) = 2C_2 e^{2x} - 2e^x $$
$$ y'(1) = 0 \implies 2C_2 e^{2} - 2e = 0 \implies C_2 = e^{-1} $$
$$ C_1 + e - 2e = -1 \implies C_1 = e - 1 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = (e-1) + e^{2x-1} - 2e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 + 2\lambda + 2 = 0 $$
$$ \implies \lambda_{1,2} = -1 \pm i $$<br>
ФСР: $$ e^{-x}\cos x,\; e^{-x}\sin x $$
$$ y_{о.о.} = e^{-x}(C_1 \cos x + C_2 \sin x) $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = x e^{-x} $$
$$ \alpha = -1,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = -1 \text{ не совпадает с корнями} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = e^{-x}(Ax + B) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^{-x} - (Ax + B)e^{-x} = (-Ax + A - B)e^{-x} $$
$$ y''_{ч.н.} = -A e^{-x} - (-Ax + A - B)e^{-x} = (Ax - 2A + B)e^{-x} $$
<br>Подставляем в исходное уравнение:
$$ (Ax - 2A + B)e^{-x} + 2(-Ax + A - B)e^{-x} + 2(Ax + B)e^{-x} = x e^{-x} $$
$$ (Ax - 2A + B - 2Ax + 2A - 2B + 2Ax + 2B)e^{-x} = x e^{-x} $$
$$ (Ax + (0))e^{-x} = x e^{-x} \implies A = 1,\; B = 0 $$
<br>Частное решение:
$$ y_{ч.н.} = x e^{-x} $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = e^{-x}(C_1 \cos x + C_2 \sin x) + x e^{-x} $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies e^{0}(C_1 \cos 0 + C_2 \sin 0) + 0 = C_1 = 0 \implies C_1 = 0 $$
$$ y'(x) = e^{-x}(C_2 \cos x - C_2 \sin x) - e^{-x} C_2 \sin x + e^{-x} - x e^{-x} $$
$$ y'(0) = 0 \implies C_2 + 1 = 0 \implies C_2 = -1 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{-x}(x - \sin x) $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 - 1 = 0 \implies (\lambda-1)(\lambda+1)=0 $$
$$ \implies \lambda_1 = -1,\; \lambda_2 = 1 $$<br>
ФСР: $$ e^{-x},\; e^{x} $$
$$ y_{о.о.} = C_1 e^{-x} + C_2 e^{x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = x^2 $$
$$ \alpha = 0,\; \beta = 0,\; \deg(P) = 2 $$
$$ \alpha + \beta i = 0 \text{ не совпадает с корнями} \implies S = 0 $$
$$ \deg(R) = \deg(T) = 2 \implies R(x) = Ax^2 + Bx + C,\; T(x) = 0 $$
$$ y_{ч.н.} = Ax^2 + Bx + C $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 2Ax + B $$
$$ y''_{ч.н.} = 2A $$
<br>Подставляем в исходное уравнение:
$$ 2A - (Ax^2 + Bx + C) = x^2 $$
$$ -Ax^2 - Bx + (2A - C) = x^2 + 0\cdot x + 0 $$
$$ \begin{cases} -A = 1 \implies A = -1 \\ -B = 0 \implies B = 0 \\ 2A - C = 0 \implies C = -2 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -x^2 - 2 $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = C_1 e^{-x} + C_2 e^{x} + -x^2 - 2 $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + C_2 - 2 = 0 \implies C_1 + C_2 = 2 $$
$$ y'(x) = -C_1 e^{-x} + C_2 e^{x} - 2x $$
$$ y'(0) = 0 \implies -C_1 + C_2 = 0 \implies C_1 = C_2 $$
$$ \begin{cases} C_1 + C_2 = 2 \\ C_1 = C_2 \end{cases} \implies C_1 = C_2 = 1 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{-x} + e^{x} - x^2 - 2 $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 + 4 = 0 $$
$$ \implies \lambda_{1,2} = \pm 2i $$<br>
ФСР: $$ \cos 2x,\; \sin 2x $$
$$ y_{о.о.} = C_1 \cos 2x + C_2 \sin 2x $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = \sin 2x $$
$$ \alpha = 0,\; \beta = 2,\; \deg(P) = -\infty,\; \deg(Q) = 0 $$
$$ \alpha + \beta i = 2i \text{ совпадает с корнем} \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x(A \cos 2x + B \sin 2x) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = (A\cos 2x + B\sin 2x) + x(-2A\sin 2x + 2B\cos 2x) $$
$$ y''_{ч.н.} = -4A\sin 2x + 4B\cos 2x - 4x(A\cos 2x + B\sin 2x) $$
<br>Подставляем в исходное уравнение:
$$ (-4A\sin 2x + 4B\cos 2x - 4\cancel{x(A\cos 2x + B\sin 2x)}) + 4\cancel{x(A\cos 2x + B\sin 2x)} = \sin 2x $$
$$ -4A\sin 2x + 4B\cos 2x = 0\cdot\cos 2x + 1\cdot\sin 2x $$
$$ \begin{cases} -4A = 1 \implies A = -\dfrac{1}{4} \\ 4B = 0 \implies B = 0 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -\frac{x}{4} \cos 2x $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = C_1 \cos 2x + C_2 \sin 2x + -\frac{x}{4} \cos 2x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + 0 = 0 \implies C_1 = 0 $$
$$ y'(x) = -2C_1\sin 2x + 2C_2\cos 2x - \frac{1}{4}\cos 2x + \frac{x}{2}\sin 2x $$
$$ y'(0) = 0 \implies 2C_2 - \frac{1}{4} = 0 \implies C_2 = \frac{1}{8} $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = \frac{1}{8}\sin 2x - \frac{x}{4}\cos 2x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 - 4\lambda + 4 = 0 \implies (\lambda-2)^2=0 $$
$$ \implies \lambda = 2 \text{ (кр. 2)} $$<br>
ФСР: $$ e^{2x},\; x e^{2x} $$
$$ y_{о.о.} = (C_1 + C_2 x) e^{2x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = e^{2x} $$
$$ \alpha = 2,\; \beta = 0,\; \deg(P) = 0 $$
$$ \alpha + \beta i = 2 \text{ совпадает с корнем кр. 2} \implies S = 2 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = 0 $$
$$ y_{ч.н.} = x^2 \cdot A e^{2x} = A x^2 e^{2x} $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 2A x e^{2x} + 2A x^2 e^{2x} = 2A(x + x^2) e^{2x} $$
$$ y''_{ч.н.} = 2A(1 + 2x)e^{2x} + 4A(x + x^2)e^{2x} = 2A(1 + 4x + 2x^2)e^{2x} $$
<br>Подставляем в исходное уравнение:
$$ 2A(1 + 4x + 2x^2)e^{2x} - 8A(x + x^2)e^{2x} + 4A x^2 e^{2x} = e^{2x} $$
$$ 2A(1 + 4x + 2x^2 - 4x - 4x^2 + 2x^2) e^{2x} = 2A e^{2x} = e^{2x} \implies A = \frac{1}{2} $$
<br>Частное решение:
$$ y_{ч.н.} = \frac{1}{2} x^2 e^{2x} $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = (C_1 + C_2 x) e^{2x} + \frac{1}{2} x^2 e^{2x} $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies (C_1)\cdot 1 + 0 = 1 \implies C_1 = 1 $$
$$ y'(x) = C_2 e^{2x} + 2(C_1 + C_2 x)e^{2x} + x e^{2x} + x^2 e^{2x} $$
$$ y'(0) = 2 \implies C_2 + 2 = 2 \implies C_2 = 0 $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{2x}\left(1 + \frac{x^2}{2}\right) $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 + \lambda = 0 \implies \lambda(\lambda+1)=0 $$
$$ \implies \lambda_1 = 0,\; \lambda_2 = -1 $$<br>
ФСР: $$ 1,\; e^{-x} $$
$$ y_{о.о.} = C_1 + C_2 e^{-x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = x $$
$$ \alpha = 0,\; \beta = 0,\; \deg(P) = 1 $$
$$ \alpha + \beta i = 0 \text{ совпадает с корнем }\lambda_1=0 \implies S = 1 $$
$$ \deg(R) = \deg(T) = 1 \implies R(x) = Ax + B,\; T(x) = 0 $$
$$ y_{ч.н.} = x \cdot (Ax + B) = Ax^2 + Bx $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = 2Ax + B $$
$$ y''_{ч.н.} = 2A $$
<br>Подставляем в исходное уравнение:
$$ 2A + (2Ax + B) = x $$
$$ 2Ax + (2A + B) = 1\cdot x + 0 $$
$$ \begin{cases} 2A = 1 \implies A = \dfrac{1}{2} \\ 2A + B = 0 \implies B = -1 \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = \frac{1}{2}x^2 - x $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = C_1 + C_2 e^{-x} + \frac{1}{2}x^2 - x $$
<br>Используем начальные условия:
$$ y(0) = 1 \implies C_1 + C_2 = 1 $$
$$ y'(x) = -C_2 e^{-x} + x - 1 $$
$$ y'(0) = 0 \implies -C_2 - 1 = 0 \implies C_2 = -1 $$
$$ \begin{cases} C_1 + (-1) = 1 \implies C_1 = 2 \end{cases} $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = \frac{1}{2}x^2 - x - e^{-x} + 2 $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 - 3\lambda + 2 = 0 \implies (\lambda-1)(\lambda-2)=0 $$
$$ \implies \lambda_1 = 1,\; \lambda_2 = 2 $$<br>
ФСР: $$ e^x,\; e^{2x} $$
$$ y_{о.о.} = C_1 e^x + C_2 e^{2x} $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = e^x $$
$$ \alpha = 1,\; \beta = 0,\; \deg(P) = 0 $$
$$ \alpha + \beta i = 1 \text{ совпадает с корнем }\lambda_1=1 \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = 0 $$
$$ y_{ч.н.} = x \cdot A e^x = A x e^x $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = A e^x + A x e^x = A(1+x)e^x $$
$$ y''_{ч.н.} = A e^x + A(1+x)e^x = A(2+x)e^x $$
<br>Подставляем в исходное уравнение:
$$ A(2+x)e^x - 3A(1+x)e^x + 2A x e^x = e^x $$
$$ A(2+x - 3 - 3x + 2x)e^x = A(-1 + 0\cdot x)e^x = -A e^x = e^x \implies A = -1 $$
<br>Частное решение:
$$ y_{ч.н.} = -x e^x $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = C_1 e^x + C_2 e^{2x} + -x e^x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + C_2 = 0 $$
$$ y'(x) = C_1 e^x + 2C_2 e^{2x} - e^x - x e^x $$
$$ y'(0) = 0 \implies C_1 + 2C_2 - 1 = 0 $$
$$ \begin{cases} C_1 + C_2 = 0 \\ C_1 + 2C_2 = 1 \end{cases} \implies \begin{cases} C_1 = -1 \\ C_2 = 1 \end{cases} $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{2x} - (x+1)e^x $$`,

        String.raw`<strong>Решение:</strong><br><br>
Соответствующее ОЛДУ (однородное):
Характеристическое уравнение:
$$ \lambda^2 + 2\lambda + 5 = 0 $$
$$ \implies \lambda_{1,2} = -1 \pm 2i $$<br>
ФСР: $$ e^{-x}\cos 2x,\; e^{-x}\sin 2x $$
$$ y_{о.о.} = e^{-x}(C_1 \cos 2x + C_2 \sin 2x) $$<br>
Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
$$ F(x) = e^{-x}\sin 2x $$
$$ \alpha = -1,\; \beta = 2,\; \deg(P) = -\infty,\; \deg(Q) = 0 $$
$$ \alpha + \beta i = -1+2i \text{ совпадает с корнем} \implies S = 1 $$
$$ \deg(R) = \deg(T) = 0 \implies R(x) = A,\; T(x) = B $$
$$ y_{ч.н.} = x \cdot e^{-x}(A \cos 2x + B \sin 2x) = x e^{-x}(A \cos 2x + B \sin 2x) $$<br>
Находим производные для подстановки:
$$ y'_{ч.н.} = e^{-x}(A\cos 2x + B\sin 2x) + x e^{-x}(-A\sin 2x\cdot2 + B\cos 2x\cdot2) - x e^{-x}(A\cos 2x + B\sin 2x) $$
$$ y''_{ч.н.} \text{ (далее подстановка в уравнение)} $$
<br>Подставляем в исходное уравнение:
$$ \text{После подстановки и упрощения:} $$
$$ 4B e^{-x}\cos 2x - 4A e^{-x}\sin 2x = e^{-x}\sin 2x $$
$$ \begin{cases} 4B = 0 \implies B = 0 \\ -4A = 1 \implies A = -\dfrac{1}{4} \end{cases} $$
<br>Частное решение:
$$ y_{ч.н.} = -\frac{x}{4} e^{-x} \cos 2x $$<br>
<br>Общее решение НЛДУ:
$$ y_{о.н.} = e^{-x}(C_1 \cos 2x + C_2 \sin 2x) + -\frac{x}{4} e^{-x} \cos 2x $$
<br>Используем начальные условия:
$$ y(0) = 0 \implies C_1 + 0 = 0 \implies C_1 = 0 $$
$$ y'(x) = -e^{-x}C_2\sin 2x + 2e^{-x}C_2\cos 2x - \frac{1}{4}e^{-x}\cos 2x + \frac{x}{2}e^{-x}\sin 2x - \frac{x}{4}e^{-x}\cos 2x - \frac{x}{4}e^{-x}(-2\sin 2x) $$
$$ y'(0) = 1 \implies 2C_2 - \frac{1}{4} = 1 \implies 2C_2 = \frac{5}{4} \implies C_2 = \frac{5}{8} $$
<br><strong>Ответ (решение задачи Коши):</strong>
$$ y = e^{-x}\left(\frac{5}{8}\sin 2x - \frac{x}{4}\cos 2x\right) $$`
    ]


];

function renderControlTasks() {
    const pane = document.getElementById('control-pane');
    if (!pane) return;
    
    const total = typeConfig.reduce((sum, t) => sum + t.tasks.length, 0);
    const solved = Object.keys(krProgress).length;
    const remaining = total - solved;
    
    const examDate = new Date(2026, 4, 22);
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;
    const perDay = remaining / daysLeft;
    
    let paceText = '';
    if (remaining <= 0) {
        paceText = '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';
    } else if (daysLeft <= 0) {
        paceText = '⏰ Срок вышел! Решай оставшиеся задачи.';
    } else {
        paceText = `📅 До 22 мая: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} задач | Нужно: ${perDay.toFixed(3)} задачи в день`;
    }
    
    let html = `
    <div class="kr-stats-panel glass-panel" style="padding: 20px;">
        <!-- ТУЛБАР ПО ЦЕНТРУ -->
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
            <button class="action-btn" style="background: rgba(0,255,0,0.15); border-color: #0f0; color: #0f0;" onclick="exportAllToFile()">💾 Сохранить прогресс</button>
            <button class="action-btn" style="background: rgba(255,255,0,0.15); border-color: #ff0; color: #ff0;" onclick="importAllFromFile()">📂 Загрузить прогресс</button>
            <button class="action-btn" id="toggle-all-control" onclick="toggleAllControlTasks()">📂 Развернуть всё</button>
            <button class="action-btn" style="border-color: #f44; color: #f44;" onclick="resetKrProgress()">🗑️ Сбросить КР</button>
        </div>
        
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
            <div class="stats-grid-inline" style="flex:1;">
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-solved">${solved}</div>
                    <div class="stats-grid-label">✅ Решено</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-total" style="color:#ffb86b;">${total}</div>
                    <div class="stats-grid-label">📋 Всего задач</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-percent">${((solved/total)*100).toFixed(1)}%</div>
                    <div class="stats-grid-label">📊 Прогресс</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-remaining">${remaining}</div>
                    <div class="stats-grid-label">⏳ Осталось</div>
                </div>
            </div>
        </div>
        <div class="progress-bar" style="margin-top: 12px;">
            <div class="progress-fill" id="kr-progress-fill" style="width: ${(solved/total)*100}%; background: linear-gradient(90deg, #0ff, #f0f);"></div>
        </div>
        <div id="kr-pace" style="margin-top: 12px; font-size:0.85rem; color:#8ba0c5; text-align:center;">${paceText}</div>
    </div>
`;
    
    // Состояние секций
    const krSectionsState = JSON.parse(localStorage.getItem('kr_sections_state')) || {};
    
    let taskId = 1;
    for (let t = 0; t < typeConfig.length; t++) {
        const type = typeConfig[t];
        const solvedInType = type.tasks.filter((_, i) => {
            const id = taskId + i;
            return krProgress[id] === true;
        }).length;
        const isExpanded = krSectionsState[t] !== false;
        
        html += `
        <div class="integrals-section" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.15); border-radius: 1rem; overflow: hidden;">
            <div class="integrals-section-header" style="background: rgba(0,20,40,0.5); padding: 0.8rem 1.2rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="toggleKrType(${t})">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="section-toggle" id="kr-toggle-type-${t}" style="color:#0ff; font-size:1.2rem;">${isExpanded ? '▼' : '▶'}</span>
                    <span style="color:#0ff; font-weight:600;">Тип ${t+1}: ${type.title}</span>
                    <span style="color:#8ba0c5; font-size:0.8rem;">(${type.tasks.length} задач)</span>
                </div>
                <div style="font-size:0.8rem; color:#8ba0c5;">
                    ✅ <span id="kr-type-${t}-counter">${solvedInType}/${type.tasks.length}</span>
                </div>
            </div>
            <div class="section-content" id="kr-type-${t}-content" style="display: ${isExpanded ? 'block' : 'none'}; padding: 0.5rem 1.5rem 1.5rem;">
                <p style="margin:8px 0; font-size:0.85rem; color:#8ba0c5;">📌 <strong>Когда применяется:</strong> ${type.desc}</p>`;
        
        for (let i = 0; i < type.tasks.length; i++) {
            const task = type.tasks[i];
            const id = taskId++;
            const label = `${i === 0 ? '🎯 ' : ''}Задача ${t+1}.${i+1} (${['вариация','НК','Коши вариация','Коши НК'][t]})`;
            const isFirst = (i === 0);
            html += `
                <div class="task-card" data-task-id="${id}">
                    <div class="task-header" onclick="toggleSolution(this.parentElement)">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="kr_chk_${id}" ${krProgress[id] ? 'checked' : ''} onclick="event.stopPropagation(); toggleKrTask(${id})" style="width: 18px; height: 18px; cursor: pointer;">
                            <span class="task-title" id="kr_title_${id}" style="${krProgress[id] ? 'text-decoration: line-through; opacity: 0.7;' : ''}">📌 ${label}</span>
                        </div>
                        <span class="task-points">${type.points} баллов</span>
                    </div>
                    <div class="task-content">
                        <div class="task-demand"><strong>Условие:</strong><br>${task.cond}</div>
                        <div class="solution" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
                            ${task.solution || krTaskSolutions[t]?.[i] || (isFirst ? existingSolutions[t] : '<em>Решение будет добавлено позже.</em>')}
                        </div>
                    </div>
                </div>`;
        }
        html += `</div></div>`;
    }
    
    pane.innerHTML = html;
    updateKrStats();
    typesetMathJax([pane]);
}

// ========== ТАБЫ ==========
async function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const examPane = document.getElementById('exam-pane');
            const controlPane = document.getElementById('control-pane');
            const integralsPane = document.getElementById('integrals-pane');

            examPane?.classList.remove('active-pane');
            controlPane?.classList.remove('active-pane');
            integralsPane?.classList.remove('active-pane');

            if (btn.dataset.tab === 'exam') {
                examPane?.classList.add('active-pane');
                render();
                saveActiveTab();
            } else if (btn.dataset.tab === 'control') {
                controlPane?.classList.add('active-pane');
                saveActiveTab();
            } else if (btn.dataset.tab === 'integrals') {
                integralsPane?.classList.add('active-pane');
                saveActiveTab();
                renderIntegrals();
            }
        });
    });
}
// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initState();
    renderControlTasks();
    renderIntegrals();
    initTabs();
    loadActiveTab();
    render();
    setInterval(updatePace, 60000);
});

// ========== ТАБЛИЦА ИНТЕГРАЛОВ ==========
const integralsData = [
    { theme: "📌 1. Степенные функции", integral: "∫ x^n dx", answer: "x^{n+1}/(n+1) + C, n ≠ -1", example: "∫ x^3 dx = x^4/4 + C", practice: "∫ x^5 dx" },
    { theme: "📌 2. Обратная степень (n = -1)", integral: "∫ dx/x", answer: "ln|x| + C", example: "∫ dx/x = ln|x| + C", practice: "∫ dx/(x+2)" },
    { theme: "📌 3. Экспоненциальные функции", integral: "∫ e^x dx", answer: "e^x + C", example: "∫ e^{2x} dx = e^{2x}/2 + C", practice: "∫ e^{3x} dx" },
    { theme: "📌 4. Общая показательная", integral: "∫ a^x dx", answer: "a^x / ln a + C", example: "∫ 2^x dx = 2^x/ln2 + C", practice: "∫ 5^x dx" },
    { theme: "📌 5. Синус", integral: "∫ sin x dx", answer: "-cos x + C", example: "∫ sin 3x dx = -cos(3x)/3 + C", practice: "∫ sin 2x dx" },
    { theme: "📌 6. Косинус", integral: "∫ cos x dx", answer: "sin x + C", example: "∫ cos 4x dx = sin(4x)/4 + C", practice: "∫ cos 5x dx" },
    { theme: "📌 7. Тангенс", integral: "∫ tg x dx", answer: "-ln|cos x| + C", example: "∫ tg 2x dx = -½·ln|cos 2x| + C", practice: "∫ tg 3x dx" },
    { theme: "📌 8. Котангенс", integral: "∫ ctg x dx", answer: "ln|sin x| + C", example: "∫ ctg 4x dx = ¼·ln|sin 4x| + C", practice: "∫ ctg 2x dx" },
    { theme: "📌 9. 1/sin²x", integral: "∫ dx/sin²x", answer: "-ctg x + C", example: "∫ dx/sin²(2x) = -½·ctg(2x) + C", practice: "∫ dx/sin²(3x)" },
    { theme: "📌 10. 1/cos²x", integral: "∫ dx/cos²x", answer: "tg x + C", example: "∫ dx/cos²(3x) = ⅓·tg(3x) + C", practice: "∫ dx/cos²(2x)" },
    { theme: "📌 11. 1/(x² + a²)", integral: "∫ dx/(x² + a²)", answer: "(1/a)·arctg(x/a) + C", example: "∫ dx/(x² + 4) = ½·arctg(x/2) + C", practice: "∫ dx/(x² + 9)" },
    { theme: "📌 12. 1/(x² - a²)", integral: "∫ dx/(x² - a²)", answer: "(1/(2a))·ln|(x-a)/(x+a)| + C", example: "∫ dx/(x² - 4) = ¼·ln|(x-2)/(x+2)| + C", practice: "∫ dx/(x² - 9)" },
    { theme: "📌 13. 1/√(a² - x²)", integral: "∫ dx/√(a² - x²)", answer: "arcsin(x/a) + C", example: "∫ dx/√(4 - x²) = arcsin(x/2) + C", practice: "∫ dx/√(9 - x²)" },
    { theme: "📌 14. 1/√(x² ± a²)", integral: "∫ dx/√(x² ± a²)", answer: "ln|x + √(x² ± a²)| + C", example: "∫ dx/√(x² + 4) = ln|x + √(x²+4)| + C", practice: "∫ dx/√(x² + 9)" },
    { theme: "📌 15. √(a² - x²)", integral: "∫ √(a² - x²) dx", answer: "(x/2)·√(a² - x²) + (a²/2)·arcsin(x/a) + C", example: "∫ √(4 - x²) dx", practice: "∫ √(9 - x²) dx" },
    { theme: "📌 16. √(x² ± a²)", integral: "∫ √(x² ± a²) dx", answer: "(x/2)·√(x² ± a²) ± (a²/2)·ln|x + √(x² ± a²)| + C", example: "∫ √(x² + 4) dx", practice: "∫ √(x² + 9) dx" },
    { theme: "📌 17. Интегрирование по частям", integral: "∫ u dv = uv - ∫ v du", answer: "формула", example: "∫ x e^x dx = x e^x - e^x + C", practice: "∫ x cos x dx" },
    { theme: "📌 18. Замена переменной", integral: "∫ f(g(x))·g'(x) dx", answer: "∫ f(u) du, u = g(x)", example: "∫ 2x·e^{x²} dx = e^{x²} + C", practice: "∫ 3x²·sin(x³) dx" }
];

// ========== ТАБЛИЦА ИНТЕГРАЛОВ С ЧЕКБОКСАМИ, СВОРАЧИВАНИЕМ И ПРОГРЕССОМ ==========// ========== ПРОГРЕСС ИНТЕГРАЛОВ ==========
let integralsProgress = JSON.parse(localStorage.getItem('integrals_progress')) || {};

// ========== КЕШИРОВАНИЕ ИНТЕГРАЛОВ ==========
let integralsHTMLCache = null;
let integralsRendered = false;

function saveIntegralsProgress() {
    localStorage.setItem('integrals_progress', JSON.stringify(integralsProgress));
    updateIntegralsStats();
}

function getSolvedCount() {
    return Object.keys(integralsProgress).length;
}

function getTotalTasksCount() {
    let total = 0;
    for (let i = 1; i <= 9; i++) {
        if (INTEGRALS_DATA[`section${i}`]) {
            total += INTEGRALS_DATA[`section${i}`].length;
        }
    }
    return total;
}

function saveActiveTab() {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        localStorage.setItem('active_tab', activeTab.getAttribute('data-tab'));
    }
}

function loadActiveTab() {
    const savedTab = localStorage.getItem('active_tab');
    if (savedTab) {
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${savedTab}"]`);
        if (tabBtn) {
            // Снимаем активность со всех
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');
            
            // Показываем нужную панель
            const examPane = document.getElementById('exam-pane');
            const controlPane = document.getElementById('control-pane');
            const integralsPane = document.getElementById('integrals-pane');
            
            examPane?.classList.remove('active-pane');
            controlPane?.classList.remove('active-pane');
            integralsPane?.classList.remove('active-pane');
            
            if (savedTab === 'exam') {
                examPane?.classList.add('active-pane');
                render();
            } else if (savedTab === 'control') {
                controlPane?.classList.add('active-pane');
            } else if (savedTab === 'integrals') {
                integralsPane?.classList.add('active-pane');
            }
        }
    }
}

function saveIntegralsSectionState() {
    const sectionsState = {};
    for (let i = 1; i <= 9; i++) {
        const content = document.getElementById(`section-${i}-content`);
        if (content) {
            sectionsState[i] = content.style.display !== 'none';
        }
    }
    localStorage.setItem('integrals_sections_state', JSON.stringify(sectionsState));
}

function loadIntegralsSectionState() {
    const saved = localStorage.getItem('integrals_sections_state');
    if (saved) {
        const sectionsState = JSON.parse(saved);
        for (let i = 1; i <= 9; i++) {
            const content = document.getElementById(`section-${i}-content`);
            const toggleBtn = document.getElementById(`toggle-section-${i}`);
            if (content && sectionsState[i] !== undefined) {
                if (sectionsState[i]) {
                    content.style.display = 'block';
                    if (toggleBtn) toggleBtn.innerHTML = '▼';
                } else {
                    content.style.display = 'none';
                    if (toggleBtn) toggleBtn.innerHTML = '▶';
                }
            }
        }
    }
}

function updateIntegralsStats() {
    const solved = getSolvedCount();
    const total = getTotalTasksCount();
    
    const progressFill = document.getElementById('integrals-progress-fill');
    const solvedSpan = document.getElementById('integrals-solved');
    const totalSpan = document.getElementById('integrals-total');
    const percentSpan = document.getElementById('integrals-percent');
    const paceSpan = document.getElementById('integrals-pace');
    const remainingSpan = document.getElementById('integrals-remaining');
    
    if (progressFill) progressFill.style.width = `${(solved / total) * 100}%`;
    if (solvedSpan) solvedSpan.innerText = solved;
    if (totalSpan) totalSpan.innerText = total;
    if (percentSpan) percentSpan.innerText = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;
    if (remainingSpan) remainingSpan.innerText = total - solved;
    
    // Темп до 22 мая 2026
    const examDate = new Date(2026, 4, 22);
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;
    const remaining = total - solved;
    const perDay = remaining / daysLeft;
    
    if (paceSpan) {
        if (remaining <= 0) {
            paceSpan.innerHTML = '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';
        } else if (daysLeft <= 0) {
            paceSpan.innerHTML = '⏰ Срок вышел! Решай оставшиеся задачи.';
        } else {
            paceSpan.innerHTML = `📅 До 22 мая: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} задач | Нужно: ${perDay.toFixed(3)} задачи в день`;
        }
    }
    
    // Обновляем счётчики в заголовках разделов
    for (let i = 1; i <= 9; i++) {
        const sectionData = INTEGRALS_DATA[`section${i}`];
        if (sectionData) {
            const solvedInSection = sectionData.filter((_, idx) => integralsProgress[`s${i}_t${idx}`]).length;
            const sectionCounter = document.getElementById(`section-${i}-counter`);
            if (sectionCounter) {
                sectionCounter.innerText = `${solvedInSection}/${sectionData.length}`;
            }
        }
    }
}

function toggleIntegralTask(sectionNum, taskIdx) {
    const key = `s${sectionNum}_t${taskIdx}`;
    if (integralsProgress[key]) {
        delete integralsProgress[key];
    } else {
        integralsProgress[key] = true;
    }
    saveIntegralsProgress();
    
    // Обновляем только чекбокс без перерисовки
    const checkbox = document.getElementById(`chk_${key}`);
    if (checkbox) checkbox.checked = integralsProgress[key] === true;
    
    // Обновляем счётчик решённых задач в разделе
    const sectionData = INTEGRALS_DATA[`section${sectionNum}`];
    if (sectionData) {
        const solvedInSection = sectionData.filter((_, idx) => integralsProgress[`s${sectionNum}_t${idx}`]).length;
        const sectionCounter = document.getElementById(`section-${sectionNum}-counter`);
        if (sectionCounter) {
            sectionCounter.innerText = `${solvedInSection}/${sectionData.length}`;
        }
    }
    
    // Обновляем общую статистику
    updateIntegralsStats();
}

// ========== ФУНКЦИИ ДЛЯ ИНТЕГРАЛОВ ==========
function toggleIntegralSolution(card) {
    const solution = card.querySelector('.integral-solution');
    if (solution) {
        if (solution.style.display === 'none' || solution.style.display === '') {
            solution.style.display = 'block';
            if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                MathJax.typesetPromise([solution]).catch(err => console.log('MathJax error:', err));
            }
        } else {
            solution.style.display = 'none';
        }
    }
}

function showIntegralAnswer(btn, answer) {
    const answerSpan = btn.nextElementSibling;
    if (answerSpan) {
        answerSpan.style.display = 'inline';
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([answerSpan]).catch(err => console.log('MathJax error:', err));
        }
        setTimeout(() => {
            answerSpan.style.display = 'none';
        }, 4000);
    }
}

function renderIntegrals() {
    const container = document.getElementById('integrals-list');
    if (!container) return;

    // ── БЫСТРЫЙ ПУТЬ: кеш уже есть ──
    if (integralsHTMLCache && integralsRendered) {
        container.innerHTML = integralsHTMLCache;
        updateIntegralsStats();
        document.querySelectorAll('.integral-checkbox').forEach(checkbox => {
            const key = checkbox.id.replace('chk_', '');
            checkbox.checked = integralsProgress[key] === true;
        });
        setTimeout(() => { loadIntegralsSectionState(); }, 50);
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([container]).catch(err => console.log('MathJax error:', err));
        }
        return;
    }

    // ── МЕДЛЕННЫЙ ПУТЬ: генерируем с нуля ──
    let totalTasks = getTotalTasksCount();
    let solved = getSolvedCount();
    
    let html = `
    <div class="integrals-stats-panel glass-panel" style="padding: 20px;">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
            <button class="action-btn" style="background: rgba(0,255,0,0.15); border-color: #0f0; color: #0f0;" onclick="exportAllToFile()">💾 Сохранить прогресс</button>
            <button class="action-btn" style="background: rgba(255,255,0,0.15); border-color: #ff0; color: #ff0;" onclick="importAllFromFile()">📂 Загрузить прогресс</button>
            <button class="action-btn" onclick="toggleIntegralsAllSections()">📂 Развернуть всё</button>
            <button class="action-btn" style="border-color: #f44; color: #f44;" onclick="resetAllIntegralsProgress()">🗑️ Сбросить интегралы</button>
        </div>
        
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
            <div class="stats-grid-inline" style="flex:1;">
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-solved">${solved}</div>
                    <div class="stats-grid-label">✅ Решено</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-total" style="color:#ffb86b;">${totalTasks}</div>
                    <div class="stats-grid-label">📋 Всего задач</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-percent">${totalTasks > 0 ? ((solved / totalTasks) * 100).toFixed(1) : 0}%</div>
                    <div class="stats-grid-label">📊 Прогресс</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-remaining">${totalTasks - solved}</div>
                    <div class="stats-grid-label">⏳ Осталось</div>
                </div>
            </div>
        </div>
        <div class="progress-bar" style="margin-top: 12px;">
            <div class="progress-fill" id="integrals-progress-fill" style="width: ${(solved / totalTasks) * 100}%;"></div>
        </div>
        <div id="integrals-pace" style="margin-top: 12px; font-size:0.85rem; color:#8ba0c5; text-align:center;">загрузка...</div>
    </div>
    `;
    
    const sections = [
        { num: 1, title: "Интегрирование по таблице", data: INTEGRALS_DATA.section1,
          formulas: "📌 ∫xⁿdx = xⁿ⁺¹/(n+1)+C (n≠-1), ∫dx/x = ln|x|+C, ∫eˣdx = eˣ+C, ∫aˣdx = aˣ/lna+C, ∫sin x dx = -cos x+C, ∫cos x dx = sin x+C, ∫dx/cos²x = tg x+C, ∫dx/sin²x = -ctg x+C, ∫dx/√(a²-x²) = arcsin(x/a)+C, ∫dx/(x²+a²) = (1/a)arctg(x/a)+C, ∫dx/(x²-a²) = (1/(2a))ln|(x-a)/(x+a)|+C",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Табличное интегрирование</h4>
                   <p>Интегрирование по таблице — прямое применение формул из таблицы интегралов. Для этого нужно:</p>
                   <ul><li>Вынести константу за знак интеграла: ∫k·f(x)dx = k·∫f(x)dx</li>
                   <li>Разбить сумму на отдельные интегралы: ∫[f(x)+g(x)]dx = ∫f(x)dx + ∫g(x)dx</li>
                   <li>Привести подынтегральное выражение к табличному виду (преобразовать степени, раскрыть скобки)</li></ul>` },
        { num: 2, title: "Замена переменной", data: INTEGRALS_DATA.section2,
          formulas: "📌 Метод: ∫f(g(x))·g'(x)dx = ∫f(u)du, u=g(x). Подстановки: t = ax+b (линейная), t = √(ax+b) (иррациональность), t = ln x, t = eˣ, t = tg(x/2) (универсальная).",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Замена переменной</h4>
                   <p>Метод замены переменной (подстановки) — один из основных методов интегрирования. Алгоритм:</p>
                   <ol><li>Выбрать новую переменную u = g(x) так, чтобы подынтегральное выражение упростилось</li>
                   <li>Найти дифференциал du = g'(x)dx</li>
                   <li>Выразить dx через du и подставить в интеграл</li>
                   <li>Вычислить полученный интеграл по переменной u</li>
                   <li>Вернуться к исходной переменной x, подставив u = g(x)</li></ol>` },
        { num: 3, title: "Интегрирование по частям", data: INTEGRALS_DATA.section3,
          formulas: "📌 Формула: ∫u dv = uv - ∫v du. Выбор u: логарифм → обратная тригонометрия → степень → экспонента → тригонометрия (ЛИАТЭ).",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Интегрирование по частям</h4>
                   <p>Формула интегрирования по частям: ∫u·dv = u·v - ∫v·du</p>
                   <p><strong>Правило выбора u (ЛИАТЭ):</strong></p>
                   <ul><li><strong>Л</strong> — логарифмические (ln x, log x)</li>
                   <li><strong>И</strong> — обратные тригонометрические (arcsin, arctg)</li>
                   <li><strong>А</strong> — алгебраические (xⁿ, многочлены)</li>
                   <li><strong>Т</strong> — тригонометрические (sin, cos)</li>
                   <li><strong>Э</strong> — экспоненциальные (eˣ)</li></ul>` },
        { num: 4, title: "Квадратный трёхчлен", data: INTEGRALS_DATA.section4,
          formulas: "📌 Выделяем полный квадрат: ax²+bx+c = a[(x + b/(2a))² + (c/a - b²/(4a²))]",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Квадратный трёхчлен</h4>
                   <p>Метод выделения полного квадрата: ax²+bx+c = a[(x + b/(2a))² + (4ac-b²)/(4a²)]</p>
                   <p><strong>После выделения квадрата возможны 4 случая:</strong></p>
                   <ul><li><strong>∫dx/(t² + k²)</strong> → (1/k)·arctg(t/k) + C</li>
                   <li><strong>∫dx/(t² - k²)</strong> → (1/(2k))·ln|(t-k)/(t+k)| + C</li>
                   <li><strong>∫dx/√(t² + k²)</strong> → ln|t + √(t²+k²)| + C</li>
                   <li><strong>∫dx/√(k² - t²)</strong> → arcsin(t/k) + C</li></ul>` },
        { num: 5, title: "Линейный член + трёхчлен", data: INTEGRALS_DATA.section5,
          formulas: "📌 Метод: числитель представляем как A·(производная знаменателя) + B",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Линейный член + квадратный трёхчлен</h4>
                   <p>Для интегралов вида ∫(Mx+N)/(ax²+bx+c) dx или ∫(Mx+N)/√(ax²+bx+c) dx:</p>
                   <ol><li>Находим производную знаменателя: (ax²+bx+c)' = 2ax+b</li>
                   <li>Представляем Mx+N = A·(2ax+b) + B</li>
                   <li>Находим A и B, решая систему</li>
                   <li>Интеграл распадается на два: A·∫(2ax+b)/(...)dx + B·∫dx/(...)</li></ol>` },
        { num: 6, title: "Тип dx/(x√(...))", data: INTEGRALS_DATA.section6,
          formulas: "📌 Замена t = 1/x сводит к ∫dt/√(at²+bt+c)",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Интегралы вида ∫dx/(x·√(ax²+bx+c))</h4>
                   <ol><li>Выполняем замену t = 1/x → x = 1/t, dx = -dt/t²</li>
                   <li>Подкоренное выражение преобразуется к виду √(a + bt + ct²)/|t|</li>
                   <li>Интеграл сводится к ∫dt/√(c·t² + b·t + a)</li>
                   <li>Далее выделяем полный квадрат и используем табличные формулы</li></ol>` },
        { num: 7, title: "Дробно-рациональные", data: INTEGRALS_DATA.section7,
          formulas: "📌 Разложение на простейшие дроби: A/(x-a) + B/(x-b) + ... + (Cx+D)/(x²+px+q)",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Интегрирование рациональных дробей</h4>
                   <ol><li>Если степень числителя ≥ степени знаменателя → выделить целую часть (деление уголком)</li>
                   <li>Разложить знаменатель на множители</li>
                   <li>Представить дробь в виде суммы простейших дробей</li>
                   <li>Найти коэффициенты методом неопределённых коэффициентов</li>
                   <li>Проинтегрировать каждую простейшую дробь</li></ol>` },
        { num: 8, title: "Тригонометрические", data: INTEGRALS_DATA.section8,
          formulas: "📌 Основные приёмы: понижение степени, универсальная подстановка t = tg(x/2), замена t = tg x, использование формул произведения",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Тригонометрические интегралы</h4>
                   <ul><li><strong>Понижение степени:</strong> sin²x = (1-cos2x)/2, cos²x = (1+cos2x)/2</li>
                   <li><strong>Нечётная степень sin x:</strong> отщепляем один sin x, заменяем u=cos x</li>
                   <li><strong>Нечётная степень cos x:</strong> отщепляем один cos x, заменяем u=sin x</li>
                   <li><strong>Универсальная подстановка:</strong> t = tg(x/2), sin x = 2t/(1+t²), cos x = (1-t²)/(1+t²), dx = 2dt/(1+t²)</li></ul>` },
        { num: 9, title: "Тригонометрическая замена", data: INTEGRALS_DATA.section9,
          formulas: "📌 Замены: √(a²-x²) → x = a·sin t, √(a²+x²) → x = a·tg t, √(x²-a²) → x = a·sec t",
          theory: `<h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Тригонометрическая замена</h4>
                   <ul><li><strong>√(a² - x²)</strong> → x = a·sin t, dx = a·cos t dt, √(a²-x²) = a·cos t</li>
                   <li><strong>√(a² + x²)</strong> → x = a·tg t, dx = a·dt/cos²t, √(a²+x²) = a/cos t</li>
                   <li><strong>√(x² - a²)</strong> → x = a·sec t, dx = a·sec t·tg t dt, √(x²-a²) = a·tg t</li></ul>` }
    ];

    for (const section of sections) {
        if (!section.data || section.data.length === 0) continue;
        
        const solvedInSection = section.data.filter((_, idx) => integralsProgress[`s${section.num}_t${idx}`]).length;
        
        // КАРТОЧКА РАЗДЕЛА (СВОРАЧИВАЕМАЯ)
        html += `<div class="integrals-section" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.2); border-radius: 1rem; overflow: hidden;">
            <div class="integrals-section-header" style="background: rgba(0,20,40,0.6); padding: 0.8rem 1.2rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="toggleIntegralsSection(${section.num})">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="section-toggle" id="toggle-section-${section.num}" style="color:#0ff; font-size:1.2rem;">▶</span>
                    <span style="color:#0ff; font-weight:600;">${section.num}. ${section.title}</span>
                    <span style="color:#8ba0c5; font-size:0.8rem;">(${section.data.length} задач)</span>
                </div>
                <div style="font-size:0.8rem; color:#8ba0c5;">
                    ✅ <span id="section-${section.num}-counter">${solvedInSection}/${section.data.length}</span>
                </div>
            </div>
            <div class="section-content" id="section-${section.num}-content" style="display: none;">
                <div class="section-formulas" style="background: rgba(0,30,50,0.4); padding: 0.8rem 1.2rem; margin: 0.5rem 1rem; border-radius: 0.8rem; border-left: 3px solid #0ff;">
                    <span style="color:#ffb86b; font-size:0.85rem;">${section.formulas}</span>
                </div>
                <div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin: 0.5rem 1rem;">
                    ${section.theory}
                </div>
                <div class="section-tasks">`;
        
        for (let i = 0; i < section.data.length; i++) {
            const item = section.data[i];
            const key = `s${section.num}_t${i}`;
            const isChecked = integralsProgress[key] === true;
            
            html += `<div class="integral-card" style="margin: 0.5rem 1rem 0.5rem 1rem;">
                <div class="integral-header" style="display: flex; align-items: center; gap: 12px; padding: 0.8rem 1rem;">
                    <input type="checkbox" class="integral-checkbox" id="chk_${key}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleIntegralTask(${section.num}, ${i})" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0;">
                    <span style="color: #8ba0c5; font-size: 0.85rem; font-weight: 600; flex-shrink: 0;">${item.name.split(' ')[0]}</span>
                    <div style="flex: 1; text-align: center;" onclick="toggleIntegralSolution(this.parentElement.parentElement)">
                        <div class="integral-formula" style="font-size: 1.5rem;">$$ \\int ${item.integral} $$</div>
                    </div>
                </div>
                <div class="integral-solution" style="display:none; padding: 0.8rem 1rem 1rem 3rem;">
                    <div class="integral-solution-text" style="margin-bottom:12px;">
                        <strong>📖 Решение:</strong><br>
                        $$ \\text{${item.solution.replace(/[\\$]/g, '').replace(/\\/g, '\\\\')}} $$
                    </div>
                    <div class="integral-answer" style="margin-bottom:12px;">
                        <strong>Ответ:</strong> $$ \\int ${item.integral} = ${item.answer} $$
                    </div>
                    <div class="integral-practice">
                        <strong>✏️ Проверь себя:</strong> $$ \\int ${item.practice} = ? $$
                        <button class="check-btn" onclick="event.stopPropagation(); showIntegralAnswer(this, '${item.practiceAns}')">📋 Показать ответ</button>
                        <span class="practice-answer" style="display:none; margin-left:10px; color:#0f0;">✅ Ответ: $${item.practiceAns}$</span>
                    </div>
                </div>
            </div>`;
        }
        
        html += `</div></div></div>`;
    }
    
    // Сохраняем в кеш перед вставкой
    integralsHTMLCache = html;
    integralsRendered = true;

    container.innerHTML = html;
    updateIntegralsStats();
    setTimeout(() => { loadIntegralsSectionState(); }, 100);
    typesetMathJax([container]);
}

// ── Сброс кеша (вызывать при загрузке/сбросе прогресса) ──
function invalidateIntegralsCache() {
    integralsHTMLCache = null;
    integralsRendered = false;
    renderIntegrals();
}
window.invalidateIntegralsCache = invalidateIntegralsCache;

// ========== ТЕОРИЯ И МЕТОДЫ ВЫЧИСЛЕНИЯ ==========


// ========== СВОРАЧИВАНИЕ РАЗДЕЛОВ ИНТЕГРАЛОВ ==========
function toggleIntegralsSection(sectionNum) {
    const content = document.getElementById(`section-${sectionNum}-content`);
    const toggleBtn = document.getElementById(`toggle-section-${sectionNum}`);
    if (content && toggleBtn) {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggleBtn.innerHTML = '▼';
        } else {
            content.style.display = 'none';
            toggleBtn.innerHTML = '▶';
        }
        saveIntegralsSectionState();
    }
}

function toggleIntegralsAllSections() {
    const allContents = document.querySelectorAll('.section-content');
    const allBtns = document.querySelectorAll('.section-toggle');
    const anyExpanded = Array.from(allContents).some(c => c.style.display === 'block');
    
    allContents.forEach(content => {
        content.style.display = anyExpanded ? 'none' : 'block';
    });
    allBtns.forEach(btn => {
        btn.innerHTML = anyExpanded ? '▶' : '▼';
    });
    
    saveIntegralsSectionState();
    
    const btnText = document.querySelector('.btn-toggle-all');
    if (btnText) {
        btnText.innerHTML = anyExpanded ? '📂 Развернуть всё' : '📂 Свернуть всё';
    }
}


// Глобальные функции для onclick
window.toggleIntegralSolution = toggleIntegralSolution;
window.showIntegralAnswer = showIntegralAnswer;

// Добавляем стили для интегралов в CSS
const integralStyles = `
.integral-card { background: rgba(12,18,30,0.75); border:1px solid rgba(0,255,255,0.2); border-radius:1.5rem; margin-bottom:1rem; overflow:hidden; cursor:pointer; transition:all 0.2s; }
.integral-card:hover { border-color:#0ff; transform:translateY(-2px); }
.integral-header { padding:1rem 1.5rem; background:rgba(0,20,40,0.3); }
.integral-theme { color:#0ff; font-weight:600; margin-bottom:8px; }
.integral-formula { font-family:'Latin Modern Math', monospace; font-size:1.1rem; }
.integral-solution { padding:1rem 1.5rem; border-top:1px solid rgba(0,255,255,0.2); background:rgba(0,10,25,0.5); }
.integral-example, .integral-practice { margin:8px 0; }
.check-btn { background:#0ff2; border:1px solid #0ff; color:#0ff; padding:4px 12px; border-radius:20px; cursor:pointer; font-size:0.75rem; }
.check-btn:hover { background:#0ff; color:#010b1a; }
.practice-answer { font-size:0.9rem; }
`;

// Добавляем стили
const styleSheet = document.createElement("style");
styleSheet.textContent = integralStyles;
document.head.appendChild(styleSheet);
// Глобальные функции
window.advanceTicket = advanceTicket;
window.undoForTicket = undoForTicket;
window.undoLastAction = undoLastAction;
window.resetAll = resetAll;
window.saveProgressToFile = saveProgressToFile;
window.loadProgressFromFile = loadProgressFromFile;
window.showHistory = showHistory;
window.toggleSolution = toggleSolution;
window.toggleIntegralSolution = toggleIntegralSolution;
window.showIntegralAnswer = showIntegralAnswer;
window.toggleIntegralsSection = toggleIntegralsSection;
window.toggleIntegralsAllSections = toggleIntegralsAllSections;
window.resetAllIntegralsProgress = resetAllIntegralsProgress;
window.resetKrProgress = resetKrProgress;