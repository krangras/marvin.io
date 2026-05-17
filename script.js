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
            if (e.target.tagName !== 'BUTTON') {
                if (!loaded && CONSPECTS && CONSPECTS[idx]) {
                    cheatsheetDiv.innerHTML = CONSPECTS[idx];
                    loaded = true;
                    if (typeof MathJax !== 'undefined') {
                        MathJax.typesetPromise && MathJax.typesetPromise([cheatsheetDiv]);
                    }
                }
                if (cheatsheetDiv.style.display === 'block') {
                    cheatsheetDiv.style.display = 'none';
                } else {
                    cheatsheetDiv.style.display = 'block';
                    if (loaded && typeof MathJax !== 'undefined') {
                        MathJax.typesetPromise && MathJax.typesetPromise([cheatsheetDiv]);
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

// ========== СОХРАНЕНИЕ/ЗАГРУЗКА ФАЙЛА ==========
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
// ========== КОНТРОЛЬНАЯ РАБОТА ==========

function renderControlTasks() {
    const pane = document.getElementById('control-pane');
    if (!pane) return;
    pane.innerHTML = `<div class="info-banner">🧠 <strong>Метод неопределённых коэффициентов</strong> — для правой части спецвида. Метод вариации — универсальный. На контрольной работе, если к НЛДУ можно применить метод неопределенных коэффициентов, то его НУЖНО решать именно им!</div>
        
        <div class="task-card" onclick="toggleSolution(this)">
            <div class="task-header">
                <span class="task-title">📌 Задача 1</span>
                <span class="task-points">30 баллов</span>
            </div>
            <div class="task-content">
                <div class="task-demand"><strong>Условие задачи:</strong><br>Решить уравнение: $$ y'' + 4y = \\frac{8}{\\cos^2 x} $$</div>
                <div class="solution" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
                    <strong>Решение:</strong><br><br>
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
                </div>
            </div>
        </div>
        <div class="task-card" onclick="toggleSolution(this)">
            <div class="task-header">
                <span class="task-title">📌 Задача 2</span>
                <span class="task-points">30 баллов</span>
            </div>
            <div class="task-content">
                <div class="task-demand"><strong>Условие задачи:</strong><br>Решить уравнение: $$ y'' - 3y' + 2y = 52 \\cos 3x $$</div>
                <div class="solution" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
                    <strong>Решение:</strong><br><br>
                    Соответствующее ОЛДУ:
                    $$ \\lambda^2 - 3 \\lambda + 2 = 0 $$
                    $$ \\mathcal{D} = 9 - 8 = 1 \\implies \\lambda_{1,2} = \\frac{3 \\pm 1}{2} \\implies \\lambda_1 = 1, \\ \\lambda_2 = 2 $$
                    ФСР: $$ e^x \\text{, } e^{2x} $$
                    $$ y_{о.о.} = C_1 e^x + C_2 e^{2x} $$
                    <br>Возвращаемся к НЛДУ (Метод неопределенных коэффициентов):
                    $$ F(x) = 52 \\cos 3x = e^{0 \\cdot x} \\cdot (52 \\cos 3x + 0 \\cdot \\sin 3x) $$
                    $$ \\alpha = 0, \\ \\beta = 3, \\ P(x) = 52, \\ Q(x) = 0 \\implies \\alpha + \\beta i = 3i \\implies S = 0 $$
                   $$ \\operatorname{deg}(R) = \\operatorname{deg}(T) = \\max (\\operatorname{deg}(\\overset{=0}{P}), \\operatorname{deg}(\\overset{=-\\infty}{Q})) = 0 \\implies R(x) = A, \\ T(x) = B $$
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
                    $$ -130B = 468 \\implies B = -\\frac{18}{5} \\implies A = \\frac{468 + 81 \\cdot \\left( -\\frac{18}{5} \\right)}{-63} = -\\frac{14}{5} $$
                    $$ y_{ч.н.} = -\\frac{14}{5} \\cos 3x - \\frac{18}{5} \\sin 3x $$
                    <br><strong>Ответ:</strong>
                    $$ y_{о.н.} = C_1 e^x + C_2 e^{2x} - \\frac{1}{5}(14\\cos 3x + 18\\sin 3x) $$
                </div>
            </div>
        </div>

        <div class="task-card" onclick="toggleSolution(this)">
    <div class="task-header">
        <span class="task-title">🎯 Задача 3</span>
        <span class="task-points">40 баллов</span>
    </div>
    <div class="task-content">
        <div class="task-demand"><strong>Условие задачи:</strong><br>Решить задачу Коши: $$ y'' + 2y' + y = 3e^{-x}\\sqrt{x+1}; \\quad y(0) = \\frac{4}{5}; \\quad y'(0) = 2 $$</div>
            <div class="solution" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
                <strong>Решение:</strong><br><br>
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
            </div>
        </div>
    </div>

        <div class="task-card" onclick="toggleSolution(this)">
    <div class="task-header">
        <span class="task-title">🎯 Задача 4</span>
        <span class="task-points">40 баллов</span>
    </div>
    <div class="task-content">
        <div class="task-demand"><strong>Условие задачи:</strong><br>Решить задачу Коши: $$ y'' - 2y' + 2y = 4e^x\\cos x; \\quad y(\\pi) = \\pi e^\\pi; \\quad y'(\\pi) = e^\\pi $$</div>
        <div class="solution" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
            <strong>Решение:</strong><br><br>
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
        </div>
    </div>
</div>
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
                if (examPane) examPane.classList.add('active-pane');
                if (controlPane) controlPane.classList.remove('active-pane');
                render();
            } else {
                if (controlPane) controlPane.classList.add('active-pane');
                if (examPane) examPane.classList.remove('active-pane');
                if (typeof MathJax !== 'undefined') MathJax.typesetPromise?.();
            }
        });
    });
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initState();
    renderControlTasks();
    initTabs();
    render();
    setInterval(updatePace, 60000);
});

// Глобальные функции
window.advanceTicket = advanceTicket;
window.undoForTicket = undoForTicket;
window.undoLastAction = undoLastAction;
window.resetAll = resetAll;
window.saveProgressToFile = saveProgressToFile;
window.loadProgressFromFile = loadProgressFromFile;
window.showHistory = showHistory;
window.toggleSolution = toggleSolution;