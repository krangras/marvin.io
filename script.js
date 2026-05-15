// ========== ДАННЫЕ БИЛЕТОВ (17 ШТУК) ==========
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
    { t: "Теорема о существовании и единственности задачи Коши для ДУ-I." },
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

function saveToLocalStorage() {
    localStorage.setItem('exam_manager_v9', JSON.stringify(state));
}

function initState() {
    const saved = localStorage.getItem('exam_manager_v9');
    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length === ticketsData.length) {
            state = parsed;
        } else {
            state = ticketsData.map((item, idx) => {
                const existing = parsed?.find(p => p.id === idx);
                return existing ? { ...existing, name: item.t } : { id: idx, name: item.t, step: 0, nextReview: null, history: [] };
            });
        }
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
    document.getElementById('rank-icon').innerHTML = cur.icon;
    document.getElementById('rank-title').innerHTML = cur.title;
    document.getElementById('rank-sub').innerHTML = cur.subtitle;
    const maxScore = ticketsData.length * 5;
    document.getElementById('rank-progress-fill').style.width = `${(score / maxScore) * 100}%`;
    document.getElementById('rank-stats').innerHTML = `${score}/${maxScore} очков`;
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
        render();
        return;
    }

    const next = new Date(now);
    next.setDate(now.getDate() + intervals[item.step]);
    lastAction = { id, type: 'advance', oldStep: item.step };
    item.step++;
    item.nextReview = next.getTime();
    saveToLocalStorage();
    render();
}

