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

// ========== СОХРАНЕНИЕ/ЗАГРУЗКА ФАЙЛА ==========
function saveProgressToFile() {
    // Сохраняем прогресс билетов
    const ticketsProgress = state.map(({ id, step, nextReview, history }) => ({
        id, step, nextReview, history
    }));
    
    // Сохраняем прогресс интегралов
    const integralsProgressData = integralsProgress || {};
    
    // Объединяем в один объект
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
                            renderIntegrals();
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
        renderIntegrals();
        alert("✅ Прогресс интегралов сброшен!");
    }
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
                    $$ C_1 = -8 \\int \\frac{\\sin x}{\\cos x} dx = \\\left[ \\begin{smallmatrix} \\cos x = t \\\\ dt = -\\sin x dx \\\\ -dt = \\sin x dx \\end{smallmatrix} \\right] = 8 \\int \\frac{dt}{t} = 8 \\ln|t| + D_1 = 8 \\ln|\\cos x| + D_1 $$
                    $$ C_2 = \\int \\\left( 8 - \\frac{4}{\\cos^2 x} \\right) dx = 8x - 4 \\operatorname{tg} x + D_2 $$
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
                    $$ -130B = 468 \\implies B = -\\frac{18}{5} \\implies A = \\frac{468 + 81 \\cdot \\\left( -\\frac{18}{5} \\right)}{-63} = -\\frac{14}{5} $$
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
                $$ y_{о.н.} = \\\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}} + D_1\\right) e^{-x} + \\\left(2(x+1)^{\\frac{3}{2}} + D_2\\right)x e^{-x} $$
                <br>Подставляем начальные условия задачи Коши:
                $$ y(0) = \\frac{4}{5} \\implies \\\left(-\\frac{6}{5} + 2 + D_1\\right) = \\frac{4}{5} \\implies D_1 = 0 $$
                <br>Находим $y'_{о.н.}$:
                $$ y'_{о.н.} = \\\left(-3(x+1)^{\\frac{3}{2}} + 3(x+1)^{\\frac{1}{2}}\\right)e^{-x} - \\\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}}\\right)e^{-x} + \\\left(3x(x+1)^{\\frac{1}{2}} + 2(x+1)^{\\frac{3}{2}} + D_2\\right)e^{-x} - \\\left(2(x+1)^{\\frac{3}{2}} + D_2\\right)xe^{-x} $$
                $$ y'(0) = 2 \\implies ( -3 + 3 ) - \\\left( -\\frac{6}{5} + 2 \\right) + (0 + 2 + D_2) = 2 \\implies -\\frac{4}{5} + 2 + D_2 = 2 \\implies D_2 = \\frac{4}{5} $$
                <br>Собираем функцию и упрощаем:
                $$ y = \\\left(-\\frac{6}{5}(x+1)^{\\frac{5}{2}} + 2(x+1)^{\\frac{3}{2}}\\right) e^{-x} + \\\left(2(x+1)^{\\frac{3}{2}} + \\frac{4}{5}\\right)x e^{-x} = \\frac{4}{5}e^{-x}\\\left(x + (x+1)^{\\frac{5}{2}}\\right) $$
                <br><strong>Ответ:</strong>
                $$ y = \\frac{4}{5}e^{-x}\\\left(x + (x+1)^{\\frac{5}{2}}\\right) $$
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

        btn.addEventListener('click', async () => {

            // переключение активной кнопки
            document.querySelectorAll('.tab-btn')
                .forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            // панели
            const examPane = document.getElementById('exam-pane');
            const controlPane = document.getElementById('control-pane');
            const integralsPane = document.getElementById('integrals-pane');

            // скрываем всё
            examPane?.classList.remove('active-pane');
            controlPane?.classList.remove('active-pane');
            integralsPane?.classList.remove('active-pane');

            // ========= ЭКЗАМЕН =========
            if (btn.dataset.tab === 'exam') {

                examPane?.classList.add('active-pane');

                render();

                // ждём рендер DOM
                await new Promise(resolve => setTimeout(resolve, 30));

                // MathJax
                if (window.MathJax) {
                    MathJax.typesetClear([examPane]);

                    MathJax.typesetPromise([examPane])
                        .then(() => {
                            console.log('MathJax exam rendered');
                        })
                        .catch(err => {
                            console.error('MathJax exam error:', err);
                        });
                }
            }

            // ========= КОНТРОЛЬНАЯ =========
            else if (btn.dataset.tab === 'control') {

                controlPane?.classList.add('active-pane');

                // ждём DOM
                await new Promise(resolve => setTimeout(resolve, 30));

                if (window.MathJax) {
                    MathJax.typesetClear([controlPane]);

                    MathJax.typesetPromise([controlPane])
                        .then(() => {
                            console.log('MathJax control rendered');
                        })
                        .catch(err => {
                            console.error('MathJax control error:', err);
                        });
                }
            }

            // ========= ИНТЕГРАЛЫ =========
            else if (btn.dataset.tab === 'integrals') {

                integralsPane?.classList.add('active-pane');

                renderIntegrals();

                // ждём пока вставится HTML
                await new Promise(resolve => setTimeout(resolve, 50));

                if (window.MathJax) {

                    // очищаем старый рендер
                    MathJax.typesetClear([integralsPane]);

                    // рендерим только вкладку интегралов
                    MathJax.typesetPromise([integralsPane])
                        .then(() => {
                            console.log('MathJax integrals rendered');
                        })
                        .catch(err => {
                            console.error('MathJax integrals error:', err);
                        });
                }
            }
        });
    });
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initState();
    renderControlTasks();
    renderIntegrals();  // ← добавить эту строку
    initTabs();
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

