const CONSPECTS = {
    0: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 1. Критерии линейности оператора. Теорема о линейности суммы операторов, произведения оператора и числа, а также произведения операторов.</h3>

    <h4 style="color:#1a3a6e;">1. Вспомогательные определения (из 1-го семестра)</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Отображение</b> из множества \\(X\\) в множество \\(Y\\) — это правило, которое каждому элементу \\(x \\in X\\) ставит в соответствие единственный элемент \\(y \\in Y\\).</p>

    <p><b>Опр. 2.</b></p>
    <p><b>Линейным пространством (линейное пространство)</b> над числовым полем \\(P\\) называется множество \\(V\\) ≠ \\(\\varnothing\\), на котором определены операции «\\(+\\)» и «\\(\\cdot\\)» на число из \\(P\\), удовлетворяющие 8 аксиомам:</p>
    <ol>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\bar{x} + \\bar{y} = \\bar{y} + \\bar{x}\\) (коммутативность)</li>
        <li>\\(\\forall \\bar{x}, \\bar{y}, \\bar{z} \\in V \\quad (\\bar{x} + \\bar{y}) + \\bar{z} = \\bar{x} + (\\bar{y} + \\bar{z})\\) (ассоциативность)</li>
        <li>\\(\\exists \\bar{0} \\in V : \\forall \\bar{x} \\in V \\quad \\bar{x} + \\bar{0} = \\bar{x}\\) (существование нуля)</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists (-\\bar{x}) \\in V : \\bar{x} + (-\\bar{x}) = \\bar{0}\\) (существование противоположного)</li>
        <li>\\(\\forall \\alpha \\in P,\\ \\forall \\bar{x}, \\bar{y} \\in V \\quad \\alpha(\\bar{x} + \\bar{y}) = \\alpha\\bar{x} + \\alpha\\bar{y}\\)</li>
        <li>\\(\\forall \\alpha, \\beta \\in P,\\ \\forall \\bar{x} \\in V \\quad (\\alpha + \\beta) \\cdot \\bar{x} = \\alpha\\bar{x} + \\beta\\bar{x}\\)</li>
        <li>\\(\\forall \\alpha, \\beta \\in P,\\ \\forall \\bar{x} \\in V \\quad \\alpha(\\beta\\bar{x}) = (\\alpha\\beta)\\bar{x}\\)</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad 1 \\cdot \\bar{x} = \\bar{x}\\)</li>
    </ol>

    <h4 style="color:#1a3a6e;">2. Определение и критерий линейного оператора</h4>

    <p><b>Опр. 3.</b></p>
    <p><b>Линейным оператором (линейный оператор)</b>, действующим в линейное пространство \\(V\\), называется отображение \\(\\hat{A} : V \\to V\\), обладающее следующими свойствами:</p>
    <ol>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\hat{A}(\\bar{x} + \\bar{y}) = \\hat{A}(\\bar{x}) + \\hat{A}(\\bar{y})\\) — <b>аддитивность</b>;</li>
        <li>\\(\\forall \\bar{x} \\in V\\ \\forall \\alpha \\in P \\quad \\hat{A}(\\alpha\\bar{x}) = \\alpha \\cdot \\hat{A}(\\bar{x})\\) — <b>однородность</b>.</li>
    </ol>

    <p><b>Теорема 1 (критерий линейности)</b></p>
    <p>$$\\hat{A} : V \\to V \\text{ — линейный оператор} \\iff \\forall \\bar{x}, \\bar{y} \\in V\\ \\forall \\alpha, \\beta \\in P \\quad \\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) = \\alpha\\hat{A}(\\bar{x}) + \\beta\\hat{A}(\\bar{y}).$$</p>

    <p><b>Доказательство:</b></p>

    <p><b>\\((\\implies)\\)</b> Пусть \\(\\hat{A} : V \\to V\\) — линейный оператор.</p>
    <p>$$\\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) \\stackrel{\\text{аддит.}}{=} \\hat{A}(\\alpha\\bar{x}) + \\hat{A}(\\beta\\bar{y}) \\stackrel{\\text{однор.}}{=} \\alpha\\hat{A}(\\bar{x}) + \\beta\\hat{A}(\\bar{y}).$$</p>

    <p><b>\\((\\impliedby)\\)</b> Пусть \\(\\forall \\bar{x}, \\bar{y} \\in V\\ \\forall \\alpha, \\beta \\in P\\) выполняется равенство \\(\\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) = \\alpha\\hat{A}(\\bar{x}) + \\beta\\hat{A}(\\bar{y})\\).</p>

    <p><b>Аддитивность:</b> положим \\(\\alpha = \\beta = 1\\):</p>
    <p>$$\\hat{A}(\\bar{x} + \\bar{y}) = \\hat{A}(1 \\cdot \\bar{x} + 1 \\cdot \\bar{y}) = 1 \\cdot \\hat{A}(\\bar{x}) + 1 \\cdot \\hat{A}(\\bar{y}) = \\hat{A}(\\bar{x}) + \\hat{A}(\\bar{y}).$$</p>

    <p><b>Однородность:</b> \\(\\alpha\\) — произвольное, \\(\\beta = 0\\):</p>
    <p>$$\\hat{A}(\\alpha\\bar{x}) = \\hat{A}(\\alpha\\bar{x} + 0 \\cdot \\bar{y}) = \\alpha\\hat{A}(\\bar{x}) + 0 \\cdot \\hat{A}(\\bar{y}) = \\alpha\\hat{A}(\\bar{x}). \\blacksquare$$</p>

    <h4 style="color:#1a3a6e;">3. Операции над линейными операторами</h4>

    <p><b>Опр. 4.</b></p>
    <p>Пусть \\(\\hat{A}\\) и \\(\\hat{B}\\) — линейный оператор, действующие в \\(V\\).</p>
    <ul>
        <li><b>Сумма операторов</b>: \\((\\hat{A} + \\hat{B})(\\bar{x}) = \\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})\\)</li>
        <li><b>Произведение на число</b> \\(\\alpha \\in P\\): \\((\\alpha\\hat{A})(\\bar{x}) = \\alpha \\cdot \\hat{A}(\\bar{x})\\)</li>
        <li><b>Произведение (композиция)</b>: \\((\\hat{A}\\hat{B})(\\bar{x}) = \\hat{A}(\\hat{B}(\\bar{x}))\\)</li>
        <li><b>Разность</b>: \\(\\hat{A} - \\hat{B} = \\hat{A} + (-1) \\cdot \\hat{B}\\)</li>
    </ul>

    <h4 style="color:#1a3a6e;">4. Теорема о линейности операций</h4>

    <p><b>Теорема 2 (о линейности \\(\\hat{A} + \\hat{B}\\), \\(\\alpha\\hat{A}\\) и \\(\\hat{A}\\hat{B}\\))</b></p>
    <p>Если \\(\\hat{A}\\) и \\(\\hat{B}\\) — линейный оператор, то \\(\\hat{A} + \\hat{B}\\), \\(\\alpha\\hat{A}\\) и \\(\\hat{A}\\hat{B}\\) — тоже линейный оператор.</p>

    <p><b>Доказательство:</b> выберем произвольно \\(\\bar{x}, \\bar{y} \\in V\\), \\(\\alpha, \\beta \\in P\\).</p>

    <p><b>1. Для суммы:</b></p>
    <p>$$
    \\begin{aligned}
    (\\hat{A} + \\hat{B})(\\alpha\\bar{x} + \\beta\\bar{y})
    &\\stackrel{\\text{опр. $+$}}{=} \\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) + \\hat{B}(\\alpha\\bar{x} + \\beta\\bar{y}) \\\\
    &\\stackrel{\\text{лин. }\\hat{A},\\hat{B}}{=}
    \\alpha\\hat{A}(\\bar{x}) + \\beta\\hat{A}(\\bar{y}) + \\alpha\\hat{B}(\\bar{x}) + \\beta\\hat{B}(\\bar{y}) \\\\
    &= \\alpha\\bigl(\\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})\\bigr) + \\beta\\bigl(\\hat{A}(\\bar{y}) + \\hat{B}(\\bar{y})\\bigr) \\\\
    &\\stackrel{\\text{опр. $+$}}{=} \\alpha (\\hat{A} + \\hat{B})(\\bar{x}) + \\beta (\\hat{A} + \\hat{B})(\\bar{y}) \\\\
    &\\implies \\hat{A} + \\hat{B} \\text{ — линейный оператор}.
    \\end{aligned}
    $$</p>

    <p><b>2. Для произведения на число:</b> пусть \\(\\gamma \\in P\\) — произвольное число.</p>
    <p>$$
    \\begin{aligned}
    (\\gamma\\hat{A})(\\alpha\\bar{x} + \\beta\\bar{y})
    &\\stackrel{\\text{опр. }\\cdot}{=} \\gamma \\cdot \\hat{A}(\\alpha\\bar{x} + \\beta\\bar{y}) \\\\
    &\\stackrel{\\text{лин. }\\hat{A}}{=} \\gamma \\cdot \\bigl(\\alpha\\hat{A}(\\bar{x}) + \\beta\\hat{A}(\\bar{y})\\bigr) \\\\
    &= \\alpha \\bigl(\\gamma\\hat{A}(\\bar{x})\\bigr) + \\beta \\bigl(\\gamma\\hat{A}(\\bar{y})\\bigr) \\\\
    &\\stackrel{\\text{опр. }\\cdot}{=} \\alpha (\\gamma\\hat{A})(\\bar{x}) + \\beta (\\gamma\\hat{A})(\\bar{y}) \\\\
    &\\implies \\gamma\\hat{A} \\text{ — линейный оператор}.
    \\end{aligned}
    $$</p>

    <p><b>3. Для произведения операторов:</b></p>
    <p>$$
    \\begin{aligned}
    (\\hat{A}\\hat{B})(\\alpha\\bar{x} + \\beta\\bar{y})
    &\\stackrel{\\text{опр. произв.}}{=} \\hat{A}\\bigl(\\hat{B}(\\alpha\\bar{x} + \\beta\\bar{y})\\bigr) \\\\
    &\\stackrel{\\text{лин. }\\hat{B}}{=} \\hat{A}\\bigl(\\alpha\\hat{B}(\\bar{x}) + \\beta\\hat{B}(\\bar{y})\\bigr) \\\\
    &\\stackrel{\\text{лин. }\\hat{A}}{=} \\alpha\\hat{A}(\\hat{B}(\\bar{x})) + \\beta\\hat{A}(\\hat{B}(\\bar{y})) \\\\
    &\\stackrel{\\text{опр. произв.}}{=} \\alpha (\\hat{A}\\hat{B})(\\bar{x}) + \\beta (\\hat{A}\\hat{B})(\\bar{y}) \\\\
    &\\implies \\hat{A}\\hat{B} \\text{ — линейный оператор}. \\blacksquare
    \\end{aligned}
    $$</p>
</div>
`,
    1: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 2. Матрица линейного оператора. Теорема о связи координат образа и прообраза. Теорема о связи матриц одного и того же оператора в разных базисах.</h3>

    <h4 style="color:#1a3a6e;">1. Определения из 1-го семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p>Упорядоченная система векторов \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) из \\(V\\) называется <b>базисом</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n\\) — линейно независимая система;</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists \\alpha_1, \\alpha_2, \\dots, \\alpha_n \\in P : \\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_n \\bar{e}_n\\).</li>
    </ol>

    <p><b>Матрица перехода</b></p>
    <p>\\(T_{\\text{Б} \\to \\text{Б}'}\\) — матрица, столбцы которой — координаты векторов нового базиса в старом.</p>

    <p><b>Теорема.</b></p>
    <p>\\([\\bar{x}]_\\text{Б} = T_{\\text{Б} \\to \\text{Б}'} \\cdot [\\bar{x}]_{\\text{Б}'}\\).</p>

    <p><b>Следствие.</b></p>
    <p>\\(T_{\\text{Б}' \\to \\text{Б}} = T_{\\text{Б} \\to \\text{Б}'}^{-1}\\).</p>

    <h4 style="color:#1a3a6e;">2. Матрица оператора</h4>

    <p><b>Опр. 2.</b></p>
    <p>Пусть \\(\\text{Б} = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — базис \\(V\\); \\(\\hat{A}\\) — линейный оператор, действующий в \\(V\\).</p>
    <p><b>Матрицей оператора</b> \\(\\hat{A}\\) в базисе Б называется матрица \\([\\hat{A}]_\\text{Б}\\), любой \\(j\\)-ый столбец которой равен \\([\\hat{A}(\\bar{e}_j)]_\\text{Б}\\).</p>

    <p>$$
    \\begin{cases}
    \\hat{A}(\\bar{e}_1) = a_{11}\\bar{e}_1 + a_{21}\\bar{e}_2 + \\dots + a_{n1}\\bar{e}_n \\\\
    \\hat{A}(\\bar{e}_2) = a_{12}\\bar{e}_1 + a_{22}\\bar{e}_2 + \\dots + a_{n2}\\bar{e}_n \\\\
    \\dots \\dots \\dots \\dots \\\\
    \\hat{A}(\\bar{e}_n) = a_{1n}\\bar{e}_1 + a_{2n}\\bar{e}_2 + \\dots + a_{nn}\\bar{e}_n
    \\end{cases}
    $$</p>

    <p>$$[\\hat{A}]_\\text{Б} = \\begin{pmatrix}
    a_{11} & a_{12} & \\dots & a_{1n} \\\\
    a_{21} & a_{22} & \\dots & a_{2n} \\\\
    \\dots & \\dots & \\dots & \\dots \\\\
    a_{n1} & a_{n2} & \\dots & a_{nn}
    \\end{pmatrix}$$</p>

    <h4 style="color:#1a3a6e;">3. Теорема 1 (о связи образа и прообраза)</h4>

    <p>Пусть \\(\\hat{A}\\) — линейный оператор, Б — базис в \\(V\\). Тогда \\(\\forall \\bar{x} \\in V\\):</p>
    <p>$$[\\hat{A}(\\bar{x})]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б}$$</p>

    <p><b>Д-во:</b></p>
    <p>Б = \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\); \\(\\bar{x} = x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n\\).</p>

    <p>$$
    \\begin{aligned}
    \\hat{A}(\\bar{x})
    &= \\hat{A}(x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n) \\\\
    &= \\hat{A}(x_1 \\bar{e}_1) + \\hat{A}(x_2 \\bar{e}_2) + \\dots + \\hat{A}(x_n \\bar{e}_n) \\\\
    &= x_1 (a_{11}\\bar{e}_1 + a_{21}\\bar{e}_2 + \\dots + a_{n1}\\bar{e}_n) \\\\
    &\\quad + x_2 (a_{12}\\bar{e}_1 + a_{22}\\bar{e}_2 + \\dots + a_{n2}\\bar{e}_n) \\\\
    &\\quad + \\dots + x_n (a_{1n}\\bar{e}_1 + a_{2n}\\bar{e}_2 + \\dots + a_{nn}\\bar{e}_n) \\\\
    &= (a_{11}x_1 + a_{12}x_2 + \\dots + a_{1n}x_n) \\cdot \\bar{e}_1 \\\\
    &\\quad + (a_{21}x_1 + a_{22}x_2 + \\dots + a_{2n}x_n) \\cdot \\bar{e}_2 \\\\
    &\\quad + \\dots + (a_{n1}x_1 + a_{n2}x_2 + \\dots + a_{nn}x_n) \\cdot \\bar{e}_n.
    \\end{aligned}
    $$</p>

    <p>\\(\\therefore [\\hat{A}(\\bar{x})]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б}\\). \\(\\blacksquare\\)</p>

    <h4 style="color:#1a3a6e;">4. Теорема 2 (связь матриц оператора в разных базисах)</h4>

    <p>\\(\\forall\\) базисов Б и Б\\('\\) конечномерного пр-ва \\(V\\) и \\(\\forall\\) линейный оператор \\(\\hat{A}\\), действующего в \\(V\\):</p>
    <p>$$[\\hat{A}]_{\\text{Б}'} = T_{\\text{Б}' \\to \\text{Б}} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'}$$</p>

    <p><b>Д-во:</b></p>
    <p>$$[\\hat{A}(\\bar{x})]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'} \\cdot [\\bar{x}]_{\\text{Б}'}$$</p>

    <p>С другой стороны:</p>
    <p>$$[\\hat{A}(\\bar{x})]_\\text{Б} = T_{\\text{Б} \\to \\text{Б}'} \\cdot [\\hat{A}(\\bar{x})]_{\\text{Б}'} = T_{\\text{Б} \\to \\text{Б}'} \\cdot \\bigl([\\hat{A}]_{\\text{Б}'} \\cdot [\\bar{x}]_{\\text{Б}'}\\bigr)$$</p>

    <p>Приравниваем:</p>
    <p>$$\\underbrace{T_{\\text{Б} \\to \\text{Б}'} \\cdot [\\hat{A}]_{\\text{Б}'}}_{C} \\cdot [\\bar{x}]_{\\text{Б}'} = \\underbrace{[\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'}}_{D} \\cdot [\\bar{x}]_{\\text{Б}'}$$</p>

    <p>Это верно \\(\\forall \\bar{x} \\in V \\iff \\forall\\) матрица-столбец, которую мы берём в качестве \\([\\bar{x}]_{\\text{Б}'}\\).</p>
    <p>Возьмём \\(\\bar{x}_{n \\times 1} = \\begin{pmatrix}1 \\\\ 0 \\\\ 0 \\\\ \\vdots \\\\ 0\\end{pmatrix} \\implies \\begin{pmatrix}c_{11} \\\\ c_{21} \\\\ \\vdots \\\\ c_{n1}\\end{pmatrix} = \\begin{pmatrix}d_{11} \\\\ d_{21} \\\\ \\vdots \\\\ d_{n1}\\end{pmatrix}\\).</p>
    <p>Повторяя процедуру для всех единичных векторов \\(\\implies C_{n \\times n} = D_{n \\times n}\\).</p>
    <p>$$T_{\\text{Б} \\to \\text{Б}'} \\cdot [\\hat{A}]_{\\text{Б}'} = [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'}$$</p>
    <p>$$[\\hat{A}]_{\\text{Б}'} = T_{\\text{Б} \\to \\text{Б}'}^{-1} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'}$$</p>
    <p>$$[\\hat{A}]_{\\text{Б}'} = T_{\\text{Б}' \\to \\text{Б}} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'} \\quad \\blacksquare$$</p>
</div>
`,
    2: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 3. Теорема о связи алгебры операторов с алгеброй их матриц.</h3>

    <h4 style="color:#1a3a6e;">1. Определения из 1-го семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p>Упорядоченная система векторов \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) из \\(V\\) называется <b>базисом</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n\\) — линейно независимая система;</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists \\alpha_1, \\alpha_2, \\dots, \\alpha_n \\in P : \\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_n \\bar{e}_n\\).</li>
    </ol>

    <p><b>Матрица перехода</b></p>
    <p>\\(T_{\\text{Б} \\to \\text{Б}'}\\) — матрица, столбцы которой — координаты векторов нового базиса в старом.</p>

    <p><b>Теорема.</b></p>
    <p>\\([\\bar{x}]_\\text{Б} = T_{\\text{Б} \\to \\text{Б}'} \\cdot [\\bar{x}]_{\\text{Б}'}\\).</p>

    <p><b>Следствие.</b></p>
    <p>\\(T_{\\text{Б}' \\to \\text{Б}} = T_{\\text{Б} \\to \\text{Б}'}^{-1}\\).</p>

    <h4 style="color:#1a3a6e;">2. Теорема 1 (связь линейный оператор с алгеброй их матриц)</h4>

    <p>Пусть \\(\\hat{A}\\) и \\(\\hat{B}\\) — линейный оператор, действующие в конечномерном линейное пространство \\(V\\), Б — некоторый базис \\(V\\). Тогда:</p>
    <ol>
        <li>\\([\\hat{A} + \\hat{B}]_\\text{Б} = [\\hat{A}]_\\text{Б} + [\\hat{B}]_\\text{Б}\\);</li>
        <li>\\([\\hat{A} \\hat{B}]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot [\\hat{B}]_\\text{Б}\\);</li>
        <li>\\(\\forall \\alpha \\in P \\quad [\\alpha \\hat{A}]_\\text{Б} = \\alpha [\\hat{A}]_\\text{Б}\\).</li>
    </ol>

    <p><b>Д-во:</b></p>

    <p><b>1)</b> \\((\\hat{A} + \\hat{B})(\\bar{x}) = \\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})\\)</p>
    <p>$$
    \\begin{aligned}
    [(\\hat{A} + \\hat{B})(\\bar{x})]_\\text{Б}
    &= [\\hat{A} + \\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} \\\\
    [\\hat{A}(\\bar{x}) + \\hat{B}(\\bar{x})]_\\text{Б}
    &= [\\hat{A}(\\bar{x})]_\\text{Б} + [\\hat{B}(\\bar{x})]_\\text{Б} \\\\
    &= [\\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} + [\\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} \\\\
    &= ([\\hat{A}]_\\text{Б} + [\\hat{B}]_\\text{Б}) \\cdot [\\bar{x}]_\\text{Б}
    \\end{aligned}
    $$</p>
    <p>\\([\\hat{A} + \\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} = ([\\hat{A}]_\\text{Б} + [\\hat{B}]_\\text{Б}) \\cdot [\\bar{x}]_\\text{Б}\\) — верно \\(\\forall \\bar{x} \\implies\\)</p>
    <p>\\(\\implies\\) [тот же приём, что и в теореме о связи матриц в разных базисах] \\(\\implies\\)</p>
    <p>\\(\\implies [\\hat{A} + \\hat{B}]_\\text{Б} = [\\hat{A}]_\\text{Б} + [\\hat{B}]_\\text{Б}\\)</p>

    <p><b>2)</b> \\((\\hat{A} \\hat{B})(\\bar{x}) = \\hat{A}(\\hat{B}(\\bar{x}))\\)</p>
    <p>$$
    \\begin{aligned}
    [(\\hat{A} \\hat{B})(\\bar{x})]_\\text{Б}
    &= [\\hat{A} \\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} \\\\
    [\\hat{A}(\\hat{B}(\\bar{x}))]_\\text{Б}
    &= [\\hat{A}]_\\text{Б} \\cdot [\\hat{B}(\\bar{x})]_\\text{Б} \\\\
    &= [\\hat{A}]_\\text{Б} \\cdot [\\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б}
    \\end{aligned}
    $$</p>
    <p>\\([\\hat{A} \\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot [\\hat{B}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б}\\) — верно \\(\\forall \\bar{x} \\implies\\)</p>
    <p>\\(\\implies\\) [тот же приём] \\(\\implies [\\hat{A} \\hat{B}]_\\text{Б} = [\\hat{A}]_\\text{Б} \\cdot [\\hat{B}]_\\text{Б}\\)</p>

    <p><b>3)</b> \\((\\alpha \\hat{A})(\\bar{x}) = \\alpha \\hat{A}(\\bar{x})\\)</p>
    <p>$$
    \\begin{aligned}
    [(\\alpha \\hat{A})(\\bar{x})]_\\text{Б}
    &= [\\alpha \\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} \\\\
    [\\alpha (\\hat{A}(\\bar{x}))]_\\text{Б}
    &= \\alpha \\cdot [\\hat{A}(\\bar{x})]_\\text{Б} \\\\
    &= \\alpha \\cdot [\\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б}
    \\end{aligned}
    $$</p>
    <p>\\([\\alpha \\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б} = \\alpha \\cdot [\\hat{A}]_\\text{Б} \\cdot [\\bar{x}]_\\text{Б}\\) — верно \\(\\forall \\bar{x} \\implies\\)</p>
    <p>\\(\\implies\\) [тот же приём] \\(\\implies [\\alpha \\hat{A}]_\\text{Б} = \\alpha [\\hat{A}]_\\text{Б}\\) \\(\\blacksquare\\)</p>
