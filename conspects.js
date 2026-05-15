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
    2: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 3. Свойства ОНБ. Теорема об определителе Грама.</h3>
    
    <h4 style="color:#0ff;">1. Ортонормированные базисы</h4>
    <p><b>Дословно:</b></p>
    <p>Если ортонормированная система векторов образует <b>базис</b>, то этот базис называется <b>ортонормированным (ОНБ)</b>.</p>
    
    <p><b>Теорема (св-ва ОНБ):</b></p>
    <ol>
        <li>В любом конечном евклидовом пространстве \\(\\exists\\) <b>ОНБ</b>.</li>
        <li>Если \\(\\mathcal{B} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — <b>ОНБ</b>, то \\(\\forall \\bar{x} \\in V\\):
            \\[[\\bar{x}]_{\\mathcal{B}} = \\begin{pmatrix} (\\bar{x}; \\bar{e}_1) \\\\ (\\bar{x}; \\bar{e}_2) \\\\ \\vdots \\\\ (\\bar{x}; \\bar{e}_n) \\end{pmatrix}.\\]</li>
        <li>Если \\(\\mathcal{B} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — <b>ОНБ</b>, \\([\\bar{x}]_{\\mathcal{B}} = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix}\\), \\([\\bar{y}]_{\\mathcal{B}} = \\begin{pmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_n \\end{pmatrix}\\), то \\((\\bar{x}; \\bar{y}) = x_1 y_1 + x_2 y_2 + \\dots + x_n y_n\\).</li>
        <li><b>Матрица перехода</b> из ОНБ в тоже ОНБ — <b>ортогональная</b>. \\(T^t = T^{-1}\\).</li>
    </ol>
    
    <p><b>Д-во:</b></p>
    <p><b>1)</b> Берём произвольный базис \\((\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_n)\\) в \\(V\\). Применяем <b>процесс ортогонализации</b>, получаем ЛНС \\((e_1, e_2, \\dots, e_n)\\) [по теореме о процессе ортогонализации Грама-Шмидта, п. 1] с достаточным для базиса количеством векторов \\(\\Rightarrow (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — ортогональный базис [опять та же теорема, п. 2].<br>
    \\(\\bar{e}'_i = \\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}\\) [чтобы базис стал ОНБ, надо каждый вектор поделить на его собственную длину (норму), чтобы его длина стала = 1].<br>
    \\(\\|\\bar{e}'_i\\| = \\sqrt{(\\bar{e}'_i; \\bar{e}'_i)} = \\sqrt{(\\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}; \\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|})} = \\sqrt{\\frac{1}{\\|\\bar{e}_i\\|^2} \\cdot (\\bar{e}_i; \\bar{e}_i)} = \\frac{1}{\\|\\bar{e}_i\\|} \\cdot \\sqrt{(\\bar{e}_i; \\bar{e}_i)} = \\frac{1}{\\|\\bar{e}_i\\|} \\cdot \\|\\bar{e}_i\\| = 1\\) [доказали, что норма нового вектора = 1].<br>
    При \\(i \\neq j \\quad (\\bar{e}'_i; \\bar{e}'_j) = (\\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}; \\frac{\\bar{e}_j}{\\|\\bar{e}_j\\|}) = \\frac{1}{\\|\\bar{e}_i\\| \\cdot \\|\\bar{e}_j\\|} \\cdot (\\bar{e}_i; \\bar{e}_j) = 0 \\Rightarrow (e_1, e_2, \\dots, e_n)\\) — <b>ОНБ</b>.</p>
    
    <p><b>2)</b> \\(\\bar{x} = x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n\\).<br>
    \\(\\bar{x} = x_1 \\bar{e}_1 + \\dots + x_{i-1} \\bar{e}_{i-1} + x_i \\bar{e}_i + x_{i+1} \\bar{e}_{i+1} + \\dots + x_n \\bar{e}_n \\mid \\cdot \\bar{e}_i\\).<br>
    \\((\\bar{x}; \\bar{e}_i) = x_1 \\underbrace{(\\bar{e}_1; \\bar{e}_i)}_{0} + \\dots + x_{i-1} \\underbrace{(\\bar{e}_{i-1}; \\bar{e}_i)}_{0} + x_i \\underbrace{(\\bar{e}_i; \\bar{e}_i)}_{1} + x_{i+1} \\underbrace{(\\bar{e}_{i+1}; \\bar{e}_i)}_{0} + \\dots + x_n \\underbrace{(\\bar{e}_n; \\bar{e}_i)}_{0}\\).<br>
    \\((\\bar{x}; \\bar{e}_i) = x_i \\Rightarrow [\\bar{x}]_{\\mathcal{B}} = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix} = \\begin{pmatrix} (x; \\bar{e}_1) \\\\ (x; \\bar{e}_2) \\\\ \\vdots \\\\ (x; \\bar{e}_n) \\end{pmatrix}\\).</p>
    
    <p><b>3)</b> \\(\\bar{x} = x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n\\), \\(y = y_1 \\bar{e}_1 + y_2 \\bar{e}_2 + \\dots + y_n \\bar{e}_n\\).<br>
    \\((\\bar{x}; \\bar{y}) = (x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n ; y_1 \\bar{e}_1 + y_2 \\bar{e}_2 + \\dots + y_n \\bar{e}_n) =\\)<br>
    \\(= x_1 y_1 \\underbrace{(\\bar{e}_1; \\bar{e}_1)}_{1} + x_1 y_2 \\underbrace{(\\bar{e}_1; \\bar{e}_2)}_{0} + \\dots + x_1 y_n \\underbrace{(\\bar{e}_1; \\bar{e}_n)}_{0} + x_2 y_1 \\underbrace{(\\bar{e}_2; \\bar{e}_1)}_{0} + x_2 y_2 \\underbrace{(\\bar{e}_2; \\bar{e}_2)}_{1} + \\dots + x_2 y_n \\underbrace{(\\bar{e}_2; \\bar{e}_n)}_{0} + \\dots + x_n y_1 \\underbrace{(\\bar{e}_n; \\bar{e}_1)}_{0} + x_n y_2 \\underbrace{(\\bar{e}_n; \\bar{e}_2)}_{0} + \\dots + x_n y_n \\underbrace{(\\bar{e}_n; \\bar{e}_n)}_{1} = x_1 y_1 + x_2 y_2 + \\dots + x_n y_n\\).</p>
    
    <p><b>4)</b> Пусть \\(\\mathcal{B} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) и \\(\\mathcal{B}' = (\\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_n)\\) — <b>ОНБ</b>.<br>
    \\(\\begin{cases} \\bar{e}'_1 = t_{11} \\bar{e}_1 + t_{21} \\bar{e}_2 + \\dots + t_{n1} \\bar{e}_n \\\\ \\bar{e}'_2 = t_{12} \\bar{e}_1 + t_{22} \\bar{e}_2 + \\dots + t_{n2} \\bar{e}_n \\\\ \\dots \\\\ \\bar{e}'_n = t_{1n} \\bar{e}_1 + t_{2n} \\bar{e}_2 + \\dots + t_{nn} \\bar{e}_n \\end{cases}\\).<br>
    \\(T_{\\mathcal{B} \\to \\mathcal{B}'} = \\begin{pmatrix} t_{11} & t_{12} & \\dots & t_{1n} \\\\ t_{21} & t_{22} & \\dots & t_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ t_{n1} & t_{n2} & \\dots & t_{nn} \\end{pmatrix}\\).<br>
    \\(T_{\\mathcal{B} \\to \\mathcal{B}'}^t \\cdot T_{\\mathcal{B} \\to \\mathcal{B}'} = \\begin{pmatrix} t_{11} & t_{21} & \\dots & t_{n1} \\\\ t_{12} & t_{22} & \\dots & t_{n2} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ t_{1n} & t_{2n} & \\dots & t_{nn} \\end{pmatrix} \\cdot \\begin{pmatrix} t_{11} & t_{12} & \\dots & t_{1n} \\\\ t_{21} & t_{22} & \\dots & t_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ t_{n1} & t_{n2} & \\dots & t_{nn} \\end{pmatrix} =\\)<br>
    \\(= \\begin{pmatrix} (\\bar{e}'_1; \\bar{e}'_1) & (\\bar{e}'_1; \\bar{e}'_2) & \\dots & (\\bar{e}'_1; \\bar{e}'_n) \\\\ (\\bar{e}'_2; \\bar{e}'_1) & (\\bar{e}'_2; \\bar{e}'_2) & \\dots & (\\bar{e}'_2; \\bar{e}'_n) \\\\ \\dots & \\dots & \\dots & \\dots \\\\ (\\bar{e}'_n; \\bar{e}'_1) & (\\bar{e}'_n; \\bar{e}'_2) & \\dots & (\\bar{e}'_n; \\bar{e}'_n) \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & \\dots & 0 \\\\ 0 & 1 & \\dots & 0 \\\\ \\dots & \\dots & \\dots & \\dots \\\\ 0 & 0 & \\dots & 1 \\end{pmatrix} = E_{n \\times n} \\Rightarrow\\)<br>
    \\(\\Rightarrow T_{\\mathcal{B} \\to \\mathcal{B}'}^t = T_{\\mathcal{B} \\to \\mathcal{B}'}^{-1} \\blacksquare\\).</p>
    
    <h4 style="color:#0ff;">2. Определитель Грама</h4>
    <p><b>Дословно:</b></p>
    <p><b>Опр. 1.</b> <b>Матрицей Грама</b> системы векторов \\(S = (\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m)\\) называется матрица<br>
    \\(\\Gamma_S = \\begin{pmatrix} (\\bar{f}_1; \\bar{f}_1) & (\\bar{f}_1; \\bar{f}_2) & \\dots & (\\bar{f}_1; \\bar{f}_m) \\\\ (\\bar{f}_2; \\bar{f}_1) & (\\bar{f}_2; \\bar{f}_2) & \\dots & (\\bar{f}_2; \\bar{f}_m) \\\\ \\dots & \\dots & \\dots & \\dots \\\\ (\\bar{f}_m; \\bar{f}_1) & (\\bar{f}_m; \\bar{f}_2) & \\dots & (\\bar{f}_m; \\bar{f}_m) \\end{pmatrix}\\).<br>
    Её определитель \\(|\\Gamma_S|\\) называется <b>определителем Грама</b> данной системы векторов.</p>
    
    <p><b>Теорема 2 (об определителе Грама):</b><br>
    Пусть \\(V\\) — \\(n\\)-мерное евклидово пр-во, \\(S = (\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_n)\\). Тогда:<br>
    1) если \\(S\\) — <b>ЛНС</b>, то \\(|\\Gamma_S| > 0\\);<br>
    2) если \\(S\\) — <b>ЛЗС</b>, то \\(|\\Gamma_S| = 0\\).</p>
    
    <p><b>Д-во:</b><br>
    Возьмём в \\(V\\) ОНБ \\(\\mathcal{B} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\).<br>
    \\(f_1 = a_{11} \\bar{e}_1 + a_{21} \\bar{e}_2 + \\dots + a_{n1} \\bar{e}_n\\)<br>
    \\(f_2 = a_{12} \\bar{e}_1 + a_{22} \\bar{e}_2 + \\dots + a_{n2} \\bar{e}_n\\)<br>
    \\(\\dots\\)<br>
    \\(f_n = a_{1n} \\bar{e}_1 + a_{2n} \\bar{e}_2 + \\dots + a_{nn} \\bar{e}_n\\)<br>
    \\(A = \\begin{pmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{n1} & a_{n2} & \\dots & a_{nn} \\end{pmatrix}\\)<br>
    \\(A^t \\cdot A = \\begin{pmatrix} a_{11} & a_{21} & \\dots & a_{n1} \\\\ a_{12} & a_{22} & \\dots & a_{n2} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{1n} & a_{2n} & \\dots & a_{nn} \\end{pmatrix} \\cdot \\begin{pmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{n1} & a_{n2} & \\dots & a_{nn} \\end{pmatrix} =\\)<br>
    \\(= \\begin{pmatrix} (\\bar{f}_1; \\bar{f}_1) & (\\bar{f}_1; \\bar{f}_2) & \\dots & (\\bar{f}_1; \\bar{f}_n) \\\\ (\\bar{f}_2; \\bar{f}_1) & (\\bar{f}_2; \\bar{f}_2) & \\dots & (\\bar{f}_2; \\bar{f}_n) \\\\ \\dots & \\dots & \\dots & \\dots \\\\ (\\bar{f}_n; \\bar{f}_1) & (\\bar{f}_n; \\bar{f}_2) & \\dots & (\\bar{f}_n; \\bar{f}_n) \\end{pmatrix}\\)<br>
    \\(|A^t \\cdot A| = |A^t| \\cdot |A| = |A| \\cdot |A| = |A|^2\\)<br>
    \\(|\\Gamma_S| = |A|^2\\)<br>
    1) \\(S\\) — <b>ЛНС</b> \\(\\Rightarrow\\) столбцы у \\(A\\) линейно независимы \\(\\Rightarrow |A| \\neq 0 \\Rightarrow |\\Gamma_S| > 0\\).<br>
    2) \\(S\\) — <b>ЛЗС</b> \\(\\Rightarrow\\) столбцы у \\(A\\) линейно зависимы \\(\\Rightarrow |A| = 0 \\Rightarrow |\\Gamma_S| = 0 \\blacksquare\\).</p>
</div>
`,
    3: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 4. Теорема об ортогональных дополнениях.</h3>
    
    <h4 style="color:#0ff;">1. Определение ортогонального дополнения</h4>
    <p><b>Опр.</b> Пусть \\(M \\subseteq V, M \\neq \\varnothing\\). <b>Ортогональным дополнением</b> к \\(M\\) называется мн-во \\(M^{\\perp} = \\{ \\bar{z} \\in V : \\forall \\bar{y} \\in M \\quad (\\bar{y}; \\bar{z}) = 0 \\}\\).</p>
    
    <h4 style="color:#0ff;">2. Теорема об ортогональных дополнениях</h4>
    <p><b>Теорема.</b> Пусть \\(L\\) — подпространство конечномерного евклидова пространства \\(V\\). Тогда:<br>
    1) \\(\\forall \\bar{x} \\in V \\quad \\exists ! \\bar{y} \\in L \\quad \\exists ! \\bar{z} \\in L^{\\perp} : \\bar{x} = \\bar{y} + \\bar{z}\\)<br>
    2) \\(\\dim(L^{\\perp}) + \\dim(L) = \\dim(V)\\).</p>
    
    <h4 style="color:#0ff;">3. Доказательство</h4>
    <p><b>Д-во:</b> Докажем сначала, что \\(\\forall M \\neq \\varnothing, M \\in V, M^{\\perp} \\subseteq V\\).<br>
    Выберем произвольно \\(z_1, z_2 \\in M^{\\perp}, \\alpha_1, \\alpha_2 \\in \\mathbb{R}\\).<br>
    \\(\\forall \\bar{y} \\in M \\quad (\\alpha_1 \\bar{z}_1 + \\alpha_2 \\bar{z}_2 ; \\bar{y}) = \\alpha_1 \\underbrace{(\\bar{z}_1; \\bar{y})}_{=0} + \\alpha_2 \\underbrace{(\\bar{z}_2; \\bar{y})}_{=0} = 0 \\Rightarrow (\\alpha_1 \\bar{z}_1 + \\alpha_2 \\bar{z}_2) \\in M^{\\perp} \\Rightarrow M^{\\perp} \\subseteq V\\).</p>
    
    <p><b>1) а) существование \\(\\bar{y}\\) и \\(\\bar{z}\\)</b><br>
    Если \\(L = \\{ \\bar{o} \\}\\), то \\((\\bar{x}; \\bar{o}) = 0 \\Rightarrow \\bar{x} = \\bar{x} + \\bar{o}\\).<br>
    Если \\(L \\neq \\{ \\bar{o} \\}\\), то возьмём в \\(L\\) ОНБ \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m)\\).<br>
    Определим \\(\\bar{y} = \\sum_{i=1}^m (\\bar{x}; \\bar{e}_i) \\cdot \\bar{e}_i \\in L\\).<br>
    Докажем, что \\(\\bar{z} = \\bar{x} - \\bar{y} \\in L^{\\perp}\\).<br>
    \\((\\bar{x} - \\bar{y}; \\bar{e}_j) = (\\bar{x} - \\sum_{i=1}^m (\\bar{x}; \\bar{e}_i) \\cdot \\bar{e}_i ; \\bar{e}_j) = (\\bar{x}; \\bar{e}_j) - \\sum_{i=1}^m (\\bar{x}; \\bar{e}_i) \\cdot (\\bar{e}_i; \\bar{e}_j) = (\\bar{x}; \\bar{e}_j) - (\\bar{x}; \\bar{e}_j) \\cdot \\underbrace{(\\bar{e}_j; \\bar{e}_j)}_{1} = 0 \\Rightarrow\\)<br>
    \\(\\Rightarrow \\bar{z} = \\bar{x} - \\bar{y} \\in L^{\\perp}\\)<br>
    \\(x = \\bar{y} + \\bar{z}\\).</p>
    
    <p><b>б) единственность</b><br>
    \\(\\bar{x} = \\bar{y}_1 + \\bar{z}_1\\) (где \\(\\bar{y}_1 \\in L, \\bar{z}_1 \\in L^{\\perp}\\))<br>
    \\(\\bar{x} = \\bar{y}_2 + \\bar{z}_2\\) (где \\(\\bar{y}_2 \\in L, \\bar{z}_2 \\in L^{\\perp}\\))<br>
    \\(\\bar{o} = \\underbrace{(\\bar{y}_2 - \\bar{y}_1)}_{\\bar{a} \\in L} + \\underbrace{(\\bar{z}_2 - \\bar{z}_1)}_{\\bar{b} \\in L^{\\perp}} \\mid \\cdot \\bar{a}\\)<br>
    \\((\\bar{o}; \\bar{a}) = (\\bar{a}; \\bar{a}) + \\underbrace{(\\bar{b}; \\bar{a})}_{0} \\Rightarrow (\\bar{a}; \\bar{a}) = 0 \\Rightarrow \\bar{a} = \\bar{o} \\Rightarrow \\bar{y}_1 = \\bar{y}_2\\) и \\(\\bar{z}_1 = \\bar{z}_2\\).</p>
    
    <p><b>2) \\(\\dim(L^{\\perp}) + \\dim(L) = \\dim(V)\\)</b><br>
    \\(\\forall \\bar{x} \\in V \\quad \\exists ! \\bar{y} \\in L \\quad \\exists ! \\bar{z} \\in L^{\\perp} : \\bar{x} = \\bar{y} + \\bar{z}\\).<br>
    Пусть \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_k)\\) — базис \\(L\\), \\((\\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_m)\\) — базис \\(L^{\\perp} \\Rightarrow \\exists ! (\\alpha_1, \\alpha_2, \\dots, \\alpha_k) \\exists ! (\\beta_1, \\beta_2, \\dots, \\beta_m):\\)<br>
    \\(x = \\underbrace{\\alpha_1 \\bar{e}_1 + \\dots + \\alpha_k \\bar{e}_k}_{\\bar{y} \\in L} + \\underbrace{\\beta_1 \\bar{e}'_1 + \\dots + \\beta_m \\bar{e}'_m}_{\\bar{z} \\in L^{\\perp}}\\).<br>
    \\(V = < \\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_k, \\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_m >\\).<br>
    Пусть \\(\\alpha_1 \\bar{e}_1 + \\dots + \\alpha_k \\bar{e}_k + \\beta_1 \\bar{e}'_1 + \\dots + \\beta_m \\bar{e}'_m = \\bar{o}\\).<br>
    При этом, \\(\\bar{o} = \\bar{o} + \\bar{o}\\).<br>
    Разложение по \\(L\\) и \\(L^{\\perp}\\) единственное! \\(\\Rightarrow\\)<br>
    \\(\\Rightarrow \\bar{y} = \\bar{o}\\) и \\(\\bar{z} = \\bar{o} \\Rightarrow \\begin{cases} \\alpha_1 \\bar{e}_1 + \\dots + \\alpha_k \\bar{e}_k = \\bar{o} \\Rightarrow \\alpha_1 = \\dots = \\alpha_k = 0 \\\\ \\beta_1 \\bar{e}'_1 + \\dots + \\beta_m \\bar{e}'_m = \\bar{o} \\Rightarrow \\beta_1 = \\dots = \\beta_m = 0 \\end{cases} \\Rightarrow\\)<br>
    \\(\\Rightarrow \\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_k, \\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_m\\) — <b>ЛНС</b> \\(\\Rightarrow (\\bar{e}_1, \\dots, \\bar{e}_k, \\bar{e}'_1, \\dots, \\bar{e}'_m)\\) — базис \\(V \\Rightarrow\\)<br>
    \\(\\Rightarrow \\dim(V) = k + m = \\dim(L) + \\dim(L^{\\perp})\\).<br>
    В случае, если \\(L = \\{ \\bar{o} \\}\\) или \\(L^{\\perp} = \\{ \\bar{o} \\} \\Rightarrow\\)<br>
    \\(\\Rightarrow V = L^{\\perp}\\) или \\(V = L\\) — до-во очевидно \\(\\blacksquare\\)</p>
</div>
`,

4: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 5. Критерии линейности. Теорема о линейности \\(\\hat{A} + \\hat{B}\\), \\(\\alpha\\hat{A}\\) и \\(\\hat{A}\\hat{B}\\)</h3>
    
    <h4 style="color:#0ff;">1. Определение линейного оператора</h4>
    <p><b>Опр. 1.</b> <b>Линейным оператором (ЛО)</b>, действующим в ЛП \\(V\\), называется отображение \\(\\hat{A} : V \\to V\\), обладающее следующими свойствами:<br>
    1) \\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\hat{A}(\\bar{x} + \\bar{y}) = \\hat{A}(\\bar{x}) + \\hat{A}(\\bar{y})\\) — <b>аддитивность</b><br>
    2) \\(\\forall \\bar{x} \\in V \\quad \\forall \\alpha \\in P \\quad \\hat{A}(\\alpha\\bar{x}) = \\alpha \\cdot \\hat{A}(\\bar{x})\\) — <b>однородность</b></p>
    
    <h4 style="color:#0ff;">2. Критерий линейности</h4>
    <p><b>Теорема 1 (критерий линейности)</b><br>
    \\(\\hat{A} : V \\to V - \\text{ЛО} \\Leftrightarrow \\forall \\bar{x}, \\bar{y} \\in V \\quad \\forall \\alpha, \\beta \\in P \\quad \\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) = \\alpha \\hat{A}(\\bar{x}) + \\beta \\hat{A}(\\bar{y})\\)</p>
    
    <p><b>Д-во:</b><br>
    <b>\\(\\Rightarrow\\)</b> Пусть \\(\\hat{A} : V \\to V - \\text{ЛО}\\)<br>
    \\(\\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) = [\\text{аддитивность}] = \\hat{A}(\\alpha\\bar{x}) + \\hat{A}(\\beta\\bar{y}) = [\\text{однородность}] = \\alpha \\hat{A}(\\bar{x}) + \\beta \\hat{A}(\\bar{y})\\)<br>
    <b>\\(\\Leftarrow\\)</b> Пусть \\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\forall \\alpha, \\beta \\in P \\quad \\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) = \\alpha \\hat{A}(\\bar{x}) + \\beta \\hat{A}(\\bar{y})\\)<br>
    Пусть \\(\\alpha = \\beta = 1\\):<br>
    \\(\\hat{A}(\\bar{x} + \\bar{y}) = \\hat{A}(1 \\cdot \\bar{x} + 1 \\cdot \\bar{y}) = 1 \\cdot \\hat{A}(\\bar{x}) + 1 \\cdot \\hat{A}(\\bar{y}) = \\hat{A}(\\bar{x}) + \\hat{A}(\\bar{y}) \\Rightarrow\\) <b>аддитивность доказана</b><br>
    Пусть \\(\\alpha\\) — любое, \\(\\beta = 0\\):<br>
    \\(\\hat{A}(\\alpha\\bar{x}) = \\hat{A}(\\alpha\\bar{x} + 0 \\cdot \\bar{y}) = \\alpha \\hat{A}(\\bar{x}) + 0 \\hat{A}(\\bar{y}) = \\alpha \\hat{A}(\\bar{x}) \\Rightarrow\\) <b>однородность доказана</b> \\(\\blacksquare\\)</p>
    
    <h4 style="color:#0ff;">3. Операции над линейными операторами</h4>
    <p><b>Опр. 2.</b> Пусть \\(\\hat{A}\\) и \\(\\hat{B}\\) — ЛО, действующие в \\(V\\).<br>
    Тогда <b>сумма операторов</b>: \\((\\hat{A} + \\hat{B})(\\bar{x}) = \\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})\\)<br>
    <b>Произведение \\(\\alpha \\in P\\) и \\(\\hat{A}\\)</b>: \\((\\alpha \\hat{A})(\\bar{x}) = \\alpha \\cdot \\hat{A}(\\bar{x})\\)<br>
    <b>Произведение \\(\\hat{A}\\) и \\(\\hat{B}\\)</b>: \\((\\hat{A}\\hat{B})(\\bar{x}) = \\hat{A}(\\hat{B}(\\bar{x}))\\)<br>
    <b>Разность</b>: \\(\\hat{A} - \\hat{B} = \\hat{A} + (-1) \\cdot \\hat{B}\\)</p>
    
    <h4 style="color:#0ff;">4. Теорема о линейности операций</h4>
    <p><b>Теорема 2 (о линейности \\(\\hat{A} + \\hat{B}\\), \\(\\alpha\\hat{A}\\) и \\(\\hat{A}\\hat{B}\\))</b><br>
    Если \\(\\hat{A}\\) и \\(\\hat{B}\\) — ЛО, то \\(\\hat{A} + \\hat{B}\\), \\(\\alpha\\hat{A}\\) и \\(\\hat{A}\\hat{B}\\) — тоже ЛО.</p>
    
    <p><b>Д-во:</b> выберем произвольно \\(\\bar{x}, \\bar{y} \\in V, \\alpha, \\beta, \\gamma \\in P\\)<br>
    1) \\((\\hat{A} + \\hat{B})(\\alpha\\bar{x} + \\beta\\bar{y}) = [\\text{опр. «+» операторов}] = \\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) + \\hat{B}(\\alpha\\bar{x} + \\beta\\bar{y}) = [\\text{линейность } \\hat{A} \\text{ и } \\hat{B}] =\\)<br>
    \\(= \\alpha \\hat{A}(\\bar{x}) + \\beta \\hat{A}(\\bar{y}) + \\alpha \\hat{B}(\\bar{x}) + \\beta \\hat{B}(\\bar{y}) = \\alpha(\\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})) + \\beta(\\hat{A}(\\bar{y}) + \\hat{B}(\\bar{y})) = [\\text{опр. «+» операторов}] =\\)<br>
    \\(= \\alpha(\\hat{A} + \\hat{B})(\\bar{x}) + \\beta(\\hat{A} + \\hat{B})(\\bar{y}) \\Rightarrow \\hat{A} + \\hat{B} - \\text{ЛО}\\)</p>
    
    <p>2) \\((\\alpha \\hat{A})(\\beta\\bar{x} + \\gamma\\bar{y}) = \\alpha \\cdot \\hat{A}(\\beta\\bar{x} + \\gamma\\bar{y}) = \\alpha \\cdot (\\beta \\hat{A}(\\bar{x}) + \\gamma \\hat{A}(\\bar{y})) = \\alpha\\beta \\hat{A}(\\bar{x}) + \\alpha\\gamma \\hat{A}(\\bar{y}) = \\beta(\\alpha \\hat{A})(\\bar{x}) + \\gamma(\\alpha \\hat{A}) \\cdot (\\bar{y}) \\Rightarrow\\)<br>
    \\(\\Rightarrow \\alpha \\hat{A} - \\text{ЛО}\\)</p>
    
    <p>3) \\((\\hat{A}\\hat{B})(\\alpha\\bar{x} + \\beta\\bar{y}) = \\hat{A}(\\hat{B}(\\alpha\\bar{x} + \\beta\\bar{y})) = \\hat{A}(\\alpha \\hat{B}(\\bar{x}) + \\beta \\hat{B}(\\bar{y})) = \\alpha \\hat{A}(\\hat{B}(\\bar{x})) + \\beta \\hat{A}(\\hat{B}(\\bar{y})) =\\)<br>
    \\(= \\alpha(\\hat{A}\\hat{B})(\\bar{x}) + \\beta(\\hat{A}\\hat{B})(\\bar{y}) \\Rightarrow \\hat{A}\\hat{B} - \\text{ЛО}\\) \\(\\blacksquare\\)</p>