// ========== ТАБЛИЦА ИНТЕГРАЛОВ С ЧЕКБОКСАМИ, СВОРАЧИВАНИЕМ И ПРОГРЕССОМ ==========
let integralsProgress = JSON.parse(localStorage.getItem('integrals_progress')) || {};

function saveIntegralsProgress() {
    localStorage.setItem('integrals_progress', JSON.stringify(integralsProgress));
    updateIntegralsStats();
}

function toggleIntegralsSection(sectionNum) {
    const content = document.getElementById(`section-${sectionNum}-content`);
    const btn = document.getElementById(`toggle-section-${sectionNum}`);
    if (content && btn) {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            btn.innerHTML = '▼';
        } else {
            content.style.display = 'none';
            btn.innerHTML = '▶';
        }
    }
}

function toggleIntegralsAllSections() {
    const allContents = document.querySelectorAll('.section-content');
    const allBtns = document.querySelectorAll('.section-toggle');
    const anyVisible = Array.from(allContents).some(c => c.style.display !== 'none');
    
    allContents.forEach(content => {
        content.style.display = anyVisible ? 'none' : 'block';
    });
    allBtns.forEach(btn => {
        btn.innerHTML = anyVisible ? '▶' : '▼';
    });
}

function toggleIntegralTask(sectionNum, taskIdx) {
    const key = `s${sectionNum}_t${taskIdx}`;
    if (integralsProgress[key]) {
        delete integralsProgress[key];
    } else {
        integralsProgress[key] = true;
    }
    saveIntegralsProgress();
    
    // Обновляем стиль чекбокса
    const checkbox = document.getElementById(`chk_${key}`);
    if (checkbox) checkbox.checked = integralsProgress[key] === true;
}

function getSolvedCount() {
    return Object.keys(integralsProgress).length;
}

function getTotalTasksCount() {
    let total = 0;
    for (let i = 1; i <= 9; i++) {
        total += INTEGRALS_DATA[`section${i}`]?.length || 0;
    }
    return total;
}