</div>
`,
    3: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 4. Ядро и область значений как подпространства. Теорема о связи ранга и дефекта линейный оператор.</h3>

    <h4 style="color:#1a3a6e;">1. Определения из 1-го семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p>Непустое подмножество \\(L\\) линейного пространства \\(V\\) называется <b>подпространством</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in L \\implies \\bar{x} + \\bar{y} \\in L\\);</li>
        <li>\\(\\forall \\bar{x} \\in L \\quad \\forall \\alpha \\in P \\implies \\alpha \\bar{x} \\in L\\).</li>
    </ol>

    <p><b>Опр. 2.</b></p>
    <p><b>Размерность</b> \\(\\text{dim}(V)\\) линейное пространство(евклидово пространство) — количество векторов в любом его базисе.</p>

    <h4 style="color:#1a3a6e;">2. Ядро и область значений</h4>

    <p><b>Опр. 3.</b></p>
    <p><b>Ядром</b> линейный оператор \\(\\hat{A}\\), действующего в линейное пространство \\(V\\), называется мн-во векторов</p>
    <p>$$\\operatorname{Ker}(\\hat{A}) = \\{ \\bar{x} \\in V : \\hat{A}(\\bar{x}) = \\bar{0} \\}.$$</p>

    <p><b>Опр. 4.</b></p>
    <p><b>Областью значений</b> линейный оператор \\(\\hat{A}\\), действующего в линейное пространство \\(V\\), называется мн-во векторов</p>
    <p>$$\\operatorname{Im}(\\hat{A}) = \\{ \\bar{y} \\in V : \\exists \\bar{x} \\in V : \\hat{A}(\\bar{x}) = \\bar{y} \\}.$$</p>

    <h4 style="color:#1a3a6e;">3. Теорема 1 (о ядре и области значений)</h4>

    <p>$$\\operatorname{Ker}(\\hat{A}) \\le V, \\quad \\operatorname{Im}(\\hat{A}) \\le V.$$</p>

    <p><b>Д-во:</b></p>

    <p><b>Для ядра:</b></p>
    <p>Пусть \\(\\bar{x}, \\bar{y} \\in \\operatorname{Ker}(\\hat{A})\\), \\(\\alpha, \\beta \\in P\\). Тогда:</p>
    <p>$$\\hat{A}(\\alpha \\bar{x} + \\beta \\bar{y}) = \\alpha \\underbrace{\\hat{A}(\\bar{x})}_{\\bar{0}} + \\beta \\underbrace{\\hat{A}(\\bar{y})}_{\\bar{0}} = \\bar{0} \\implies (\\alpha \\bar{x} + \\beta \\bar{y}) \\in \\operatorname{Ker}(\\hat{A}).$$</p>

    <p><b>Для области значений:</b></p>
    <p>Пусть \\(\\bar{y}_1, \\bar{y}_2 \\in \\operatorname{Im}(\\hat{A})\\), \\(\\alpha, \\beta \\in P\\).</p>
    <p>Тогда \\(\\exists \\bar{x}_1 \\in V : \\hat{A}(\\bar{x}_1) = \\bar{y}_1\\); \\(\\exists \\bar{x}_2 \\in V : \\hat{A}(\\bar{x}_2) = \\bar{y}_2 \\implies\\)</p>
    <p>$$\\hat{A}(\\alpha \\bar{x}_1 + \\beta \\bar{x}_2) = \\alpha \\hat{A}(\\bar{x}_1) + \\beta \\hat{A}(\\bar{x}_2) = \\alpha \\bar{y}_1 + \\beta \\bar{y}_2 \\implies (\\alpha \\bar{y}_1 + \\beta \\bar{y}_2) \\in \\operatorname{Im}(\\hat{A}).$$</p>

    <p>Если линейное пространство \\(V\\) конечномерно, то \\(\\operatorname{Ker}(\\hat{A})\\) и \\(\\operatorname{Im}(\\hat{A})\\) тоже конечномерны.</p>

    <h4 style="color:#1a3a6e;">4. Ранг и дефект</h4>

    <p><b>Опр. 5.</b></p>
    <p>Размерность \\(\\operatorname{Ker}(\\hat{A})\\) называется <b>дефектом</b> \\(\\hat{A}\\) и обозначается \\(d(\\hat{A})\\).</p>
    <p>Размерность \\(\\operatorname{Im}(\\hat{A})\\) называется <b>рангом</b> \\(\\hat{A}\\) и обозначается \\(\\operatorname{Rg}(\\hat{A})\\).</p>

    <h4 style="color:#1a3a6e;">5. Теорема 2 (о ранге и дефекте)</h4>

    <p>$$\\operatorname{Rg}(\\hat{A}) + d(\\hat{A}) = \\text{dim}(V).$$</p>

    <p><b>Д-во:</b></p>
    <p>Пусть \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_d)\\) — базис \\(\\operatorname{Ker}(\\hat{A})\\).</p>
    <p>Дополним его до базиса \\(V\\): \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_d, \\bar{e}_{d+1}, \\dots, \\bar{e}_n)\\).</p>

    <p>Возьмём \\(\\bar{y} \\in \\operatorname{Im}(\\hat{A})\\). \\(\\exists \\bar{x} \\in V : \\hat{A}(\\bar{x}) = \\bar{y}\\).</p>

    <p>$$\\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_d \\bar{e}_d + \\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n.$$</p>

    <p>$$\\bar{y} = \\hat{A}(\\underbrace{\\alpha_1 \\bar{e}_1 + \\dots + \\alpha_d \\bar{e}_d}_{\\bar{0}}) + \\alpha_{d+1} \\hat{A}(\\bar{e}_{d+1}) + \\dots + \\alpha_n \\hat{A}(\\bar{e}_n) = \\alpha_{d+1} \\hat{A}(\\bar{e}_{d+1}) + \\dots + \\alpha_n \\hat{A}(\\bar{e}_n).$$</p>

    <p>Покажем, что \\(\\hat{A}(\\bar{e}_{d+1}), \\dots, \\hat{A}(\\bar{e}_n)\\) — <b>линейно независимая система</b>:</p>

    <p>$$\\alpha_{d+1} \\hat{A}(\\bar{e}_{d+1}) + \\dots + \\alpha_n \\hat{A}(\\bar{e}_n) = \\bar{0} \\implies \\hat{A}(\\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n) = \\bar{0} \\implies$$</p>
    <p>$$\\implies \\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n \\in \\operatorname{Ker}(\\hat{A}) \\implies$$</p>
    <p>$$\\implies \\alpha_{d+1} \\bar{e}_{d+1} + \\dots + \\alpha_n \\bar{e}_n = \\beta_1 \\bar{e}_1 + \\dots + \\beta_d \\bar{e}_d \\implies$$</p>
    <p>$$\\implies \\beta_1 \\bar{e}_1 + \\dots + \\beta_d \\bar{e}_d - \\alpha_{d+1} \\bar{e}_{d+1} - \\dots - \\alpha_n \\bar{e}_n = \\bar{0} \\implies$$</p>
    <p>$$\\implies \\beta_i = \\alpha_i = 0 \\text{ (т.к. } \\bar{e}_1 \\dots \\bar{e}_n \\text{ — базис)} \\implies \\hat{A}(\\bar{e}_{d+1}), \\dots, \\hat{A}(\\bar{e}_n) \\text{ — линейно независимая система} \\implies$$</p>
    <p>$$\\implies \\text{образуют базис } \\operatorname{Im}(\\hat{A}).$$</p>

    <p>$$\\operatorname{Rg}(\\hat{A}) = n - d = \\text{dim}(V) - d(\\hat{A}) \\implies \\boxed{\\operatorname{Rg}(\\hat{A}) + d(\\hat{A}) = \\text{dim}(V)} \\quad \\blacksquare$$</p>
</div>
`,
    4: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 5. Свойства характеристический многочлен: переход из базиса в базис, связь собственное значение с корнями характеристическое уравнение.</h3>

    <h4 style="color:#1a3a6e;">1. Свойства из 1-го семестра</h4>

    <p><b>собственный вектор-во 1.</b> \\(|A \\cdot B \\cdot C| = |A| \\cdot |B| \\cdot |C|\\).</p>
    <p><b>собственный вектор-во 2.</b> Система имеет нетривиальное р-е \\(\\mathcal{X} ≠ O_{n \\times 1} \\iff |A| = 0\\).</p>

    <h4 style="color:#1a3a6e;">2. Собственные значения и векторы</h4>

    <p><b>Опр. 1.</b></p>
    <p>Пусть \\(\\hat{A}\\) — линейный оператор, действующий в линейное пространство \\(V\\) над числовым полем \\(P\\).</p>
    <p>Число \\(\\lambda \\in P\\) называется <b>собственным значением (собственное значение)</b> линейный оператор \\(\\hat{A}\\).</p>
    <p>Ненулевой вектор \\(\\bar{x} \\in V\\) называется <b>собственным вектором (собственный вектор)</b> линейный оператор \\(\\hat{A}\\), соответствующим собственное значение \\(\\lambda\\), если</p>
    <p>$$\\hat{A}(\\bar{x}) = \\lambda \\bar{x}.$$</p>

    <p><b>Опр. 2.</b></p>
    <p>Многочлен \\(|[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}|\\) называется <b>характеристическим многочленом (характеристический многочлен)</b> \\(\\hat{A}\\).</p>
    <p>Уравнение \\(|[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}| = 0\\) — <b>характеристическим уравнением (характеристическое уравнение)</b> оператора \\(\\hat{A}\\).</p>

    <h4 style="color:#1a3a6e;">3. Теорема 1 (об инвариантности характеристический многочлен)</h4>

    <p>характеристический многочлен конкретного линейный оператор \\(\\hat{A}\\) имеет один и тот же вид во всех базисах.</p>

    <p><b>Д-во:</b></p>
    <p>Б и Б\\(''\\) — базисы линейное пространство \\(V\\), в котором действует линейный оператор \\(\\hat{A}\\).</p>

    <p>$$
    \\begin{aligned}
    [\\hat{A}]_{\\text{Б}'} - \\lambda E_{n \\times n}
    &= T_{\\text{Б}' \\to \\text{Б}} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'} - \\lambda \\cdot E_{n \\times n} \\\\
    &= T_{\\text{Б}' \\to \\text{Б}} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'} - \\lambda \\cdot T_{\\text{Б}' \\to \\text{Б}} \\cdot T_{\\text{Б} \\to \\text{Б}'} \\\\
    &= T_{\\text{Б}' \\to \\text{Б}} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'} - \\lambda \\cdot T_{\\text{Б}' \\to \\text{Б}} \\cdot E_{n \\times n} \\cdot T_{\\text{Б} \\to \\text{Б}'} \\\\
    &= T_{\\text{Б}' \\to \\text{Б}} \\cdot [\\hat{A}]_\\text{Б} \\cdot T_{\\text{Б} \\to \\text{Б}'} - T_{\\text{Б}' \\to \\text{Б}} \\cdot \\lambda \\cdot E_{n \\times n} \\cdot T_{\\text{Б} \\to \\text{Б}'} \\\\
    &= T_{\\text{Б}' \\to \\text{Б}} \\cdot \\bigl([\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}\\bigr) \\cdot T_{\\text{Б} \\to \\text{Б}'}.
    \\end{aligned}
    $$</p>

    <p>$$
    \\begin{aligned}
    |[\\hat{A}]_{\\text{Б}'} - \\lambda E_{n \\times n}|
    &= \\bigl| T_{\\text{Б}' \\to \\text{Б}} \\cdot ([\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}) \\cdot T_{\\text{Б} \\to \\text{Б}'} \\bigr| \\\\
    &= |T_{\\text{Б}' \\to \\text{Б}}| \\cdot |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}| \\cdot |T_{\\text{Б} \\to \\text{Б}'}| \\\\
    &= |T_{\\text{Б}' \\to \\text{Б}}| \\cdot |T_{\\text{Б} \\to \\text{Б}'}| \\cdot |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}| \\\\
    &= |T_{\\text{Б}' \\to \\text{Б}} \\cdot T_{\\text{Б} \\to \\text{Б}'}| \\cdot |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}| \\\\
    &= |E_{n \\times n}| \\cdot |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}| \\\\
    &= |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}|. \\quad \\blacksquare
    \\end{aligned}
    $$</p>

    <h4 style="color:#1a3a6e;">4. Теорема 2 (связь собственное значение с корнями характеристическое уравнение)</h4>

    <p>Пусть \\(\\hat{A}\\) — линейный оператор, действующий в линейное пространство \\(V\\) над числовым полем \\(P\\).</p>
    <p>$$\\lambda \\in P \\text{ — собственное значение линейный оператор } \\hat{A} \\iff \\lambda \\text{ — корень характеристическое уравнение линейный оператор } \\hat{A}.$$</p>

    <p><b>Д-во:</b></p>
    <p>Выберем базис Б в линейное пространство \\(V\\).</p>

    <p>$$
    \\begin{aligned}
    \\lambda \\in P \\text{ — собственное значение }
    &\\iff \\exists \\bar{x} ≠ \\bar{o} : \\hat{A}(\\bar{x}) = \\lambda \\cdot \\bar{x} \\\\
    &\\iff \\exists \\mathcal{X}_{n \\times 1} ≠ O_{n \\times 1} : [\\hat{A}]_\\text{Б} \\cdot \\mathcal{X}_{n \\times 1} = \\lambda \\cdot \\mathcal{X}_{n \\times 1} \\\\
    &\\iff \\exists \\mathcal{X}_{n \\times 1} ≠ O_{n \\times 1} : [\\hat{A}]_\\text{Б} \\cdot \\mathcal{X}_{n \\times 1} - \\lambda E_{n \\times n} \\cdot \\mathcal{X}_{n \\times 1} = O_{n \\times 1} \\\\
    &\\iff \\exists \\mathcal{X}_{n \\times 1} ≠ O_{n \\times 1} : ([\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}) \\cdot \\mathcal{X}_{n \\times 1} = O_{n \\times 1} \\\\
    &\\iff \\text{у однородная система линейных уравнений с матрицей } [\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n} \\text{ есть нетривиальное решение} \\\\
    &\\iff |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}| = 0. \\quad \\blacksquare
    \\end{aligned}
    $$</p>