</div>
`,

5: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 6. Теорема о связи координат образа и прообраза. Теорема о связи координат в разных базисах. Связь ЛО с алгеброй их матриц.</h3>
    
    <h4 style="color:#0ff;">1. Определение матрицы линейного оператора</h4>
    <p><b>Опр.</b> Пусть \\(\\mathrm{Б} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — <b>базис</b> \\(V\\);<br>
    \\(\\hat{A}\\) — ЛО, действующий в \\(V\\). <b>Матрицей оператора</b> \\(\\hat{A}\\) в базисе \\(\\mathrm{Б}\\) называется матрица \\([\\hat{A}]_{\\mathrm{Б}}\\), любой \\(j\\)-ый столбец которой равен \\([\\hat{A}(\\bar{e}_j)]_{\\mathrm{Б}}\\).</p>
    
    <p>\\(\\hat{A}(\\bar{e}_1) = a_{11}\\bar{e}_1 + a_{21}\\bar{e}_2 + \\dots + a_{n1}\\bar{e}_n\\)<br>
    \\(\\hat{A}(\\bar{e}_2) = a_{12}\\bar{e}_1 + a_{22}\\bar{e}_2 + \\dots + a_{n2}\\bar{e}_n\\)<br>
    \\(\\dots\\)<br>
    \\(\\hat{A}(\\bar{e}_n) = a_{1n}\\bar{e}_1 + a_{2n}\\bar{e}_2 + \\dots + a_{nn}\\bar{e}_n\\)</p>
    
    <p>\\([\\hat{A}]_{\\mathrm{Б}} = \\begin{pmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{n1} & a_{n2} & \\dots & a_{nn} \\end{pmatrix}\\)</p>
    
    <h4 style="color:#0ff;">2. Теорема 1 (о связи образа и прообраза)</h4>
    <p>Пусть \\(\\hat{A}\\) — ЛО, \\(\\mathrm{Б}\\) — базис в \\(V\\). Тогда \\(\\forall \\bar{x} \\in V\\):<br>
    \\([\\hat{A}(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\)</p>
    
    <p><b>Д-во:</b><br>
    \\(\\mathrm{Б} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n); \\bar{x} = x_1\\bar{e}_1 + x_2\\bar{e}_2 + \\dots + x_n\\bar{e}_n\\).<br>
    \\(\\hat{A}(\\bar{x}) = \\hat{A}(x_1\\bar{e}_1 + x_2\\bar{e}_2 + \\dots + x_n\\bar{e}_n) = \\hat{A}(x_1\\bar{e}_1) + \\hat{A}(x_2\\bar{e}_2) + \\dots + \\hat{A}(x_n\\bar{e}_n) =\\)<br>
    \\(= x_1 \\cdot (a_{11}\\bar{e}_1 + a_{21}\\bar{e}_2 + \\dots + a_{n1}\\bar{e}_n) + x_2 \\cdot (a_{12}\\bar{e}_1 + a_{22}\\bar{e}_2 + \\dots + a_{n2}\\bar{e}_n) + \\dots + x_n(a_{1n}\\bar{e}_1 + a_{2n}\\bar{e}_2 + \\dots + a_{nn}\\bar{e}_n) =\\)<br>
    \\(= (a_{11}x_1 + a_{12}x_2 + \\dots + a_{1n}x_n) \\cdot \\bar{e}_1 + (a_{21}x_1 + a_{22}x_2 + \\dots + a_{2n}x_n) \\cdot \\bar{e}_2 + \\dots + (a_{n1}x_1 + a_{n2}x_2 + \\dots + a_{nn}x_n) \\cdot \\bar{e}_n\\).<br>
    \\([\\hat{A}(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} \\blacksquare\\)</p>
    
    <h4 style="color:#0ff;">3. Теорема 2 (связь матриц оператора в разных базисах)</h4>
    <p>\\(\\forall\\) базисов \\(\\mathrm{Б}\\) и \\(\\mathrm{Б}'\\) конечномерного пр-ва \\(V\\) и \\(\\forall\\) ЛО \\(\\hat{A}\\), действующего в \\(V\\):<br>
    \\([\\hat{A}]_{\\mathrm{Б}'} = T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}\\)</p>
    
    <p><b>Д-во:</b><br>
    \\([\\hat{A}(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} \\cdot [\\bar{x}]_{\\mathrm{Б}'}\\)<br>
    \\([\\hat{A}(\\bar{x})]_{\\mathrm{Б}} = T_{\\mathrm{Б} \\to \\mathrm{Б}'} \\cdot [\\hat{A}(\\bar{x})]_{\\mathrm{Б}'} = T_{\\mathrm{Б} \\to \\mathrm{Б}'} \\cdot [\\hat{A}]_{\\mathrm{Б}'} \\cdot [\\bar{x}]_{\\mathrm{Б}'}\\)<br>
    \\(\\underbrace{T_{\\mathrm{Б} \\to \\mathrm{Б}'} \\cdot [\\hat{A}]_{\\mathrm{Б}'}}_{C} \\cdot [\\bar{x}]_{\\mathrm{Б}'} = \\underbrace{[\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}}_{D} \\cdot [\\bar{x}]_{\\mathrm{Б}'}\\) — и так далее.<br>
    \\(\\forall \\bar{x} \\in V \\Leftrightarrow \\forall\\) матрица-столбец, которую мы берём в качестве \\([\\bar{x}]_{\\mathrm{Б}'}\\).<br>
    \\(\\forall \\bar{x}_{n \\times 1} \\quad C_{n \\times n} \\cdot \\bar{x}_{n \\times 1} = D_{n \\times n} \\cdot \\bar{x}_{n \\times 1}\\).<br>
    Возьмём \\(\\bar{x}_{n \\times 1} = \\begin{pmatrix} 1 \\\\ 0 \\\\ \\dots \\\\ 0 \\end{pmatrix} \\Rightarrow \\begin{pmatrix} c_{11} \\\\ c_{21} \\\\ \\dots \\\\ c_{n1} \\end{pmatrix} = \\begin{pmatrix} d_{11} \\\\ d_{21} \\\\ \\dots \\\\ d_{n1} \\end{pmatrix}\\).<br>
    [аналогично для остальных столбцов] \\(\\Rightarrow C_{n \\times n} = D_{n \\times n}\\).<br>
    \\(T_{\\mathrm{Б} \\to \\mathrm{Б}'} \\cdot [\\hat{A}]_{\\mathrm{Б}'} = [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}\\)<br>
    \\([\\hat{A}]_{\\mathrm{Б}'} = T_{\\mathrm{Б} \\to \\mathrm{Б}'}^{-1} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}\\)<br>
    \\([\\hat{A}]_{\\mathrm{Б}'} = T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} \\blacksquare\\)</p>
    
    <h4 style="color:#0ff;">4. Теорема 5 (связь ЛО с алгеброй их матриц)</h4>
    <p>Пусть \\(\\hat{A}\\) и \\(\\hat{B}\\) — ЛО, действующие в конечномерном ЛП \\(V\\), \\(\\mathrm{Б}\\) — некоторый базис \\(V\\). Тогда:<br>
    1) \\([\\hat{A} + \\hat{B}]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} + [\\hat{B}]_{\\mathrm{Б}}\\)<br>
    2) \\([\\hat{A}\\hat{B}]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\hat{B}]_{\\mathrm{Б}}\\)<br>
    3) \\(\\forall \\alpha \\in P \\quad [\\alpha\\hat{A}]_{\\mathrm{Б}} = \\alpha[\\hat{A}]_{\\mathrm{Б}}\\)</p>
    
    <p><b>Д-во (1):</b><br>
    \\((\\hat{A} + \\hat{B})(\\bar{x}) = \\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})\\)<br>
    \\([(\\hat{A} + \\hat{B})(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A} + \\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\)<br>
    \\([\\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}(\\bar{x})]_{\\mathrm{Б}} + [\\hat{B}(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} + [\\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} = ([\\hat{A}]_{\\mathrm{Б}} + [\\hat{B}]_{\\mathrm{Б}}) \\cdot [\\bar{x}]_{\\mathrm{Б}}\\)<br>
    \\([\\hat{A} + \\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} = ([\\hat{A}]_{\\mathrm{Б}} + [\\hat{B}]_{\\mathrm{Б}}) \\cdot [\\bar{x}]_{\\mathrm{Б}}\\) — верно \\(\\forall \\bar{x} \\Rightarrow\\) [тот же приём, что и в т. 1] \\(\\Rightarrow [\\hat{A} + \\hat{B}]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} + [\\hat{B}]_{\\mathrm{Б}}\\).</p>
    
    <p><b>Д-во (2):</b><br>
    \\((\\hat{A}\\hat{B})(\\bar{x}) = \\hat{A}(\\hat{B}(\\bar{x}))\\)<br>
    \\([(\\hat{A}\\hat{B})(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}\\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\)<br>
    \\([\\hat{A}(\\hat{B}(\\bar{x}))]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\hat{B}(\\bar{x})]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\)<br>
    \\([\\hat{A}\\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\hat{B}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\) — верно \\(\\forall \\bar{x} \\Rightarrow [\\hat{A}\\hat{B}]_{\\mathrm{Б}} = [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\hat{B}]_{\\mathrm{Б}}\\).</p>
    
    <p><b>Д-во (3):</b><br>
    \\((\\alpha\\hat{A})(\\bar{x}) = \\alpha\\hat{A}(\\bar{x})\\)<br>
    \\([(\\alpha\\hat{A})(\\bar{x})]_{\\mathrm{Б}} = [\\alpha\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} = [\\alpha \\cdot (\\hat{A}(\\bar{x}))]_{\\mathrm{Б}} = \\alpha \\cdot [\\hat{A}(\\bar{x})]_{\\mathrm{Б}} = \\alpha \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\)<br>
    \\([\\alpha\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}} = \\alpha \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot [\\bar{x}]_{\\mathrm{Б}}\\) — верно \\(\\forall \\bar{x} \\Rightarrow [\\alpha\\hat{A}]_{\\mathrm{Б}} = \\alpha[\\hat{A}]_{\\mathrm{Б}}\\).</p>
</div>
`,
    6: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 7. Теорема о ядре и области значений как подпространства. Теорема о ранге и дефекте.</h3>
    
    <h4 style="color:#0ff;">1. Основные определения</h4>
    <p><b>Опр. 1.</b> <b>Ядром</b> ЛО \\(\\hat{A}\\), действующего в ЛП \\(V\\), называется мн-во векторов \\(\\text{Ker}(\\hat{A}) = \\{ \\bar{x} \\in V : \\hat{A}(\\bar{x}) = \\bar{o} \\}\\).</p>
    <p><b>Опр. 2.</b> <b>Областью значений</b> ЛО \\(\\hat{A}\\), действующего в ЛП \\(V\\), называется мн-во векторов \\(\\text{Im}(\\hat{A}) = \\{ \\bar{y} \\in V : \\exists \\bar{x} \\in V : \\hat{A}(\\bar{x}) = \\bar{y} \\}\\).</p>
    
    <h4 style="color:#0ff;">2. Теорема о ядре и области значений</h4>
    <p><b>Теорема.</b> \\(\\text{Ker}(\\hat{A}) \\subseteq V, \\text{Im}(\\hat{A}) \\subseteq V\\) (являются подпространствами).</p>
    <p><b>Д-во:</b><br>
    1. Пусть \\(\\bar{x}, \\bar{y} \\in \\text{Ker}(\\hat{A}), \\alpha, \\beta \\in P\\). Тогда:<br>
    \\(\\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) = [\\text{линейность}] = \\alpha \\underbrace{\\hat{A}(\\bar{x})}_{\\bar{o}} + \\beta \\underbrace{\\hat{A}(\\bar{y})}_{\\bar{o}} = \\bar{o} \\Rightarrow (\\alpha\\bar{x} + \\beta\\bar{y}) \\in \\text{Ker}(\\hat{A})\\).<br>
    2. Пусть \\(\\bar{y}_1, \\bar{y}_2 \\in \\text{Im}(\\hat{A}), \\alpha, \\beta \\in P\\). Тогда:<br>
    \\(\\exists \\bar{x}_1 \\in V : \\hat{A}(\\bar{x}_1) = \\bar{y}_1\\) и \\(\\exists \\bar{x}_2 \\in V : \\\\hat{A}(\\bar{x}_2) = \\bar{y}_2 \\Rightarrow\\)<br>
    \\(\\Rightarrow \\hat{A}(\\alpha\\bar{x}_1 + \\beta\\bar{x}_2) = \\alpha \\hat{A}(\\bar{x}_1) + \\beta \\hat{A}(\\bar{x}_2) = \\alpha \\bar{y}_1 + \\beta \\bar{y}_2 \\Rightarrow\\)<br>
    \\(\\Rightarrow (\\alpha \\bar{y}_1 + \\beta \\bar{y}_2) \\in \\text{Im}(\\hat{A})\\).<br>
    Если ЛП \\(V\\) конечномерно, то \\(\\text{Ker}(\\hat{A})\\) и \\(\\text{Im}(\\hat{A})\\) тоже конечномерны.</p>
    
    <h4 style="color:#0ff;">3. Понятия ранга и дефекта</h4>
    <p><b>Опр. 3.</b> Размерность \\(\\text{Ker}(\\hat{A})\\) называется <b>дефектом</b> \\(\\hat{A}\\) и обозначается \\(d(\\hat{A})\\). Размерность \\(\\text{Im}(\\hat{A})\\) называется <b>рангом</b> \\(\\hat{A}\\) и обозначается \\(Rg(\\hat{A})\\).</p>
    
    <h4 style="color:#0ff;">4. Теорема о ранге и дефекте</h4>
    <p><b>Теорема 2.</b> \\(Rg(\\hat{A}) + d(\\hat{A}) = \\dim(V)\\).</p>
    <p><b>Д-во:</b><br>
    Пусть \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_d)\\) — базис \\(\\text{Ker}(\\hat{A})\\).<br>
    Дополним его до базиса \\(V\\): \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_d, \\bar{e}_{d+1}, \\dots, \\bar{e}_n)\\).<br>
    Возьмём \\(\\bar{y} \\in \\text{Im}(\\hat{A})\\). По определению \\(\\exists \\bar{x} \\in V : \\hat{A}(\\bar{x}) = \\bar{y}\\).<br>
    Разложим \\(\\bar{x}\\) по базису \\(V\\):<br>
    \\(\\bar{x} = \\alpha_1 \\bar{e}_1 + \\dots + \\alpha_d \\bar{e}_d + \\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n\\).<br>
    \\(\\bar{y} = \\hat{A}(\\bar{x}) = \\hat{A}(\\underbrace{\\alpha_1 \\bar{e}_1 + \\dots + \\alpha_d \\bar{e}_d}_{\\text{эти из ядра, их образы } = \\bar{o}}) + \\alpha_{d+1} \\hat{A}(\\bar{e}_{d+1}) + \\dots + \\alpha_n \\hat{A}(\\bar{e}_n) =\\)<br>
    \\(= \\alpha_{d+1} \\hat{A}(\\bar{e}_{d+1}) + \\dots + \\alpha_n \\hat{A}(\\bar{e}_n)\\).<br>
    Докажем линейную независимость системы \\((\\hat{A}(\\bar{e}_{d+1}), \\dots, \\hat{A}(\\bar{e}_n))\\):<br>
    Пусть \\(\\alpha_{d+1} \\hat{A}(\\bar{e}_{d+1}) + \\dots + \\alpha_n \\hat{A}(\\bar{e}_n) = \\bar{o}\\).<br>
    Тогда \\(\\hat{A}(\\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n) = \\bar{o} \\Rightarrow\\)<br>
    \\(\\Rightarrow (\\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n) \\in \\text{Ker}(\\hat{A})\\).<br>
    Значит, этот вектор можно выразить через базис ядра:<br>
    \\(\\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n = \\beta_1 \\bar{e}_1 + \\dots + \\beta_d \\bar{e}_d \\Rightarrow\\)<br>
    \\(\\Rightarrow \\beta_1 \\bar{e}_1 + \\dots + \\beta_d \\bar{e}_d - \\alpha_{d+1} \\bar{e}_{d+1} - \\dots - \\alpha_n \\bar{e}_n = \\bar{o}\\).<br>
    Т.к. вся система \\((\\bar{e}_1, \\dots, \\bar{e}_n)\\) — базис \\(V\\) (ЛНС), то все коэффициенты \\(\\beta_i\\) и \\(\\alpha_j\\) равны \\(0\\).<br>
    Следовательно, \\((\\hat{A}(\\bar{e}_{d+1}), \\dots, \\hat{A}(\\bar{e}_n))\\) — ЛНС \\(\\Rightarrow\\) это базис \\(\\text{Im}(\\hat{A})\\).<br>
    Количество векторов в нём: \\(Rg(\\hat{A}) = n - d = \\dim(V) - d(\\hat{A})\\).<br>
    \\(Rg(\\hat{A}) + d(\\hat{A}) = \\dim(V) \\blacksquare\\)</p>
