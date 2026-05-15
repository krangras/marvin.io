const CONSPECTS = {
    0: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 1. Аксиомы скалярного произведения и следствия из них. Неравенство Коши-Буняковского.</h3>
    
    <h4 style="color:#0ff;">1. Определение евклидова пространства</h4>
    <p><b>Дословно:</b> <b>Опр. 1.</b> Линейное пространство (ЛП) \\(V\\) над числовым полем \\(\\mathbb{R}\\) называется <b>евклидовым пространством</b>, если \\(\\forall \\bar{x}, \\bar{y} \\in V\\) определено число \\((\\bar{x}; \\bar{y}) \\in \\mathbb{R}\\), называемое <b>скалярным произведением</b> (СП) \\(\\bar{x}\\) и \\(\\bar{y}\\), удовлетворяющее аксиомам:</p>
    <ol>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad (\\bar{x}; \\bar{y}) = (\\bar{y}; \\bar{x})\\) (коммутативность);</li>
        <li>\\(\\forall \\bar{x}, \\bar{y}, \\bar{z} \\in V \\quad (\\bar{x} + \\bar{y}; \\bar{z}) = (\\bar{x}; \\bar{z}) + (\\bar{y}; \\bar{z})\\) (дистрибутивность СП отн. сложения);</li>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\forall \\alpha \\in \\mathbb{R} \\quad (\\alpha\\bar{x}; \\bar{y}) = \\alpha \\cdot (\\bar{x}; \\bar{y})\\) (смешанная ассоциативность);</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad (\\bar{x}; \\bar{x}) \\geq 0\\), причём \\((\\bar{x}; \\bar{x}) = 0 \\Rightarrow \\bar{x} = \\bar{o}\\) (св-во скалярного квадрата).</li>
    </ol>
    
    <h4 style="color:#0ff;">2. Следствия из аксиом СП (с доказательствами)</h4>
    <p><b>Дословно:</b></p>
    <ol>
        <li>\\((\\bar{o}; \\bar{x}) = (\\bar{x}; \\bar{o}) = 0\\) <b>Д-во:</b> \\(\\bar{o} = 0 \\cdot \\bar{y} \\Rightarrow (\\bar{o}; \\bar{x}) = (0 \\cdot \\bar{y}; \\bar{x}) = [\\text{по св-ву СП 3}] = 0 \\cdot (\\bar{y}; \\bar{x}) = 0\\).</li>
        <li>\\((\\bar{z}; \\bar{x} + \\bar{y}) = (\\bar{z}; \\bar{x}) + (\\bar{z}; \\bar{y})\\) <b>Д-во:</b> \\((\\bar{z}; \\bar{x} + \\bar{y}) = (\\bar{x} + \\bar{y}; \\bar{z}) = [\\text{по св-ву СП 2}] = (\\bar{x}; \\bar{z}) + (\\bar{y}; \\bar{z}) = [\\text{по св-ву СП 1}] = (\\bar{z}; \\bar{x}) + (\\bar{z}; \\bar{y})\\).</li>
        <li>\\((\\bar{x}; \\alpha\\bar{y}) = \\alpha(\\bar{x} ; \\bar{y})\\) <b>Д-во:</b> \\((\\bar{x}; \\alpha\\bar{y}) = [\\text{по св-вам 1 и 3 СП}] = (\\alpha\\bar{y}; \\bar{x}) = \\alpha \\cdot (\\bar{y}; \\bar{x}) = \\alpha \\cdot (\\bar{x}; \\bar{y}) \\blacksquare\\)</li>
    </ol>
    
    <h4 style="color:#0ff;">3. Норма вектора</h4>
    <p><b>Дословно:</b> <b>Опр. 2.</b> <b>Нормой</b> вектора \\(\\bar{x}\\) в евклидовом пространстве называется число \\(|\\bar{x}| = \\sqrt{(\\bar{x}; \\bar{x})}\\).</p>
    
    <h4 style="color:#0ff;">4. Теорема (нер-во Коши-Буняковского)</h4>
    <p><b>Дословно:</b> \\(\\forall \\bar{x}, \\bar{y} \\in V \\quad |(\\bar{x}; \\bar{y})| \\leq |\\bar{x}| \\cdot |\\bar{y}|\\)</p>
    <p><b>Д-во:</b> \\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\forall \\alpha \\in \\mathbb{R} \\quad (\\bar{x} - \\alpha\\bar{y}; \\bar{x} - \\alpha\\bar{y}) \\geq 0\\)</p>
    <p>\\((\\bar{x} - \\alpha\\bar{y}; \\bar{x} - \\alpha\\bar{y}) = [\\text{просто раскрываем фонтанчиком, как многочлен на многочлен}] = (\\bar{x}; \\bar{x}) - \\alpha(\\bar{x}; \\bar{y}) - \\alpha(\\bar{y}; \\bar{x}) + \\alpha^2(\\bar{y}; \\bar{y}) = (\\bar{y}; \\bar{y})\\alpha^2 - 2\\alpha(\\bar{x}; \\bar{y}) + (\\bar{x}; \\bar{x})\\)</p>
    <p>\\((\\bar{y}; \\bar{y})\\alpha^2 - 2(\\bar{x}; \\bar{y})\\alpha + (\\bar{x}; \\bar{x}) \\geq 0\\)</p>
    <p><b>1) случай: \\(\\bar{y} \\neq \\bar{o}\\)</b> \\(\\mathscr{D} \\leq 0\\) (т.к. выражение всегда \\(\\geq 0\\), парабола не пересекает ось или только касается)</p>
    <p>\\(\\mathscr{D} = 4(\\bar{x}; \\bar{y})^2 - 4(\\bar{y}; \\bar{y})(\\bar{x}; \\bar{x}) \\leq 0\\)</p>
    <p>\\(4(\\bar{x}; \\bar{y})^2 \\leq 4(\\bar{y}; \\bar{y})(\\bar{x}; \\bar{x}) \\quad | \\wedge \\frac{1}{2}\\) (извлекаем корень, корень из квадрата — это модуль)</p>
    <p>\\(|(\\bar{x}; \\bar{y})| \\leq \\sqrt{(\\bar{y}; \\bar{y})} \\cdot \\sqrt{(\\bar{x}; \\bar{x})} \\Rightarrow |(\\bar{x}; \\bar{y})| \\leq |\\bar{x}| \\cdot |\\bar{y}|\\)</p>
    <p><b>2) случай: \\(\\bar{y} = \\bar{o}\\)</b> \\((\\bar{x}; \\bar{y}) = |(\\bar{x}; \\bar{o})| = 0\\) \\(|\\bar{x}| \\cdot |\\bar{y}| = |\\bar{x}| \\cdot |\\bar{o}| = |\\bar{x}| \\cdot \\sqrt{(\\bar{o}; \\bar{o})} = 0\\) \\(0 \\leq 0 \\blacksquare\\)</p>
    
    <h4 style="color:#0ff;">5. Определение угла</h4>
    <p><b>Дословно:</b> <b>Опр. 3.</b> \\(\\forall\\) ненулевых \\(\\bar{x}, \\bar{y} \\in V\\) <b>углом</b> называется число \\((\\widehat{\\bar{x}; \\bar{y}}) = \\arccos \\frac{(\\bar{x}; \\bar{y})}{|\\bar{x}| \\cdot |\\bar{y}|}\\).</p>