</div>
`,
    5: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 6. собственный вектор-ва собственное значение и собственный вектор: диаг. или недиаг. матрицы оператора, кол-во ЛН собственный вектор, соотв. данному собственное значение.</h3>

    <h4 style="color:#1a3a6e;">1. Определения из 1-го семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Линейной комбинацией</b> векторов \\(\\bar{k}_1, \\bar{k}_2, \\dots, \\bar{k}_m \\in V\\) с коэф. \\(\\alpha_1, \\alpha_2, \\dots, \\alpha_m \\in P\\) называется вектор</p>
    <p>$$\\alpha_1 \\bar{k}_1 + \\alpha_2 \\bar{k}_2 + \\dots + \\alpha_m \\bar{k}_m.$$</p>

    <p><b>Опр. 2.</b></p>
    <p>Система векторов называется <b>линейно зависимой (линейно зависимая система)</b>, если \\(\\exists\\) невырожденная, но нулевая линейная комбинация векторов этой системы.</p>
    <p>В противном случае система называется <b>линейно независимой (линейно независимая система)</b>.</p>

    <p><b>Лемма (о линейной зависимости):</b></p>
    <p>Система векторов линейно зависима \\(\\iff\\) один из её векторов можно представить в виде линейной комбинации других её векторов.</p>

    <h4 style="color:#1a3a6e;">2. Теорема (об определителе полураспавшейся матрицы)</h4>

    <p>$$\\begin{vmatrix} A_{m \\times m} & C_{m \\times n} \\\\ O_{n \\times m} & B_{n \\times n} \\end{vmatrix} = |A_{m \\times m}| \\cdot |B_{n \\times n}|$$</p>

    <h4 style="color:#1a3a6e;">3. Теорема 1 (линейно независимая система собственный вектор)</h4>

    <ol>
        <li>Б — базис из собственный вектор линейный оператор \\(\\hat{A} \\iff [\\hat{A}]_\\text{Б} = \\begin{pmatrix} \\lambda_1 & 0 & \\dots & 0 \\\\ 0 & \\lambda_2 & \\dots & 0 \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & \\dots & \\lambda_n \\end{pmatrix}\\), где \\(\\lambda_i\\) — собственное значение линейный оператор \\(\\hat{A}\\).</li>
        <li>Кол-во линейно независимых собственный вектор, соответствующих корню характеристическое уравнение линейный оператор \\(\\hat{A}\\), не превосходит кратности этого корня.</li>
    </ol>

    <p><b>Д-во:</b></p>

    <p><b>1)</b> Пусть Б = \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — базис собственный вектор \\(\\iff \\forall i \\in \\{1, 2, \\dots, n\\} \\quad \\hat{A}(\\bar{e}_i) = \\lambda_i \\cdot \\bar{e}_i \\iff\\)</p>

    <p>$$
    \\iff \\begin{cases}
    \\hat{A}(\\bar{e}_1) = \\lambda_1 \\bar{e}_1 + 0 \\cdot \\bar{e}_2 + \\dots + 0 \\cdot \\bar{e}_n \\\\
    \\hat{A}(\\bar{e}_2) = 0 \\cdot \\bar{e}_1 + \\lambda_2 \\cdot \\bar{e}_2 + \\dots + 0 \\cdot \\bar{e}_n \\\\
    \\vdots \\\\
    \\hat{A}(\\bar{e}_n) = 0 \\cdot \\bar{e}_1 + 0 \\cdot \\bar{e}_2 + \\dots + \\lambda_n \\bar{e}_n
    \\end{cases}
    \\iff [\\hat{A}]_\\text{Б} = \\begin{pmatrix}
    \\lambda_1 & 0 & \\dots & 0 \\\\
    0 & \\lambda_2 & \\dots & 0 \\\\
    \\vdots & \\vdots & \\ddots & \\vdots \\\\
    0 & 0 & \\dots & \\lambda_n
    \\end{pmatrix}
    $$</p>

    <p><b>2)</b></p>
    <p>Пусть \\(\\lambda = \\lambda_0\\) — корень характеристическое уравнение линейный оператор \\(\\hat{A}\\) кратности \\(k\\).</p>
    <p>Предположим, что для собственное значение \\(\\lambda_0\\) \\(\\exists\\) \\(k+1\\) линейно независимых собственный вектор: \\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_{k+1}\\).</p>
    <p>Дополним эту систему до базиса линейное пространство \\(V\\): Б = \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_{k+1}, \\bar{e}_{k+2}, \\dots, \\bar{e}_n)\\).</p>
    <p>Составим \\([\\hat{A}]_\\text{Б}\\):</p>

    <p>$$[\\hat{A}]_\\text{Б} = \\begin{pmatrix}
    \\lambda_0 & 0 & \\dots & 0 & a_{1,k+2} & \\dots & a_{1n} \\\\
    0 & \\lambda_0 & \\dots & 0 & a_{2,k+2} & \\dots & a_{2n} \\\\
    \\vdots & \\vdots & \\ddots & \\vdots & \\vdots & & \\vdots \\\\
    0 & 0 & \\dots & \\lambda_0 & a_{k+1,k+2} & \\dots & a_{k+1,n} \\\\
    0 & 0 & \\dots & 0 & a_{k+2,k+2} & \\dots & a_{k+2,n} \\\\
    \\vdots & \\vdots & & \\vdots & \\vdots & \\ddots & \\vdots \\\\
    0 & 0 & \\dots & 0 & a_{n,k+2} & \\dots & a_{nn}
    \\end{pmatrix}$$</p>

    <p>$$
    |[\\hat{A}]_\\text{Б} - \\lambda E_{n \\times n}|
    = \\begin{vmatrix}
    \\lambda_0 - \\lambda & \\dots & 0 & \\vdots & & \\\\
    \\vdots & \\ddots & \\vdots & \\vdots & B_{k+1, n-k-1} & \\\\
    0 & \\dots & \\lambda_0 - \\lambda & \\vdots & & \\\\
    \\dots & \\dots & \\dots & \\dots & \\dots & \\dots & \\dots \\\\
    0 & \\dots & 0 & \\vdots & a_{k+2,k+2} - \\lambda & \\dots \\\\
    \\vdots & & \\vdots & \\vdots & \\vdots & \\ddots \\\\
    0 & \\dots & 0 & \\vdots & \\dots & a_{nn} - \\lambda
    \\end{vmatrix}
    $$</p>

    <p>$$
    = (\\lambda_0 - \\lambda)^{k+1} \\cdot |C(\\lambda)|
    = (-1)^{k+1} \\cdot (\\lambda - \\lambda_0)^{k+1} \\cdot |C(\\lambda)|
    $$</p>

    <p>\\(\\implies \\lambda = \\lambda_0\\) — корень кратности \\(k+1\\). Противоречие. \\(\\blacksquare\\)</p>
</div>
`,
    6: `
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 7. собственный вектор-ва собственное значение и собственный вектор: собственный вектор, соотв. различным собственное значение.</h3>

    <h4 style="color:#1a3a6e;">1. Определения из 1-го семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Линейной комбинацией</b> векторов \\(\\bar{k}_1, \\bar{k}_2, \\dots, \\bar{k}_m \\in V\\) с коэф. \\(\\alpha_1, \\alpha_2, \\dots, \\alpha_m \\in P\\) называется вектор</p>
    <p>$$\\alpha_1 \\bar{k}_1 + \\alpha_2 \\bar{k}_2 + \\dots + \\alpha_m \\bar{k}_m.$$</p>
    <p>Данная линейная комбинация называется <b>вырожденной</b>, если все \\(\\alpha_i = 0\\); <b>невырожденной</b> — в противном случае.</p>
    <p>Данная линейная комбинация называется <b>нулевой</b>, если она равна \\(\\bar{0}\\), <b>ненулевой</b> — в противном случае.</p>

    <p><b>Опр. 2.</b></p>
    <p>Система векторов \\(\\bar{k}_1, \\bar{k}_2, \\dots, \\bar{k}_m \\in V\\) называется <b>линейно зависимой (линейно зависимая система)</b>, если \\(\\exists\\) невырожденная, но нулевая линейная комбинация векторов этой системы.</p>
    <p>Данная система векторов называется <b>линейно независимой (линейно независимая система)</b> в противном случае.</p>

    <p><b>Опр. 3.</b></p>
    <p>Упорядоченная система векторов из \\(V\\) \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) называется <b>базисом</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n\\) — линейно независимая система;</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists \\alpha_1, \\alpha_2, \\dots, \\alpha_n \\in P : \\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_n \\bar{e}_n\\).</li>
    </ol>

    <p><b>Лемма (о линейной зависимости):</b></p>
    <p>Система векторов линейно зависима \\(\\iff\\) один из её векторов можно представить в виде линейной комбинации других её векторов.</p>

    <h4 style="color:#1a3a6e;">2. Теорема (собственный вектор, соотв. различным собственное значение)</h4>

    <p>Пусть \\(\\bar{e}_{11}, \\bar{e}_{12}, \\dots, \\bar{e}_{1n_1}\\) — линейно независимая система собственный вектор, соотв. собственное значение \\(\\lambda_1\\);</p>
    <p>\\(\\bar{e}_{21}, \\bar{e}_{22}, \\dots, \\bar{e}_{2n_2}\\) — линейно независимая система собственный вектор, соотв. собственное значение \\(\\lambda_2\\);</p>
    <p>...;</p>
    <p>\\(\\bar{e}_{k1}, \\bar{e}_{k2}, \\dots, \\bar{e}_{kn_k}\\) — линейно независимая система собственный вектор, соотв. собственное значение \\(\\lambda_k\\);</p>
    <p>числа \\(\\lambda_1, \\lambda_2, \\dots, \\lambda_k\\) — попарно различны.</p>
    <p>Тогда:</p>
    <p>$$\\bar{e}_{11}, \\bar{e}_{12}, \\dots, \\bar{e}_{1n_1}, \\bar{e}_{21}, \\bar{e}_{22}, \\dots, \\bar{e}_{2n_2}, \\dots, \\bar{e}_{k1}, \\bar{e}_{k2}, \\dots, \\bar{e}_{kn_k} \\text{ — линейно независимая система}.$$</p>

    <p><b>Д-во:</b> Индукцией по \\(k\\).</p>

    <p><b>БИ (\\(k=1\\)):</b></p>
    <p>\\(\\bar{e}_{11}, \\bar{e}_{12}, \\dots, \\bar{e}_{1n_1}\\) — линейно независимая система по условию.</p>

    <p><b>ШИ:</b></p>
    <p>Предположим, что утверждение справедливо для некоторого \\(k\\).</p>
    <p>Покажем, что тогда оно справедливо для \\(k+1\\).</p>

    <p>Рассмотрим линейную комбинацию:</p>
    <p>$$\\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{0}$$</p>

    <p>Подействуем оператором \\(\\hat{A}\\) на обе части равенства:</p>
    <p>$$\\sum_{i=1}^{n_1} \\alpha_{1i} \\lambda_1 \\bar{e}_{1i} + \\sum_{i=1}^{n_2} \\alpha_{2i} \\lambda_2 \\bar{e}_{2i} + \\dots + \\sum_{i=1}^{n_k} \\alpha_{ki} \\lambda_k \\bar{e}_{ki} + \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\lambda_{k+1} \\bar{e}_{k+1,i} = \\bar{0}$$</p>
    <p>$$\\lambda_1 \\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\lambda_2 \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + \\lambda_k \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\lambda_{k+1} \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{0}$$</p>

    <p>Умножим исходное равенство на \\(\\lambda_{k+1}\\):</p>
    <p>$$\\lambda_{k+1} \\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + \\lambda_{k+1} \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + \\lambda_{k+1} \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\lambda_{k+1} \\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{0}$$</p>

    <p>Теперь вычтем полученные равенства:</p>
    <p>$$(\\lambda_{k+1} - \\lambda_1) \\cdot \\sum_{i=1}^{n_1} \\alpha_{1i} \\bar{e}_{1i} + (\\lambda_{k+1} - \\lambda_2) \\cdot \\sum_{i=1}^{n_2} \\alpha_{2i} \\bar{e}_{2i} + \\dots + (\\lambda_{k+1} - \\lambda_k) \\cdot \\sum_{i=1}^{n_k} \\alpha_{ki} \\bar{e}_{ki} + \\bar{0} = \\bar{0}$$</p>

    <p>Так как для \\(k\\) собственных значений утверждение теоремы справедливо:</p>
    <p>$$\\implies \\underbrace{(\\lambda_{k+1} - \\lambda_j)}_{≠ 0} \\cdot \\alpha_{ji} = 0 \\implies \\alpha_{ji} = 0 \\quad (j \\in \\{1, 2, \\dots, k\\})$$</p>

    <p>Подставляя эти значения в исходное равенство:</p>
    <p>$$\\sum_{i=1}^{n_{k+1}} \\alpha_{k+1,i} \\bar{e}_{k+1,i} = \\bar{0} \\implies \\alpha_{k+1,i} = 0$$</p>

    <p>Следовательно, объединенная система собственных векторов — линейно независимая система. \\(\\blacksquare\\)</p>
</div>
`,
    7: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 8. Следствие из аксиом евклидова пространства, неравенство Коши – Буняковского.</h3>

    <h4 style="color:#1a3a6e;">Определение из прошлого семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Линейным пространством</b> над числовым полем \\(P\\) называется множество \\(V\\) ≠ \\(\\varnothing\\), на котором определены операции «+» и «*» на число из \\(P\\), удовлетворяющие следующим требованиям (<b>аксиомам линейного пространства</b>):</p>
    <ol>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\bar{x} + \\bar{y} = \\bar{y} + \\bar{x}\\)</li>
        <li>\\(\\forall \\bar{x}, \\bar{y}, \\bar{z} \\in V \\quad (\\bar{x} + \\bar{y}) + \\bar{z} = \\bar{x} + (\\bar{y} + \\bar{z})\\)</li>
        <li>\\(\\exists \\bar{0} \\in V : \\forall \\bar{x} \\in V \\quad \\bar{x} + \\bar{0} = \\bar{x}\\)</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists -\\bar{x} \\in V : \\bar{x} + (-\\bar{x}) = \\bar{0}\\)</li>
        <li>\\(\\forall \\alpha \\in P \\quad \\forall \\bar{x}, \\bar{y} \\in V \\quad \\alpha(\\bar{x} + \\bar{y}) = \\alpha\\bar{x} + \\alpha\\bar{y}\\)</li>
        <li>\\(\\forall \\alpha, \\beta \\in P \\quad \\forall \\bar{x} \\in V \\quad (\\alpha + \\beta) \\cdot \\bar{x} = \\alpha\\bar{x} + \\beta\\bar{x}\\)</li>
        <li>\\(\\forall \\alpha, \\beta \\in P \\quad \\forall \\bar{x} \\in V \\quad \\alpha(\\beta\\bar{x}) = (\\alpha\\beta)\\bar{x}\\)</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad 1 \\cdot \\bar{x} = \\bar{x}\\)</li>
    </ol>

    <h4 style="color:#1a3a6e;">Билет 8. Следствие из аксиом евклидова пространства, неравенство Коши – Буняковского.</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Линейное пространство \\(V\\)</b> над числовым полем \\(\\mathbb{R}\\) называется <b>евклидовым пространством</b>, если \\(\\forall \\bar{x}, \\bar{y} \\in V\\) определено число \\((\\bar{x}; \\bar{y}) \\in \\mathbb{R}\\), называемое <b>скалярным произведением</b> \\(\\bar{x}\\) и \\(\\bar{y}\\), удовлетворяющее аксиомам скалярного произведения.</p>

    <p><b>Аксиомы скалярного произведения (далее — СП):</b></p>
    <ol>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad (\\bar{x}; \\bar{y}) = (\\bar{y}; \\bar{x})\\) (<b>коммутативность</b>)</li>
        <li>\\(\\forall \\bar{x}, \\bar{y}, \\bar{z} \\in V \\quad (\\bar{x} + \\bar{y}; \\bar{z}) = (\\bar{x}; \\bar{z}) + (\\bar{y}; \\bar{z})\\) (<b>дистрибутивность</b> скалярного произведения относительно сложения)</li>
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\forall \\alpha \\in \\mathbb{R} \\quad (\\alpha \\bar{x}; \\bar{y}) = \\alpha \\cdot (\\bar{x}; \\bar{y})\\) (<b>смешанная ассоциативность</b>)</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad (\\bar{x}; \\bar{x}) \\ge 0\\), причём \\((\\bar{x}; \\bar{x}) = 0 \\implies \\bar{x} = \\bar{0}\\) (<b>свойство скалярного квадрата</b>)</li>
    </ol>

    <p><b>Следствие из аксиом скалярного произведения:</b></p>

    <p><b>1)</b> \\((\\bar{0}; \\bar{x}) = (\\bar{x}; \\bar{0}) = 0\\)</p>
    <p><b>Д-во:</b> \\(\\bar{0} = 0 \\cdot \\bar{y}\\)</p>
    <p>\\((\\bar{0}; \\bar{x}) = (0 \\cdot \\bar{y}; \\bar{x}) = [\\text{по свойству СП 3}] = 0 \\cdot (\\bar{y}; \\bar{x}) = 0\\)</p>

    <p><b>2)</b> \\((\\bar{z}; \\bar{x} + \\bar{y}) = (\\bar{z}; \\bar{x}) + (\\bar{z}; \\bar{y})\\)</p>
    <p><b>Д-во:</b> \\((\\bar{z}; \\bar{x} + \\bar{y}) = (\\bar{x} + \\bar{y}; \\bar{z}) = [\\text{по свойству СП 2}] = (\\bar{x}; \\bar{z}) + (\\bar{y}; \\bar{z}) = [\\text{по свойству СП 1}] = (\\bar{z}; \\bar{x}) + (\\bar{z}; \\bar{y})\\)</p>

    <p><b>3)</b> \\((\\bar{x}; \\alpha \\bar{y}) = \\alpha (\\bar{x}; \\bar{y})\\)</p>
    <p><b>Д-во:</b> \\((\\bar{x}; \\alpha \\bar{y}) = [\\text{по свойствам 1 и 3 СП}] = (\\alpha \\bar{y}; \\bar{x}) = \\alpha \\cdot (\\bar{y}; \\bar{x}) = \\alpha \\cdot (\\bar{x}; \\bar{y})\\) \\(\\blacksquare\\)</p>

    <p><b>Опр. 2.</b></p>
    <p><b>Нормой вектора</b> \\(\\bar{x}\\) в евклидовом пространстве называется число <b>\\(\\|\\bar{x}\\| = \\sqrt{(\\bar{x}; \\bar{x})}\\)</b></p>

    <h4 style="color:#1a3a6e;">Теорема (неравенство Коши – Буняковского)</h4>

    <p>$$\forall \\bar{x}, \\bar{y} \\in V \\quad |(\\bar{x}; \\bar{y})| \\le \\|\\bar{x}\\| \\cdot \\|\\bar{y}\\|$$</p>

    <p><b>Д-во:</b></p>
    <p>\\(\\forall \\bar{x}, \\bar{y} \\in V \\quad \\forall \\alpha \\in \\mathbb{R} \\quad (\\bar{x} - \\alpha \\bar{y}; \\bar{x} - \\alpha \\bar{y}) \\ge 0\\)</p>
    <p>\\((\\bar{x} - \\alpha \\bar{y}; \\bar{x} - \\alpha \\bar{y}) = [\\text{просто раскрываем как многочлен на многочлен}] =\\)</p>
    <p>\\(= (\\bar{x}; \\bar{x}) - \\alpha (\\bar{x}; \\bar{y}) - \\alpha (\\bar{x}; \\bar{y}) + \\alpha^2 \\cdot (\\bar{y}; \\bar{y})\\)</p>
    <p>\\(= (\\bar{y}; \\bar{y}) \\cdot \\alpha^2 - 2 \\alpha \\cdot (\\bar{x}; \\bar{y}) + (\\bar{x}; \\bar{x}) \\ge 0\\)</p>

    <p><b>1) случай:</b> \\(\\bar{y}\\) ≠ \\(\\bar{0}\\)</p>
    <p>\\(\\mathcal{D} \\le 0\\)</p>
    <p>\\(\\mathcal{D} = 4 (\\bar{x}; \\bar{y})^2 - 4 (\\bar{y}; \\bar{y}) \\cdot (\\bar{x}; \\bar{x})\\)</p>
    <p>\\(4 (\\bar{x}; \\bar{y})^2 - 4 (\\bar{y}; \\bar{y}) \\cdot (\\bar{x}; \\bar{x}) \\le 0\\)</p>
    <p>\\((\\bar{x}; \\bar{y})^2 \\le (\\bar{y}; \\bar{y}) \\cdot (\\bar{x}; \\bar{x}) \\quad |^{\\wedge 1/2}\\) (извлечь корень из квадрата — модуль)</p>
    <p>\\(|(\\bar{x}; \\bar{y})| \\le \\sqrt{(\\bar{y}; \\bar{y})} \\cdot \\sqrt{(\\bar{x}; \\bar{x})}\\)</p>
    <p><b>\\(|(\\bar{x}; \\bar{y})| \\le \\|\\bar{x}\\| \\cdot \\|\\bar{y}\\|\\)</b></p>

    <p><b>2) случай:</b> \\(\\bar{y} = \\bar{0}\\)</p>
    <p>\\((\\bar{x}; \\bar{y}) = |(\\bar{x}; \\bar{0})| = 0\\)</p>
    <p>\\(\\|\\bar{x}\\| \\cdot \\|\\bar{y}\\| = \\|\\bar{x}\\| \\cdot \\|\\bar{0}\\| = \\|\\bar{x}\\| \\cdot \\sqrt{(\\bar{0}; \\bar{0})} = 0\\)</p>
    <p>\\(0 \\le 0\\) \\(\\blacksquare\\)</p>

    <p><b>Опр. 3.</b></p>
    <p>\\(\\forall\\) ненулевых \\(\\bar{x}, \\bar{y} \\in V\\) <b>углом</b> называется число \\((\\widehat{\\bar{x}; \\bar{y}}) = \\arccos \\frac{(\\bar{x}; \\bar{y})}{\\|\\bar{x}\\| \\cdot \\|\\bar{y}\\|}\\)</p>