</div>
`,

7: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 8. Теорема об инвариантности характеристического многочлена. Связь СЗ с корнями характеристического уравнения.</h3>
    
    <h4 style="color:#0ff;">1. Основные определения</h4>
    <p><b>Опр. 1.</b> Пусть \\(\\hat{A}\\) — ЛО, действующий в ЛП \\(V\\) над числовым полем \\(P\\). Число \\(\\lambda \\in P\\) называется <b>собственным значением (СЗ)</b> ЛО \\(\\hat{A}\\), а ненулевой вектор \\(\\bar{x} \\in V\\) называется <b>собственным вектором (СВ)</b> ЛО \\(\\hat{A}\\), соответствующим СЗ \\(\\lambda\\), если \\(\\hat{A}(\\bar{x}) = \\lambda \\bar{x}\\).</p>
    <p><b>Опр. 2.</b> Пусть \\(\\hat{A}\\) — ЛО, действующий в ЛП \\(V\\) над числовым полем \\(P\\). Многочлен \\(|[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}|\\) называется <b>характеристическим многочленом (ХМ)</b> \\(\\hat{A}(\\lambda)\\), а уравнение \\(|[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| = 0\\) — <b>характеристическим уравнением</b> оператора \\(\\hat{A}(\\lambda)\\).</p>
    
    <h4 style="color:#0ff;">2. Теорема 1 (об инвариантности ХМ)</h4>
    <p>ХМ конкретного ЛО \\(\\hat{A}\\) имеет один и тот же вид во всех базисах.</p>
    <p><b>Д-во:</b><br>
    \\(\\mathrm{Б}\\) и \\(\\mathrm{Б}'\\) — базисы ЛП \\(V\\), в которых действует ЛО \\(\\hat{A}\\).<br>
    \\([\\hat{A}]_{\\mathrm{Б}'} - \\lambda E_{n \\times n} = T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} - \\lambda \\cdot E_{n \\times n} =\\)<br>
    \\(= T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} - \\lambda \\cdot T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} =\\)<br>
    \\(= T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} - \\lambda \\cdot T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot E_{n \\times n} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} =\\)<br>
    \\(= T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot [\\hat{A}]_{\\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} - T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot \\lambda \\cdot E_{n \\times n} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'} =\\)<br>
    \\(= T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot ([\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}) \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}\\)</p>
    <p>\\(|[\\hat{A}]_{\\mathrm{Б}'} - \\lambda E_{n \\times n}| = |T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot ([\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}) \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}| =\\)<br>
    \\(= |T_{\\mathrm{Б}' \\to \\mathrm{Б}}| \\cdot |([\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n})| \\cdot |T_{\\mathrm{Б} \\to \\mathrm{Б}'}| = |T_{\\mathrm{Б}' \\to \\mathrm{Б}}| \\cdot |T_{\\mathrm{Б} \\to \\mathrm{Б}'}| \\cdot |[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| =\\)<br>
    \\(= |T_{\\mathrm{Б}' \\to \\mathrm{Б}} \\cdot T_{\\mathrm{Б} \\to \\mathrm{Б}'}| \\cdot |[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| =\\)<br>
    \\(= |E_{n \\times n}| \\cdot |[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| = |[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| \\blacksquare\\)</p>
    
    <h4 style="color:#0ff;">3. Теорема 2 (связь СЗ с корнями ХУ)</h4>
    <p>Пусть \\(\\hat{A}\\) — ЛО, действующий в ЛП \\(V\\) над числовым полем \\(P\\). \\(\\lambda \\in P\\) является СЗ ЛО \\(\\hat{A} \\iff \\lambda\\) — корень ХУ ЛО \\(\\hat{A}\\).</p>
    <p><b>Д-во:</b><br>
    Выберем базис \\(\\mathrm{Б}\\) в ЛП \\(V\\).<br>
    \\(\\lambda \\in P\\) — СЗ \\(\\iff \\exists \\bar{x} \\neq \\bar{o} : \\hat{A}(\\bar{x}) = \\lambda \\cdot \\bar{x} \\iff \\exists X_{n \\times 1} \\neq O_{n \\times 1} : [\\hat{A}]_{\\mathrm{Б}} \\cdot X_{n \\times 1} = \\lambda \\cdot X_{n \\times 1} \\iff\\)<br>
    \\(\\iff \\exists X_{n \\times 1} \\neq O_{n \\times 1} : [\\hat{A}]_{\\mathrm{Б}} \\cdot X_{n \\times 1} - \\lambda E_{n \\times n} \\cdot X_{n \\times 1} = O_{n \\times 1} \\iff\\)<br>
    \\(\\iff \\exists X_{n \\times 1} \\neq O_{n \\times 1} : ([\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}) \\cdot X_{n \\times 1} = O_{n \\times 1} \\iff\\)<br>
    \\(\\iff\\) у ОСЛУ с матрицей \\(([\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n})\\) существует нетривиальное решение \\(\\iff |[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| = 0 \\blacksquare\\)</p>
</div>
`,