function undoForTicket(id) {
    const item = state[id];
    if (item.step <= 0) return;
    if (item.history && item.history.length > 0) item.history.pop();
    item.step--;
    item.nextReview = item.step === 0 ? null : Date.now() - 86400000;
    saveToLocalStorage();
    render();
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

function render() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const container = document.getElementById('list');
    if (!container) return;
    
    // Сохраняем позицию скролла и открытые билеты
    const scrollPosition = window.scrollY;
    const openTickets = new Set();
    
    const oldSheets = document.querySelectorAll('.cheatsheet');
    oldSheets.forEach((sheet, idx) => {
        if (sheet.style.display === 'block') {
            openTickets.add(idx);
        }
    });
    
    container.innerHTML = '';
    let readyCount = 0;
    const newSheets = [];
    
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
            <div class="cheatsheet">${CONSPECTS[idx] || "📖 Конспект временно отсутствует"}</div>
        `;
        
        div.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON') {
                const sheet = div.querySelector('.cheatsheet');
                if (sheet) {
                    if (sheet.style.display === 'block') {
                        sheet.style.display = 'none';
                    } else {
                        sheet.style.display = 'block';
                        if (typeof MathJax !== 'undefined') {
                            MathJax.typesetPromise && MathJax.typesetPromise([sheet]);
                        }
                    }
                }
            }
        };
        
        container.appendChild(div);
        newSheets.push(div.querySelector('.cheatsheet'));
    });
    
    // Восстанавливаем открытые билеты
    newSheets.forEach((sheet, idx) => {
        if (sheet && openTickets.has(idx)) {
            sheet.style.display = 'block';
        }
    });
    
    document.getElementById('count-ready') && (document.getElementById('count-ready').innerText = readyCount);
    document.getElementById('today-date') && (document.getElementById('today-date').innerText = now.toLocaleDateString('ru-RU'));
    updatePace();
    updateRankUI();
    
    // Восстанавливаем позицию скролла
    setTimeout(() => {
        window.scrollTo(0, scrollPosition);
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

    let paceText = `✅${mastered} 🔄${learning} ⏳${notStarted}`;
    
    if (notStarted > 0 && daysLeft > 0) {
        const daysPerTicket = daysLeft / notStarted;
        paceText += ` | 📌 ${daysPerTicket.toFixed(3)} дня на 1 билет`;
    }
    
    const paceEl = document.getElementById('pace-info');
    if (paceEl) paceEl.innerHTML = paceText;
}

function saveProgressToFile() {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `exam_backup_${new Date().toISOString().slice(0,19)}.json`;
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
                if (loaded && loaded.length === state.length) {
                    state = loaded;
                    saveToLocalStorage();
                    render();
                    alert("✅ Прогресс загружен!");
                } else alert("❌ Неверное количество билетов");
            } catch(err) { alert("Ошибка загрузки"); }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}

function renderControlTasks() {
    const pane = document.getElementById('control-pane');
    pane.innerHTML = `
        <div class="info-banner">🧠 <strong>Метод неопределённых коэффициентов</strong> — для правой части спецвида. Метод вариации — универсальный.</div>
        <div class="task-card" onclick="toggleSolution(this)">
            <div class="task-header"><span class="task-title">📌 Задача 1. Метод вариации</span><span class="task-points">30 баллов</span></div>
            <div class="task-content"><div class="task-equation">$$ y'' + 4y = \\frac{8}{\\cos 2x} $$</div>
            <div class="solution"><h4>Решение</h4><div class="math">$$ y = (C_1+2\\ln|\\cos 2x|)\\cos 2x + (C_2+4x)\\sin 2x $$</div></div></div></div>
        <div class="task-card" onclick="toggleSolution(this)">
            <div class="task-header"><span class="task-title">📌 Задача 2. Метод неопределённых коэффициентов</span><span class="task-points">30 баллов</span></div>
            <div class="task-content"><div class="task-equation">$$ y'' - 3y' + 2y = 52\\cos 3x $$</div>
            <div class="solution"><h4>Решение</h4><div class="math">$$ y = C_1e^x + C_2e^{2x} - \\frac{14}{5}\\cos 3x - \\frac{18}{5}\\sin 3x $$</div></div></div></div>
        <div class="task-card" onclick="toggleSolution(this)">
            <div class="task-header"><span class="task-title">🎯 Задача Коши №1</span><span class="task-points">40 баллов</span></div>
            <div class="task-content"><div class="task-equation">$$ y'' + 2y' + y = 3e^{-x}\\sqrt{x+1},\\quad y(0)=\\frac{4}{5},\\; y'(0)=2 $$</div>
            <div class="solution"><h4>Решение</h4><div class="math">$$ y = \\frac{4}{5}e^{-x}(x + (x+1)^{5/2}) $$</div></div></div></div>
        <div class="task-card" onclick="toggleSolution(this)">
            <div class="task-header"><span class="task-title">🎯 Задача Коши №2</span><span class="task-points">40 баллов</span></div>
            <div class="task-content"><div class="task-equation">$$ y'' - 2y' + 2y = 4e^{x}\\cos x,\\quad y(\\pi)=\\pi e^{\\pi},\\; y'(\\pi)=e^{\\pi} $$</div>
            <div class="solution"><h4>Решение</h4><div class="math">$$ y = e^{x}((2x - \\pi - 1)\\sin x - \\pi\\cos x) $$</div></div></div></div>
    `;
}

function toggleSolution(card) {
    const sol = card.querySelector('.solution');
    if (sol) sol.style.display = sol.style.display === 'block' ? 'none' : 'block';
}

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const examPane = document.getElementById('exam-pane');
            const controlPane = document.getElementById('control-pane');
            if (btn.dataset.tab === 'exam') {
                examPane.classList.add('active-pane');
                controlPane.classList.remove('active-pane');
                render();
            } else {
                controlPane.classList.add('active-pane');
                examPane.classList.remove('active-pane');
                MathJax.typesetPromise?.();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initState();
    renderControlTasks();
    initTabs();
    render();
    setInterval(updatePace, 60000);
});

window.advanceTicket = advanceTicket;
window.undoForTicket = undoForTicket;
window.undoLastAction = undoLastAction;
window.resetAll = resetAll;
window.saveProgressToFile = saveProgressToFile;
window.loadProgressFromFile = loadProgressFromFile;
window.showHistory = showHistory;
window.toggleSolution = toggleSolution;