</div>

`,
    8: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 9. Линейная зависимость или линейная независимость ортогональной системы векторов, процесс ортогонализации Грамма – Шмидта.</h3>

    <h4 style="color:#1a3a6e;">Определения из прошлого семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Линейной комбинацией векторов</b> \\(\\bar{k}_1, \\bar{k}_2, \\dots, \\bar{k}_m \\in V\\) с коэффициентами \\(\\alpha_1, \\alpha_2, \\dots, \\alpha_m \\in P\\) называется вектор \\(\\alpha_1 \\bar{k}_1 + \\alpha_2 \\bar{k}_2 + \\dots + \\alpha_m \\bar{k}_m\\).</p>
    <p>Данная линейная комбинация называется <b>вырожденной</b>, если все \\(\\alpha_i = 0\\); <b>невырожденной</b> — в противном случае.</p>
    <p>Данная линейная комбинация называется <b>нулевой</b>, если она равна \\(\\bar{0}\\); <b>ненулевой</b> — в противном случае.</p>

    <p><b>Опр. 2.</b></p>
    <p>Система векторов \\(\\bar{k}_1, \\bar{k}_2, \\dots, \\bar{k}_m \\in V\\) называется <b>линейно зависимой системой</b>, если существует невырожденная, но нулевая линейная комбинация векторов этой системы.</p>
    <p>Данная система векторов называется <b>линейно независимой системой</b> в противном случае.</p>

    <p><b>Опр. 3.</b></p>
    <p><b>Упорядоченная система векторов</b> из \\(V\\) \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) называется <b>базисом</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n\\) — <b>линейно независимая система</b>;</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists \\alpha_1, \\alpha_2, \\dots, \\alpha_n \\in P : \\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_n \\bar{e}_n\\).</li>
    </ol>

    <p><b>Опр. 4.</b></p>
    <p><b>Линейной оболочкой</b> системы векторов \\(\\bar{x}_1, \\bar{x}_2, \\dots, \\bar{x}_m\\) называется множество их линейных комбинаций.</p>
    <p>Обозначение: \\(\\langle \\bar{x}_1, \\bar{x}_2, \\dots, \\bar{x}_m \\rangle\\).</p>
    <p>Если \\(\\bar{x}_1, \\bar{x}_2, \\dots, \\bar{x}_n\\) — линейно независимая система, то \\((\\bar{x}_1, \\bar{x}_2, \\dots, \\bar{x}_m)\\) — базис \\(\\langle \\bar{x}_1, \\bar{x}_2, \\dots, \\bar{x}_m \\rangle\\).</p>

    <p><b>Свойство определителя с линейно зависимыми столбцами:</b></p>
    <p>Определитель с линейно зависимыми строками равен 0 (аналогично и со столбцами).</p>

    <p><b>Опр. 5.</b></p>
    <p><b>Упорядоченная система векторов</b> из \\(V\\) \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) называется <b>базисом</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n\\) — линейно независимая система;</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists \\alpha_1, \\alpha_2, \\dots, \\alpha_n \\in P : \\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_n \\bar{e}_n\\).</li>
    </ol>
    <p>Числа \\(\\alpha_1, \\alpha_2, \\dots, \\alpha_n\\) называются <b>координатами вектора \\(x\\)</b> в данном базисе.</p>

    <p><b>Лемма (о линейной зависимости)</b></p>
    <ol>
        <li>Любая подсистема линейно независимой системы тоже линейно независима.</li>
        <li>Система векторов линейно зависима \\(\\iff\\) один из её векторов можно представить в виде линейной комбинации других её векторов.</li>
    </ol>

    <h4 style="color:#1a3a6e;">Билет 9. Линейная зависимость или линейная независимость ортогональной системы векторов, процесс ортогонализации Грамма – Шмидта.</h4>

    <p><b>Опр. 1.</b></p>
    <p>Векторы \\(\\bar{x}, \\bar{y} \\in V\\) называются <b>ортогональными</b>, если \\((\\bar{x}; \\bar{y}) = 0\\). Обозначается как \\(\\bar{x} \\perp \\bar{y}\\).</p>

    <p><b>Опр. 2.</b></p>
    <p>Система векторов называется <b>ортогональной</b>, если её векторы попарно ортогональны.</p>
    <p>Ортогональная система векторов называется <b>ортонормированной</b>, если нормы её векторов равны 1.</p>

    <h4 style="color:#1a3a6e;">Теорема о линейной независимости ортогональной системы</h4>

    <p>Если все векторы ортогональной системы ≠ \\(\\bar{0}\\), то она <b>линейно независима</b>.</p>

    <p><b>Д-во:</b> Пусть \\(\\bar{a}_1, \\bar{a}_2, \\dots, \\bar{a}_m \\in V\\) попарно ортогональны и ≠ \\(\\bar{0}\\).</p>
    <p>Предположим, что для некоторых \\(\\alpha_1, \\alpha_2, \\dots, \\alpha_m \\in \\mathbb{R}\\) выполнено \\(\\alpha_1 \\bar{a}_1 + \\alpha_2 \\bar{a}_2 + \\dots + \\alpha_m \\bar{a}_m = \\bar{0}\\).</p>
    <p>\\(\\forall i \\in \\{1, 2, \\dots, m\\}\\)</p>
    <p>\\(\\alpha_1 \\bar{a}_1 + \\dots + \\alpha_{i-1} \\bar{a}_{i-1} + \\alpha_i \\bar{a}_i + \\alpha_{i+1} \\bar{a}_{i+1} + \\dots + \\alpha_m \\bar{a}_m = \\bar{0} \\quad | \\cdot \\bar{a}_i\\)</p>
    <p>\\(\\alpha_1 \\underbrace{(\\bar{a}_1; \\bar{a}_i)}_{0} + \\dots + \\alpha_{i-1} \\underbrace{(\\bar{a}_{i-1}; \\bar{a}_i)}_{0} + \\alpha_i (\\bar{a}_i; \\bar{a}_i) + \\alpha_{i+1} \\underbrace{(\\bar{a}_{i+1}; \\bar{a}_i)}_{0} + \\dots + \\alpha_m \\underbrace{(\\bar{a}_m; \\bar{a}_i)}_{0} = (\\bar{0}; \\bar{a}_i)\\)</p>
    <p>\\(\\alpha_i (\\bar{a}_i; \\bar{a}_i) = 0 \\implies \\alpha_i = 0\\).</p>
    <p>Таким образом, \\(\\bar{a}_1, \\bar{a}_2, \\dots, \\bar{a}_m\\) — <b>линейно независимая система</b> \\(\\blacksquare\\).</p>

    <h4 style="color:#1a3a6e;">Теорема (о процессе ортогонализации Грамма – Шмидта)</h4>

    <p>Пусть \\(\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m\\) — <b>линейно независимая система</b>.</p>
    <p>\\(\\bar{e}_1 = \\bar{f}_1\\)</p>
    <p>\\(\\forall k \\in \\{2, 3, \\dots, m\\} :\\)</p>
    <p>$$\\bar{e}_k = \\bar{f}_k - \\sum_{i=1}^{k-1} \\frac{(\\bar{f}_k; \\bar{e}_i)}{(\\bar{e}_i; \\bar{e}_i)} \\cdot \\bar{e}_i$$</p>

    <p>Тогда:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — тоже <b>линейно независимая система</b>;</li>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — <b>ортогональная система векторов</b>.</li>
    </ol>

    <p><b>Д-во:</b></p>

    <p><b>1)</b> \\(\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m\\) — линейно независимая система \\(\\implies (\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m)\\) — базис \\(\\langle \\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m \\rangle\\).</p>
    <p>Матрица системы векторов \\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) в указанном базисе имеет вид:</p>
    <p>$$\\begin{pmatrix} 1 & a_{12} & a_{13} & \\dots & a_{1n} \\\\ 0 & 1 & a_{23} & \\dots & a_{2n} \\\\ 0 & 0 & 1 & \\dots & a_{3n} \\\\ \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & 0 & \\dots & 1 \\end{pmatrix}$$</p>
    <p>\\(\\det = 1\\) (если определитель ≠ \\(0\\), то столбцы линейно независимы) \\(\\implies\\)</p>
    <p>\\(\\implies\\) столбцы у матрицы линейно независимы \\(\\implies\\)</p>
    <p>\\(\\implies \\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — линейно независимы.</p>

    <p><b>2) Индукцией по \\(m\\).</b></p>

    <p><b>База индукции (\\(m=2\\)):</b></p>
    <p>\\(\\bar{e}_2 = \\bar{f}_2 - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot \\bar{e}_1 = \\bar{f}_2 - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot \\bar{f}_1\\)</p>
    <p>\\((\\bar{e}_1; \\bar{e}_2) = \\left( \\bar{f}_1; \\bar{f}_2 - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot \\bar{f}_1 \\right) = (\\bar{f}_1; \\bar{f}_2) - \\frac{(\\bar{f}_2; \\bar{e}_1)}{(\\bar{e}_1; \\bar{e}_1)} \\cdot (\\bar{f}_1; \\bar{f}_1) = 0\\)</p>

    <p><b>Шаг индукции:</b></p>
    <p>Предположим, что \\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_{m-1}\\) — попарно ортогональны.</p>
    <p>Докажем тогда \\(\\forall j \\in \\{1, 2, \\dots, m-1\\} \\quad \\bar{e}_m \\perp \\bar{e}_j\\).</p>
    <p>$$(\\bar{e}_m; \\bar{e}_j) = \\left( \\bar{f}_m - \\sum_{i=1}^{m-1} \\frac{(\\bar{f}_m; \\bar{e}_i)}{(\\bar{e}_i; \\bar{e}_i)} \\cdot \\bar{e}_i ; \\bar{e}_j \\right) = (\\bar{f}_m; \\bar{e}_j) - \\sum_{i=1}^{m-1} \\frac{(\\bar{f}_m; \\bar{e}_i)}{(\\bar{e}_i; \\bar{e}_i)} \\cdot (\\bar{e}_i; \\bar{e}_j) = (\\bar{f}_m; \\bar{e}_j) - \\frac{(\\bar{f}_m; \\bar{e}_j)}{(\\bar{e}_j; \\bar{e}_j)} \\cdot (\\bar{e}_j; \\bar{e}_j) = 0$$</p>
    <p>\\(\\implies \\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m\\) — <b>ортогональная система векторов</b> \\(\\blacksquare\\).</p>
</div>

`,
    9: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 10. Свойства ортонормированного базиса.</h3>

    <h4 style="color:#1a3a6e;">Определения из прошлого семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Упорядоченная система векторов</b> из \\(V\\) \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) называется <b>базисом</b> \\(V\\), если:</p>
    <ol>
        <li>\\(\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n\\) — <b>линейно независимая система</b>;</li>
        <li>\\(\\forall \\bar{x} \\in V \\quad \\exists \\alpha_1, \\alpha_2, \\dots, \\alpha_n \\in P : \\bar{x} = \\alpha_1 \\bar{e}_1 + \\alpha_2 \\bar{e}_2 + \\dots + \\alpha_n \\bar{e}_n\\).</li>
    </ol>

    <p><b>Опр. 2.</b></p>
    <p>Пусть \\(Б = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) и \\(Б' = (\\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_n)\\) — базисы линейного пространства \\(V\\).</p>
    <p><b>Матрицей перехода</b> из базиса \\(Б\\) в базис \\(Б'\\) называется матрица \\(T_{Б \\to Б'}\\), любой \\(j\\)-ый столбец которой равен \\([\\bar{e}'_j]_Б\\).</p>

    <p><b>Опр. 3.</b></p>
    <p><b>Ортогональная матрица</b> — квадратная вещественная матрица \\(A\\), умножение которой на свою транспонированную \\(A^t\\) даёт единичную матрицу.</p>

    <h4 style="color:#1a3a6e;">Билет 10. Свойства ортонормированного базиса.</h4>

    <p>Если ортонормированная система векторов образует <b>базис</b>, то этот базис называется <b>ортонормированным (ОНБ)</b>.</p>

    <h4 style="color:#1a3a6e;">Теорема (свойства ортонормированного базиса)</h4>

    <ol>
        <li>В любом конечном евклидовом пространстве <b>существует ортонормированный базис</b>.</li>
        <li>Если \\(Б = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — ортонормированный базис, то \\(\\forall \\bar{x} \\in V\\):
            $$[\\bar{x}]_Б = \\begin{pmatrix} (\\bar{x}; \\bar{e}_1) \\\\ (\\bar{x}; \\bar{e}_2) \\\\ \\vdots \\\\ (\\bar{x}; \\bar{e}_n) \\end{pmatrix}$$</li>
        <li>Если \\(Б = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — ортонормированный базис, \\([\\bar{x}]_Б = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix}\\), \\([\\bar{y}]_Б = \\begin{pmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_n \\end{pmatrix}\\), то
            <b>\\((\\bar{x}; \\bar{y}) = x_1 y_1 + x_2 y_2 + \\dots + x_n y_n\\)</b>.</li>
        <li><b>Матрица перехода</b> из ортонормированного базиса в тоже ортонормированный базис — <b>ортогональная</b>, \\(T^t = T^{-1}\\).</li>
    </ol>

    <p><b>Д-во:</b></p>

    <p><b>1)</b> Берём произвольный базис \\((\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_n)\\) в \\(V\\).</p>
    <p>Применяем <b>процесс ортогонализации</b>, получаем линейно независимую систему \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) [по теореме о процессе ортогонализации Грамма-Шмидта, п. 1].</p>
    <p>С достаточным для базиса количеством векторов \\(\\implies (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — ортогональный базис [опять та же теорема, п. 2].</p>
    <p>\\(\\bar{e}'_i = \\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}\\) [чтобы базис стал ортонормированным, надо каждый вектор поделить на его собственную длину (норму), чтобы его длина стала равна 1].</p>
    <p>\\(\\|\\bar{e}'_i\\| = \\sqrt{(\\bar{e}'_i; \\bar{e}'_i)} = \\sqrt{\\left(\\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}; \\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}\\right)} = \\sqrt{\\frac{1}{\\|\\bar{e}_i\\|^2} \\cdot (\\bar{e}_i; \\bar{e}_i)} = \\frac{1}{\\|\\bar{e}_i\\|} \\cdot \\sqrt{(\\bar{e}_i; \\bar{e}_i)} = \\frac{1}{\\|\\bar{e}_i\\|} \\cdot \\|\\bar{e}_i\\| = 1\\) [доказали, что норма нового вектора = 1].</p>
    <p>При \\(i\\) ≠ \\(j \\quad (\\bar{e}'_i; \\bar{e}'_j) = \\left(\\frac{\\bar{e}_i}{\\|\\bar{e}_i\\|}; \\frac{\\bar{e}_j}{\\|\\bar{e}_j\\|}\\right) = \\frac{1}{\\|\\bar{e}_i\\| \\cdot \\|\\bar{e}_j\\|} \\cdot \\underbrace{(\\bar{e}_i; \\bar{e}_j)}_{0} = 0\\)</p>
    <p>\\(\\implies (\\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_n)\\) — ортонормированный базис.</p>

    <p><b>2)</b> \\(\\bar{x} = x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n\\)</p>
    <p>\\(\\bar{x} = x_1 \\bar{e}_1 + \\dots + x_{j-1} \\bar{e}_{j-1} + x_j \\bar{e}_j + x_{j+1} \\bar{e}_{j+1} + \\dots + x_n \\bar{e}_n \\quad | \\cdot \\bar{e}_j\\)</p>
    <p>\\((\\bar{x}; \\bar{e}_j) = x_1 \\underbrace{(\\bar{e}_1; \\bar{e}_j)}_{0} + \\dots + x_{j-1} \\underbrace{(\\bar{e}_{j-1}; \\bar{e}_j)}_{0} + x_j \\underbrace{(\\bar{e}_j; \\bar{e}_j)}_{1} + x_{j+1} \\underbrace{(\\bar{e}_{j+1}; \\bar{e}_j)}_{0} + \\dots + x_n \\underbrace{(\\bar{e}_n; \\bar{e}_j)}_{0}\\)</p>
    <p>\\((\\bar{x}; \\bar{e}_j) = x_j \\implies [\\bar{x}]_Б = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix} = \\begin{pmatrix} (\\bar{x}; \\bar{e}_1) \\\\ (\\bar{x}; \\bar{e}_2) \\\\ \\vdots \\\\ (\\bar{x}; \\bar{e}_n) \\end{pmatrix}\\).</p>

    <p><b>3)</b> \\(\\bar{x} = x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n\\), \\(\\bar{y} = y_1 \\bar{e}_1 + y_2 \\bar{e}_2 + \\dots + y_n \\bar{e}_n\\)</p>
    <p>$$(\\bar{x}; \\bar{y}) = (x_1 \\bar{e}_1 + x_2 \\bar{e}_2 + \\dots + x_n \\bar{e}_n ; \\ y_1 \\bar{e}_1 + y_2 \\bar{e}_2 + \\dots + y_n \\bar{e}_n)$$</p>
    <p>\\(= x_1 y_1 \\underbrace{(\\bar{e}_1; \\bar{e}_1)}_{1} + x_1 y_2 \\underbrace{(\\bar{e}_1; \\bar{e}_2)}_{0} + \\dots + x_1 y_n \\underbrace{(\\bar{e}_1; \\bar{e}_n)}_{0} +\\)</p>
    <p>\\(+ x_2 y_1 \\underbrace{(\\bar{e}_2; \\bar{e}_1)}_{0} + x_2 y_2 \\underbrace{(\\bar{e}_2; \\bar{e}_2)}_{1} + \\dots + x_2 y_n \\underbrace{(\\bar{e}_2; \\bar{e}_n)}_{0} +\\)</p>
    <p>\\(+ \\dots + x_n y_1 \\underbrace{(\\bar{e}_n; \\bar{e}_1)}_{0} + x_n y_2 \\underbrace{(\\bar{e}_n; \\bar{e}_2)}_{0} + \\dots + x_n y_n \\underbrace{(\\bar{e}_n; \\bar{e}_n)}_{1}\\)</p>
    <p>\\(= x_1 y_1 + x_2 y_2 + \\dots + x_n y_n\\).</p>

    <p><b>4)</b> Пусть \\(Б = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) и \\(Б' = (\\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_n)\\) — ортонормированные базисы.</p>
    <p>$$\\begin{cases} \\bar{e}'_1 = t_{11} \\bar{e}_1 + t_{21} \\bar{e}_2 + \\dots + t_{n1} \\bar{e}_n \\\\ \\bar{e}'_2 = t_{12} \\bar{e}_1 + t_{22} \\bar{e}_2 + \\dots + t_{n2} \\bar{e}_n \\\\ \\dots \\\\ \\bar{e}'_n = t_{1n} \\bar{e}_1 + t_{2n} \\bar{e}_2 + \\dots + t_{nn} \\bar{e}_n \\end{cases}$$</p>
    <p>\\(T_{Б \\to Б'} = \\begin{pmatrix} t_{11} & t_{12} & \\dots & t_{1n} \\\\ t_{21} & t_{22} & \\dots & t_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ t_{n1} & t_{n2} & \\dots & t_{nn} \\end{pmatrix}\\)</p>
    <p>$$T_{Б \\to Б'}^t \\cdot T_{Б \\to Б'} = \\begin{pmatrix} t_{11} & t_{21} & \\dots & t_{n1} \\\\ t_{12} & t_{22} & \\dots & t_{n2} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ t_{1n} & t_{2n} & \\dots & t_{nn} \\end{pmatrix} \\cdot \\begin{pmatrix} t_{11} & t_{12} & \\dots & t_{1n} \\\\ t_{21} & t_{22} & \\dots & t_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ t_{n1} & t_{n2} & \\dots & t_{nn} \\end{pmatrix}$$</p>
    <p>\\(= \\begin{pmatrix} (\\bar{e}'_1; \\bar{e}'_1) & (\\bar{e}'_1; \\bar{e}'_2) & \\dots & (\\bar{e}'_1; \\bar{e}'_n) \\\\ (\\bar{e}'_2; \\bar{e}'_1) & (\\bar{e}'_2; \\bar{e}'_2) & \\dots & (\\bar{e}'_2; \\bar{e}'_n) \\\\ \\dots & \\dots & \\dots & \\dots \\\\ (\\bar{e}'_n; \\bar{e}'_1) & (\\bar{e}'_n; \\bar{e}'_2) & \\dots & (\\bar{e}'_n; \\bar{e}'_n) \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & \\dots & 0 \\\\ 0 & 1 & \\dots & 0 \\\\ \\dots & \\dots & \\dots & \\dots \\\\ 0 & 0 & \\dots & 1 \\end{pmatrix} = E_{n \\times n}\\)</p>
    <p>\\(\\implies T_{Б \\to Б'}^t = T_{Б \\to Б'}^{-1}\\) \\(\\blacksquare\\).</p>
</div>

`,
    10: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 11. Определитель Грама.</h3>

    <h4 style="color:#1a3a6e;">Определения из прошлого семестра</h4>

    <p><b>Транспонированная матрица (\\(A^t\\)):</b></p>
    <p>Матрица, полученная заменой строк столбцами.</p>
    <p><b>Свойства определителя:</b></p>
    <ul>
        <li>\\(|A^t| = |A|\\)</li>
        <li>\\(|A \\cdot B| = |A| \\cdot |B|\\)</li>
        <li>\\(|A^t \\cdot A| = |A^t| \\cdot |A| = |A| \\cdot |A| = |A|^2 \\ge 0\\)</li>
    </ul>

    <h4 style="color:#1a3a6e;">Билет 11. Определитель Грама.</h4>

    <p><b>Опр. 1.</b></p>
    <p><b>Матрицей Грама</b> системы векторов \\(S = (\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_m)\\) называется матрица</p>
    <p>$$\\Gamma_S = \\begin{pmatrix} (\\bar{f}_1; \\bar{f}_1) & (\\bar{f}_1; \\bar{f}_2) & \\dots & (\\bar{f}_1; \\bar{f}_m) \\\\ (\\bar{f}_2; \\bar{f}_1) & (\\bar{f}_2; \\bar{f}_2) & \\dots & (\\bar{f}_2; \\bar{f}_m) \\\\ \\dots & \\dots & \\dots & \\dots \\\\ (\\bar{f}_m; \\bar{f}_1) & (\\bar{f}_m; \\bar{f}_2) & \\dots & (\\bar{f}_m; \\bar{f}_m) \\end{pmatrix}$$</p>
    <p>Её определитель <b>\\(|\\Gamma_S|\\)</b> называется <b>определителем Грама</b> данной системы векторов.</p>

    <h4 style="color:#1a3a6e;">Теорема (об определителе Грама)</h4>

    <p>Пусть \\(V\\) — \\(n\\)-мерное <b>евклидово пространство</b>, \\(S = (\\bar{f}_1, \\bar{f}_2, \\dots, \\bar{f}_n)\\). Тогда:</p>
    <ol>
        <li>если \\(S\\) — <b>линейно независимая система</b>, то <b>\\(|\\Gamma_S| > 0\\)</b>;</li>
        <li>если \\(S\\) — <b>линейно зависимая система</b>, то <b>\\(|\\Gamma_S| = 0\\)</b>.</li>
    </ol>

    <p><b>Д-во:</b></p>
    <p>Возьмём в \\(V\\) <b>ортонормированный базис</b> \\(Б = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\).</p>
    <p>\\(\\bar{f}_1 = a_{11} \\bar{e}_1 + a_{21} \\bar{e}_2 + \\dots + a_{n1} \\bar{e}_n\\)</p>
    <p>\\(\\bar{f}_2 = a_{12} \\bar{e}_1 + a_{22} \\bar{e}_2 + \\dots + a_{n2} \\bar{e}_n\\)</p>
    <p>\\(\\dots \\dots \\dots \\dots\\)</p>
    <p>\\(\\bar{f}_n = a_{1n} \\bar{e}_1 + a_{2n} \\bar{e}_2 + \\dots + a_{nn} \\bar{e}_n\\)</p>

    <p>\\(A = \\begin{pmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{n1} & a_{n2} & \\dots & a_{nn} \\end{pmatrix}\\)</p>

    <p>$$A^t \\cdot A = \\begin{pmatrix} a_{11} & a_{21} & \\dots & a_{n1} \\\\ a_{12} & a_{22} & \\dots & a_{n2} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{1n} & a_{2n} & \\dots & a_{nn} \\end{pmatrix} \\cdot \\begin{pmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\dots & \\dots & \\dots & \\dots \\\\ a_{n1} & a_{n2} & \\dots & a_{nn} \\end{pmatrix}$$</p>
    <p>\\(= \\begin{pmatrix} (\\bar{f}_1; \\bar{f}_1) & (\\bar{f}_1; \\bar{f}_2) & \\dots & (\\bar{f}_1; \\bar{f}_n) \\\\ (\\bar{f}_2; \\bar{f}_1) & (\\bar{f}_2; \\bar{f}_2) & \\dots & (\\bar{f}_2; \\bar{f}_n) \\\\ \\dots & \\dots & \\dots & \\dots \\\\ (\\bar{f}_n; \\bar{f}_1) & (\\bar{f}_n; \\bar{f}_2) & \\dots & (\\bar{f}_n; \\bar{f}_n) \\end{pmatrix}\\)</p>

    <p>\\(|A^t \\cdot A| = |A^t| \\cdot |A| = |A| \\cdot |A| = |A|^2\\)</p>
    <p><b>\\(|\\Gamma_S| = |A|^2\\)</b></p>

    <p><b>1) \\(S\\) — линейно независимая система</b> \\(\\implies\\) столбцы у \\(A\\) линейно независимы \\(\\implies |A|\\) ≠ \\(0 \\implies\\) <b>\\(|\\Gamma_S| > 0\\)</b>.</p>
    <p><b>2) \\(S\\) — линейно зависимая система</b> \\(\\implies\\) столбцы у \\(A\\) линейно зависимы \\(\\implies\\) <b>\\(|A| = 0 \\implies |\\Gamma_S| = 0\\)</b> \\(\\blacksquare\\).</p>
</div>

`,
    11: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 12. Свойства ортогонального дополнения.</h3>

    <h4 style="color:#1a3a6e;">Определения из прошлого семестра</h4>

    <p><b>Опр. 1.</b></p>
    <p>Непустое подмножество \\(L\\) линейного пространства \\(V\\) называется <b>подпространством</b> \\(V\\), если:</p>
    <ol type="a">
        <li>\\(\\forall \\bar{x}, \\bar{y} \\in L \\implies \\bar{x} + \\bar{y} \\in L\\);</li>
        <li>\\(\\forall \\bar{x} \\in L \\quad \\forall \\alpha \\in P \\implies \\alpha \\bar{x} \\in L\\).</li>
    </ol>

    <p><b>Опр. 2.</b></p>
    <p><b>Размерность \\(\\text{dim}(V)\\)</b> линейного пространства (евклидова пространства) — количество векторов в любом его базисе.</p>

    <p><b>Теорема 1 (критерий прямой суммы)</b></p>
    <p>Пусть \\(L \\le V\\) и \\(M \\le V\\). Тогда \\(L + M = L \\oplus M \\iff \\forall \\bar{z} \\in L+M \\quad \\exists! \\bar{x} \\in L \\quad \\exists! \\bar{y} \\in M : \\bar{z} = \\bar{x} + \\bar{y}\\).</p>

    <h4 style="color:#1a3a6e;">Билет 12. Свойства ортогонального дополнения.</h4>

    <p><b>Опр.</b></p>
    <p>Пусть \\(M \\subseteq V, M\\) ≠ \\(\\varnothing\\).</p>
    <p><b>Ортогональным дополнением</b> к \\(M\\) называется множество</p>
    <p><b>\\(M^{\\perp} = \\{ \\bar{z} \\in V : \\forall \\bar{y} \\in M \\quad (\\bar{y}; \\bar{z}) = 0 \\}\\)</b>.</p>

    <h4 style="color:#1a3a6e;">Теорема</h4>

    <p>Пусть \\(L\\) — <b>подпространство</b> конечномерного <b>евклидова пространства</b> \\(V\\). Тогда:</p>
    <ol>
        <li><b>\\(\\forall \\bar{x} \\in V \\quad \\exists! \\bar{y} \\in L \\quad \\exists! \\bar{z} \\in L^{\\perp} : \\bar{x} = \\bar{y} + \\bar{z}\\)</b></li>
        <li><b>\\(\\text{dim}(L^{\\perp}) + \\text{dim}(L) = \\text{dim}(V)\\)</b></li>
    </ol>

    <p><b>Д-во:</b></p>
    <p>Докажем сначала, что \\(\\forall M\\) ≠ \\(\\varnothing, M \\subseteq V \\implies M^{\\perp} \\le V\\).</p>
    <p>Выберем произвольно \\(\\bar{z}_1, \\bar{z}_2 \\in M^{\\perp}, \\alpha_1, \\alpha_2 \\in \\mathbb{R}\\).</p>
    <p>\\(\\forall \\bar{y} \\in M \\quad (\\alpha_1 \\bar{z}_1 + \\alpha_2 \\bar{z}_2; \\bar{y}) = \\alpha_1 \\underbrace{(\\bar{z}_1; \\bar{y})}_{0} + \\alpha_2 \\underbrace{(\\bar{z}_2; \\bar{y})}_{0} = 0\\)</p>
    <p>\\(\\implies (\\alpha_1 \\bar{z}_1 + \\alpha_2 \\bar{z}_2) \\in M^{\\perp} \\implies M^{\\perp} \\le V\\).</p>

    <p><b>1) а) существование \\(\\bar{y}\\) и \\(\\bar{z}\\)</b></p>
    <p>Если \\(L = \\{ \\bar{0} \\}\\), то \\((\\bar{x}; \\bar{0}) = 0 \\implies \\bar{x} = \\underbrace{\\bar{0}}_{\\in L} + \\underbrace{\\bar{x}}_{\\in L^{\\perp}}\\).</p>
    <p>Если \\(L\\) ≠ \\(\\{ \\bar{0} \\}\\), то возьмём в \\(L\\) <b>ортонормированный базис</b> \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_m)\\).</p>
    <p>Определим <b>\\(\\bar{y} = \\sum_{i=1}^{m} (\\bar{x}; \\bar{e}_i) \\cdot \\bar{e}_i \\in L\\)</b>.</p>
    <p>Докажем, что <b>\\(\\bar{z} = \\bar{x} - \\bar{y} \\in L^{\\perp}\\)</b>:</p>
    <p>\\((\\bar{x} - \\bar{y}; \\bar{e}_j) = \\left( \\bar{x} - \\sum_{i=1}^{m} (\\bar{x}; \\bar{e}_i) \\cdot \\bar{e}_i ; \\bar{e}_j \\right) = (\\bar{x}; \\bar{e}_j) - \\sum_{i=1}^{m} (\\bar{x}; \\bar{e}_i) \\cdot (\\bar{e}_i; \\bar{e}_j)\\)</p>
    <p>\\(= (\\bar{x}; \\bar{e}_j) - (\\bar{x}; \\bar{e}_j) \\cdot \\underbrace{(\\bar{e}_j; \\bar{e}_j)}_{1} = 0\\)</p>
    <p>\\(\\implies \\bar{z} = \\bar{x} - \\bar{y} \\in L^{\\perp} \\implies \\bar{x} = \\bar{y} + \\bar{z}\\).</p>

    <p><b>б) единственность</b></p>
    <p>Пусть \\(\\bar{x} = \\bar{y}_1 + \\bar{z}_1\\) и \\(\\bar{x} = \\bar{y}_2 + \\bar{z}_2\\), где \\(\\bar{y}_i \\in L, \\bar{z}_i \\in L^{\\perp}\\).</p>
    <p>\\(\\bar{0} = (\\underbrace{\\bar{y}_2 - \\bar{y}_1}_{\\bar{a} \\in L}) + (\\underbrace{\\bar{z}_2 - \\bar{z}_1}_{\\bar{b} \\in L^{\\perp}})\\).</p>
    <p>\\((\\bar{0}; \\bar{a}) = (\\bar{a}; \\bar{a}) + \\underbrace{(\\bar{b}; \\bar{a})}_{0} \\implies (\\bar{a}; \\bar{a}) = 0 \\implies \\bar{a} = \\bar{0} \\implies \\bar{b} = \\bar{0}\\)</p>
    <p>\\(\\implies \\bar{y}_1 = \\bar{y}_2\\) и \\(\\bar{z}_1 = \\bar{z}_2\\).</p>

    <p><b>2)</b> \\(\\forall \\bar{x} \\in V \\quad \\exists! \\bar{y} \\in L \\quad \\exists! \\bar{z} \\in L^{\\perp} : \\bar{x} = \\bar{y} + \\bar{z}\\).</p>
    <p>Пусть \\((\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_k)\\) — базис \\(L\\), \\((\\bar{e}'_1, \\bar{e}'_2, \\dots, \\bar{e}'_m)\\) — базис \\(L^{\\perp}\\).</p>
    <p>\\(\\exists! (\\alpha_1, \\dots, \\alpha_k) \\quad \\exists! (\\beta_1, \\dots, \\beta_m) :\\)</p>
    <p>\\(\\bar{x} = \\underbrace{\\alpha_1 \\bar{e}_1 + \\dots + \\alpha_k \\bar{e}_k}_{\\bar{y}} + \\underbrace{\\beta_1 \\bar{e}'_1 + \\dots + \\beta_m \\bar{e}'_m}_{\\bar{z}}\\).</p>
    <p>\\(V = \\langle \\bar{e}_1, \\dots, \\bar{e}_k, \\bar{e}'_1, \\dots, \\bar{e}'_m \\rangle\\).</p>
    <p>Пусть \\(\\sum \\alpha_i \\bar{e}_i + \\sum \\beta_j \\bar{e}'_j = \\bar{0}\\). При этом \\(\\bar{0} = \\bar{0} + \\bar{0}\\).</p>
    <p>Разложение по \\(L\\) и \\(L^{\\perp}\\) единственное \\(\\implies \\bar{y} = \\bar{0}\\) и \\(\\bar{z} = \\bar{0} \\implies\\)</p>
    <p>\\(\\implies \\begin{cases} \\sum \\alpha_i \\bar{e}_i = \\bar{0} \\implies \\alpha_i = 0 \\\\ \\sum \\beta_j \\bar{e}'_j = \\bar{0} \\implies \\beta_j = 0 \\end{cases} \\implies \\bar{e}_1, \\dots, \\bar{e}_k, \\bar{e}'_1, \\dots, \\bar{e}'_m\\) — <b>линейно независимая система</b>.</p>
    <p>Следовательно, \\((\\bar{e}_1, \\dots, \\bar{e}_k, \\bar{e}'_1, \\dots, \\bar{e}'_m)\\) — базис \\(V \\implies\\)</p>
    <p>\\(\\implies \\text{dim}(V) = k + m = \\text{dim}(L) + \\text{dim}(L^{\\perp})\\).</p>
    <p>В случае, если \\(L = \\{ \\bar{0} \\}\\) или \\(L^{\\perp} = \\{ \\bar{0} \\} \\implies V = L^{\\perp}\\) или \\(V = L\\) — доказательство очевидно \\(\\blacksquare\\).</p>
</div>

`,
    12: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 13. Свойства самосопряжённого оператора (его матрица в ортонормированном базисе, корни характеристического уравнения).</h3>

    <h4 style="color:#1a3a6e;">Определения из прошлого семестра</h4>

    <p><b>Комплексное сопряжение:</b></p>
    <p>Число \\(\\bar{z} = x - iy\\) для \\(z = x + iy\\).</p>

    <p><b>Симметричная матрица:</b></p>
    <p>Матрица, которая равна своей транспонированной (\\(A = A^t\\)).</p>

    <h4 style="color:#1a3a6e;">Билет 13. Свойства самосопряжённого оператора (его матрица в ортонормированном базисе, корни характеристического уравнения).</h4>

    <p><b>Опр. 1.</b></p>
    <p>Оператор \\(\\hat{A}\\), действующий в конечномерном евклидовом пространстве \\(V\\), называется <b>самосопряжённым</b>, если \\(\\forall \\bar{x}, \\bar{y} \\in V \\quad (\\hat{A}(\\bar{x}); \\bar{y}) = (\\bar{x}; \\hat{A}(\\bar{y}))\\).</p>
    <p>Несамосопряжённым — в противном случае.</p>

    <h4 style="color:#1a3a6e;">Теорема (о свойствах самосопряжённого линейного оператора)</h4>

    <ol>
        <li>Матрица самосопряжённого оператора в ортонормированном базисе — <b>симметричная</b>.</li>
        <li>Корни характеристического уравнения самосопряжённого линейного оператора — <b>вещественные</b>.</li>
    </ol>

    <p><b>Д-во:</b></p>

    <p><b>1)</b> Пусть \\(Б = (\\bar{e}_1, \\bar{e}_2, \\dots, \\bar{e}_n)\\) — ортонормированный базис. \\(\\hat{A}\\) — самосопряжённый линейный оператор.</p>
    <p>\\(\\hat{A}(\\bar{e}_j) = \\sum_{i=1}^{n} a_{ij} \\bar{e}_i\\), где \\((a_{ij})_{i,j=1}^n = [\\hat{A}]_Б\\).</p>
    <p>Так как \\(Б\\) — ортонормированный базис, то \\(a_{ij} = (\\hat{A}(\\bar{e}_j); \\bar{e}_i)\\)</p>
    <p>\\(\\implies a_{ij} = (\\bar{e}_j; \\hat{A}(\\bar{e}_i)) = (\\hat{A}(\\bar{e}_i); \\bar{e}_j) = a_{ji}\\)</p>
    <p>\\(\\implies [\\hat{A}]_Б\\) — <b>симметричная</b>.</p>

    <p><b>2)</b> Пусть \\(\\lambda\\) — собственное значение самосопряжённого линейного оператора \\(\\hat{A}\\).</p>
    <p>Тогда для некоторого ненулевого столбца \\(\\mathcal{X}_{n \\times 1}\\) справедливо равенство <b>\\([\\hat{A}]_Б \\cdot \\mathcal{X} = \\lambda \\cdot \\mathcal{X}\\)</b>.</p>
    <p>\\([\\hat{A}]_Б = A\\)</p>
    <p>\\(\\mathcal{X} = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix}\\)</p>
    <p>\\(\\bar{\\mathcal{X}}^t \\cdot \\mathcal{X} = (\\bar{x}_1, \\bar{x}_2, \\dots, \\bar{x}_n) \\cdot \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix} = \\underbrace{(|x_1|^2 + |x_2|^2 + \\dots + |x_n|^2)}_{>0}\\).</p>
    <p>\\(\\mathcal{X}^t A \\mathcal{X} = \\mathcal{X}^t \\cdot \\lambda \\mathcal{X} = \\lambda \\cdot \\mathcal{X}^t \\cdot \\mathcal{X} = \\lambda \\cdot (|x_1|^2 + |x_2|^2 + \\dots + (x_n)^2)\\).</p>
    <p>\\(\\mathcal{X}^t A \\mathcal{X}\\) — матрица \\(1 \\times 1\\), она равна себе транспонированной.</p>
    <p>\\(\\overline{\\mathcal{X}^t A \\mathcal{X}} = (\\overline{\\mathcal{X}^t A \\mathcal{X}})^t = \\mathcal{X}^t A^t \\bar{\\mathcal{X}} =\\)</p>
    <p>\\(= \\mathcal{X}^t A \\bar{\\mathcal{X}} = \\mathcal{X}^t \\cdot \\bar{\\lambda} \\cdot \\bar{\\mathcal{X}} = \\bar{\\lambda} \\mathcal{X}^t \\cdot \\bar{\\mathcal{X}} = \\bar{\\lambda} \\cdot (x_1, x_2, \\dots, x_n) \\cdot \\begin{pmatrix} \\bar{x}_1 \\\\ \\bar{x}_2 \\\\ \\vdots \\\\ \\bar{x}_n \\end{pmatrix} = \\bar{\\lambda} (|x_1|^2 + |x_2|^2 + \\dots + |x_n|^2)\\).</p>
    <p>\\(\\lambda (|x_1|^2 + |x_2|^2 + \\dots + |x_n|^2) = \\bar{\\lambda} (|x_1|^2 + |x_2|^2 + \\dots + |x_n|^2)\\)</p>
    <p>\\(\\lambda = \\bar{\\lambda} \\implies \\mathbf{\\lambda \\in \\mathbb{R}}\\) \\(\\blacksquare\\).</p>
</div>

`,
    13: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 14. Свойства самосопряжённого оператора: собственные векторы, соответствующие различным собственным значениям; существование ортонормированного базиса из собственных векторов.</h3>

    <h4 style="color:#1a3a6e;">Определения из прошлого семестра</h4>

    <p><b>Коммутативность скалярного произведения:</b></p>
    <p>\\((\\bar{x}, \\bar{y}) = (\\bar{y}, \\bar{x})\\).</p>

    <p><b>Метод математической индукции:</b></p>
    <p>Метод доказательства, состоящий из базы индукции (БИ) и индуктивного шага (ШИ).</p>

    <h4 style="color:#1a3a6e;">Билет 14. Свойства самосопряжённого оператора: собственные векторы, соответствующие различным собственным значениям; существование ортонормированного базиса из собственных векторов.</h4>

    <h4 style="color:#1a3a6e;">Теорема</h4>

    <ol>
        <li><b>Собственные векторы самосопряжённого линейного оператора</b>, соответствующие различным собственным значениям — <b>ортогональны</b>.</li>
        <li>У самосопряжённого оператора <b>существует ортонормированный базис из собственных векторов</b>.</li>
    </ol>

    <p><b>Д-во:</b></p>

    <p><b>1)</b> Пусть \\(\\hat{A}\\) — самосопряжённый линейный оператор; \\(\\bar{e}_1\\) — его собственный вектор, соответствующий собственному значению \\(\\lambda_1\\); \\(\\bar{e}_2\\) — собственный вектор, соответствующий собственному значению \\(\\lambda_2\\).</p>
    <p>\\(\\hat{A}(\\bar{e}_1) = \\lambda_1 \\bar{e}_1, \\quad \\hat{A}(\\bar{e}_2) = \\lambda_2 \\bar{e}_2\\).</p>
    <p>\\((\\hat{A}(\\bar{e}_1); \\bar{e}_2) = (\\lambda_1 \\bar{e}_1; \\bar{e}_2) = \\lambda_1 (\\bar{e}_1; \\bar{e}_2)\\).</p>
    <p>\\((\\hat{A}(\\bar{e}_1); \\bar{e}_2) = (\\bar{e}_1; \\hat{A}(\\bar{e}_2)) = (\\bar{e}_1; \\lambda_2 \\bar{e}_2) = \\lambda_2 (\\bar{e}_1; \\bar{e}_2)\\).</p>
    <p>\\(\\lambda_1 (\\bar{e}_1; \\bar{e}_2) = \\lambda_2 (\\bar{e}_1; \\bar{e}_2)\\).</p>
    <p>\\((\\lambda_1 - \\lambda_2)(\\bar{e}_1; \\bar{e}_2) = 0\\).</p>
    <p>Если \\(\\lambda_1\\) ≠ \\(\\lambda_2\\), то <b>\\((\\bar{e}_1; \\bar{e}_2) = 0 \\implies \\bar{e}_1 \\perp \\bar{e}_2\\)</b>.</p>

    <p><b>4)</b> Докажем индукцией по \\(\\text{dim}(V) = n\\).</p>

    <p><b>БИ (\\(n=1\\)):</b></p>
    <p>В одномерном пространстве любой линейный оператор — оператор умножения на какое-то число:</p>
    <p>\\(\\hat{A}(\\bar{x}) = \\lambda \\cdot \\bar{x} \\implies\\) любой \\(\\bar{x}\\) ≠ \\(\\bar{0}\\) — собственный вектор для \\(\\hat{A}\\); в частности любой \\(\\bar{e}_1\\) ≠ \\(\\bar{0}\\), выбранный в качестве базиса — собственный вектор для \\(\\hat{A}\\).</p>

    <p><b>ШИ:</b></p>
    <p>Предположим, что утверждение справедливо для некоторого \\(n\\). Покажем, что тогда оно справедливо для \\(n+1\\).</p>
    <p>\\([\\hat{A}]_Б = A_{(n+1) \\times (n+1)}\\).</p>
    <p>\\(|A - \\lambda E_{(n+1) \\times (n+1)}|\\) — многочлен степени \\((n+1)\\).</p>
    <p>По основной теореме алгебры у него есть корень \\(\\lambda_1\\); по пункту 2) данной теоремы, \\(\\lambda_1 \\in \\mathbb{R}\\).</p>
    <p>\\(\\implies \\lambda_1\\) — собственное значение линейного оператора \\(\\hat{A}\\); обозначим соответствующий собственный вектор как \\(\\bar{e}'_1\\).</p>
    <p>\\(\\hat{A}(\\bar{e}'_1) = \\lambda_1 \\bar{e}'_1\\).</p>
    <p>\\(\\bar{e}_1 = \\frac{\\bar{e}'_1}{\\|\\bar{e}'_1\\|}\\).</p>
    <p>\\(\\hat{A}(\\bar{e}_1) = \\hat{A}\\left(\\frac{\\bar{e}'_1}{\\|\\bar{e}'_1\\|}\\right) = \\frac{1}{\\|\\bar{e}'_1\\|} \\cdot \\hat{A}(\\bar{e}'_1) = \\frac{1}{\\|\\bar{e}'_1\\|} \\cdot \\lambda_1 \\cdot \\bar{e}'_1 = \\lambda_1 \\cdot \\frac{\\bar{e}'_1}{\\|\\bar{e}'_1\\|} = \\lambda_1 \\bar{e}_1\\).</p>
    <p>\\(\\bar{e}_1\\) — тоже собственный вектор, соответствующий собственному значению \\(\\lambda_1\\); но \\(\\|\\bar{e}_1\\| = 1\\).</p>
    <p>\\(\\langle \\bar{e}_1 \\rangle\\) — одномерное подпространство. Покажем, что \\(\\langle \\bar{e}_1 \\rangle^{\\perp}\\) инвариантно относительно действия \\(\\hat{A}\\).</p>
    <p>Пусть \\(\\bar{x} \\in \\langle \\bar{e}_1 \\rangle^{\\perp}\\). Тогда</p>
    <p>\\((\\hat{A}(\\bar{x}); \\bar{e}_1) = (\\bar{x}; \\hat{A}(\\bar{e}_1)) = (\\bar{x}; \\lambda_1 \\bar{e}_1) = \\lambda_1 (\\bar{x}; \\bar{e}_1) = 0\\)</p>
    <p>\\(\\implies \\hat{A}(\\bar{x}) \\in \\langle \\bar{e}_1 \\rangle^{\\perp}\\).</p>
    <p>Таким образом, можно говорить о «сужении» \\(\\hat{A}\\) на \\(\\langle \\bar{e}_1 \\rangle^{\\perp}\\):</p>
    <p>\\(\\hat{A} : \\langle \\bar{e}_1 \\rangle^{\\perp} \\to \\langle \\bar{e}_1 \\rangle^{\\perp}\\).</p>
    <p>\\(\\text{dim}\\langle \\bar{e}_1 \\rangle^{\\perp} = n + 1 - \\text{dim}\\langle \\bar{e}_1 \\rangle = n + 1 - 1 = n\\).</p>
    <p>В \\(\\langle \\bar{e}_1 \\rangle^{\\perp}\\) \\(\\hat{A}\\) тоже самосопряжённый \\(\\implies\\) существует ортонормированный базис из собственных векторов \\((\\bar{e}_2, \\bar{e}_3, \\dots, \\bar{e}_{n+1})\\).</p>
    <p>\\(\\implies (\\bar{e}_1, \\bar{e}_2, \\bar{e}_3, \\dots, \\bar{e}_{n+1})\\) — ортонормированный базис \\(V\\) из собственных векторов линейного оператора \\(\\hat{A}\\) \\(\\blacksquare\\).</p>
</div>

`,
    14: "📖 Конспект будет добавлен",
    15: "📖 Конспект будет добавлен",
    16: `
📖 Конспект для билета 12
`,
    17: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 18. Теорема о существовании и единственности задачи Коши для ЛДУ. Принцип суперпозиции для ЛДУ. Теорема о структуре общего решения НЛДУ.</h3>

    <h4 style="color:#1a3a6e;">1. Линейное ДУ (ЛДУ) n-го порядка</h4>
    <p><b>Определение.</b> Уравнение вида</p>
    <p>$$y^{(n)} + a_{n-1}(x) \\cdot y^{(n-1)} + \\dots + a_1(x) \\cdot y' + a_0(x) \\cdot y = f(x),$$</p>
    <p>где $a_i(x), f(x)$ определены и <b>непрерывны</b> на интервале $I \\subset \\mathbb{R}$, называется <b>линейным дифференциальным уравнением (ЛДУ) n-го порядка</b>.<br>
    Если $f(x) \\equiv 0$ на $I$, то уравнение называется <b>однородным (ОЛДУ)</b>; в противном случае — <b>неоднородным (НЛДУ)</b>.</p>

    <h4 style="color:#1a3a6e;">2. Теорема 1 (о существовании и единственности задачи Коши для ЛДУ)</h4>
    <p>Пусть $a_0(x), a_1(x), \\dots, a_{n-1}(x)$ и $f(x)$ определены и непрерывны на интервале $I$; $x_0 \\in I$. Тогда:</p>
    <ol>
        <li>У задачи Коши
            $$\\begin{cases}
            y^{(n)} + a_{n-1}(x) \\cdot y^{(n-1)} + \\dots + a_1(x) \\cdot y' + a_0(x) \\cdot y = f(x) \\\\
            y(x_0) = y_0 \\\\
            y'(x_0) = y_0' \\\\
            y''(x_0) = y_0'' \\\\
            \\vdots \\\\
            y^{(n-1)}(x_0) = y_0^{(n-1)}
            \\end{cases}$$
            <b>существует решение</b>, определённое на <b>всём</b> интервале $I$;
        </li>
        <li>Это решение — <b>единственное</b> как для $I$, так и для любого другого интервала $J \\subset I$, содержащего $x_0$.</li>
    </ol>

    <p><b>Замечание.</b> Далее, говоря о решениях ЛДУ, мы подразумеваем решение, определённое на всём интервале $I$.</p>

    <h4 style="color:#1a3a6e;">3. Теорема 2 (принцип суперпозиции для ЛДУ)</h4>
    <p>Если $y = y_1(x)$ — решение ЛДУ с правой частью $f_1(x)$, $y = y_2(x)$ — решение ЛДУ с той же левой частью и правой частью $f_2(x)$, $\\dots$, $y = y_k(x)$ — решение ЛДУ с той же левой частью и правой частью $f_k(x)$, то для любых чисел $\\alpha_1, \\alpha_2, \\dots, \\alpha_k$:</p>
    <p>$$y(x) = \\alpha_1 y_1(x) + \\alpha_2 y_2(x) + \\dots + \\alpha_k y_k(x)$$</p>
    <p>является решением ЛДУ с той же левой частью и правой частью $\\alpha_1 f_1(x) + \\alpha_2 f_2(x) + \\dots + \\alpha_k f_k(x)$.</p>

    <p><b>Доказательство (для $n=2$).</b> По условию имеем:</p>
    <p>$$y_1''(x) + a_1(x)y_1'(x) + a_0(x)y_1(x) \\equiv f_1(x)$$</p>
    <p>$$y_2''(x) + a_1(x)y_2'(x) + a_0(x)y_2(x) \\equiv f_2(x)$$</p>
    <p>$$\\dots \\dots \\dots \\dots \\dots \\dots \\dots \\dots \\dots \\dots \\dots$$</p>
    <p>$$y_k''(x) + a_1(x)y_k'(x) + a_0(x)y_k(x) \\equiv f_k(x)$$</p>

    <p>В силу линейности производной:</p>
    <p>$$(\\alpha_1 y_1 + \\dots + \\alpha_k y_k)' \\equiv \\alpha_1 y_1' + \\dots + \\alpha_k y_k'$$</p>
    <p>$$(\\alpha_1 y_1 + \\dots + \\alpha_k y_k)'' \\equiv \\alpha_1 y_1'' + \\dots + \\alpha_k y_k''$$</p>

    <p>Подставим $y(x) = \\alpha_1 y_1(x) + \\dots + \\alpha_k y_k(x)$ в левую часть уравнения:</p>
    <p>$$(\\alpha_1 y_1 + \\dots + \\alpha_k y_k)'' + a_1(x)(\\alpha_1 y_1 + \\dots + \\alpha_k y_k)' + a_0(x)(\\alpha_1 y_1 + \\dots + \\alpha_k y_k)$$</p>
    <p>$$\\equiv \\alpha_1(y_1'' + a_1 y_1' + a_0 y_1) + \\dots + \\alpha_k(y_k'' + a_1 y_k' + a_0 y_k)$$</p>
    <p>$$\\equiv \\alpha_1 f_1(x) + \\dots + \\alpha_k f_k(x) \\quad \\blacksquare$$</p>

    <h4 style="color:#1a3a6e;">4. Теорема 3 (о структуре общего решения НЛДУ)</h4>
    <p>Рассмотрим неоднородное линейное ДУ n-го порядка:</p>
    <p>$$y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_1(x) y' + a_0(x) y = f(x) \\qquad (*)$$</p>
    <p>и соответствующее ему однородное уравнение:</p>
    <p>$$y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_1(x) y' + a_0(x) y = 0 \\qquad (**)$$</p>

    <p><b>Теорема.</b> Если $y_{\\text{оо}}(x)$ — общее решение однородного уравнения $(**)$, а $y_{\\text{ч}}(x)$ — некоторое частное решение неоднородного уравнения $(*)$, то общее решение неоднородного уравнения $(*)$ имеет вид:</p>
    <p>$$y_{\\text{общ}}(x) = y_{\\text{оо}}(x) + y_{\\text{ч}}(x)$$</p>

    <p><b>Доказательство.</b></p>
    <p><b>1. Сумма $y_{\\text{оо}} + y_{\\text{ч}}$ является решением $(*)$.</b><br>
    Введём линейный оператор</p>
    <p>$$L[y] = y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_1(x) y' + a_0(x) y.$$</p>
    <p>Пусть $y_{\\text{оо}}(x)$ — произвольное решение $(**)$ (т.е. $L[y_{\\text{оо}}] = 0$). Подставим $y(x) = y_{\\text{оо}}(x) + y_{\\text{ч}}(x)$ в $(*)$. В силу линейности $L$:</p>
    <p>$$L[y_{\\text{оо}} + y_{\\text{ч}}] = L[y_{\\text{оо}}] + L[y_{\\text{ч}}] = 0 + f(x) = f(x)$$</p>
    <p>Следовательно, $y_{\\text{оо}}(x) + y_{\\text{ч}}(x)$ удовлетворяет $(*)$.</p>

    <p><b>2. Любое решение $(*)$ представимо в виде $y_{\\text{оо}} + y_{\\text{ч}}$.</b><br>
    Пусть $\\tilde{y}(x)$ — произвольное решение $(*)$. Рассмотрим разность $z(x) = \\tilde{y}(x) - y_{\\text{ч}}(x)$. Применим $L$:</p>
    <p>$$L[z] = L[\\tilde{y} - y_{\\text{ч}}] = L[\\tilde{y}] - L[y_{\\text{ч}}] = f(x) - f(x) = 0$$</p>
    <p>Значит, $z(x)$ является решением однородного уравнения $(**)$, т.е. $z(x) \\in \\{y_{\\text{оо}}(x)\\}$. Таким образом, $\\tilde{y}(x) = z(x) + y_{\\text{ч}}(x) = y_{\\text{оо}}(x) + y_{\\text{ч}}(x)$.</p>

    <p>Объединяя пункты 1 и 2, получаем, что совокупность всех решений НЛДУ $(*)$ есть сумма общего решения соответствующего ОЛДУ и любого частного решения НЛДУ. $\\blacksquare$</p>

    <p><b>Следствие.</b> Для нахождения общего решения НЛДУ достаточно найти общее решение соответствующего ОЛДУ и одно любое частное решение НЛДУ.</p>
</div>
`,
    18: `
📖 Конспект для билета 13
`,
    19: `
📖 Конспект для билета 14
`,
    20: `
📖 Конспект для билета 15
`,
    21: `
📖 Конспект для билета 15
`,
    22: `
📖 Конспект для билета 16
`,
    23: `
📖 Конспект для билета 17
`,
    24: `
📖 Конспект для билета 18 (будет добавлен)
`,
    25: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 26. Теорема о ФСР СОЛДУ 2×2 с постоянными вещественными коэффициентами: случай некратных СЗ. Метод вариации постоянных для СНЛДУ.</h3>

    <h4 style="color:#1a3a6e;">1. Теорема о ФСР СОЛДУ 2×2 с постоянными вещественными коэффициентами</h4>
    <p><b>Постановка задачи.</b> Рассмотрим систему двух линейных однородных дифференциальных уравнений с постоянными вещественными коэффициентами:</p>
    <p>$$\\begin{cases} x_1' = a_{11}x_1 + a_{12}x_2 \\\\ x_2' = a_{21}x_1 + a_{22}x_2 \\end{cases}$$</p>
    <p>или в матричной форме: \\(\\bar{x}' = A\\bar{x}\\), где \\(A \\in M_{2\\times 2}(\\mathbb{R})\\).</p>

    <p><b>Определение 1.</b> <b>Фундаментальной системой решений (ФСР)</b> системы \\(\\bar{x}' = A\\bar{x}\\) называется совокупность \\(n\\) линейно независимых решений этой системы. Для системы 2×2 ФСР состоит из двух решений \\(\\bar{x}^{(1)}(t), \\bar{x}^{(2)}(t)\\), линейно независимых на \\(\\mathbb{R}\\).</p>

    <p><b>Теорема (о ФСР для 2×2 с постоянными коэффициентами).</b> Пусть матрица \\(A\\) системы \\(\\bar{x}' = A\\bar{x}\\) имеет два различных (некратных) вещественных или комплексно-сопряжённых собственных значения \\(\\lambda_1 ≠ \\lambda_2\\).</p>
    
    <p><b>Случай 1: \\(\\lambda_1, \\lambda_2 \\in \\mathbb{R}\\) (вещественные различные).</b></p>
    <p>Пусть \\(\\bar{v}_1, \\bar{v}_2 \\in \\mathbb{R}^2\\) — собственные векторы, соответствующие \\(\\lambda_1\\) и \\(\\lambda_2\\): \\(A\\bar{v}_i = \\lambda_i \\bar{v}_i\\), \\(i=1,2\\). Тогда ФСР имеет вид:</p>
    <p>$$\\bar{x}^{(1)}(t) = e^{\\lambda_1 t} \\bar{v}_1, \\quad \\bar{x}^{(2)}(t) = e^{\\lambda_2 t} \\bar{v}_2$$</p>
    <p>Общее решение: \\(\\bar{x}(t) = C_1 e^{\\lambda_1 t} \\bar{v}_1 + C_2 e^{\\lambda_2 t} \\bar{v}_2\\), где \\(C_1, C_2\\) — произвольные постоянные.</p>
    <p><b>Доказательство.</b> Проверим, что \\(\\bar{x}^{(i)}(t)\\) — решение: \\((\\bar{x}^{(i)})' = \\lambda_i e^{\\lambda_i t}\\bar{v}_i = e^{\\lambda_i t} (\\lambda_i \\bar{v}_i) = e^{\\lambda_i t} A\\bar{v}_i = A(e^{\\lambda_i t}\\bar{v}_i) = A\\bar{x}^{(i)}\\). Линейная независимость решений следует из линейной независимости собственных векторов (они соответствуют различным СЗ) и того, что \\(e^{\\lambda_i t} ≠ 0\\).</p>

    <p><b>Случай 2: \\(\\lambda_{1,2} = \\alpha \\pm i\\beta\\), \\(\\beta ≠ 0\\) (комплексно-сопряжённые).</b></p>
    <p>Пусть \\(\\bar{v} = \\bar{u} + i\\bar{w}\\) — собственный вектор для \\(\\lambda = \\alpha + i\\beta\\), где \\(\\bar{u}, \\bar{w} \\in \\mathbb{R}^2\\). Тогда комплексное решение: \\(\\bar{x}(t) = e^{(\\alpha + i\\beta)t}(\\bar{u} + i\\bar{w})\\). Выделяя действительную и мнимую части, получаем два линейно независимых действительных решения:</p>
    <p>$$\\bar{x}^{(1)}(t) = e^{\\alpha t}(\\bar{u}\\cos\\beta t - \\bar{w}\\sin\\beta t)$$</p>
    <p>$$\\bar{x}^{(2)}(t) = e^{\\alpha t}(\\bar{u}\\sin\\beta t + \\bar{w}\\cos\\beta t)$$</p>
    <p>Эти решения образуют ФСР. Общее решение: \\(\\bar{x}(t) = C_1 \\bar{x}^{(1)}(t) + C_2 \\bar{x}^{(2)}(t)\\).</p>
    <p><b>Доказательство.</b> Поскольку система линейна с вещественными коэффициентами, действительная и мнимая части комплексного решения также являются решениями. Линейная независимость \\(\\bar{x}^{(1)}\\) и \\(\\bar{x}^{(2)}\\) следует из того, что \\(\\bar{u}\\) и \\(\\bar{w}\\) линейно независимы (как действительная и мнимая части собственного вектора для комплексного СЗ).</p>

    <h4 style="color:#1a3a6e;">2. Метод вариации постоянных для СНЛДУ</h4>
    <p><b>Постановка задачи.</b> Рассмотрим систему неоднородных линейных дифференциальных уравнений (СНЛДУ) в матричной форме:</p>
    <p>$$\\bar{x}' = A(t)\\bar{x} + \\bar{f}(t)$$</p>
    <p>где \\(A(t)\\) — \\(n \\times n\\) матрица, \\(\\bar{f}(t)\\) — вектор-функция (неоднородность).</p>

    <p><b>Теорема (Метод вариации постоянных).</b> Пусть известна ФСР \\(\\{\\bar{x}^{(1)}(t), \\dots, \\bar{x}^{(n)}(t)\\}\\) соответствующей однородной системы \\(\\bar{x}' = A(t)\\bar{x}\\), и \\(X(t)\\) — фундаментальная матрица (столбцы — решения ФСР). Общее решение неоднородной системы имеет вид:</p>
    <p>$$\\bar{x}_{\\text{н}}(t) = X(t)\\bar{C} + X(t)\\int_{t_0}^{t} X^{-1}(s)\\bar{f}(s)\\,ds$$</p>
    <p>где \\(\\bar{C} = (C_1, \\dots, C_n)^T\\) — произвольный постоянный вектор.</p>

    <p><b>Доказательство.</b></p>
    <p>Ищем решение неоднородной системы в виде \\(\\bar{x}(t) = X(t)\\bar{c}(t)\\), где \\(\\bar{c}(t)\\) — неизвестная дифференцируемая вектор-функция (идея вариации: заменяем постоянные \\(\\bar{C}\\) на функции \\(\\bar{c}(t)\\)).</p>
    <p>Подставляем в уравнение:</p>
    <p>$$(X(t)\\bar{c}(t))' = X'(t)\\bar{c}(t) + X(t)\\bar{c}'(t) = A(t)X(t)\\bar{c}(t) + \\bar{f}(t)$$</p>
    <p>Поскольку \\(X'(t) = A(t)X(t)\\) (так как каждый столбец \\(X(t)\\) удовлетворяет однородному уравнению), получаем:</p>
    <p>$$A(t)X(t)\\bar{c}(t) + X(t)\\bar{c}'(t) = A(t)X(t)\\bar{c}(t) + \\bar{f}(t)$$</p>
    <p>Сокращаем \\(A(t)X(t)\\bar{c}(t)\\) и получаем: \\(X(t)\\bar{c}'(t) = \\bar{f}(t)\\).</p>
    <p>Так как \\(X(t)\\) невырождена (определитель Вронского \\(W(t) ≠ 0\\)), существует обратная матрица \\(X^{-1}(t)\\). Умножаем слева:</p>
    <p>$$\\bar{c}'(t) = X^{-1}(t)\\bar{f}(t)$$</p>
    <p>Интегрируем: \\(\\bar{c}(t) = \\bar{C} + \\displaystyle\\int_{t_0}^{t} X^{-1}(s)\\bar{f}(s)\\,ds\\).</p>
    <p>Подставляем обратно:</p>
    <p>$$\\bar{x}(t) = X(t)\\bar{C} + X(t)\\int_{t_0}^{t} X^{-1}(s)\\bar{f}(s)\\,ds$$</p>
    <p>Первое слагаемое — общее решение однородной системы, второе — частное решение неоднородной системы (при \\(\\bar{C} = \\bar{0}\\)).</p>

    <h4 style="color:#1a3a6e;">3. Пример</h4>
    <p>Решить систему методом вариации постоянных:</p>
    <p>$$\\begin{cases} x_1' = x_2 + 2e^t \\\\ x_2' = -x_1 + 3e^t \\end{cases}$$</p>
    <p><b>Решение.</b> Матрица однородной системы: \\(A = \\begin{pmatrix}0 & 1 \\\\ -1 & 0\\end{pmatrix}\\). Собственные значения: \\(\\lambda_{1,2} = \\pm i\\). Собственный вектор для \\(\\lambda = i\\): \\(\\bar{v} = (1, i)^T = (1,0)^T + i(0,1)^T\\).</p>
    <p>ФСР однородной системы: \\(\\bar{x}^{(1)}(t) = \\begin{pmatrix}\\cos t \\\\ -\\sin t\\end{pmatrix}\\), \\(\\bar{x}^{(2)}(t) = \\begin{pmatrix}\\sin t \\\\ \\cos t\\end{pmatrix}\\).</p>
    <p>Фундаментальная матрица: \\(X(t) = \\begin{pmatrix}\\cos t & \\sin t \\\\ -\\sin t & \\cos t\\end{pmatrix}\\). Обратная: \\(X^{-1}(t) = \\begin{pmatrix}\\cos t & -\\sin t \\\\ \\sin t & \\cos t\\end{pmatrix}\\).</p>
    <p>Вычисляем \\(X^{-1}(t)\\bar{f}(t) = \\begin{pmatrix}\\cos t & -\\sin t \\\\ \\sin t & \\cos t\\end{pmatrix} \\begin{pmatrix}2e^t \\\\ 3e^t\\end{pmatrix} = \\begin{pmatrix}2e^t\\cos t - 3e^t\\sin t \\\\ 2e^t\\sin t + 3e^t\\cos t\\end{pmatrix}\\).</p>
    <p>Интегрируем: \\(\\int X^{-1}(t)\\bar{f}(t)\\,dt = \\frac{e^t}{2}\\begin{pmatrix}5(\\cos t - \\sin t) \\\\ 5(\\cos t + \\sin t)\\end{pmatrix}\\) (с точностью до констант).</p>
    <p>Общее решение: \\(\\bar{x}(t) = X(t)\\bar{C} + X(t)\\int X^{-1}(t)\\bar{f}(t)\\,dt = C_1\\begin{pmatrix}\\cos t \\\\ -\\sin t\\end{pmatrix} + C_2\\begin{pmatrix}\\sin t \\\\ \\cos t\\end{pmatrix} + \\frac{5e^t}{2}\\begin{pmatrix}\\cos t + \\sin t \\\\ \\cos t - \\sin t\\end{pmatrix}\\).</p>
</div>

`,
    26: `

<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 27. Теорема о ФСР СОЛДУ 2×2 с постоянными вещественными коэффициентами: случай некратных СЗ. Метод вариации постоянных для СНЛДУ.</h3>

    <h4 style="color:#1a3a6e;">1. Теорема о ФСР СОЛДУ 2×2 с постоянными вещественными коэффициентами</h4>
    <p><b>Постановка задачи.</b> Рассмотрим систему двух линейных однородных дифференциальных уравнений с постоянными вещественными коэффициентами:</p>
    <p>$$\\begin{cases} x_1' = a_{11}x_1 + a_{12}x_2 \\\\ x_2' = a_{21}x_1 + a_{22}x_2 \\end{cases}$$</p>
    <p>или в матричной форме: \\(\\bar{x}' = A\\bar{x}\\), где \\(A \\in M_{2\\times 2}(\\mathbb{R})\\).</p>

    <p><b>Определение 1.</b> <b>Фундаментальной системой решений (ФСР)</b> системы \\(\\bar{x}' = A\\bar{x}\\) называется совокупность \\(n\\) линейно независимых решений этой системы. Для системы 2×2 ФСР состоит из двух решений \\(\\bar{x}^{(1)}(t), \\bar{x}^{(2)}(t)\\), линейно независимых на \\(\\mathbb{R}\\).</p>

    <p><b>Теорема (о ФСР для 2×2 с постоянными коэффициентами).</b> Пусть матрица \\(A\\) системы \\(\\bar{x}' = A\\bar{x}\\) имеет два различных (некратных) вещественных или комплексно-сопряжённых собственных значения \\(\\lambda_1 ≠ \\lambda_2\\).</p>
    
    <p><b>Случай 1: \\(\\lambda_1, \\lambda_2 \\in \\mathbb{R}\\) (вещественные различные).</b></p>
    <p>Пусть \\(\\bar{v}_1, \\bar{v}_2 \\in \\mathbb{R}^2\\) — собственные векторы, соответствующие \\(\\lambda_1\\) и \\(\\lambda_2\\): \\(A\\bar{v}_i = \\lambda_i \\bar{v}_i\\), \\(i=1,2\\). Тогда ФСР имеет вид:</p>
    <p>$$\\bar{x}^{(1)}(t) = e^{\\lambda_1 t} \\bar{v}_1, \\quad \\bar{x}^{(2)}(t) = e^{\\lambda_2 t} \\bar{v}_2$$</p>
    <p>Общее решение: \\(\\bar{x}(t) = C_1 e^{\\lambda_1 t} \\bar{v}_1 + C_2 e^{\\lambda_2 t} \\bar{v}_2\\), где \\(C_1, C_2\\) — произвольные постоянные.</p>
    <p><b>Доказательство.</b> Проверим, что \\(\\bar{x}^{(i)}(t)\\) — решение: \\((\\bar{x}^{(i)})' = \\lambda_i e^{\\lambda_i t}\\bar{v}_i = e^{\\lambda_i t} (\\lambda_i \\bar{v}_i) = e^{\\lambda_i t} A\\bar{v}_i = A(e^{\\lambda_i t}\\bar{v}_i) = A\\bar{x}^{(i)}\\). Линейная независимость решений следует из линейной независимости собственных векторов (они соответствуют различным СЗ) и того, что \\(e^{\\lambda_i t} ≠ 0\\).</p>

    <p><b>Случай 2: \\(\\lambda_{1,2} = \\alpha \\pm i\\beta\\), \\(\\beta ≠ 0\\) (комплексно-сопряжённые).</b></p>
    <p>Пусть \\(\\bar{v} = \\bar{u} + i\\bar{w}\\) — собственный вектор для \\(\\lambda = \\alpha + i\\beta\\), где \\(\\bar{u}, \\bar{w} \\in \\mathbb{R}^2\\). Тогда комплексное решение: \\(\\bar{x}(t) = e^{(\\alpha + i\\beta)t}(\\bar{u} + i\\bar{w})\\). Выделяя действительную и мнимую части, получаем два линейно независимых действительных решения:</p>
    <p>$$\\bar{x}^{(1)}(t) = e^{\\alpha t}(\\bar{u}\\cos\\beta t - \\bar{w}\\sin\\beta t)$$</p>
    <p>$$\\bar{x}^{(2)}(t) = e^{\\alpha t}(\\bar{u}\\sin\\beta t + \\bar{w}\\cos\\beta t)$$</p>
    <p>Эти решения образуют ФСР. Общее решение: \\(\\bar{x}(t) = C_1 \\bar{x}^{(1)}(t) + C_2 \\bar{x}^{(2)}(t)\\).</p>
    <p><b>Доказательство.</b> Поскольку система линейна с вещественными коэффициентами, действительная и мнимая части комплексного решения также являются решениями. Линейная независимость \\(\\bar{x}^{(1)}\\) и \\(\\bar{x}^{(2)}\\) следует из того, что \\(\\bar{u}\\) и \\(\\bar{w}\\) линейно независимы (как действительная и мнимая части собственного вектора для комплексного СЗ).</p>

    <h4 style="color:#1a3a6e;">2. Метод вариации постоянных для СНЛДУ</h4>
    <p><b>Постановка задачи.</b> Рассмотрим систему неоднородных линейных дифференциальных уравнений (СНЛДУ) в матричной форме:</p>
    <p>$$\\bar{x}' = A(t)\\bar{x} + \\bar{f}(t)$$</p>
    <p>где \\(A(t)\\) — \\(n \\times n\\) матрица, \\(\\bar{f}(t)\\) — вектор-функция (неоднородность).</p>

    <p><b>Теорема (Метод вариации постоянных).</b> Пусть известна ФСР \\(\\{\\bar{x}^{(1)}(t), \\dots, \\bar{x}^{(n)}(t)\\}\\) соответствующей однородной системы \\(\\bar{x}' = A(t)\\bar{x}\\), и \\(X(t)\\) — фундаментальная матрица (столбцы — решения ФСР). Общее решение неоднородной системы имеет вид:</p>
    <p>$$\\bar{x}_{\\text{н}}(t) = X(t)\\bar{C} + X(t)\\int_{t_0}^{t} X^{-1}(s)\\bar{f}(s)\\,ds$$</p>
    <p>где \\(\\bar{C} = (C_1, \\dots, C_n)^T\\) — произвольный постоянный вектор.</p>

    <p><b>Доказательство.</b></p>
    <p>Ищем решение неоднородной системы в виде \\(\\bar{x}(t) = X(t)\\bar{c}(t)\\), где \\(\\bar{c}(t)\\) — неизвестная дифференцируемая вектор-функция (идея вариации: заменяем постоянные \\(\\bar{C}\\) на функции \\(\\bar{c}(t)\\)).</p>
    <p>Подставляем в уравнение:</p>
    <p>$$(X(t)\\bar{c}(t))' = X'(t)\\bar{c}(t) + X(t)\\bar{c}'(t) = A(t)X(t)\\bar{c}(t) + \\bar{f}(t)$$</p>
    <p>Поскольку \\(X'(t) = A(t)X(t)\\) (так как каждый столбец \\(X(t)\\) удовлетворяет однородному уравнению), получаем:</p>
    <p>$$A(t)X(t)\\bar{c}(t) + X(t)\\bar{c}'(t) = A(t)X(t)\\bar{c}(t) + \\bar{f}(t)$$</p>
    <p>Сокращаем \\(A(t)X(t)\\bar{c}(t)\\) и получаем: \\(X(t)\\bar{c}'(t) = \\bar{f}(t)\\).</p>
    <p>Так как \\(X(t)\\) невырождена (определитель Вронского \\(W(t) ≠ 0\\)), существует обратная матрица \\(X^{-1}(t)\\). Умножаем слева:</p>
    <p>$$\\bar{c}'(t) = X^{-1}(t)\\bar{f}(t)$$</p>
    <p>Интегрируем: \\(\\bar{c}(t) = \\bar{C} + \\displaystyle\\int_{t_0}^{t} X^{-1}(s)\\bar{f}(s)\\,ds\\).</p>
    <p>Подставляем обратно:</p>
    <p>$$\\bar{x}(t) = X(t)\\bar{C} + X(t)\\int_{t_0}^{t} X^{-1}(s)\\bar{f}(s)\\,ds$$</p>
    <p>Первое слагаемое — общее решение однородной системы, второе — частное решение неоднородной системы (при \\(\\bar{C} = \\bar{0}\\)).</p>

    <h4 style="color:#1a3a6e;">3. Пример</h4>
    <p>Решить систему методом вариации постоянных:</p>
    <p>$$\\begin{cases} x_1' = x_2 + 2e^t \\\\ x_2' = -x_1 + 3e^t \\end{cases}$$</p>
    <p><b>Решение.</b> Матрица однородной системы: \\(A = \\begin{pmatrix}0 & 1 \\\\ -1 & 0\\end{pmatrix}\\). Собственные значения: \\(\\lambda_{1,2} = \\pm i\\). Собственный вектор для \\(\\lambda = i\\): \\(\\bar{v} = (1, i)^T = (1,0)^T + i(0,1)^T\\).</p>
    <p>ФСР однородной системы: \\(\\bar{x}^{(1)}(t) = \\begin{pmatrix}\\cos t \\\\ -\\sin t\\end{pmatrix}\\), \\(\\bar{x}^{(2)}(t) = \\begin{pmatrix}\\sin t \\\\ \\cos t\\end{pmatrix}\\).</p>
    <p>Фундаментальная матрица: \\(X(t) = \\begin{pmatrix}\\cos t & \\sin t \\\\ -\\sin t & \\cos t\\end{pmatrix}\\). Обратная: \\(X^{-1}(t) = \\begin{pmatrix}\\cos t & -\\sin t \\\\ \\sin t & \\cos t\\end{pmatrix}\\).</p>
    <p>Вычисляем \\(X^{-1}(t)\\bar{f}(t) = \\begin{pmatrix}\\cos t & -\\sin t \\\\ \\sin t & \\cos t\\end{pmatrix} \\begin{pmatrix}2e^t \\\\ 3e^t\\end{pmatrix} = \\begin{pmatrix}2e^t\\cos t - 3e^t\\sin t \\\\ 2e^t\\sin t + 3e^t\\cos t\\end{pmatrix}\\).</p>
    <p>Интегрируем: \\(\\int X^{-1}(t)\\bar{f}(t)\\,dt = \\frac{e^t}{2}\\begin{pmatrix}5(\\cos t - \\sin t) \\\\ 5(\\cos t + \\sin t)\\end{pmatrix}\\) (с точностью до констант).</p>
    <p>Общее решение: \\(\\bar{x}(t) = X(t)\\bar{C} + X(t)\\int X^{-1}(t)\\bar{f}(t)\\,dt = C_1\\begin{pmatrix}\\cos t \\\\ -\\sin t\\end{pmatrix} + C_2\\begin{pmatrix}\\sin t \\\\ \\cos t\\end{pmatrix} + \\frac{5e^t}{2}\\begin{pmatrix}\\cos t + \\sin t \\\\ \\cos t - \\sin t\\end{pmatrix}\\).</p>
</div>

`,
};
