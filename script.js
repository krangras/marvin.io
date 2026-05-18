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

function resetKrProgress() {
    if (confirm("Сбросить весь прогресс контрольной работы?")) {
        krProgress = {};
        saveKrProgress();
        renderControlTasks();
        alert("✅ Прогресс КР сброшен!");
    }
}

function updateKrStats() {
    const total = 4;
    const solved = Object.keys(krProgress).length;
    const statsDiv = document.getElementById('control-stats');
    if (statsDiv) {
        statsDiv.innerHTML = `📊 Прогресс КР: ✅ ${solved}/${total} задач решено | 🎯 ${((solved/total)*100).toFixed(1)}% &nbsp; <button onclick="resetKrProgress()" style="background:#f442; border:1px solid #f44; color:#f44; padding:2px 10px; border-radius:12px; cursor:pointer; font-size:0.75rem;">🗑 Сбросить</button>`;
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

function renderControlTasks() {
    const pane = document.getElementById('control-pane');
    if (!pane) return;
    
    pane.innerHTML = `
        <div id="control-stats" class="info-banner" style="margin-bottom: 1rem;">📊 Прогресс: загрузка...</div>
        
        <!-- Задача 1: МЕТОД ВАРИАЦИИ -->
        <div class="control-class" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.2); border-radius: 1.5rem; overflow: hidden;">
            <div class="control-class-header" style="background: rgba(0,30,50,0.5); padding: 1rem 1.5rem;">
                <h3 style="color:#0ff; margin:0;">🎯 Задача 1: Метод вариации произвольных постоянных</h3>
                <p style="margin:8px 0 0 0; font-size:0.85rem; color:#8ba0c5;">📌 <strong>Когда применяется:</strong> для любых ЛДУ, особенно когда метод неопределённых коэффициентов неприменим (правая часть не спецвида). Алгоритм: решаем однородное → варьируем постоянные → решаем систему → интегрируем.</p>
            </div>
            <div class="control-class-content" style="padding: 0.5rem 1.5rem 1.5rem;">
                <div class="task-card" data-task-id="1">
                    <div class="task-header" onclick="toggleSolution(this.parentElement)">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="kr_chk_1" ${krProgress[1] ? 'checked' : ''} onclick="event.stopPropagation(); toggleKrTask(1)" style="width: 18px; height: 18px; cursor: pointer;">
                            <span class="task-title" id="kr_title_1" style="${krProgress[1] ? 'text-decoration: line-through; opacity: 0.7;' : ''}">📌 Задача 1 (метод вариации)</span>
                        </div>
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
            </div>
        </div>
        
        <!-- Задача 2: МЕТОД НЕОПРЕДЕЛЁННЫХ КОЭФФИЦИЕНТОВ -->
        <div class="control-class" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.2); border-radius: 1.5rem; overflow: hidden;">
            <div class="control-class-header" style="background: rgba(0,30,50,0.5); padding: 1rem 1.5rem;">
                <h3 style="color:#0ff; margin:0;">🎯 Задача 2: Метод неопределённых коэффициентов</h3>
                <p style="margin:8px 0 0 0; font-size:0.85rem; color:#8ba0c5;">📌 <strong>Когда применяется:</strong> правая часть спецвида: e^{αx}(P_n(x)cosβx + Q_m(x)sinβx). Алгоритм: по правой части определяем вид частного решения, подставляем в уравнение, находим коэффициенты.</p>
            </div>
            <div class="control-class-content" style="padding: 0.5rem 1.5rem 1.5rem;">
                <div class="task-card" data-task-id="2">
                    <div class="task-header" onclick="toggleSolution(this.parentElement)">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="kr_chk_2" ${krProgress[2] ? 'checked' : ''} onclick="event.stopPropagation(); toggleKrTask(2)" style="width: 18px; height: 18px; cursor: pointer;">
                            <span class="task-title" id="kr_title_2" style="${krProgress[2] ? 'text-decoration: line-through; opacity: 0.7;' : ''}">📌 Задача 2 (метод НК)</span>
                        </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Задача 3: ЗАДАЧИ КОШИ -->
        <div class="control-class" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.2); border-radius: 1.5rem; overflow: hidden;">
            <div class="control-class-header" style="background: rgba(0,30,50,0.5); padding: 1rem 1.5rem;">
                <h3 style="color:#0ff; margin:0;">🎯 Задача 3: Задачи Коши</h3>
                <p style="margin:8px 0 0 0; font-size:0.85rem; color:#8ba0c5;">📌 <strong>Алгоритм:</strong> находим общее решение НЛДУ → подставляем начальные условия → находим константы → записываем частное решение.</p>
            </div>
            <div class="control-class-content" style="padding: 0.5rem 1.5rem 1.5rem;">
                <div class="task-card" data-task-id="3">
                    <div class="task-header" onclick="toggleSolution(this.parentElement)">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="kr_chk_3" ${krProgress[3] ? 'checked' : ''} onclick="event.stopPropagation(); toggleKrTask(3)" style="width: 18px; height: 18px; cursor: pointer;">
                            <span class="task-title" id="kr_title_3" style="${krProgress[3] ? 'text-decoration: line-through; opacity: 0.7;' : ''}">🎯 Задача 3 (Коши, метод вариации)</span>
                        </div>
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
                
                <div class="task-card" data-task-id="4">
                    <div class="task-header" onclick="toggleSolution(this.parentElement)">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="kr_chk_4" ${krProgress[4] ? 'checked' : ''} onclick="event.stopPropagation(); toggleKrTask(4)" style="width: 18px; height: 18px; cursor: pointer;">
                            <span class="task-title" id="kr_title_4" style="${krProgress[4] ? 'text-decoration: line-through; opacity: 0.7;' : ''}">🎯 Задача 4 (Коши, метод НК)</span>
                        </div>
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
            </div>
        </div>
    `;
    
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
    
    if (progressFill) progressFill.style.width = `${(solved / total) * 100}%`;
    if (solvedSpan) solvedSpan.innerText = solved;
    if (totalSpan) totalSpan.innerText = total;
    if (percentSpan) percentSpan.innerText = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;
    
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
    
    // Обновляем цвет заголовка задачи
    const themeDiv = document.getElementById(`task-theme-${key}`);
    if (themeDiv) {
        if (integralsProgress[key]) {
            themeDiv.style.color = '#0f0';
            themeDiv.style.textDecoration = 'line-through';
        } else {
            themeDiv.style.color = '#0ff';
            themeDiv.style.textDecoration = 'none';
        }
    }
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
    
    const sections = [
        { 
            num: 1, 
            title: "Интегрирование по таблице", 
            data: INTEGRALS_DATA.section1,
            formulas: "📌 Основные формулы: ∫xⁿdx = xⁿ⁺¹/(n+1) + C (n≠-1), ∫dx/x = ln|x| + C, ∫eˣdx = eˣ + C, ∫aˣdx = aˣ/lna + C, ∫sin x dx = -cos x + C, ∫cos x dx = sin x + C, ∫dx/cos²x = tg x + C, ∫dx/sin²x = -ctg x + C, ∫dx/√(a²-x²) = arcsin(x/a) + C, ∫dx/(x²+a²) = (1/a)arctg(x/a) + C, ∫dx/(x²-a²) = (1/(2a))ln|(x-a)/(x+a)| + C",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Табличное интегрирование</h4>
    <p style="margin:0; font-size:0.85rem;">Интегрирование по таблице — прямое применение формул из таблицы интегралов. Для этого нужно:</p>
    <ul style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li>Вынести константу за знак интеграла: ∫k·f(x)dx = k·∫f(x)dx</li>
        <li>Разбить сумму на отдельные интегралы: ∫[f(x)+g(x)]dx = ∫f(x)dx + ∫g(x)dx</li>
        <li>Привести подынтегральное выражение к табличному виду (преобразовать степени, раскрыть скобки)</li>
    </ul>
</div>`
        },
        { 
            num: 2, 
            title: "Замена переменной", 
            data: INTEGRALS_DATA.section2,
            formulas: "📌 Метод: ∫f(g(x))·g'(x)dx = ∫f(u)du, u=g(x). Подстановки: t = ax+b (линейная), t = √(ax+b) (иррациональность), t = ln x, t = eˣ, t = tg(x/2) (универсальная).",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Замена переменной</h4>
    <p style="margin:0; font-size:0.85rem;">Метод замены переменной (подстановки) — один из основных методов интегрирования. Алгоритм:</p>
    <ol style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li>Выбрать новую переменную u = g(x) так, чтобы подынтегральное выражение упростилось</li>
        <li>Найти дифференциал du = g'(x)dx</li>
        <li>Выразить dx через du и подставить в интеграл</li>
        <li>Вычислить полученный интеграл по переменной u</li>
        <li>Вернуться к исходной переменной x, подставив u = g(x)</li>
    </ol>
    <p style="margin:8px 0 0 0; font-size:0.85rem;">⭐ <strong>Важно:</strong> Часто используется подведение под знак дифференциала: ∫f(ax+b)dx = (1/a)F(ax+b) + C</p>
</div>`
        },
        { 
            num: 3, 
            title: "Интегрирование по частям", 
            data: INTEGRALS_DATA.section3,
            formulas: "📌 Формула: ∫u dv = uv - ∫v du. Выбор u: логарифм → обратная тригонометрия → степень → экспонента → тригонометрия (ЛИАТЭ).",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Интегрирование по частям</h4>
    <p style="margin:0; font-size:0.85rem;">Формула интегрирования по частям: ∫u·dv = u·v - ∫v·du</p>
    <p style="margin:8px 0 0 0; font-size:0.85rem;"><strong>Правило выбора u (ЛИАТЭ):</strong></p>
    <ul style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li><strong>Л</strong> — логарифмические (ln x, log x)</li>
        <li><strong>И</strong> — обратные тригонометрические (arcsin, arctg)</li>
        <li><strong>А</strong> — алгебраические (xⁿ, многочлены)</li>
        <li><strong>Т</strong> — тригонометрические (sin, cos)</li>
        <li><strong>Э</strong> — экспоненциальные (eˣ)</li>
    </ul>
    <p style="margin:8px 0 0 0; font-size:0.85rem;">⭐ <strong>Важно:</strong> Для циклических интегралов (eˣ·sin x, eˣ·cos x) интегрирование по частям применяют дважды, получая уравнение.</p>
</div>`
        },
        { 
            num: 4, 
            title: "Квадратный трёхчлен", 
            data: INTEGRALS_DATA.section4,
            formulas: "📌 Выделяем полный квадрат: ax²+bx+c = a[(x + b/(2a))² + (c/a - b²/(4a²))]",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Квадратный трёхчлен</h4>
    <p style="margin:0; font-size:0.85rem;">Метод выделения полного квадрата: ax²+bx+c = a[(x + b/(2a))² + (4ac-b²)/(4a²)]</p>
    <p style="margin:8px 0 0 0; font-size:0.85rem;"><strong>После выделения квадрата возможны 4 случая:</strong></p>
    <ul style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li><strong>∫dx/(t² + k²)</strong> → (1/k)·arctg(t/k) + C</li>
        <li><strong>∫dx/(t² - k²)</strong> → (1/(2k))·ln|(t-k)/(t+k)| + C</li>
        <li><strong>∫dx/√(t² + k²)</strong> → ln|t + √(t²+k²)| + C</li>
        <li><strong>∫dx/√(k² - t²)</strong> → arcsin(t/k) + C</li>
    </ul>
</div>`
        },
        { 
            num: 5, 
            title: "Линейный член + трёхчлен", 
            data: INTEGRALS_DATA.section5,
            formulas: "📌 Метод: числитель представляем как A·(производная знаменателя) + B",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Линейный член + квадратный трёхчлен</h4>
    <p style="margin:0; font-size:0.85rem;">Для интегралов вида ∫(Mx+N)/(ax²+bx+c) dx или ∫(Mx+N)/√(ax²+bx+c) dx:</p>
    <ol style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li>Находим производную знаменателя: (ax²+bx+c)' = 2ax+b</li>
        <li>Представляем Mx+N = A·(2ax+b) + B</li>
        <li>Находим A и B, решая систему</li>
        <li>Интеграл распадается на два: A·∫(2ax+b)/(...)dx + B·∫dx/(...)</li>
        <li>Первый интеграл даёт логарифм (или корень), второй — табличный</li>
    </ol>
</div>`
        },
        { 
            num: 6, 
            title: "Тип dx/(x√(...))", 
            data: INTEGRALS_DATA.section6,
            formulas: "📌 Замена t = 1/x сводит к ∫dt/√(at²+bt+c)",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Интегралы вида ∫dx/(x·√(ax²+bx+c))</h4>
    <p style="margin:0; font-size:0.85rem;">Алгоритм решения:</p>
    <ol style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li>Выполняем замену t = 1/x → x = 1/t, dx = -dt/t²</li>
        <li>Подкоренное выражение преобразуется к виду √(a + bt + ct²)/|t|</li>
        <li>Интеграл сводится к ∫dt/√(c·t² + b·t + a)</li>
        <li>Далее выделяем полный квадрат и используем табличные формулы</li>
    </ol>
    <p style="margin:8px 0 0 0; font-size:0.85rem;">⭐ <strong>Частные случаи:</strong> ∫dx/(x·√(x²±a²)) и ∫dx/(x·√(a²-x²)) имеют табличные формы.</p>
</div>`
        },
        { 
            num: 7, 
            title: "Дробно-рациональные", 
            data: INTEGRALS_DATA.section7,
            formulas: "📌 Разложение на простейшие дроби: A/(x-a) + B/(x-b) + ... + (Cx+D)/(x²+px+q)",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Интегрирование рациональных дробей</h4>
    <p style="margin:0; font-size:0.85rem;">Алгоритм:</p>
    <ol style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li>Если степень числителя ≥ степени знаменателя → выделить целую часть (деление уголком)</li>
        <li>Разложить знаменатель на множители</li>
        <li>Представить дробь в виде суммы простейших дробей</li>
        <li>Найти коэффициенты методом неопределённых коэффициентов</li>
        <li>Проинтегрировать каждую простейшую дробь</li>
    </ol>
    <p style="margin:8px 0 0 0; font-size:0.85rem;"><strong>Виды простейших дробей:</strong></p>
    <ul style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li>∫A/(x-a)dx = A·ln|x-a| + C</li>
        <li>∫A/(x-a)ⁿdx = -A/[(n-1)(x-a)ⁿ⁻¹] + C</li>
        <li>∫(Mx+N)/(x²+px+q)dx → логарифм + арктангенс</li>
    </ul>
</div>`
        },
        { 
            num: 8, 
            title: "Тригонометрические", 
            data: INTEGRALS_DATA.section8,
            formulas: "📌 Основные приёмы: понижение степени, универсальная подстановка t = tg(x/2), замена t = tg x, использование формул произведения",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Тригонометрические интегралы</h4>
    <p style="margin:0; font-size:0.85rem;"><strong>Основные методы:</strong></p>
    <ul style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li><strong>Понижение степени:</strong> sin²x = (1-cos2x)/2, cos²x = (1+cos2x)/2</li>
        <li><strong>Нечётная степень sin x:</strong> отщепляем один sin x, заменяем u=cos x</li>
        <li><strong>Нечётная степень cos x:</strong> отщепляем один cos x, заменяем u=sin x</li>
        <li><strong>Чётные степени:</strong> используем формулы понижения степени</li>
        <li><strong>Универсальная подстановка:</strong> t = tg(x/2), sin x = 2t/(1+t²), cos x = (1-t²)/(1+t²), dx = 2dt/(1+t²)</li>
        <li><strong>Произведения sin·cos, sin·sin, cos·cos:</strong> используем формулы преобразования произведения в сумму</li>
    </ul>
</div>`
        },
        { 
            num: 9, 
            title: "Тригонометрическая замена", 
            data: INTEGRALS_DATA.section9,
            formulas: "📌 Замены: √(a²-x²) → x = a·sin t, √(a²+x²) → x = a·tg t, √(x²-a²) → x = a·sec t",
            theory: `
<div style="background: rgba(0,30,50,0.3); padding: 12px; border-radius: 12px; margin-bottom: 12px;">
    <h4 style="color:#0ff; margin:0 0 8px 0;">🎓 Теория: Тригонометрическая замена</h4>
    <p style="margin:0; font-size:0.85rem;">Используется для избавления от иррациональностей вида √(a²±x²) или √(x²-a²).</p>
    <p style="margin:8px 0 0 0; font-size:0.85rem;"><strong>Три основных случая:</strong></p>
    <ul style="margin:6px 0 0 20px; font-size:0.85rem;">
        <li><strong>√(a² - x²)</strong> → x = a·sin t, dx = a·cos t dt, √(a²-x²) = a·cos t</li>
        <li><strong>√(a² + x²)</strong> → x = a·tg t, dx = a·dt/cos²t, √(a²+x²) = a/cos t</li>
        <li><strong>√(x² - a²)</strong> → x = a·sec t, dx = a·sec t·tg t dt, √(x²-a²) = a·tg t</li>
    </ul>
    <p style="margin:8px 0 0 0; font-size:0.85rem;">После замены интеграл становится тригонометрическим, который берётся стандартными методами.</p>
</div>`
        }
    ];
    
    let totalTasks = getTotalTasksCount();
    let solved = getSolvedCount();
    
    let html = `
        <div class="info-banner">
            📖 <strong>Таблица интегралов</strong> — ${totalTasks} задач
        </div>
        
        <div class="integrals-stats-panel" style="background: rgba(0,20,40,0.5); border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; align-items: center;">
                <div>
                    <span style="color:#0ff;">📊 Прогресс:</span>
                    <span id="integrals-solved">${solved}</span> / <span id="integrals-total">${totalTasks}</span>
                    (<span id="integrals-percent">${totalTasks > 0 ? ((solved / totalTasks) * 100).toFixed(1) : 0}</span>%)
                </div>
                <div>
                    <span style="color:#0ff;">🎯 Темп до 22 мая:</span>
                    <span id="integrals-pace">загрузка...</span>
                </div>
                <button class="btn-toggle-all" onclick="toggleIntegralsAllSections()" style="background:#0ff2; border:1px solid #0ff; color:#0ff; padding:4px 12px; border-radius:20px; cursor:pointer;">📂 Развернуть всё</button>
            </div>
            <div class="progress-bar" style="margin-top: 12px;">
                <div class="progress-fill" id="integrals-progress-fill" style="width: ${(solved / totalTasks) * 100}%;"></div>
            </div>
        </div>
    `;
    
    for (const section of sections) {
        if (!section.data || section.data.length === 0) continue;
        
        const solvedInSection = section.data.filter((_, idx) => integralsProgress[`s${section.num}_t${idx}`]).length;
        
        html += `<div class="integrals-section" style="margin-bottom: 2rem; border: 1px solid rgba(0,255,255,0.15); border-radius: 1rem; overflow: hidden;">
            <div class="integrals-section-header" style="background: rgba(0,20,40,0.5); padding: 0.8rem 1.2rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="toggleIntegralsSection(${section.num})">
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
                ${section.theory}
                <div class="section-tasks">`;
        
        for (let i = 0; i < section.data.length; i++) {
            const item = section.data[i];
            const key = `s${section.num}_t${i}`;
            const isChecked = integralsProgress[key] === true;
            
            html += `<div class="integral-card" style="margin: 0.5rem 1rem 0.5rem 1rem;">
                <div class="integral-header" style="display: flex; align-items: flex-start; gap: 12px; padding: 0.8rem 1rem;">
                    <input type="checkbox" class="integral-checkbox" id="chk_${key}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleIntegralTask(${section.num}, ${i})" style="margin-top: 4px; width: 18px; height: 18px; cursor: pointer;">
                    <div style="flex: 1;" onclick="toggleIntegralSolution(this.parentElement.parentElement)">
                        <div class="integral-theme" id="task-theme-${key}" style="color: ${isChecked ? '#0f0' : '#0ff'}; ${isChecked ? 'text-decoration: line-through;' : ''}">📌 ${item.name}</div>
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
        
        html += `</div></div></div>`;
    }
    
    container.innerHTML = html;
    updateIntegralsStats();
    
    // Загружаем сохранённое состояние свёрнутых разделов
    setTimeout(() => {
        loadIntegralsSectionState();
    }, 100);
    
    typesetMathJax([container]);
}

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