</div>
`,
    
    1: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 2. Теорема о линейной независимости ортогональной системы векторов. Теорема о процессе ортогонализации Грама-Шмидта.</h3>
    
    <h4 style="color:#0ff;">1. Основные определения</h4>
    <p><b>Дословно:</b> <b>Опр. 1.</b> Векторы \\(\\bar{x}, \\bar{y} \\in V\\) называются <b>ортогональными</b>, если \\((\\bar{x}; \\bar{y}) = 0\\). Обозначается как \\(\\bar{x} \\perp \\bar{y}\\).</p>
    <p><b>Опр. 2.</b> Система векторов называется <b>ортогональной</b>, если её векторы попарно ортогональны. Система векторов называется <b>ортонормированной</b>, если нормы её векторов равны 1.</p>
    
    <h4 style="color:#0ff;">2. Теорема о линейной независимости ортогональной системы</h4>
    <p><b>Дословно:</b> Если все векторы ортогональной системы \\(\\neq \\bar{o}\\), то она <b>линейно независима</b>.</p>
    <p><b>Д-во:</b> Пусть \\(\\bar{a}_1, \\bar{a}_2, \\dots, \\bar{a}_m \\in V\\) попарно ортогональны и \\(\\neq \\bar{o}\\). Предположим, что для некоторых \\(\\alpha_1, \\alpha_2, \\dots, \\alpha_m \\in \\mathbb{R}\\) выполняется равенство: \\(\\alpha_1\\bar{a}_1 + \\alpha_2\\bar{a}_2 + \\dots + \\alpha_m\\bar{a}_m = \\bar{o}\\)</p>
    <p>\\(\\forall i \\in {1, 2, \\dots, m}\\) умножим скалярно обе части равенства на вектор \\(\\bar{a}_i\\): \\((\\alpha_1\\bar{a}_1 + \\dots + \\alpha_{i-1}\\bar{a}_{i-1} + \\alpha_i\\bar{a}_i + \\alpha_{i+1}\\bar{a}_{i+1} + \\dots + \\alpha_m\\bar{a}_m ; \\bar{a}_i) = (\\bar{o} ; \\bar{a}_i)\\)</p>
    <p>Используя свойства скалярного произведения, раскрываем скобки: \\(\\alpha_1(\\bar{a}_1; \\bar{a}_i) + \\dots + \\alpha_{i-1}(\\bar{a}_{i-1}; \\bar{a}_i) + \\alpha_i(\\bar{a}_i; \\bar{a}_i) + \\alpha_{i+1}(\\bar{a}_{i+1}; \\bar{a}_i) + \\dots + \\alpha_m(\\bar{a}_m; \\bar{a}_i) = 0\\)</p>
    <p>Так как система ортогональна, все \\((\\bar{a}_j; \\bar{a}_i) = 0\\) при \\(j \\neq i\\) (в скобках все нули кроме \\(i\\)-того). Остается: \\(\\alpha_i(\\bar{a}_i; \\bar{a}_i) = 0\\) Так как \\(\\bar{a}_i \\neq \\bar{o}\\), то по 4-й аксиоме \\((\\bar{a}_i; \\bar{a}_i) > 0\\). Значит \\(\\alpha_i = 0\\) для любого \\(i\\). Т.е. \\(\\bar{a}_1, \\bar{a}_2, \\dots, \\bar{a}_m\\) — <b>ЛНС</b> (линейно независимая система) ■.</p>
    
    <h4 style="color:#0ff;">3. Теорема о процессе ортогонализации Грамма-Шмидта</h4>
    <p><b>Дословно:</b> Пусть \\(\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m\\) — ЛНС. Построим новую систему векторов \\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) по правилу: \\(\\bar{e}_1 = \\bar{f}_1\\) \\(\\forall k \\in {2, 3, \\dots, m}: \\bar{e}_k = \\bar{f}_k - \\sum_{i=1}^{k-1} \\frac{(\\bar{f}_k; \\bar{e}_i)}{(\\bar{e}_i; \\bar{e}_i)} \\cdot \\bar{e}_i\\)</p>
    <p>Тогда:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — тоже ЛНС.</li>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — ортогональная система векторов.</li>
    </ol>
    <p><b>Д-во (пункт 1):</b> \\(\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m\\) — ЛНС \\(\\Rightarrow (\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m)\\) — базис линейной оболочки \\(<\\bar{f}_1, \\dots, \\bar{f}_m>\\). Матрица перехода от системы \\(\\bar{f}\\) к системе \\(\\bar{e}\\) в этом базисе имеет вид: $$ \\begin{pmatrix} 1 & a_{12} & a_{13} & \\dots & a_{1n} \\\\ 0 & 1 & a_{23} & \\dots & a_{2n} \\\\ 0 & 0 & 1 & \\dots & a_{3n} \\\\ \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & 0 & \\dots & 1 \\end{pmatrix} $$ Определитель этой матрицы \\(\\text{det} = 1 \\neq 0\\). Так как определитель не равен нулю, то векторы \\(\\bar{e}_1, \\dots, \\bar{e}_m\\) линейно независимы.</p>
    <p><b>Д-во (пункт 2) — Индукцией по n:</b> <b>База индукции (m=2):</b> \\(\\bar{e}_2 = \\bar{f}_2 - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot \\bar{e}_1\\) Проверим ортогональность: \\((\\bar{e}_1; \\bar{e}_2) = (\\bar{e}_1; \\bar{f}_2 - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot \\bar{e}_1) = (\\bar{e}_1; \\bar{f}_2) - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot (\\bar{e}_1; \\bar{e}_1) = (\\bar{e}_1; \\bar{f}_2) - (\\bar{f}_2; \\bar{e}_1) = 0\\).</p>
    <p><b>Шаг индукции (ШИ):</b> Предположим, что \\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_{m-1}\\) — попарно ортогональны. Докажем, что тогда \\(\\forall j \\in {1, 2, \\dots, m-1} \\quad \\bar{e}_m \\perp \\bar{e}_j\\). \\((\\bar{e}_m; \\bar{e}_j) = \\left( \\bar{f}_m - \\sum_{i=1}^{m-1} \\frac{(\\bar{f}_m; \\bar{e}_i)}{(\\bar{e}_i; \\bar{e}_i)} \\cdot \\bar{e}_i ; \\bar{e}_j \\right) = (\\bar{f}_m; \\bar{e}_j) - \\sum_{i=1}^{m-1} \\frac{(\\bar{f}_m; \\bar{e}_i)}{(\\bar{e}_i; \\bar{e}_i)} \\cdot (\\bar{e}_i; \\bar{e}_j)\\) В сумме все \\((\\bar{e}_i; \\bar{e}_j) = 0\\), кроме случая \\(i=j\\) (по предположению индукции). \\((\\bar{e}_m; \\bar{e}_j) = (\\bar{f}_m; \\bar{e}_j) - \\frac{(\\bar{f}_m; \\bar{e}_j)}{(\\bar{e}_j; \\bar{e}_j)} \\cdot (\\bar{e}_j; \\bar{e}_j) = (\\bar{f}_m; \\bar{e}_j) - (\\bar{f}_m; \\bar{e}_j) = 0\\) \\(\\Rightarrow \\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — ортогональная система векторов ■.</p>
</div>
`,
    
    // Остальные билеты пока заглушки
    2: "📖 Конспект для билета 3",
    3: "📖 Конспект для билета 4",
    4: "📖 Конспект для билета 5",
    5: "📖 Конспект для билета 6",
    6: "📖 Конспект для билета 7",
    7: "📖 Конспект для билета 8",
    8: "📖 Конспект для билета 9",
    9: "📖 Конспект для билета 10",
    10: "📖 Конспект для билета 11",
    11: "📖 Конспект для билета 12",
    12: "📖 Конспект для билета 13",
    13: "📖 Конспект для билета 14",
    14: "📖 Конспект для билета 15",
    15: "📖 Конспект для билета 16",
    16: "📖 Конспект для билета 17"
};