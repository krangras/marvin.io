# Session Summary

## Project: marv.in (математические конспекты)

## Что сделано (в этой сессии)

### 1. Фикс рендеринга «не равно» (≠)

**Задача:** Символ ≠ отображался как пустой квадрат □ вместо самого символа во всех вкладках (конспекты, задачи экзамена, интегралы, семестр 1).

**Корень проблемы:**
- KaTeX 0.16.11 не поддерживает Unicode-символ ≠ (U+2260) внутри математических блоков — его шрифты не содержат этого глифа.
- Браузер не может выполнить fallback, потому что KaTeX задаёт `font-family: KaTeX_Main` без резервных шрифтов на внутренних span-элементах.
- Старая подмена `html.replace(/\\neq|\\not=/g, '≠')` в `renderExamTasks()` и `renderIntegrals()` делала только хуже — конвертировала LaTeX-команду `\neq` обратно в неподдерживаемый Unicode.

**Фикс:**

- Функция `fixNeq(html)` создана в `script.js` (выше `renderExamTasks()`). На лету правит HTML перед KaTeX:
  - Если `≠` внутри `\(...\)`, `\[...\]`, `$$...$$` или `$...$` → заменяет на `\neq` (LaTeX-команда, KaTeX умеет)
  - Если `≠` вне математического режима → оставляет как есть
- `fixNeq()` применена во всех render-функциях (помимо `render()` и `goToTicket()`):
  1. `renderExamTasks()` — удалён старый `.replace`, добавлен `fixNeq`
  2. `renderIntegrals()` — удалён старый `.replace` + комментарий, добавлен `fixNeq`
  3. `renderSemester1Math()` — добавлен `fixNeq` на `innerHTML`
- CSS `@font-face` с `unicode-range: U+2260` — не сработал (KaTeX заменяет ≠ на `?` в DOM, CSS бессилен). Удалён из `style.css`.

### 3. Мгновенный мерж Firestore без перезагрузки

**Задача:** После входа в Google или получения данных из Firestore страница перезагружалась (`location.reload()`), что создавало задержку.

**Фикс:**
- В `firebase-sync.js`:
  - Добавлен флаг `_skipSync`, отключающий Firestore-синхронизацию во время реинита (чтобы не было цикла `save → sync → merge → reinit → save → ...`)
  - В `scheduleFirestoreSync()` проверка `_skipSync` вместо `return` при нулевом таймере (чтобы не создавать новые таймеры во время реинита)
  - Вместо `location.reload()` в `loadFromFirestore()` теперь вызывается `reinitApp()`, которая запускает зарегистрированный колбэк реинита
  - `reinitApp()` оборачивает вызов колбэка в `_skipSync = true / false`
  - Добавлена функция `onReinit(cb)` для регистрации колбэка из `script.js`
- В `script.js` добавлена регистрация `onReinit()`, которая перезапускает `initState()`, `initSemester1State()`, `renderControlTasks()`, `renderIntegrals()`, `renderExamTasks()`, `loadActiveTab()`, `render()`, `updatePace()` — без перезагрузки страницы

### 4. Бейдж версии на странице

**Задача:** Показать changelog — "v1.0 · облачные сохранения".

**Фикс:**
- В `firebase-auth.js` добавлена кнопка changelog (круглая «i») между auth и theme
- По клику открывается модальное окно со списком изменений (overlay + modal)
- Удалён статический `.version-badge` из `index.html` и `style.css`

## Critical Context