8: `
<div style="font-size:0.9rem; line-height:1.6; font-family: 'Latin Modern Math', 'STIX Two Math', serif; color: #e0e8ff;">
    <h3 style="color:#0ff;">Билет 9. Теорема об определителе полураспавшейся матрицы. ЛНС СВ.</h3>
    
    <h4 style="color:#0ff;">1. Теорема (об определителе полураспавшейся матрицы)</h4>
    <p>$$\\begin{vmatrix} A_{m \\times m} & C_{m \\times n} \\\\ O_{n \\times m} & B_{n \\times n} \\end{vmatrix} = |A_{m \\times m}| \\cdot |B_{n \\times n}|$$</p>
    
    <h4 style="color:#0ff;">2. Теорема 1 (ЛНС СВ)</h4>
    <p>1) \\(\\mathrm{Б}\\) — <b>базис из СВ</b> ЛО \\(\\hat{A} \\Leftrightarrow [\\hat{A}]_{\\mathrm{Б}} = \\begin{pmatrix} \\lambda_1 & 0 & \\dots & 0 \\\\ 0 & \\lambda_2 & \\dots & 0 \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & \\dots & \\lambda_n \\end{pmatrix}\\), где \\(\\lambda_i\\) — СЗ ЛО \\(\\hat{A}\\).<br>
    2) <b>Кол-во линейно независимых СВ</b>, соответствующих корню ХУ ЛО \\(\\hat{A}\\), не превосходит кратности этого корня.<br>
    3) Пусть \\(\\bar{e}_{11}, \\bar{e}_{12}, \\dots, \\bar{e}_{1n_1}\\) — ЛНС СВ, соотв. СЗ \\(\\lambda_1\\); \\(\\bar{e}_{21}, \\bar{e}_{22}, \\dots, \\bar{e}_{2n_2}\\) — ЛНС СВ, соотв. СЗ \\(\\lambda_2\\); ... ; \\(\\bar{e}_{k1}, \\bar{e}_{k2}, \\dots, \\bar{e}_{kn_k}\\) — ЛНС СВ, соотв. СЗ \\(\\lambda_k\\); числа \\(\\lambda_1, \\lambda_2, \\dots, \\lambda_k\\) — <b>попарно различны</b>. Тогда \\(\\bar{e}_{11}, \\bar{e}_{12}, \\dots, \\bar{e}_{1n_1}, \\bar{e}_{21}, \\bar{e}_{22}, \\dots, \\bar{e}_{2n_2}, \\dots, \\bar{e}_{k1}, \\bar{e}_{k2}, \\dots, \\bar{e}_{kn_k}\\) — <b>ЛНС</b>.</p>
    
    <h4 style="color:#0ff;">3. Доказательство</h4>
    <p><b>1)</b> Пусть \\(\\mathrm{Б} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — базис СВ \\(\\Leftrightarrow\\)<br>
    \\(\\forall i \\in \\{1, 2, \\dots, n\\} \\quad \\hat{A}(\\bar{e}_i) = \\lambda_i \\cdot \\bar{e}_i \\Leftrightarrow\\)<br>
    \\(\\Leftrightarrow \\begin{cases} \\hat{A}(\\bar{e}_1) = \\lambda_1 \\bar{e}_1 + 0 \\cdot \\bar{e}_2 + \\dots + 0 \\cdot \\bar{e}_n \\\\ \\hat{A}(\\bar{e}_2) = 0 \\cdot \\bar{e}_1 + \\lambda_2 \\cdot \\bar{e}_2 + \\dots + 0 \\cdot \\bar{e}_n \\\\ \\dots \\\\ \\hat{A}(\\bar{e}_n) = 0 \\cdot \\bar{e}_1 + 0 \\cdot \\bar{e}_2 + \\dots + \\lambda_n \\cdot \\bar{e}_n \\end{cases} \\Leftrightarrow [\\hat{A}]_{\\mathrm{Б}} = \\begin{pmatrix} \\lambda_1 & 0 & \\dots & 0 \\\\ 0 & \\lambda_2 & \\dots & 0 \\\\ \\vdots & \\vdots & \\vdots & \\vdots \\\\ 0 & 0 & \\dots & \\lambda_n \\end{pmatrix}\\).</p>
    
    <p><b>2)</b> Пусть \\(\\lambda = \\lambda_0\\) — корень ХУ ЛО \\(\\hat{A}\\) кратности \\(k\\). Предположим, что для СЗ \\(\\lambda_0\\) \\(\\exists k+1\\) линейно независимых СВ: \\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_{k+1}\\). Дополним эту систему до базиса ЛП \\(V\\):<br>
    \\(\\mathrm{Б} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_{k+1}, \\bar{e}_{k+2}, \\dots, \\bar{e}_n)\\) — базис \\(V\\).<br>
    Составим \\([\\hat{A}]_{\\mathrm{Б}} = \\begin{pmatrix} \\lambda_0 & 0 & \\dots & 0 & a_{1,k+2} & \\dots & a_{1n} \\\\ 0 & \\lambda_0 & \\dots & 0 & a_{2,k+2} & \\dots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots & \\vdots & & \\vdots \\\\ 0 & 0 & \\dots & \\lambda_0 & a_{k+1,k+2} & \\dots & a_{k+1,n} \\\\ 0 & 0 & \\dots & 0 & a_{k+2,k+2} & \\dots & a_{k+2,n} \\\\ \\vdots & \\vdots & \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & \\dots & 0 & a_{n,k+2} & \\dots & a_{nn} \\end{pmatrix}\\)<br>
    \\(|[\\hat{A}]_{\\mathrm{Б}} - \\lambda E_{n \\times n}| = \\begin{vmatrix} \\lambda_0 - \\lambda & \\dots & 0 & \\vdots \\\\ \\vdots & \\ddots & \\vdots & B \\\\ 0 & \\dots & \\lambda_0 - \\lambda & \\vdots \\\\ \\dots & \\dots & \\dots & \\dots \\\\ 0 & \\dots & 0 & \\vdots & C(\\lambda) \\end{vmatrix} = (\\lambda_0 - \\lambda)^{k+1} \\cdot |C(\\lambda)| = (-1)^{k+1} \\cdot (\\lambda - \\lambda_0)^{k+1} \\cdot |C(\\lambda)| \\Rightarrow\\)<br>
    \\(\\Rightarrow \\lambda = \\lambda_0\\) — корень кратности \\(k+1\\). <b>Противоречие</b>.</p>
    
    <p><b>3) Индукцией по \\(k\\).</b><br>
    <b>БИ (\\(k=1\\)):</b> \\(\\bar{e}_{11}, \\bar{e}_{12}, \\dots, \\bar{e}_{1n_1}\\) — ЛНС по условию.<br>
    <b>ШИ:</b> Предположим, что утверждение справедливо для некоторого \\(k\\); покажем, что тогда оно справедливо для \\(k+1\\).<br>
    \\(\\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{o}\\)<br>
    Подействуем оператором \\(\\hat{A}\\) на обе части равенства:<br>
    \\(\\lambda_1 \\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\lambda_2 \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + \\lambda_k \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\lambda_{k+1} \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{o}\\)<br>
    Умножим исходное равенство на \\(\\lambda_{k+1}\\):<br>
    \\(\\lambda_{k+1} \\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\lambda_{k+1} \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + \\lambda_{k+1} \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\lambda_{k+1} \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{o}\\)<br>
    Теперь вычтем полученные равенства:<br>
    \\((\\lambda_{k+1} - \\lambda_1) \\cdot \\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\dots + (\\lambda_{k+1} - \\lambda_k) \\cdot \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\bar{o} = \\bar{o}\\)<br>
    Для \\(k\\) СЗ утв. теоремы справедливо \\(\\Rightarrow \\underbrace{(\\lambda_{k+1} - \\lambda_j)}_{\\neq 0} \\cdot \\alpha_{ji} = 0 \\Rightarrow \\alpha_{ji} = 0\\) (\\(j \\in \\{1, \\dots, k\\}\\)).<br>
    Остается \\(\\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{o} \\Rightarrow \\alpha_{k+1,i} = 0 \\Rightarrow\\) объединенная система СВ — <b>ЛНС</b> \\(\\blacksquare\\)</p>
</div>
`,
    9: "📖 Конспект для билета 10",
    10: "📖 Конспект для билета 11",
    11: "📖 Конспект для билета 12",
    12: "📖 Конспект для билета 13",
    13: "📖 Конспект для билета 14",
    14: "📖 Конспект для билета 15",
    15: "📖 Конспект для билета 16",
    16: "📖 Конспект для билета 17",
    17: "📖 Конспект для билета 18 (будет добавлен)",
    18: "📖 Конспект для билета 19 (будет добавлен)"
};