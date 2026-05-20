(function () {
    const report = {
        timestamp: new Date().toISOString(),
        url: location.href,
        protocol: location.protocol,

        // Memory
        memory: null,
        memoryMB: null,

        // DOM
        totalNodes: 0,
        elementNodes: 0,
        textNodes: 0,
        maxDepth: 0,
        depthElement: null,

        // KaTeX
        katexSpans: 0,
        katexDisplays: 0,
        katexErrors: [],

        // localStorage
        lsKeys: 0,
        lsTotalBytes: 0,
        lsItems: {},

        // Performance
        domContentLoaded: null,
        loadTime: null,

        // Network
        resourceCount: 0,
        totalTransferSize: 0,

        // Recommendations: []
    };

    // 1. MEMORY
    if (performance.memory) {
        report.memory = {
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize,
        };
        report.memoryMB = {
            limit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(1) + ' MB',
            total: (performance.memory.totalJSHeapSize / 1048576).toFixed(1) + ' MB',
            used: (performance.memory.usedJSHeapSize / 1048576).toFixed(1) + ' MB',
        };
    } else {
        report.memory = 'Недоступно (запустите Chrome с --enable-precise-memory-info)';
    }

    // 2. DOM TRAVERSAL
    function walk(node, depth) {
        report.totalNodes++;
        if (node.nodeType === 1) report.elementNodes++;
        if (node.nodeType === 3) report.textNodes++;
        if (depth > report.maxDepth) {
            report.maxDepth = depth;
            report.depthElement = node.tagName + (node.id ? '#' + node.id : '') + (node.className ? '.' + node.className.split(' ').join('.') : '');
        }
        if (node.nodeType === 1 && node.tagName === 'SPAN' && node.classList.contains('katex')) {
            report.katexSpans++;
        }
        if (node.nodeType === 1 && node.tagName === 'SPAN' && node.classList.contains('katex-display')) {
            report.katexDisplays++;
        }
        for (let child = node.firstChild; child; child = child.nextSibling) {
            walk(child, depth + 1);
        }
    }
    walk(document.body, 0);

    // 3. KATEX ERRORS
    document.querySelectorAll('.katex-error, .katex .error').forEach(el => {
        report.katexErrors.push(el.textContent.trim().slice(0, 100));
    });

    // 4. LOCALSTORAGE
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key);
        const bytes = (key.length + val.length) * 2; // UTF-16
        report.lsTotalBytes += bytes;
        report.lsItems[key] = {
            bytes: bytes,
            bytesHuman: (bytes / 1024).toFixed(1) + ' KB',
            preview: val.slice(0, 120) + (val.length > 120 ? '...' : ''),
        };
        report.lsKeys++;
    }

    // 4b. LAZY SECTIONS
    const katexRenderedSections = document.querySelectorAll('[data-katex-rendered]');
    const allSections = document.querySelectorAll('.section-content');
    const pendingRender = Array.from(allSections).filter(s => s.style.display !== 'none' && !s.dataset.katexRendered);
    report.lazySections = {
        total: allSections.length,
        rendered: katexRenderedSections.length,
        pending: pendingRender.length,
    };

    // 5. PERFORMANCE TIMING
    if (performance.timing) {
        report.domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart + ' ms';
        report.loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart + ' ms';
    }

    // 6. NETWORK (Performance API)
    const resources = performance.getEntriesByType('resource');
    report.resourceCount = resources.length;
    let totalSize = 0;
    resources.forEach(r => {
        if (r.transferSize) totalSize += r.transferSize;
    });
    report.totalTransferSize = (totalSize / 1024).toFixed(1) + ' KB';

    // 7. RECOMMENDATIONS
    const recs = [];

    const usedMB = report.memory && report.memory.usedJSHeapSize
        ? (report.memory.usedJSHeapSize / 1048576) : null;

    if (usedMB !== null && usedMB > 80) {
        recs.push('🔴 Высокое потребление памяти: ' + usedMB.toFixed(0) + ' MB. Рекомендация: ограничьте количество одновременно открытых секций.');
    }
    if (report.elementNodes > 5000) {
        recs.push('🟡 Много DOM-элементов: ' + report.elementNodes + '. Возможно из-за KaTeX-формул. Рекомендация: рендерить формулы лениво (только для видимых секций).');
    }
    if (report.lsTotalBytes > 512 * 1024) {
        recs.push('🟡 Большой localStorage: ' + (report.lsTotalBytes / 1024).toFixed(0) + ' KB. Рекомендация: удалите ' + (report.lsTotalBytes > 1024 * 1024 ? 'немедленно' : 'при возможности') + ' неиспользуемые ключи.');
    }
    if (report.protocol === 'file:') {
        recs.push('🟡 Сайт открыт через file://. ServiceWorker недоступен, кеширование не работает, некоторые API ограничены.');
    }
    if (report.katexErrors.length > 0) {
        recs.push('🔴 Найдены ошибки KaTeX: ' + report.katexErrors.length + ' шт. Проверьте формулы.');
    }
    if (report.katexSpans === 0) {
        recs.push('🔴 KaTeX не отрендерил ни одной формулы. Возможно библиотеки не загрузились.');
    }
    if (report.lazySections && report.lazySections.pending > 0) {
        recs.push('🟡 Секций ожидают рендера KaTeX: ' + report.lazySections.pending + '. Откройте их чтобы отрендерить.');
    }

    report.recommendations = recs;

    // 8. OUTPUT
    console.log('%c🧪 МАРВИН ДИАГНОСТИКА', 'font-size:24px; font-weight:bold; color:#1a3a6e');
    console.log('%c' + report.timestamp, 'color:#888');
    console.log('');

    console.log('%c📊 ПАМЯТЬ', 'font-size:16px; font-weight:bold;');
    if (report.memoryMB) {
        console.log('  Используется JS-памяти:', report.memoryMB.used);
        console.log('  Всего JS-памяти:', report.memoryMB.total);
        console.log('  Лимит:', report.memoryMB.limit);
    } else {
        console.log('  ' + report.memory);
    }

    console.log('%c📐 DOM', 'font-size:16px; font-weight:bold;');
    console.log('  Всего узлов:', report.totalNodes);
    console.log('  Элементов:', report.elementNodes);
    console.log('  Текстовых узлов:', report.textNodes);
    console.log('  Макс. глубина:', report.maxDepth + ' (' + report.depthElement + ')');

    console.log('%c∫ KaTeX', 'font-size:16px; font-weight:bold;');
    console.log('  .katex-спанов:', report.katexSpans);
    console.log('  .katex-display:', report.katexDisplays);
    if (report.katexErrors.length > 0) {
        console.log('  ❌ Ошибки:');
        report.katexErrors.forEach(e => console.log('    -', e));
    } else {
        console.log('  ✅ Ошибок не найдено');
    }

    console.log('%c💾 localStorage', 'font-size:16px; font-weight:bold;');
    console.log('  Ключей:', report.lsKeys);
    console.log('  Всего:', (report.lsTotalBytes / 1024).toFixed(1) + ' KB');
    Object.keys(report.lsItems).forEach(k => {
        const item = report.lsItems[k];
        console.log('  📄 ' + k + ': ' + item.bytesHuman + ' | ' + item.preview);
    });

    console.log('%c⏱ ПРОИЗВОДИТЕЛЬНОСТЬ', 'font-size:16px; font-weight:bold;');
    console.log('  DOMContentLoaded:', report.domContentLoaded);
    console.log('  Load:', report.loadTime);
    console.log('  Ресурсов загружено:', report.resourceCount);
    console.log('  Всего передано:', report.totalTransferSize);

    console.log('%c🔲 ЛЕНИВЫЙ РЕНДЕР', 'font-size:16px; font-weight:bold;');
    if (report.lazySections) {
        console.log('  Всего секций:', report.lazySections.total);
        console.log('  Отрендерено KaTeX:', report.lazySections.rendered);
        console.log('  Ожидают рендера (видимые, не отрендеренные):', report.lazySections.pending);
    }

    console.log('%c💡 РЕКОМЕНДАЦИИ', 'font-size:16px; font-weight:bold;');
    if (report.recommendations.length === 0) {
        console.log('  🟢 Всё хорошо! Значительных проблем не обнаружено.');
    } else {
        report.recommendations.forEach((r, i) => console.log('  ' + (i + 1) + '. ' + r));
    }

    console.log('');
    console.log('%c📋 Полный отчёт (скопируй и отправь):', 'font-size:14px; font-weight:bold;');
    console.log(JSON.stringify(report, null, 2));

    return report;
})();