function updateIntegralsStats() {
    const solved = getSolvedCount();
    const total = getTotalTasksCount();
    const percent = total > 0 ? (solved / total * 100).toFixed(1) : 0;
    
    // Прогресс-бар
    const progressFill = document.getElementById('integrals-progress-fill');
    const solvedSpan = document.getElementById('integrals-solved');
    const totalSpan = document.getElementById('integrals-total');
    const percentSpan = document.getElementById('integrals-percent');
    
    if (progressFill) progressFill.style.width = `${(solved / total) * 100}%`;
    if (solvedSpan) solvedSpan.innerText = solved;
    if (totalSpan) totalSpan.innerText = total;
    if (percentSpan) percentSpan.innerText = percent;
    
    // Темп до 22 мая 2026
    const examDate = new Date(2026, 4, 22); // 22 мая 2026 (месяц 4 = май!)
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;
    
    const remaining = total - solved;
    const perDay = remaining / daysLeft;
    
    const paceSpan = document.getElementById('integrals-pace');
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
function showIntegralAnswer(btn, answer) {
    const answerSpan = btn.nextElementSibling;
    if (answerSpan) {
        answerSpan.style.display = 'inline';
        // Обновляем формулы в ответе
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([answerSpan]).catch(err => console.log('MathJax error:', err));
        } else if (typeof MathJax !== 'undefined' && MathJax.typeset) {
            MathJax.typeset([answerSpan]);
        }
        setTimeout(() => { answerSpan.style.display = 'none'; }, 4000);
    }
}
function renderIntegrals() {
    const container = document.getElementById('integrals-list');
    if (!container) return;
    
    const sections = [
        { num: 1, title: "Интегрирование по таблице", data: INTEGRALS_DATA.section1 },
        { num: 2, title: "Замена переменной", data: INTEGRALS_DATA.section2 },
        { num: 3, title: "Интегрирование по частям", data: INTEGRALS_DATA.section3 },
        { num: 4, title: "Квадратный трёхчлен", data: INTEGRALS_DATA.section4 },
        { num: 5, title: "Линейный член + трёхчлен", data: INTEGRALS_DATA.section5 },
        { num: 6, title: "Тип dx/(x√(...))", data: INTEGRALS_DATA.section6 },
        { num: 7, title: "Дробно-рациональные", data: INTEGRALS_DATA.section7 },
        { num: 8, title: "Тригонометрические", data: INTEGRALS_DATA.section8 },
        { num: 9, title: "Тригонометрическая замена", data: INTEGRALS_DATA.section9 }
    ];
    
    let totalTasks = 0;
    for (const section of sections) {
        totalTasks += section.data?.length || 0;
    }
    
    let solved = getSolvedCount();
    
    let html = `
        <div class="info-banner">
            📖 <strong>Таблица интегралов</strong> — ${totalTasks} задач
        </div>
        
        <div class="integrals-stats-panel" style="background: rgba(0,20,40,0.5); border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <span style="color:#0ff;">📊 Прогресс:</span>
                    <span id="integrals-solved">${solved}</span> / <span id="integrals-total">${totalTasks}</span>
                    (<span id="integrals-percent">0</span>%)
                </div>
                <div>
                    <span style="color:#0ff;">🎯 Темп до 22 мая:</span>
                    <span id="integrals-pace">загрузка...</span>
                </div>
                <button class="btn-toggle-all" onclick="toggleIntegralsAllSections()" style="background:#0ff2; border:1px solid #0ff; color:#0ff; padding:4px 12px; border-radius:20px; cursor:pointer;">📂 Свернуть/развернуть всё</button>
            </div>
            <div class="progress-bar" style="margin-top: 12px;">
                <div class="progress-fill" id="integrals-progress-fill" style="width: ${(solved / totalTasks) * 100}%;"></div>
            </div>
        </div>
    `;
    
    for (const section of sections) {
        if (!section.data || section.data.length === 0) continue;
        
        html += `<div class="integrals-section" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.15); border-radius: 1rem; overflow: hidden;">
            <div class="integrals-section-header" style="background: rgba(0,20,40,0.5); padding: 0.8rem 1.2rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="toggleIntegralsSection(${section.num})">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="section-toggle" id="toggle-section-${section.num}" style="color:#0ff; font-size:1.2rem;">▼</span>
                    <span style="color:#0ff; font-weight:600;">${section.num}. ${section.title}</span>
                    <span style="color:#8ba0c5; font-size:0.8rem;">(${section.data.length} задач)</span>
                </div>
                <div style="font-size:0.8rem; color:#8ba0c5;">
                    ✅ ${section.data.filter((_, idx) => integralsProgress[`s${section.num}_t${idx}`]).length} / ${section.data.length}
                </div>
            </div>
            <div class="section-content" id="section-${section.num}-content" style="display: block;">`;
        
        for (let i = 0; i < section.data.length; i++) {
            const item = section.data[i];
            const key = `s${section.num}_t${i}`;
            const isChecked = integralsProgress[key] === true;
            
            html += `<div class="integral-card" style="margin: 0.5rem 1rem 0.5rem 1rem;">
                <div class="integral-header" style="display: flex; align-items: flex-start; gap: 12px; padding: 0.8rem 1rem;">
                    <input type="checkbox" class="integral-checkbox" id="chk_${key}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleIntegralTask(${section.num}, ${i})" style="margin-top: 4px; width: 18px; height: 18px; cursor: pointer;">
                    <div style="flex: 1;" onclick="toggleIntegralSolution(this.parentElement.parentElement)">
                        <div class="integral-theme" style="color: ${isChecked ? '#0f0' : '#0ff'};">📌 ${item.name}</div>
                        <div class="integral-formula">$$ \\int ${item.integral} = ${item.answer} $$</div>
                    </div>
                </div>
                <div class="integral-solution" style="display:none; padding: 0.8rem 1rem 1rem 3rem;">
                    <div class="integral-solution-text"><strong>📖 Решение:</strong><br>${item.solution}</div>
                    <div class="integral-practice" style="margin-top: 12px;">
                        <strong>✏️ Проверь себя:</strong> $$ \\int ${item.practice} = ? $$
                        <button class="check-btn" onclick="event.stopPropagation(); showIntegralAnswer(this, '${item.practiceAns}')">📋 Показать ответ</button>
                        <span class="practice-answer" style="display:none; margin-left:10px; color:#0f0;">✅ Ответ: $${item.practiceAns}$</span>
                    </div>
                </div>
            </div>`;
        }
        
        html += `</div></div>`;
    }
    
    container.innerHTML = html;
    updateIntegralsStats();
    
    // Исправленный вызов MathJax — с проверкой на загрузку
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(err => console.log('MathJax error:', err));
    } else if (typeof MathJax !== 'undefined' && MathJax.typeset) {
        MathJax.typeset();
    } else {
        console.log('MathJax не загружен, формулы могут не отображаться');
        // Повторная попытка через 500 мс
        setTimeout(() => {
            if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                MathJax.typesetPromise().catch(err => console.log('MathJax error:', err));
            }
        }, 500);
    }
}

function toggleIntegralSolution(card) {
    const solution = card.querySelector('.integral-solution');
    if (solution) {
        if (solution.style.display === 'none' || solution.style.display === '') {
            solution.style.display = 'block';
            // При открытии решения обновляем формулы внутри него
            if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                MathJax.typesetPromise([solution]).catch(err => console.log('MathJax error:', err));
            } else if (typeof MathJax !== 'undefined' && MathJax.typeset) {
                MathJax.typeset([solution]);
            }
        } else {
            solution.style.display = 'none';
        }
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
