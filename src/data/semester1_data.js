const SEMESTER1_READABILITY_STYLES = String.raw`
<style>
    .conspect-content {
        max-width: 820px;
        margin: 0 auto;
        line-height: 1.72;
        word-break: normal;
        overflow-wrap: normal;
        hyphens: auto;
    }
    .conspect-content p,
    .conspect-content li {
        text-wrap: pretty;
        orphans: 3;
        widows: 3;
    }
    .conspect-content h3,
    .conspect-content h4 {
        text-wrap: balance;
    }
    .conspect-content h3 {
        line-height: 1.35;
        margin: 0 0 1.25rem;
    }
    .conspect-content h4 {
        line-height: 1.4;
        margin: 1.35rem 0 .65rem;
    }
    .conspect-content ol,
    .conspect-content ul {
        padding-left: 1.45rem;
    }
    .conspect-content li {
        margin: .42rem 0;
        padding-left: .15rem;
    }
    .conspect-content .s1-defs {
        margin: 1rem 0 1.25rem;
        padding: .85rem 1rem;
        border-left: 4px solid var(--accent2);
        border-radius: 8px;
        background: rgba(244, 169, 34, .07);
    }
    .conspect-content .s1-defs p:first-child { margin-top: 0; }
    .conspect-content .s1-defs p:last-child { margin-bottom: 0; }
    .conspect-content .s1-proof-step {
        margin: 1rem 0;
        padding-left: .85rem;
        border-left: 2px solid rgba(46, 134, 222, .25);
    }
    .conspect-content .s1-proof-label {
        display: inline-block;
        margin-right: .35rem;
        font-weight: 700;
        color: var(--ink-blue);
        white-space: nowrap;
    }
    .conspect-content .s1-formula {
        max-width: 100%;
        margin: .75rem 0;
        padding: .55rem .7rem;
        overflow-x: auto;
        border-radius: 8px;
        background: rgba(46, 134, 222, .045);
        -webkit-overflow-scrolling: touch;
    }
    .conspect-content .s1-note {
        margin: 1rem 0;
        padding: .7rem .9rem;
        border-radius: 8px;
        background: rgba(26, 110, 58, .06);
    }
    .conspect-content .s1-nowrap { white-space: nowrap; }
    .conspect-content .s1-figure {
        max-width: 520px;
        margin: 1rem auto 1.25rem;
        padding: .6rem;
    }
    .conspect-content .katex-display {
        margin: .55em 0;
    }
    .conspect-content .s1-proof-step + .s1-formula {
        margin-top: .35rem;
    }
    .conspect-content .s1-section-lead {
        margin-top: .35rem;
    }
    .conspect-content .s1-figure-caption {
        margin-top: .45rem;
        text-align: center;
        color: var(--pencil);
        font-size: .9rem;
        text-wrap: balance;
    }
    @media (max-width: 600px) {
        .conspect-content { line-height: 1.62; }
        .conspect-content .s1-defs,
        .conspect-content .s1-formula,
        .conspect-content .s1-note { padding: .65rem .7rem; }
    }
</style>`;

const SEMESTER1_DATA = [
    {
        id: 0,
        title: "Свойства операций сложения и умножения комплексных чисел.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem; margin-bottom:1.5em;">Билет 1. Свойства операций сложения и умножения комплексных чисел.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
    <p><b>Определение 1.</b> Множеством комплексных чисел называется множество \(\mathbb R^2\), на котором определены операции сложения и умножения по следующим правилам:</p>
    <div class="s1-formula">$$
    (x_1;y_1)+(x_2;y_2)=(x_1+x_2;\,y_1+y_2),
    $$</div>
    <div class="s1-formula">$$
    (x_1;y_1)\cdot(x_2;y_2)=(x_1x_2-y_1y_2;\,x_1y_2+x_2y_1).
    $$</div>
    <p>Любая упорядоченная пара \((x;y)\in\mathbb R^2\) в таком контексте называется <b>комплексным числом</b>; \(x\) — вещественная часть, \(y\) — мнимая часть. \(\mathbb C\) — множество комплексных чисел.</p>
    <p><b>Определение 2.</b> Выражение вида \(x+yi\) называется <b>алгебраической формой записи</b> комплексного числа \((x;y)\in\mathbb C\).</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (св-ва «+» и «·» комплексных чисел)</h4>
    <ol>
        <li>\(\forall z_1,z_2\in\mathbb C\quad z_1+z_2=z_2+z_1\) — коммутативность «+» комплексных чисел.</li>
        <li>\(\forall z_1,z_2,z_3\in\mathbb C\quad (z_1+z_2)+z_3=z_1+(z_2+z_3)\) — ассоциативность «+» комплексных чисел.</li>
        <li>\(\forall z_1,z_2\in\mathbb C\quad z_1\cdot z_2=z_2\cdot z_1\) — коммутативность «·» комплексных чисел.</li>
        <li>\(\forall z_1,z_2,z_3\in\mathbb C\quad (z_1\cdot z_2)\cdot z_3=z_1\cdot(z_2\cdot z_3)\) — ассоциативность «·» комплексных чисел.</li>
        <li>\(\forall z_1,z_2,z_3\in\mathbb C\quad (z_1+z_2)\cdot z_3=z_1\cdot z_3+z_2\cdot z_3\) — дистрибутивность «·» комплексных чисел относительно их сложения.</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i\), \((x_i,y_i\in\mathbb R)\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    z_1+z_2&=(x_1+y_1i)+(x_2+y_2i)=(x_1+x_2)+(y_1+y_2)i,\\
    z_2+z_1&=(x_2+y_2i)+(x_1+y_1i)=(x_2+x_1)+(y_2+y_1)i.
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    [\text{коммутативность вещественных чисел}]\Rightarrow
    x_1+x_2=x_2+x_1,\quad (y_1+y_2)i=(y_2+y_1)i
    \Rightarrow z_1+z_2=z_2+z_1.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">2)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i,\ z_3=x_3+y_3i\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    (z_1+z_2)+z_3
    &=((x_1+y_1i)+(x_2+y_2i))+(x_3+y_3i)\\
    &=((x_1+x_2)+(y_1+y_2)i)+(x_3+y_3i)\\
    &=((x_1+x_2)+x_3)+((y_1+y_2)+y_3)i\\
    &=[\text{ассоциативность вещественных чисел}]\\
    &=x_1+(x_2+x_3)+(y_1+(y_2+y_3))i\\
    &=(x_1+y_1i)+((x_2+x_3)+(y_2+y_3)i)\\
    &=z_1+(z_2+z_3).
    \end{aligned}
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    z_1z_2&=(x_1x_2-y_1y_2)+(x_1y_2+x_2y_1)i,\\
    z_2z_1&=(x_2x_1-y_2y_1)+(x_2y_1+y_2x_1)i.
    \end{aligned}
    $$</div>
    <p>В силу коммутативности умножения и сложения вещественных чисел:</p>
    <div class="s1-formula">$$
    x_1x_2=x_2x_1,\quad y_1y_2=y_2y_1,\quad x_1y_2+x_2y_1=x_2y_1+y_2x_1
    \Rightarrow z_1z_2=z_2z_1.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">4)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i,\ z_3=x_3+y_3i\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    (z_1z_2)z_3
    &=((x_1x_2-y_1y_2)+(x_1y_2+x_2y_1)i)(x_3+y_3i)\\
    &=(x_1x_2x_3-y_1y_2x_3-x_1y_2y_3-x_2y_1y_3)\\
    &\quad +(x_1x_2y_3-y_1y_2y_3+x_1y_2x_3+x_2y_1x_3)i,
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    z_1(z_2z_3)
    &=(x_1+y_1i)((x_2x_3-y_2y_3)+(x_2y_3+x_3y_2)i)\\
    &=(x_1x_2x_3-x_1y_2y_3-y_1x_2y_3-y_1y_2x_3)\\
    &\quad +(x_1x_2y_3+x_1x_3y_2+y_1x_2x_3-y_1y_2y_3)i.
    \end{aligned}
    $$</div>
    <p>В силу дистрибутивности «·» вещественных чисел относительно их «+» получаем одинаковые суммы, следовательно \((z_1z_2)z_3=z_1(z_2z_3)\). \(\blacksquare\)</p>

    <div class="s1-proof-step"><span class="s1-proof-label">5)</span></div>
    <div class="s1-formula">$$
    \begin{aligned}
    (z_1+z_2)z_3
    &=((x_1+x_2)+(y_1+y_2)i)(x_3+y_3i)\\
    &=(x_1x_3+x_2x_3-y_1y_3-y_2y_3)\\
    &\quad +(x_1y_3+x_2y_3+y_1x_3+y_2x_3)i,
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    z_1z_3&=(x_1x_3-y_1y_3)+(x_1y_3+y_1x_3)i,\\
    z_2z_3&=(x_2x_3-y_2y_3)+(x_2y_3+y_2x_3)i,\\
    z_1z_3+z_2z_3
    &=(x_1x_3+x_2x_3-y_1y_3-y_2y_3)\\
    &\quad +(x_1y_3+y_1x_3+x_2y_3+y_2x_3)i.
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$ (z_1+z_2)z_3=z_1z_3+z_2z_3.\quad\blacksquare $$</div>
</div>`
    },
    {
        id: 1,
        title: "Свойства комплексного сопряжения и обращения комплексных чисел.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem; margin-bottom:1.5em;">Билет 2. Свойства комплексного сопряжения и обращения комплексных чисел.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
    <p><b>Определение 1.</b> Число, комплексно сопряжённое к \(z=x+yi\), \((x,y\in\mathbb R)\), называется число</p>
    <div class="s1-formula">$$ \bar z=z^*=x-yi. $$</div>
    <p><b>Определение 2.</b> Число \(\widetilde z\) называется <b>обратным</b> к \(z\), если \(\widetilde z\cdot z=1\).</p>
    <p>Обозначение: \(\widetilde z=z^{-1}\).</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (св-ва \(\bar z\))</h4>
    <ol>
        <li>\(\forall z\in\mathbb C\quad \overline{\bar z}=z\).</li>
        <li>\(\forall z_1,z_2\in\mathbb C\quad \overline{z_1+z_2}=\bar z_1+\bar z_2\).</li>
        <li>\(\forall z_1,z_2\in\mathbb C\quad \overline{z_1z_2}=\bar z_1\bar z_2\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span>\(z=x+yi,\ x,y\in\mathbb R\).</div>
    <div class="s1-formula">$$ \overline{\bar z}=\overline{(x-yi)}=x+yi=z. $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">2)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i,\ x_i,y_i\in\mathbb R\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \overline{z_1+z_2}
    &=\overline{(x_1+y_1i)+(x_2+y_2i)}\\
    &=\overline{(x_1+x_2)+(y_1+y_2)i}\\
    &=(x_1+x_2)-(y_1+y_2)i,
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \bar z_1+\bar z_2
    &=\overline{x_1+y_1i}+\overline{x_2+y_2i}\\
    &=(x_1-y_1i)+(x_2-y_2i)\\
    &=(x_1+x_2)-(y_1+y_2)i
    =\overline{z_1+z_2}.
    \end{aligned}
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i\), \((x_i,y_i\in\mathbb R)\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \overline{z_1z_2}
    &=\overline{(x_1+y_1i)(x_2+y_2i)}\\
    &=\overline{(x_1x_2-y_1y_2)+(x_1y_2+y_1x_2)i}\\
    &=(x_1x_2-y_1y_2)-(x_1y_2+y_1x_2)i,
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \bar z_1\bar z_2
    &=\overline{x_1+y_1i}\cdot\overline{x_2+y_2i}\\
    &=(x_1-y_1i)(x_2-y_2i)\\
    &=(x_1x_2-y_1y_2)-(x_1y_2+x_2y_1)i
    =\overline{z_1z_2}.\quad\blacksquare
    \end{aligned}
    $$</div>

    <h4 style="color:#1a3a6e;">Теорема 2 (св-ва \(z^{-1}\))</h4>
    <ol>
        <li>Если для данного \(z\) существует \(z^{-1}\), то оно единственное.</li>
        <li>\(\exists z^{-1}\Longleftrightarrow z\ne0\). Для \(z=x+yi\ne0\), \((x,y\in\mathbb R)\),
            $$ z^{-1}=\frac{x}{x^2+y^2}-\frac{y}{x^2+y^2}i. $$
        </li>
        <li>\((z^{-1})^{-1}=z\).</li>
        <li>\((\bar z)^{-1}=\overline{(z^{-1})}\).</li>
        <li>\((z_1z_2)^{-1}=z_1^{-1}z_2^{-1}\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span>Пусть \((z^{-1})_1\) и \((z^{-1})_2\) — числа, обратные к \(z\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    (z^{-1})_1z&=1\quad |\cdot(z^{-1})_2,\\
    (z^{-1})_1(z^{-1})_2z&=(z^{-1})_2,\\
    (z^{-1})_1((z^{-1})_2z)&=(z^{-1})_2,\\
    (z^{-1})_1\cdot1&=(z^{-1})_2,\\
    (z^{-1})_1&=(z^{-1})_2.
    \end{aligned}
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">2)</span>\((\Rightarrow)\) Пусть \(\exists z^{-1}\Rightarrow z\cdot z^{-1}=1\Rightarrow z\ne0\).</div>
    <p>\((\Leftarrow)\) Пусть \(z\ne0\). Докажем, что \(\dfrac{x}{x^2+y^2}-\dfrac{y}{x^2+y^2}i\) — обратное к \(z\):</p>
    <div class="s1-formula">$$
    (x+yi)\left(\frac{x}{x^2+y^2}-\frac{y}{x^2+y^2}i\right)
    =\left(\frac{x^2}{x^2+y^2}+\frac{y^2}{x^2+y^2}\right)
    +\left(-\frac{xy}{x^2+y^2}+\frac{xy}{x^2+y^2}\right)i
    =1.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>$$ z\cdot z^{-1}=1\Rightarrow(z^{-1})^{-1}=z. $$</div>
    <div class="s1-proof-step"><span class="s1-proof-label">4)</span>$$ \bar z\cdot\overline{(z^{-1})}=\overline{z\cdot z^{-1}}=\bar1=1\Rightarrow(\bar z)^{-1}=\overline{(z^{-1})}. $$</div>
    <div class="s1-proof-step"><span class="s1-proof-label">5)</span>$$
    (z_1z_2)(z_1^{-1}z_2^{-1})
    =z_1(z_2z_2^{-1})z_1^{-1}
    =(z_1\cdot1)z_1^{-1}
    =z_1z_1^{-1}=1
    \Rightarrow(z_1z_2)^{-1}=z_1^{-1}z_2^{-1}.\quad\blacksquare
    $$</div>
</div>`
    },
    {
        id: 2,
        title: "Функция \\(e^z\\) и её алгебраические свойства. Показательная форма записи комплексного числа; операции с комплексными числами в показательной форме записи.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem; margin-bottom:1.5em;">Билет 3. Функция \(e^z\) и её алгебраические свойства. Показательная форма записи комплексного числа; операции с комплексными числами в показательной форме записи.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
    <p>Для \(z=x+yi\), \((x,y\in\mathbb R)\),</p>
    <div class="s1-formula">$$ |z|=\sqrt{x^2+y^2}. $$</div>
    <p>\(\varphi=\operatorname{Arg}(z)\) — аргумент \(z\), определённый с точностью до \(+2\pi k\), \(k\in\mathbb Z\). Значение \(\operatorname{Arg}(z)\), лежащее в \((-\pi;\pi]\), называется главным значением аргумента и обозначается \(\arg(z)\).</p>
    <p><b>Определение 1.</b> Число, комплексно сопряжённое к \(z=x+yi\), \((x,y\in\mathbb R)\), называется число \(\bar z=z^*=x-yi\).</p>

    <div style="max-width:360px; margin:1rem auto;">
        <svg viewBox="0 0 400 270" role="img" aria-label="Геометрический смысл модуля и аргумента комплексного числа" style="width:100%;height:auto;display:block;color:var(--ink);">
    <defs><marker id="s1arrow3p" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs>
    <line x1="55" y1="215" x2="355" y2="215" stroke="currentColor" stroke-width="2.2" marker-end="url(#s1arrow3p)"/>
    <line x1="95" y1="250" x2="95" y2="35" stroke="currentColor" stroke-width="2.2" marker-end="url(#s1arrow3p)"/>
    <circle cx="95" cy="215" r="3.5" fill="currentColor"/>
    <line x1="95" y1="215" x2="275" y2="88" stroke="currentColor" stroke-width="3.2" marker-end="url(#s1arrow3p)"/>
    <circle cx="275" cy="88" r="4.2" fill="currentColor"/>
    <path d="M148 215 A53 53 0 0 0 138 184" fill="none" stroke="currentColor" stroke-width="2"/>
    <text x="362" y="221" font-size="17" fill="currentColor">x</text>
    <text x="85" y="30" font-size="17" fill="currentColor">y</text>
    <text x="75" y="237" font-size="15" fill="currentColor">O</text>
    <text x="283" y="83" font-size="17" fill="currentColor">z(x,y)</text>
    <text x="166" y="139" font-size="17" fill="currentColor" transform="rotate(-35 166 139)">|z|</text>
    <text x="145" y="190" font-size="16" fill="currentColor">φ = Arg(z)</text>
</svg>
    </div>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (св-ва \(e^z\))</h4>
    <ol>
        <li>\(\forall z_1,z_2\in\mathbb C\quad e^{z_1}\cdot e^{z_2}=e^{z_1+z_2}\).</li>
        <li>\(\forall z\in\mathbb C\quad \overline{(e^z)}=e^{\bar z}\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span>\(z_1=x_1+y_1i,\ z_2=x_2+y_2i\), \((x_i,y_i\in\mathbb R)\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    e^{z_1}e^{z_2}
    &=e^{x_1+y_1i}e^{x_2+y_2i}\\
    &=e^{x_1}(\cos y_1+i\sin y_1)e^{x_2}(\cos y_2+i\sin y_2)\\
    &=e^{x_1+x_2}\big((\cos y_1\cos y_2-\sin y_1\sin y_2)\\
    &\qquad +(\cos y_1\sin y_2+\sin y_1\cos y_2)i\big)\\
    &=e^{x_1+x_2}(\cos(y_1+y_2)+\sin(y_1+y_2)i)\\
    &=e^{(x_1+x_2)+(y_1+y_2)i}=e^{z_1+z_2}.
    \end{aligned}
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">2)</span>\(z=x+yi\), \((x,y\in\mathbb R)\).</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \overline{(e^z)}
    &=\overline{e^{x+yi}}
    =\overline{e^x(\cos y+i\sin y)}\\
    &=e^x(\cos y-i\sin y)
    =e^x(\cos(-y)+i\sin(-y))\\
    &=e^{x+i(-y)}=e^{x-yi}=e^{\bar z}.\quad\blacksquare
    \end{aligned}
    $$</div>

    <h4 style="color:#1a3a6e;">Следствие</h4>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span>\(\forall z\in\mathbb C\quad (e^z)^{-1}=e^{-z}\).</div>
    <div class="s1-formula">$$ e^z\cdot e^{-z}=e^{z+(-z)}=e^0=1\Rightarrow(e^z)^{-1}=e^{-z}. $$</div>

    <p><b>2) Показательная форма записи \(z\ne0\):</b></p>
    <div class="s1-formula">$$ z=|z|e^{i\operatorname{Arg}(z)}. $$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    z=|z|(\cos(\operatorname{Arg}(z))+i\sin(\operatorname{Arg}(z)))
    =|z|e^{i\operatorname{Arg}(z)}.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>\(\forall z_1\ne0,\ z_2\ne0\)</div>
    <div class="s1-formula">$$ z_1z_2=|z_1||z_2|e^{(\operatorname{Arg}(z_1)+\operatorname{Arg}(z_2))i}. $$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    z_1z_2=|z_1|e^{\operatorname{Arg}(z_1)i}\cdot|z_2|e^{\operatorname{Arg}(z_2)i}
    =|z_1||z_2|e^{(\operatorname{Arg}(z_1)+\operatorname{Arg}(z_2))i}.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">4)</span>\(\forall z\ne0\)</div>
    <div class="s1-formula">$$ \bar z=|z|e^{-\operatorname{Arg}(z)i}. $$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    \bar z=\overline{|z|e^{\operatorname{Arg}(z)i}}
    =|z|\,\overline{e^{\operatorname{Arg}(z)i}}
    =|z|e^{-\operatorname{Arg}(z)i}.
    $$</div>

    <h4 style="color:#1a3a6e;">Формула для извлечения корней</h4>
    <p>Пусть \(z\ne0\):</p>
    <div class="s1-formula">$$
    (\sqrt[n]{z})_k=\sqrt[n]{|z|}\,e^{\frac{\operatorname{Arg}(z)+2\pi k}{n}i},
    \qquad k\in\{0,1,\ldots,n-1\}.
    $$</div>
</div>`
    },
    {
        id: 3,
        title: "Свойства матричного умножения.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem; margin-bottom:1.5em;">Билет 4. Свойства матричного умножения.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
    <p><b>Определение 1.</b> Пусть \(m,n\in\mathbb N\). Матрицей размерности \(m\times n\) над полем \(P\), или \(m\times n\)-матрицей над полем \(P\), называется функция, которая каждой упорядоченной паре чисел \((i;j)\), \(i\in\{1,2,\ldots,m\}\), \(j\in\{1,2,\ldots,n\}\), ставит в соответствие число из \(P\).</p>
    <p><b>Определение 2.</b> Суммой матриц \(A_{m\times n}\) и \(B_{m\times n}\) называется такая матрица \(C_{m\times n}\), что \(\forall i\in\{1,2,\ldots,m\}\) и \(\forall j\in\{1,2,\ldots,n\}\) \(c_{ij}=a_{ij}+b_{ij}\). Обозначение: \(C=A+B\).</p>
    <p>Матрицы \(A_{m\times n}\) и \(B_{p\times q}\) называются <b>равными</b>, если \(m=p\), \(n=q\) и \(a_{ij}=b_{ij}\) для всех допустимых \(i,j\).</p>
    <p><b>Определение 3.</b> Произведением матриц \(A_{m\times n}\) и \(B_{n\times p}\) называется такая матрица \(C_{m\times p}\), что</p>
    <div class="s1-formula">$$ c_{ik}=\sum_{j=1}^{n}a_{ij}b_{jk}=a_{i1}b_{1k}+a_{i2}b_{2k}+\cdots+a_{in}b_{nk}. $$</div>
    <p>\(E_{n\times n}\) — единичная матрица; \(O_{m\times n}\) — нулевая матрица.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (св-ва умножения матриц)</h4>
    <ol>
        <li>Матричное умножение не коммутативно.</li>
        <li>\(\forall A_{m\times n},\ B_{n\times p},\ C_{p\times q}\quad (AB)C=A(BC)\).</li>
        <li>\(\forall A_{m\times n},\ B_{n\times p},\ C_{p\times q}\quad (A+B)C=AC+BC\).<br>
            \(\forall A_{m\times n},\ B_{n\times p},\ D_{l\times m}\quad D(A+B)=DA+DB\).</li>
        <li>\(\forall A_{m\times n}\quad A_{m\times n}E_{n\times n}=A_{m\times n},\quad E_{n\times n}A_{m\times n}=A_{m\times n}\).</li>
        <li>\(\forall A_{m\times n}\quad A_{m\times n}O_{n\times p}=O_{m\times p},\quad O_{l\times p}A_{m\times n}=O_{l\times n}\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span></div>
    <div class="s1-formula">$$
    A=\begin{pmatrix}1&2\\3&4\end{pmatrix},\qquad
    B=\begin{pmatrix}5&6\\7&8\end{pmatrix}.
    $$</div>
    <div class="s1-formula">$$
    AB=\begin{pmatrix}19&22\\43&50\end{pmatrix},\qquad
    BA=\begin{pmatrix}23&34\\31&46\end{pmatrix}.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">2)</span>\(A_{m\times n}B_{n\times p}=D_{m\times p};\ D_{m\times p}C_{p\times q}=F_{m\times q}\).<br>
    \(B_{n\times p}C_{p\times q}=G_{n\times q};\ A_{m\times n}G_{n\times q}=H_{m\times q}\).</div>
    <p>Надо доказать, что \(F=H\). Докажем поэлементно:</p>
    <div class="s1-formula">$$
    \begin{aligned}
    f_{ij}
    &=d_{i1}c_{1j}+d_{i2}c_{2j}+\cdots+d_{ip}c_{pj}\\
    &=(a_{i1}b_{11}+a_{i2}b_{21}+\cdots+a_{in}b_{n1})c_{1j}\\
    &\quad +(a_{i1}b_{12}+a_{i2}b_{22}+\cdots+a_{in}b_{n2})c_{2j}+\cdots\\
    &\quad +(a_{i1}b_{1p}+a_{i2}b_{2p}+\cdots+a_{in}b_{np})c_{pj},
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    h_{ij}
    &=a_{i1}g_{1j}+a_{i2}g_{2j}+\cdots+a_{in}g_{nj}\\
    &=a_{i1}(b_{11}c_{1j}+b_{12}c_{2j}+\cdots+b_{1p}c_{pj})\\
    &\quad+a_{i2}(b_{21}c_{1j}+b_{22}c_{2j}+\cdots+b_{2p}c_{pj})+\cdots\\
    &\quad+a_{in}(b_{n1}c_{1j}+b_{n2}c_{2j}+\cdots+b_{np}c_{pj})\\
    &=a_{i1}b_{11}c_{1j}+a_{i1}b_{12}c_{2j}+\cdots+a_{i1}b_{1p}c_{pj}\\
    &\quad+a_{i2}b_{21}c_{1j}+a_{i2}b_{22}c_{2j}+\cdots+a_{i2}b_{2p}c_{pj}+\cdots\\
    &\quad+a_{in}b_{n1}c_{1j}+a_{in}b_{n2}c_{2j}+\cdots+a_{in}b_{np}c_{pj}\\
    &=(a_{i1}b_{11}+a_{i2}b_{21}+\cdots+a_{in}b_{n1})c_{1j}\\
    &\quad+(a_{i1}b_{12}+a_{i2}b_{22}+\cdots+a_{in}b_{n2})c_{2j}+\cdots\\
    &\quad+(a_{i1}b_{1p}+a_{i2}b_{2p}+\cdots+a_{in}b_{np})c_{pj}=f_{ij}\Rightarrow H=F.
    \end{aligned}
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>Докажем только 1-е равенство, второе аналогично.</div>
    <p>\(A_{m\times n}+B_{m\times n}=D_{m\times n},\ D_{m\times n}C_{n\times p}=F_{m\times p}\).<br>
    \(A_{m\times n}C_{n\times p}=G_{m\times p},\ B_{m\times n}C_{n\times p}=H_{m\times p},\ G_{m\times p}+H_{m\times p}=K_{m\times p}\).</p>
    <p>Т.е. следует доказать \(F=K\) (поэлементно).</p>
    <div class="s1-formula">$$
    \begin{aligned}
    f_{ij}
    &=d_{i1}c_{1j}+d_{i2}c_{2j}+\cdots+d_{in}c_{nj}\\
    &=(a_{i1}+b_{i1})c_{1j}+(a_{i2}+b_{i2})c_{2j}+\cdots+(a_{in}+b_{in})c_{nj},\\
    k_{ij}
    &=g_{ij}+h_{ij}\\
    &=a_{i1}c_{1j}+a_{i2}c_{2j}+\cdots+a_{in}c_{nj}
      +b_{i1}c_{1j}+b_{i2}c_{2j}+\cdots+b_{in}c_{nj}\\
    &=(a_{i1}+b_{i1})c_{1j}+\cdots+(a_{in}+b_{in})c_{nj}=f_{ij}\Rightarrow K=F.
    \end{aligned}
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">4)</span>\(A_{m\times n}E_{n\times n}=B_{m\times n}\). Т.е. следует доказать, что \(B=A\).</div>
    <div class="s1-formula">$$
    b_{ij}=a_{i1}e_{1j}+\cdots+a_{i,j-1}e_{j-1,j}+a_{ij}e_{jj}+a_{i,j+1}e_{j+1,j}+\cdots+a_{in}e_{nj}=a_{ij}\Rightarrow B=A.
    $$</div>

    <div class="s1-proof-step"><span class="s1-proof-label">5)</span>\(A_{m\times n}O_{n\times p}=B_{m\times p}\). Т.е. следует доказать, что \(B=O_{m\times p}\).</div>
    <div class="s1-formula">$$
    b_{ij}=a_{i1}0_{1j}+a_{i2}0_{2j}+\cdots+a_{in}0_{nj}=0=0_{ij}\Rightarrow B=O_{m\times p}.
    $$</div>
    <p>Теорема доказана. \(\blacksquare\)</p>
</div>`
    },
    {
        id: 4,
        title: "Индуктивное определение детерминанта и непосредственные следствия из него: графические правила для вычисления определителей 2-го и 3-го порядков; определитель нижней треугольной матрицы.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem; margin-bottom:1.5em;">Билет 5. Индуктивное определение детерминанта и непосредственные следствия из него: графические правила для вычисления определителей 2-го и 3-го порядков; определитель нижней треугольной матрицы.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
    <p><b>Определение 1.</b> Определителем или детерминантом матрицы \(A_{n\times n}\) называется число \(|A|=\det(A)\), которое определяется по следующему индуктивному правилу:</p>
    <p><b>БИ (база индукции):</b> \(n=1\)</p>
    <div class="s1-formula">$$ \det(a_{11})=a_{11}. $$</div>
    <p><b>ШИ (шаг индукции):</b></p>
    <div class="s1-formula">$$
    \det(A_{(n+1)\times(n+1)})=a_{11}A_{11}+a_{12}A_{12}+\cdots+a_{1,n+1}A_{1,n+1},
    $$</div>
    <p>где \(A_{ij}=(-1)^{i+j}M_{ij}\), \(M_{ij}\) — определитель, получающийся из \(|A_{(n+1)\times(n+1)}|\) удалением \(i\)-й строки и \(j\)-го столбца.</p>
    <p>\(n\) — порядок определителя \(|A_{n\times n}|\); \(A_{ij}\) — алгебраическое дополнение, \(M_{ij}\) — минор.</p>
    <p>Нижней треугольной называется матрица, у которой все элементы выше главной диагонали равны нулю.</p>
    </div>

    <h4 style="color:#1a3a6e;">Графическое правило для \(n=2\)</h4>
    <div style="max-width:520px; margin:1rem auto;">
        <svg viewBox="0 0 600 220" role="img" aria-label="Графическое правило вычисления определителя второго порядка" style="width:100%;height:auto;display:block;color:var(--ink);">
  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M55 35 V165 M250 35 V165" stroke-width="2.4"/>
    <path d="M350 35 V165 M545 35 V165" stroke-width="2.4"/>
    <line x1="110" y1="72" x2="195" y2="132" stroke-width="3"/>
    <line x1="490" y1="72" x2="405" y2="132" stroke-width="3"/>
  </g>
  <g fill="currentColor">
    <circle cx="110" cy="72" r="3.3"/><circle cx="195" cy="132" r="3.3"/>
    <circle cx="490" cy="72" r="3.3"/><circle cx="405" cy="132" r="3.3"/>
  </g>
  <g font-size="21" fill="currentColor">
    <text x="78" y="60">a₁₁</text><text x="188" y="60">a₁₂</text>
    <text x="78" y="150">a₂₁</text><text x="188" y="150">a₂₂</text>
    <text x="373" y="60">a₁₁</text><text x="483" y="60">a₁₂</text>
    <text x="373" y="150">a₂₁</text><text x="483" y="150">a₂₂</text>
    <text x="152" y="205" font-size="28" text-anchor="middle">+</text>
    <text x="447" y="205" font-size="28" text-anchor="middle">−</text>
  </g>
</svg>
    </div>
    <p><b>По графическому правилу:</b></p>
    <div class="s1-formula">$$
    \begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}
    =a_{11}a_{22}-a_{21}a_{12}.
    $$</div>
    <p><b>По определению:</b></p>
    <div class="s1-formula">$$
    \begin{aligned}
    \begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}
    &=a_{11}A_{11}+a_{12}A_{12}\\
    &=a_{11}(-1)^{1+1}M_{11}+a_{12}(-1)^{1+2}M_{12}\\
    &=a_{11}a_{22}-a_{12}a_{21}.
    \end{aligned}
    $$</div>

    <h4 style="color:#1a3a6e;">Графическое правило для \(n=3\) (правило Саррюса)</h4>
        <div style="max-width:680px; margin:1rem auto;">
        <svg viewBox="0 0 760 340" role="img" aria-label="Графическое правило Саррюса для определителя третьего порядка" style="width:100%;height:auto;display:block;color:var(--ink);">
            <defs>
                <pattern id="s1-sarrus-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.08"/>
                </pattern>
            </defs>
            <rect x="0" y="0" width="760" height="340" fill="url(#s1-sarrus-grid)"/>

            <g font-size="17" font-weight="600" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
                <!-- Left determinant: positive terms, notebook style -->
                <path d="M55 48 Q53 130 55 252" fill="none" stroke-width="2.8"/>
                <path d="M275 48 Q277 130 275 252" fill="none" stroke-width="2.8"/>

                <g>
                    <circle cx="95" cy="82" r="4"/><circle cx="155" cy="72" r="4"/><circle cx="215" cy="78" r="4"/>
                    <circle cx="95" cy="145" r="4"/><circle cx="155" cy="152" r="4"/><circle cx="215" cy="146" r="4"/>
                    <circle cx="95" cy="205" r="4"/><circle cx="155" cy="215" r="4"/><circle cx="215" cy="207" r="4"/>

                    <text x="100" y="88">a₁₁</text><text x="160" y="78">a₁₂</text><text x="220" y="84">a₁₃</text>
                    <text x="100" y="151">a₂₁</text><text x="160" y="158">a₂₂</text><text x="220" y="152">a₂₃</text>
                    <text x="100" y="211">a₃₁</text><text x="160" y="221">a₃₂</text><text x="220" y="213">a₃₃</text>

                    <path d="M95 82 L155 152 L215 207" fill="none" stroke-width="2.8"/>
                    <path d="M155 72 L215 146 L95 205" fill="none" stroke-width="2.8"/>
                    <path d="M215 78 L95 145 L155 215" fill="none" stroke-width="2.8"/>
                </g>

                <!-- Right determinant: negative terms, notebook style -->
                <path d="M455 48 Q453 130 455 252" fill="none" stroke-width="2.8"/>
                <path d="M675 48 Q677 130 675 252" fill="none" stroke-width="2.8"/>

                <g>
                    <circle cx="495" cy="82" r="4"/><circle cx="555" cy="72" r="4"/><circle cx="615" cy="78" r="4"/>
                    <circle cx="495" cy="145" r="4"/><circle cx="555" cy="152" r="4"/><circle cx="615" cy="146" r="4"/>
                    <circle cx="495" cy="205" r="4"/><circle cx="555" cy="215" r="4"/><circle cx="615" cy="207" r="4"/>

                    <text x="500" y="88">a₁₁</text><text x="560" y="78">a₁₂</text><text x="620" y="84">a₁₃</text>
                    <text x="500" y="151">a₂₁</text><text x="560" y="158">a₂₂</text><text x="620" y="152">a₂₃</text>
                    <text x="500" y="211">a₃₁</text><text x="560" y="221">a₃₂</text><text x="620" y="213">a₃₃</text>

                    <path d="M495 205 L555 152 L615 78" fill="none" stroke-width="2.8"/>
                    <path d="M555 215 L615 146 L495 82" fill="none" stroke-width="2.8"/>
                    <path d="M615 207 L495 145 L555 72" fill="none" stroke-width="2.8"/>
                </g>
            </g>

            <!-- signs under determinants -->
            <g fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <text x="165" y="302" font-size="30" font-weight="700" text-anchor="middle">+</text>
                <text x="565" y="302" font-size="30" font-weight="700" text-anchor="middle">−</text>

                <!-- small notebook-like double strokes -->
                <path d="M120 286 l-6 -10 M127 286 l-6 -10"/>
                <path d="M203 266 l-2 -12 M210 266 l-2 -12"/>
                <path d="M520 286 l-6 -10 M527 286 l-6 -10"/>
                <path d="M603 266 l-2 -12 M610 266 l-2 -12"/>
            </g>
        </svg>
    </div>

    </div>
    <p><b>По определению:</b></p>
    <div class="s1-formula">$$
    \begin{aligned}
    \begin{vmatrix}
    a_{11}&a_{12}&a_{13}\\
    a_{21}&a_{22}&a_{23}\\
    a_{31}&a_{32}&a_{33}
    \end{vmatrix}
    &=a_{11}(-1)^{1+1}M_{11}+a_{12}(-1)^{1+2}M_{12}+a_{13}(-1)^{1+3}M_{13}\\
    &=a_{11}\begin{vmatrix}a_{22}&a_{23}\\a_{32}&a_{33}\end{vmatrix}
    -a_{12}\begin{vmatrix}a_{21}&a_{23}\\a_{31}&a_{33}\end{vmatrix}
    +a_{13}\begin{vmatrix}a_{21}&a_{22}\\a_{31}&a_{32}\end{vmatrix}\\
    &=a_{11}(a_{22}a_{33}-a_{32}a_{23})
    -a_{12}(a_{21}a_{33}-a_{31}a_{23})
    +a_{13}(a_{21}a_{32}-a_{31}a_{22})\\
    &=a_{11}a_{22}a_{33}-a_{11}a_{32}a_{23}-a_{12}a_{21}a_{33}
      +a_{12}a_{31}a_{23}+a_{13}a_{21}a_{32}-a_{13}a_{31}a_{22}.
    \end{aligned}
    $$</div>
    <p><b>По графическому правилу:</b></p>
    <div class="s1-formula">$$
    \begin{aligned}
    \begin{vmatrix}
    a_{11}&a_{12}&a_{13}\\
    a_{21}&a_{22}&a_{23}\\
    a_{31}&a_{32}&a_{33}
    \end{vmatrix}
    &=a_{11}a_{22}a_{33}+a_{21}a_{32}a_{13}+a_{12}a_{23}a_{31}\\
    &\quad-a_{31}a_{22}a_{13}-a_{11}a_{23}a_{32}-a_{33}a_{21}a_{12}.
    \end{aligned}
    $$</div>

    <h4 style="color:#1a3a6e;">Определитель нижней треугольной матрицы</h4>
    <p>Пусть \(A_{n\times n}\) — нижняя треугольная матрица. Тогда</p>
    <div class="s1-formula">$$ |A|=a_{11}a_{22}\cdots a_{nn}. $$</div>
    <p><b>Д-во:</b> Индукцией по \(n\).</p>
    <div class="s1-proof-step"><span class="s1-proof-label">БИ:</span> \(n=1\), \(\det(a_{11})=a_{11}\).</div>
    <div class="s1-proof-step"><span class="s1-proof-label">ШИ:</span> предположим, что формула верна для \(n=k\). Покажем, что тогда она верна и для \(n=k+1\):</div>
    <div class="s1-formula">$$
    \begin{vmatrix}
    a_{11}&0&0&\cdots&0\\
    a_{21}&a_{22}&0&\cdots&0\\
    a_{31}&a_{32}&a_{33}&\cdots&0\\
    \vdots&\vdots&\vdots&\ddots&\vdots\\
    a_{k+1,1}&a_{k+1,2}&a_{k+1,3}&\cdots&a_{k+1,k+1}
    \end{vmatrix}
    =a_{11}(-1)^{1+1}
    \begin{vmatrix}
    a_{22}&0&\cdots&0\\
    a_{32}&a_{33}&\cdots&0\\
    \vdots&\vdots&\ddots&\vdots\\
    a_{k+1,2}&a_{k+1,3}&\cdots&a_{k+1,k+1}
    \end{vmatrix}
    =a_{11}a_{22}\cdots a_{nn}.\quad\blacksquare
    $$</div>
</div>`
    },
    {
        id: 5,
        title: "Понятие линейной зависимости применительно к матрицам-строкам. Лемма о линейной зависимости матриц-строк. Определитель с нулевой строкой, двумя равными строками и линейно зависимыми строками.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 6. Понятие линейной зависимости применительно к матрицам-строкам. Лемма о линейной зависимости матриц-строк. Определитель с нулевой строкой, двумя равными строками и линейно зависимыми строками.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Линейной комбинацией матриц-строк \(S_1,S_2,\ldots,S_m\) одинаковой длины с коэффициентами соответственно \(\alpha_1,\alpha_2,\ldots,\alpha_m\) называется матрица-строка</p>
        <div class="s1-formula">$$\alpha_1S_1+\alpha_2S_2+\ldots+\alpha_mS_m.$$</div>
        <p><b>Определение 2.</b> Линейная комбинация называется <b>вырожденной</b>, если все её коэффициенты нулевые, <b>невырожденной</b> — в противном случае. Линейная комбинация называется <b>нулевой</b>, если она равна \(0\); <b>ненулевой</b> — в противном случае.</p>
        <p><b>Замечание.</b> Вырожденная линейная комбинация всегда нулевая; невырожденная — не всегда.</p>
        <p><b>Определение 3.</b> Система матриц-строк \(S_1,S_2,\ldots,S_m\) одинаковой длины называется <b>линейно зависимой</b>, если существует невырожденная, но нулевая линейная комбинация этих строк; эта система называется <b>линейно независимой</b> в противном случае.</p>
    </div>

    <h4 style="color:#1a3a6e;">Лемма (о линейной зависимости)</h4>
    <ol>
        <li>Любая подсистема ЛНС тоже независима.</li>
        <li>Система линейно зависима \(\Longleftrightarrow\) одна из её матриц-строк может быть представлена в виде линейной комбинации других её матриц-строк.</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step">
        <span class="s1-proof-label">1)</span> Пусть подсистема у системы из \(m\) строк содержит \(l\) её строк \((l&lt;m)\). Перенумеруем строки системы так, чтобы в подсистему входили первые \(l\) строк:
        <div class="s1-formula">$$\underbrace{S_1,S_2,\ldots,S_l}_{\text{подсистема}},S_{l+1},\ldots,S_m.$$</div>
        <p>Пусть вся система линейно независима, но (предположим) подсистема линейно зависима. Тогда существуют такие коэффициенты \(\alpha_1,\alpha_2,\ldots,\alpha_l\), хотя бы один из которых ненулевой, что</p>
        <div class="s1-formula">$$\alpha_1S_1+\alpha_2S_2+\ldots+\alpha_lS_l=0.$$</div>
        <p>Следовательно,</p>
        <div class="s1-formula">$$\alpha_1S_1+\ldots+\alpha_lS_l+0\cdot S_{l+1}+\ldots+0\cdot S_m=0,$$</div>
        <p>причём хотя бы один из этих коэффициентов ненулевой. Значит, \(S_1,S_2,\ldots,S_m\) линейно зависима. Противоречие.</p>
    </div>

    <div class="s1-proof-step">
        <span class="s1-proof-label">2) \(\Rightarrow\)</span> Пусть система \(S_1,S_2,\ldots,S_m\) линейно зависима. Тогда существуют такие коэффициенты \(\alpha_1,\alpha_2,\ldots,\alpha_m\), хотя бы один из которых не равен \(0\), что
        <div class="s1-formula">$$\alpha_1S_1+\alpha_2S_2+\ldots+\alpha_iS_i+\ldots+\alpha_mS_m=0.$$</div>
        <p>Пусть \(\alpha_i\ne0\). Тогда</p>
        <div class="s1-formula">$$S_i=-\frac{\alpha_1}{\alpha_i}S_1-\ldots-\frac{\alpha_{i-1}}{\alpha_i}S_{i-1}-\frac{\alpha_{i+1}}{\alpha_i}S_{i+1}-\ldots-\frac{\alpha_m}{\alpha_i}S_m.$$</div>
    </div>

    <div class="s1-proof-step">
        <span class="s1-proof-label">\(\Leftarrow\)</span> Пусть для некоторого номера \(i\in\{1,2,\ldots,m\}\)
        <div class="s1-formula">$$S_i=\beta_1S_1+\ldots+\beta_{i-1}S_{i-1}+\beta_{i+1}S_{i+1}+\ldots+\beta_mS_m.$$</div>
        <p>Тогда</p>
        <div class="s1-formula">$$-\beta_1S_1-\ldots-\beta_{i-1}S_{i-1}+1\cdot S_i-\beta_{i+1}S_{i+1}-\ldots-\beta_mS_m=0.$$</div>
        <p>Так как коэффициент при \(S_i\) равен \(1\ne0\), система \(S_1,S_2,\ldots,S_m\) линейно зависима. \(\blacksquare\)</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о св-вах определителя)</h4>
    <ol>
        <li>При перестановке 2-ух строк определитель умножается на \(-1\).</li>
        <li>Если в \(i\)-й строке стоит \(S_i'+S_i''\), то определитель равен сумме двух определителей: с \(S_i'\) и с \(S_i''\) в этой строке.</li>
        <li>Если в \(i\)-й строке стоит \(\lambda S_i\), то \(\lambda\) выносится за знак определителя.</li>
        <li>\(\forall A_{n\times n}\quad |A^t|=|A|\). Без доказательства.</li>
    </ol>

    <h4 style="color:#1a3a6e;">Следствие</h4>
    <div class="s1-proof-step">
        <span class="s1-proof-label">1)</span> Определитель с нулевой строкой равен \(0\).
        <div class="s1-formula">$$\begin{vmatrix}S_1\\ \vdots\\ S_{i-1}\\ 0\\ S_{i+1}\\ \vdots\\ S_n\end{vmatrix}=\begin{vmatrix}S_1\\ \vdots\\ S_{i-1}\\ 0\cdot S_i\\ S_{i+1}\\ \vdots\\ S_n\end{vmatrix}=0\cdot\begin{vmatrix}S_1\\ \vdots\\ S_{i-1}\\ S_i\\ S_{i+1}\\ \vdots\\ S_n\end{vmatrix}=0.$$</div>
    </div>
    <div class="s1-proof-step">
        <span class="s1-proof-label">2)</span> Определитель, в котором есть две равные строки, равен \(0\). При перестановке этих двух строк определитель, с одной стороны, не изменится, а с другой — изменит знак. Поэтому \(|A|=-|A|\), откуда \(|A|=0\).
    </div>
    <div class="s1-proof-step">
        <span class="s1-proof-label">3)</span> Определитель с линейно зависимыми строками равен нулю.
        <p>Строки линейно зависимы \(\Longleftrightarrow\) какая-то \(i\)-я строка может быть представлена в виде линейной комбинации остальных строк:</p>
        <div class="s1-formula">$$S_i=\alpha_1S_1+\ldots+\alpha_{i-1}S_{i-1}+\alpha_{i+1}S_{i+1}+\ldots+\alpha_nS_n.$$</div>
        <p>По свойствам 2) и 3) из теоремы 1 определитель раскладывается в сумму определителей, каждый из которых содержит две одинаковые строки, а значит каждый равен \(0\). Следовательно исходный определитель равен \(0\). \(\blacksquare\)</p>
    </div>
</div>`
    },
    {
        id: 6,
        title: "Обратная матрица: единственность и условие существования. Формула для обращения матрицы.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 7. Обратная матрица: единственность и условие существования. Формула для обращения матрицы.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Матрица \(B_{n\times n}\) называется <b>обратной</b> к матрице \(A_{n\times n}\), если</p>
        <div class="s1-formula">$$AB=BA=E_{n\times n}.$$</div>
        <p>Обозначение: \(B=A^{-1}\).</p>
        <p><b>Единичная матрица</b> \(E_{n\times n}\) — квадратная матрица, у которой на главной диагонали стоят единицы, а остальные элементы равны нулю.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о единственности \(A^{-1}\))</h4>
    <p>Если существует \(A^{-1}\), то она единственная.</p>
    <p><b>Д-во:</b> Пусть \((A^{-1})_1\) и \((A^{-1})_2\) — матрицы, обратные к \(A\).</p>
    <div class="s1-formula">$$
    \begin{aligned}
    (A^{-1})_1A&=E\quad |\cdot(A^{-1})_2,\\
    ((A^{-1})_1A)(A^{-1})_2&=E(A^{-1})_2,\\
    (A^{-1})_1(A(A^{-1})_2)&=(A^{-1})_2,\\
    (A^{-1})_1E&=(A^{-1})_2,\\
    (A^{-1})_1&=(A^{-1})_2.\quad\blacksquare
    \end{aligned}
    $$</div>

    <h4 style="color:#1a3a6e;">Теорема 2 (условие существования \(A^{-1}\), формула для \(A^{-1}\))</h4>
    <p>Матрица \(A\) обратима \(\Longleftrightarrow\) \(A\) не вырождена. В случае обратимости</p>
    <div class="s1-formula">$$
    A^{-1}=\frac1{|A|}
    \begin{pmatrix}
    A_{11}&A_{21}&\cdots&A_{n1}\\
    A_{12}&A_{22}&\cdots&A_{n2}\\
    \vdots&\vdots&\ddots&\vdots\\
    A_{1n}&A_{2n}&\cdots&A_{nn}
    \end{pmatrix}.\tag{*}
    $$</div>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step">
        <span class="s1-proof-label">\(\Rightarrow\)</span> Пусть \(A\) обратима. Тогда \(AA^{-1}=E\), поэтому
        <div class="s1-formula">$$|AA^{-1}|=|E|\Rightarrow |A|\,|A^{-1}|=1\Rightarrow |A|\ne0.$$</div>
    </div>

    <div class="s1-proof-step">
        <span class="s1-proof-label">\(\Leftarrow\)</span> Пусть \(A\) невырождена. Покажем, что матрица, определённая формулой \((*)\), действительно обратна к \(A\).
        <div class="s1-formula">$$
        \frac1{|A|}
        \begin{pmatrix}
        A_{11}&A_{21}&\cdots&A_{n1}\\
        A_{12}&A_{22}&\cdots&A_{n2}\\
        \vdots&\vdots&\ddots&\vdots\\
        A_{1n}&A_{2n}&\cdots&A_{nn}
        \end{pmatrix}
        \begin{pmatrix}
        a_{11}&a_{12}&\cdots&a_{1n}\\
        a_{21}&a_{22}&\cdots&a_{2n}\\
        \vdots&\vdots&\ddots&\vdots\\
        a_{n1}&a_{n2}&\cdots&a_{nn}
        \end{pmatrix}.
        $$</div>
        <p>На главной диагонали получаются суммы вида</p>
        <div class="s1-formula">$$\frac1{|A|}\bigl(A_{1j}a_{1j}+A_{2j}a_{2j}+\ldots+A_{nj}a_{nj}\bigr)=\frac{|A|}{|A|}=1,$$</div>
        <p>по теореме разложения определителя. Вне главной диагонали получаются суммы вида</p>
        <div class="s1-formula">$$\frac1{|A|}\bigl(A_{1i}a_{1j}+A_{2i}a_{2j}+\ldots+A_{ni}a_{nj}\bigr)=0,\qquad i\ne j,$$</div>
        <p>по теореме аннулирования для столбцов. Следовательно, произведение равно \(E\).</p>
        <p>При перемножении этих матриц в обратном порядке срабатывают эти же рассуждения: разложение определителя по строке и теорема аннулирования для строк; и тоже получается \(E\). \(\blacksquare\)</p>
    </div>
</div>`
    },
    {
        id: 7,
        title: "Теорема о правой обратной и левой обратной матрицах. Свойства операции обращения матриц.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 8. Теорема о правой обратной и левой обратной матрицах. Свойства операции обращения матриц.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Обратная матрица.</b> Матрица \(B_{n\times n}\) называется обратной к матрице \(A_{n\times n}\), если \(AB=BA=E_{n\times n}\). Обозначение: \(B=A^{-1}\).</p>
        <p><b>Определение 1.</b> Транспонированной матрицей \(A_{m\times n}\) называется такая матрица \(B_{n\times m}\), что \(\forall j\in\{1,2,\ldots,n\}\) и \(\forall i\in\{1,2,\ldots,m\}\): \(b_{ji}=a_{ij}\). Обозначение: \(B=A^t\).</p>
        <p><b>Единичная матрица</b> \(E_{n\times n}\) — квадратная матрица, у которой на главной диагонали стоят единицы, а остальные элементы равны нулю.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о правой обратной и левой обратной матрицах)</h4>
    <div class="s1-formula">$$\forall A_{n\times n},B_{n\times n}\qquad AB=E\Longleftrightarrow B=A^{-1}\Longleftrightarrow BA=E.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-proof-step">
        <span class="s1-proof-label">\(\Rightarrow\)</span> \(AB=E\Rightarrow |A|\,|B|=1\Rightarrow |A|\ne0\Rightarrow\exists A^{-1}\).
        <div class="s1-formula">$$
        \begin{aligned}
        AB&=E\quad |\cdot A^{-1},\\
        A^{-1}(AB)&=A^{-1}E,\\
        (A^{-1}A)B&=A^{-1},\\
        EB&=A^{-1},\\
        B&=A^{-1}\Rightarrow BA=E.
        \end{aligned}
        $$</div>
    </div>
    <div class="s1-proof-step">
        <span class="s1-proof-label">\(\Leftarrow\)</span> \(BA=E\Rightarrow |B|\,|A|=1\Rightarrow |A|\ne0\Rightarrow\exists A^{-1}\).
        <div class="s1-formula">$$
        \begin{aligned}
        BA&=E\quad |\cdot A^{-1},\\
        (BA)A^{-1}&=EA^{-1},\\
        B(AA^{-1})&=A^{-1},\\
        BE&=A^{-1},\\
        B&=A^{-1}\Rightarrow AB=E.\quad\blacksquare
        \end{aligned}
        $$</div>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 2. Свойства \(A^{-1}\)</h4>
    <ol>
        <li>Если существует \(A^{-1}\), то \((A^{-1})^{-1}=A\).</li>
        <li>Если \(\lambda\ne0\) и существует \(A^{-1}\), то \((\lambda A)^{-1}=\lambda^{-1}A^{-1}\).</li>
        <li>Если существует \(A^{-1}\), то \((A^t)^{-1}=(A^{-1})^t\).</li>
        <li>Если существуют \(A^{-1}_{n\times n}\) и \(B^{-1}_{n\times n}\), то \((AB)^{-1}=B^{-1}A^{-1}\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span> \(AA^{-1}=E\Rightarrow(A^{-1})^{-1}=A\).</div>
    <div class="s1-proof-step"><span class="s1-proof-label">2)</span>
        <div class="s1-formula">$$(\lambda^{-1}A^{-1})(\lambda A)=(\lambda^{-1}\lambda)(A^{-1}A)=1\cdot E=E\Rightarrow(\lambda A)^{-1}=\lambda^{-1}A^{-1}.$$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>
        <div class="s1-formula">$$(A^{-1})^tA^t=(AA^{-1})^t=E^t=E\Rightarrow(A^t)^{-1}=(A^{-1})^t.$$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">4)</span>
        <div class="s1-formula">$$(B^{-1}A^{-1})(AB)=\bigl(B^{-1}(A^{-1}A)\bigr)B=(B^{-1}E)B=B^{-1}B=E\Rightarrow(AB)^{-1}=B^{-1}A^{-1}.\quad\blacksquare$$</div>
    </div>
</div>`
    },
    {
        id: 8,
        title: "Формулы Крамера. Критерий существования ненулевого решения у ОСЛУ с квадратной матрицей.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 9. Формулы Крамера. Критерий существования ненулевого решения у ОСЛУ с квадратной матрицей.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Система линейных уравнений (СЛУ)</b> имеет вид</p>
        <div class="s1-formula">$$
        \begin{cases}
        a_{11}x_1+a_{12}x_2+\ldots+a_{1n}x_n=b_1,\\
        a_{21}x_1+a_{22}x_2+\ldots+a_{2n}x_n=b_2,\\
        \qquad\vdots\\
        a_{m1}x_1+a_{m2}x_2+\ldots+a_{mn}x_n=b_m,
        \end{cases}
        $$</div>
        <p>где \(a_{ij}\) и \(b_i\) — заданные (известные) числа, \(x_j\) — неизвестные; \(a_{ij}\) называются коэффициентами, \(b_i\) — правыми частями или свободными слагаемыми.</p>
        <p>Матрица \(A=(a_{ij})\) называется <b>матрицей СЛУ</b>; \(X=(x_1,\ldots,x_n)^t\) — <b>столбец неизвестных</b>; \(B=(b_1,\ldots,b_m)^t\) — <b>столбец правых частей</b>.</p>
        <p>Если \(b_1=b_2=\ldots=b_m=0\), то СЛУ называется <b>однородной (ОСЛУ)</b>. Если существует \(b_i\ne0\), то СЛУ называется <b>неоднородной (НСЛУ)</b>.</p>
        <p>У ОСЛУ всегда есть решение вида \(x_1=x_2=\ldots=x_n=0\); такое решение называется <b>нулевым</b> или <b>тривиальным</b>.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (формулы Крамера)</h4>
    <p>Рассмотрим СЛУ с квадратной матрицей:</p>
    <div class="s1-formula">$$
    \begin{cases}
    a_{11}x_1+a_{12}x_2+\ldots+a_{1n}x_n=b_1,\\
    a_{21}x_1+a_{22}x_2+\ldots+a_{2n}x_n=b_2,\\
    \qquad\vdots\\
    a_{n1}x_1+a_{n2}x_2+\ldots+a_{nn}x_n=b_n.
    \end{cases}\tag{1}
    $$</div>
    <p>Пусть \(\Delta=|A|\ne0\). Тогда у СЛУ (1) существует единственное решение, и это решение можно найти по следующим формулам:</p>
    <div class="s1-formula">$$x_1=\frac{\Delta_1}{\Delta},\qquad x_2=\frac{\Delta_2}{\Delta},\qquad\ldots,\qquad x_n=\frac{\Delta_n}{\Delta},$$</div>
    <p>где \(\Delta_j\) — определитель, получающийся из \(\Delta\) заменой \(j\)-го столбца на \(B\).</p>

    <p><b>Д-во:</b> \(|A|\ne0\Rightarrow\exists!A^{-1}\).</p>
    <div class="s1-formula">$$
    A^{-1}\,|\,AX=B\qquad\Rightarrow\qquad A^{-1}AX=A^{-1}B\qquad\Rightarrow\qquad X=A^{-1}B.
    $$</div>
    <div class="s1-formula">$$
    \begin{pmatrix}x_1\\x_2\\\vdots\\x_n\end{pmatrix}
    =\frac1{|A|}
    \begin{pmatrix}
    A_{11}&A_{21}&\cdots&A_{n1}\\
    A_{12}&A_{22}&\cdots&A_{n2}\\
    \vdots&\vdots&\ddots&\vdots\\
    A_{1n}&A_{2n}&\cdots&A_{nn}
    \end{pmatrix}
    \begin{pmatrix}b_1\\b_2\\\vdots\\b_n\end{pmatrix}
    =\frac1\Delta
    \begin{pmatrix}\Delta_1\\\Delta_2\\\vdots\\\Delta_n\end{pmatrix}.
    $$</div>

    <div class="s1-note">У ОСЛУ (причём и при \(m\ne n\)) всегда есть решение вида \(x_1=x_2=\ldots=x_n=0\); такое решение называется <b>нулевым</b> или <b>тривиальным</b>.</div>

    <h4 style="color:#1a3a6e;">Теорема 2 (критерий существования нетривиального решения у ОСЛУ с квадратной матрицей)</h4>
    <p>У ОСЛУ с квадратной матрицей \(A\) существует нетривиальное решение \(\Longleftrightarrow |A|=0\).</p>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    x_1\begin{pmatrix}a_{11}\\a_{21}\\\vdots\\a_{n1}\end{pmatrix}
    +x_2\begin{pmatrix}a_{12}\\a_{22}\\\vdots\\a_{n2}\end{pmatrix}
    +\ldots+
    x_n\begin{pmatrix}a_{1n}\\a_{2n}\\\vdots\\a_{nn}\end{pmatrix}
    =\begin{pmatrix}0\\0\\\vdots\\0\end{pmatrix}.
    $$</div>
    <p>Существует нетривиальное решение \(\Longleftrightarrow\) столбцы матрицы \(A\) линейно зависимы \(\Longleftrightarrow |A|=0\). \(\blacksquare\)</p>
</div>`
    },
    {
        id: 9,
        title: "Координаты вектора, получающегося при сложении векторов и умножении вектора на число. Вычисление координат векторов в ОНБ; вычисление скалярного произведения через координаты сомножителей в ОНБ.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 10. Координаты вектора, получающегося при сложении векторов и умножении вектора на число. Вычисление координат векторов в ОНБ; вычисление скалярного произведения через координаты сомножителей в ОНБ.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Базисом в пространстве называется любая упорядоченная тройка некомпланарных векторов.</p>
        <p><b>Определение 2.</b> В условиях т. 2 числа \(\alpha_1,\alpha_2,\alpha_3\) называются <b>координатами</b> вектора \(\vec a\) в базисе \(Б\).</p>
        <p><b>Определение 3.</b> Базис называется <b>ортонормированным</b>, если его векторы попарно перпендикулярны и их длины равны \(1\).</p>
        <p><b>Скалярное произведение</b> геометрических векторов:</p>
        <div class="s1-formula">$$
        \vec a\cdot\vec b=
        \begin{cases}
        |\vec a|\,|\vec b|\cos(\vec a,\vec b),&\vec a\ne\vec0\text{ и }\vec b\ne\vec0,\\
        0,&\vec a=\vec0\text{ или }\vec b=\vec0.
        \end{cases}
        $$</div>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (координаты вектора, получающегося при «+» и «·» на число)</h4>
    <p>Пусть \(Б=(\vec e_1,\vec e_2,\vec e_3)\) — базис.</p>
    <ol>
        <li>Если координатные строки \(\vec a\) и \(\vec b\) в \(Б\) — \((\alpha_1,\alpha_2,\alpha_3)\) и \((\beta_1,\beta_2,\beta_3)\), то координатная строка \(\vec a+\vec b\) в \(Б\) — \((\alpha_1+\beta_1,\alpha_2+\beta_2,\alpha_3+\beta_3)\).</li>
        <li>Если координатная строка \(\vec a\) в \(Б\) — \((\alpha_1,\alpha_2,\alpha_3)\), то для любого \(\lambda\in\mathbb R\) координатная строка \(\lambda\vec a\) в \(Б\) — \((\lambda\alpha_1,\lambda\alpha_2,\lambda\alpha_3)\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step">
        <span class="s1-proof-label">1)</span>
        <div class="s1-formula">$$
        \begin{aligned}
        \vec a&=\alpha_1\vec e_1+\alpha_2\vec e_2+\alpha_3\vec e_3,\\
        \vec b&=\beta_1\vec e_1+\beta_2\vec e_2+\beta_3\vec e_3,\\
        \vec a+\vec b&=(\alpha_1+\beta_1)\vec e_1+(\alpha_2+\beta_2)\vec e_2+(\alpha_3+\beta_3)\vec e_3.
        \end{aligned}
        $$</div>
    </div>
    <div class="s1-proof-step">
        <span class="s1-proof-label">2)</span>
        <div class="s1-formula">$$
        \lambda\vec a=\lambda(\alpha_1\vec e_1+\alpha_2\vec e_2+\alpha_3\vec e_3)
        =(\lambda\alpha_1)\vec e_1+(\lambda\alpha_2)\vec e_2+(\lambda\alpha_3)\vec e_3.\quad\blacksquare
        $$</div>
    </div>

    <div class="s1-note">Теорема 1 распространяется на плоский и на прямолинейный случаи (только координат становится меньше).</div>

    <div class="s1-figure">
        <svg viewBox="0 0 620 320" role="img" aria-label="Иллюстрация разложения вектора по базису" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs><marker id="s1a10p2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs>
  <circle cx="95" cy="245" r="4" fill="currentColor"/>
  <line x1="95" y1="245" x2="520" y2="245" stroke="currentColor" stroke-width="2.2" marker-end="url(#s1a10p2)"/>
  <line x1="95" y1="245" x2="250" y2="60" stroke="currentColor" stroke-width="2.2" marker-end="url(#s1a10p2)"/>
  <line x1="95" y1="245" x2="305" y2="245" stroke="currentColor" stroke-width="3" marker-end="url(#s1a10p2)"/>
  <line x1="95" y1="245" x2="185" y2="138" stroke="currentColor" stroke-width="3" marker-end="url(#s1a10p2)"/>
  <line x1="95" y1="245" x2="395" y2="138" stroke="currentColor" stroke-width="3.4" marker-end="url(#s1a10p2)"/>
  <line x1="305" y1="245" x2="395" y2="138" stroke="currentColor" stroke-width="1.7" stroke-dasharray="7 7" opacity=".65"/>
  <line x1="185" y1="138" x2="395" y2="138" stroke="currentColor" stroke-width="1.7" stroke-dasharray="7 7" opacity=".65"/>
  <g font-size="18" fill="currentColor">
    <text x="530" y="252">e₁</text><text x="258" y="54">e₂</text>
    <text x="405" y="130" font-size="20">a</text>
    <text x="190" y="274">α₁e₁</text>
    <text x="108" y="158">α₂e₂</text>
  </g>
</svg>
        <div style="text-align:center;color:var(--pencil);font-size:.9rem;">Иллюстрация к основному свойству базиса в плоском случае</div>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 2 (координаты в ОНБ)</h4>
    <p>Пусть \((\vec e_1,\vec e_2,\vec e_3)\) — ОНБ.</p>
    <ol>
        <li>Если координатная строка вектора \(\vec a\) в \(Б\) — \((\alpha_1,\alpha_2,\alpha_3)\), то \(\forall i\in\{1,2,3\}\): \(\alpha_i=\vec a\cdot\vec e_i\).</li>
        <li>Если координатные строки \(\vec a\) и \(\vec b\) в \(Б\) — \((\alpha_1,\alpha_2,\alpha_3)\) и \((\beta_1,\beta_2,\beta_3)\) соответственно, то \(\vec a\cdot\vec b=\alpha_1\beta_1+\alpha_2\beta_2+\alpha_3\beta_3\).</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step">
        <span class="s1-proof-label">1)</span>
        <div class="s1-formula">$$
        \begin{aligned}
        \vec a\cdot\vec e_1
        &=(\alpha_1\vec e_1+\alpha_2\vec e_2+\alpha_3\vec e_3)\cdot\vec e_1\\
        &=\alpha_1\vec e_1^{\,2}+\alpha_2(\vec e_2\cdot\vec e_1)+\alpha_3(\vec e_3\cdot\vec e_1)=\alpha_1,
        \end{aligned}
        $$</div>
        <p>так как \(\vec e_1^{\,2}=1\), \(\vec e_2\cdot\vec e_1=0\), \(\vec e_3\cdot\vec e_1=0\). Аналогично доказывается для других \(\alpha_i\).</p>
    </div>
    <div class="s1-proof-step">
        <span class="s1-proof-label">2)</span>
        <div class="s1-formula">$$
        \begin{aligned}
        \vec a\cdot\vec b
        &=(\alpha_1\vec e_1+\alpha_2\vec e_2+\alpha_3\vec e_3)
          (\beta_1\vec e_1+\beta_2\vec e_2+\beta_3\vec e_3)\\
        &=\alpha_1\beta_1+\alpha_2\beta_2+\alpha_3\beta_3.\quad\blacksquare
        \end{aligned}
        $$</div>
    </div>

    <div class="s1-note"><b>Замечание.</b> 1) \(\vec a=\vec0\Rightarrow\vec a^{\,2}=0\). &nbsp; 2) \(\vec a\perp\vec b\Longleftrightarrow\vec a\cdot\vec b=0\).</div>

    <h4 style="color:#1a3a6e;">Теорема 3. Свойства скалярного произведения</h4>
    <ol>
        <li>\(\forall\vec a,\vec b\quad \vec a\cdot\vec b=\vec b\cdot\vec a\).</li>
        <li>\(\forall\vec a,\vec b,\vec c\quad (\vec a+\vec b)\cdot\vec c=\vec a\cdot\vec c+\vec b\cdot\vec c\).</li>
        <li>\(\forall\vec a,\vec b\ \forall\lambda\in\mathbb R\quad (\lambda\vec a)\cdot\vec b=\lambda(\vec a\cdot\vec b)\).</li>
        <li>\(\forall\vec a\quad \vec a^{\,2}=\vec a\cdot\vec a=0\Rightarrow\vec a=\vec0\). Без доказательства.</li>
    </ol>
    <div class="s1-note"><b>Замечание.</b> Из свойств 1–4 вытекает, что множество геометрических векторов — частный случай евклидова пространства.</div>
</div>`
    },
    {
        id: 10,
        title: "Свойства векторного произведения: критерий коллинеарности векторов; геометрический смысл векторного произведения; формула для вычисления векторного произведения через координаты сомножителей в правом ОНБ.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 11. Свойства векторного произведения: критерий коллинеарности векторов; геометрический смысл векторного произведения; формула для вычисления векторного произведения через координаты сомножителей в правом ОНБ.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Векторным произведением векторов \(\vec a\) и \(\vec b\) называется \([\vec a\times\vec b]\), определённый следующим образом:</p>
        <ol type="I">
            <li>если \(\vec a\parallel\vec b\), то \([\vec a\times\vec b]=\vec0\);</li>
            <li>если \(\vec a\nparallel\vec b\), то:
                <ol>
                    <li>\([\vec a\times\vec b]\perp\vec a,\vec b\);</li>
                    <li>\((\vec a,\vec b,[\vec a\times\vec b])\) — правая тройка;</li>
                    <li>\(|[\vec a\times\vec b]|=|\vec a|\,|\vec b|\sin(\widehat{\vec a,\vec b})\).</li>
                </ol>
            </li>
        </ol>
        <p><b>Определение 2.</b> Базис называется <b>ортонормированным</b>, если его векторы попарно перпендикулярны и их длины равны \(1\).</p>
        <p><b>Определение 3.</b> Пусть векторы \(\vec a,\vec b,\vec c\) некомпланарны и отложены от одной точки. Упорядоченная тройка векторов \((\vec a,\vec b,\vec c)\) называется правой (левой), если поворот от вектора \(\vec a\) к вектору \(\vec b\) по наименьшему углу с конца вектора \(\vec c\) видится происходящим против часовой стрелки (по часовой стрелке).</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (св-ва «×»)</h4>
    <ol>
        <li>\(\forall\vec a,\vec b\quad [\vec a\times\vec b]=-[\vec b\times\vec a]\).</li>
        <li>\(\forall\vec a,\vec b,\vec c\quad [ (\vec a+\vec b)\times\vec c]=[\vec a\times\vec c]+[\vec b\times\vec c]\).</li>
        <li>\(\forall\vec a,\vec b\ \forall\lambda\in\mathbb R\quad [\lambda\vec a\times\vec b]=\lambda[\vec a\times\vec b]\).</li>
    </ol>

    <h4 style="color:#1a3a6e;">Следствие 1. Критерий коллинеарности</h4>
    <div class="s1-formula">$$\vec a\parallel\vec b\Longleftrightarrow[\vec a\times\vec b]=\vec0.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Rightarrow\)</span> Непосредственно следует из определения векторного произведения.</div>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Leftarrow\)</span> Пусть \([\vec a\times\vec b]=\vec0\). Предположим, что \(\vec a\nparallel\vec b\). Тогда
        <div class="s1-formula">$$|\vec a|\,|\vec b|\sin(\widehat{\vec a,\vec b})=0.$$</div>
        <p>Если \(|\vec a|=0\), то \(\vec a=\vec0\Rightarrow\vec a\parallel\vec b\). Если \(|\vec b|=0\), то \(\vec b=\vec0\Rightarrow\vec a\parallel\vec b\). Если \(\sin(\widehat{\vec a,\vec b})=0\), то \(\widehat{\vec a,\vec b}=0\) или \(\widehat{\vec a,\vec b}=\pi\Rightarrow\vec a\parallel\vec b\). Противоречие. Следовательно, \(\vec a\parallel\vec b\). \(\blacksquare\)</p>
    </div>

    <h4 style="color:#1a3a6e;">Следствие 2. Геометрический смысл</h4>
    <div class="s1-figure">
        <svg viewBox="0 0 760 270" role="img" aria-label="Геометрический смысл векторного произведения" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs>
    <marker id="s1vecprod" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/></marker>
  </defs>
  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- triangle -->
    <circle cx="80" cy="175" r="3.8" fill="currentColor"/>
    <line x1="80" y1="175" x2="280" y2="175" stroke-width="2.8" marker-end="url(#s1vecprod)"/>
    <line x1="80" y1="175" x2="165" y2="55" stroke-width="2.8" marker-end="url(#s1vecprod)"/>
    <line x1="165" y1="55" x2="280" y2="175" stroke-width="2.1"/>
    <path d="M128 175 A48 48 0 0 0 104 136" stroke-width="1.8"/>

    <!-- parallelogram -->
    <circle cx="410" cy="175" r="3.8" fill="currentColor"/>
    <line x1="410" y1="175" x2="610" y2="175" stroke-width="2.8" marker-end="url(#s1vecprod)"/>
    <line x1="410" y1="175" x2="495" y2="55" stroke-width="2.8" marker-end="url(#s1vecprod)"/>
    <line x1="495" y1="55" x2="695" y2="55" stroke-width="2.1"/>
    <line x1="610" y1="175" x2="695" y2="55" stroke-width="2.1"/>
    <path d="M458 175 A48 48 0 0 0 434 136" stroke-width="1.8"/>
  </g>
  <g fill="currentColor" font-size="18">
    <text x="178" y="204">a</text>
    <text x="130" y="105">b</text>
    <text x="98" y="160">α</text>
    <text x="168" y="150" font-size="20">S△</text>

    <text x="508" y="204">a</text>
    <text x="460" y="115">b</text>
    <text x="428" y="160">α</text>
    <text x="546" y="136" font-size="20">S□</text>
  </g>
</svg>

        <div class="s1-figure-caption">Площади треугольника и параллелограмма на векторах \(\vec a\) и \(\vec b\)</div>
    </div>
    <div class="s1-formula">$$S_{\triangle}=\frac12\,|[\vec a\times\vec b]|,\qquad S_{\Box}=|[\vec a\times\vec b]|.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$S_{\triangle}=\frac12|\vec a|\,|\vec b|\sin\alpha=\frac12|[\vec a\times\vec b]|,$$</div>
    <div class="s1-formula">$$S_{\Box}=|\vec a|\,|\vec b|\sin\alpha=|[\vec a\times\vec b]|.$$</div>

    <h4 style="color:#1a3a6e;">Следствие 3. Вычисление через координаты в правом ОНБ</h4>
    <p>Пусть в&nbsp;правом ОНБ \((\vec i,\vec j,\vec k)\) векторы \(\vec a\) и \(\vec b\) имеют координаты \((a_x,a_y,a_z)\) и \((b_x,b_y,b_z)\). Тогда</p>
    <div class="s1-formula">$$[\vec a\times\vec b]=
    \begin{vmatrix}
    \vec i&\vec j&\vec k\\
    a_x&a_y&a_z\\
    b_x&b_y&b_z
    \end{vmatrix}.$$</div>
    <p><b>Д-во:</b> \([\vec i\times\vec j]\perp\vec i,\vec j\Rightarrow[\vec i\times\vec j]\parallel\vec k\), \((\vec i,\vec j,[\vec i\times\vec j])\) — правая тройка, \(|[\vec i\times\vec j]|=1\cdot1\cdot\sin\frac\pi2=1\Rightarrow[\vec i\times\vec j]=\vec k\). Аналогично \([\vec j\times\vec k]=\vec i\) и \([\vec k\times\vec i]=\vec j\).</p>
    <div class="s1-formula">$$
    \begin{aligned}
    [\vec a\times\vec b]
    &=[(a_x\vec i+a_y\vec j+a_z\vec k)\times(b_x\vec i+b_y\vec j+b_z\vec k)]\\
    &=(a_xb_y-a_yb_x)\vec k-(a_xb_z-a_zb_x)\vec j+(a_yb_z-a_zb_y)\vec i\\
    &=\begin{vmatrix}\vec i&\vec j&\vec k\\a_x&a_y&a_z\\b_x&b_y&b_z\end{vmatrix}.\quad\blacksquare
    \end{aligned}
    $$</div>
</div>`
    },
    {
        id: 11,
        title: "Свойства векторного произведения: формула «БАЦ минус ЦАБ», тождество Якоби.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 12. Свойства векторного произведения: формула «БАЦ минус ЦАБ», тождество Якоби.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Векторным произведением векторов \(\vec a\) и \(\vec b\) называется \([\vec a\times\vec b]\), определённый следующим образом:</p>
        <ol type="I">
            <li>если \(\vec a\parallel\vec b\), то \([\vec a\times\vec b]=\vec0\);</li>
            <li>если \(\vec a\nparallel\vec b\), то:
                <ol>
                    <li>\([\vec a\times\vec b]\perp\vec a,\vec b\);</li>
                    <li>\((\vec a,\vec b,[\vec a\times\vec b])\) — правая тройка;</li>
                    <li>\(|[\vec a\times\vec b]|=|\vec a|\,|\vec b|\sin(\widehat{\vec a,\vec b})\).</li>
                </ol>
            </li>
        </ol>
        <p><b>Определение 2.</b> Пусть векторы \(\vec a,\vec b,\vec c\) некомпланарны и отложены от одной точки. Упорядоченная тройка векторов \((\vec a,\vec b,\vec c)\) называется правой (левой), если поворот от вектора \(\vec a\) к вектору \(\vec b\) по наименьшему углу с конца вектора \(\vec c\) видится происходящим против часовой стрелки (по часовой стрелке).</p>
        <p><b>Скалярное произведение</b> геометрических векторов:</p>
        <div class="s1-formula">$$
        \vec a\cdot\vec b=
        \begin{cases}
        |\vec a|\,|\vec b|\cos(\widehat{\vec a,\vec b}),&\vec a\ne\vec0\text{ и }\vec b\ne\vec0,\\
        0,&\vec a=\vec0\text{ или }\vec b=\vec0.
        \end{cases}
        $$</div>
    </div>

    <h4 style="color:#1a3a6e;">4) Формула «БАЦ минус ЦАБ»</h4>
    <div class="s1-formula">$$[\vec a\times[\vec b\times\vec c]]=\vec b(\vec a\cdot\vec c)-\vec c(\vec a\cdot\vec b).$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    [\vec b\times\vec c]=
    \begin{vmatrix}\vec i&\vec j&\vec k\\b_x&b_y&b_z\\c_x&c_y&c_z\end{vmatrix}
    =(b_yc_z-b_zc_y)\vec i+(b_zc_x-b_xc_z)\vec j+(b_xc_y-b_yc_x)\vec k.
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    [\vec a\times[\vec b\times\vec c]]
    &=\bigl(a_y(b_xc_y-b_yc_x)-a_z(b_zc_x-b_xc_z)\bigr)\vec i\\
    &\quad+\bigl(a_z(b_yc_z-b_zc_y)-a_x(b_xc_y-b_yc_x)\bigr)\vec j\\
    &\quad+\bigl(a_x(b_zc_x-b_xc_z)-a_y(b_yc_z-b_zc_y)\bigr)\vec k\\
    &=\bigl(a_yb_xc_y-a_yb_yc_x-a_zb_zc_x+a_zb_xc_z\bigr)\vec i\\
    &\quad+\bigl(a_zb_yc_z-a_zb_zc_y-a_xb_xc_y+a_xb_yc_x\bigr)\vec j\\
    &\quad+\bigl(a_xb_zc_x-a_xb_xc_z-a_yb_yc_z+a_yb_zc_y\bigr)\vec k.
    \end{aligned}
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \vec b(\vec a\cdot\vec c)-\vec c(\vec a\cdot\vec b)
    &=\bigl(b_x(a_xc_x+a_yc_y+a_zc_z)-c_x(a_xb_x+a_yb_y+a_zb_z)\bigr)\vec i\\
    &\quad+\bigl(b_y(a_xc_x+a_yc_y+a_zc_z)-c_y(a_xb_x+a_yb_y+a_zb_z)\bigr)\vec j\\
    &\quad+\bigl(b_z(a_xc_x+a_yc_y+a_zc_z)-c_z(a_xb_x+a_yb_y+a_zb_z)\bigr)\vec k.
    \end{aligned}
    $$</div>
    <p>После раскрытия скобок одинаковые слагаемые сокращаются; слагаемые в&nbsp;скобках совпадают. \(\blacksquare\)</p>

    <h4 style="color:#1a3a6e;">5) Тождество Якоби</h4>
    <div class="s1-formula">$$[\vec a\times[\vec b\times\vec c]]+[\vec b\times[\vec c\times\vec a]]+[\vec c\times[\vec a\times\vec b]]=\vec0.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    \begin{aligned}
    &[\vec a\times[\vec b\times\vec c]]+[\vec b\times[\vec c\times\vec a]]+[\vec c\times[\vec a\times\vec b]]\\
    &=[\text{по «БАЦ минус ЦАБ»}]\\
    &=\vec b(\vec a\cdot\vec c)-\vec c(\vec a\cdot\vec b)
      +\vec c(\vec b\cdot\vec a)-\vec a(\vec b\cdot\vec c)
      +\vec a(\vec c\cdot\vec b)-\vec b(\vec c\cdot\vec a)=\vec0.\quad\blacksquare
    \end{aligned}
    $$</div>
</div>`
    },
    {
        id: 12,
        title: "Свойства смешанного умножения: критерий компланарности; критерий правой и левой тройки; геометрический смысл смешанного произведения.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 13. Свойства смешанного умножения: критерий компланарности; критерий правой и левой тройки; геометрический смысл смешанного произведения.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Смешанным произведением векторов \(\vec a,\vec b\) и \(\vec c\) называется число</p>
        <div class="s1-formula">$$\vec a\vec b\vec c=[\vec a\times\vec b]\cdot\vec c.$$</div>
        <p><b>Определение 2.</b> Пусть векторы \(\vec a,\vec b,\vec c\) некомпланарны и отложены от одной точки. Упорядоченная тройка векторов \((\vec a,\vec b,\vec c)\) называется правой (левой), если поворот от вектора \(\vec a\) к вектору \(\vec b\) по наименьшему углу с конца вектора \(\vec c\) видится происходящим против часовой стрелки (по часовой стрелке).</p>
        <p>Векторы \(\vec a,\vec b,\vec c\) называются <b>компланарными</b>, если, будучи отложенными от одной точки, они лежат в&nbsp;одной плоскости; некомпланарными — в противном случае.</p>
    </div>

    <h4 style="color:#1a3a6e;">1) Критерий компланарности</h4>
    <div class="s1-formula">$$\vec a,\vec b,\vec c\text{ компланарны}\Longleftrightarrow\vec a\vec b\vec c=0.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Rightarrow\)</span> Пусть \(\vec a,\vec b,\vec c\) компланарны.
        <p><b>I)</b> Если \(\vec a\parallel\vec b\), то \([\vec a\times\vec b]=\vec0\), поэтому \([\vec a\times\vec b]\cdot\vec c=\vec0\cdot\vec c=0\).</p>
        <p><b>II)</b> Если \(\vec a\nparallel\vec b\), то \([\vec a\times\vec b]\perp\vec c\), следовательно \([\vec a\times\vec b]\cdot\vec c=0\).</p>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Leftarrow\)</span> Пусть \(\vec a\vec b\vec c=0\).
        <p><b>I)</b> Если \(\vec a\parallel\vec b\), то \(\vec a,\vec b,\vec c\) компланарны в&nbsp;силу коллинеарности \(\vec a\) и \(\vec b\).</p>
        <p><b>II)</b> Если \(\vec a\nparallel\vec b\), но \(\vec a\vec b\vec c=0\), то \([\vec a\times\vec b]\cdot\vec c=0\). Отсюда либо \(\vec c=\vec0\) (и \(\vec a,\vec b,\vec c\) компланарны), либо \(\vec c\ne\vec0\), но \([\vec a\times\vec b]\perp\vec c\). Тогда \(\vec c\) лежит в&nbsp;плоскости векторов \(\vec a\) и \(\vec b\) (если \(\vec a,\vec b,\vec c\) отложены от одной точки), следовательно \(\vec a,\vec b,\vec c\) компланарны. \(\blacksquare\)</p>
    </div>

    <h4 style="color:#1a3a6e;">2) Критерий правой и левой тройки</h4>
    <div class="s1-formula">$$
    (\vec a,\vec b,\vec c)\text{ — правая тройка}\Longleftrightarrow\vec a\vec b\vec c>0,
    $$</div>
    <div class="s1-formula">$$
    (\vec a,\vec b,\vec c)\text{ — левая тройка}\Longleftrightarrow\vec a\vec b\vec c<0.
    $$</div>
    <p><b>Д-во:</b> Во всех случаях \(\vec a\nparallel\vec b\).</p>
    <div class="s1-figure">
        <svg viewBox="0 0 720 360" role="img" aria-label="Правая и левая тройки векторов" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs>
    <marker id="s1tripleArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
      <path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/>
    </marker>
  </defs>

  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- common origin -->
    <circle cx="330" cy="180" r="4.2" fill="currentColor"/>

    <!-- b -->
    <line x1="330" y1="180" x2="570" y2="180" stroke-width="2.8" marker-end="url(#s1tripleArrow)"/>

    <!-- a -->
    <line x1="330" y1="180" x2="455" y2="305" stroke-width="2.8" marker-end="url(#s1tripleArrow)"/>

    <!-- [a x b] -->
    <line x1="330" y1="180" x2="330" y2="45" stroke-width="2.8" marker-end="url(#s1tripleArrow)"/>

    <!-- c(I): acute angle with [a x b] -->
    <line x1="330" y1="180" x2="485" y2="62" stroke-width="2.2" stroke-dasharray="9 8" marker-end="url(#s1tripleArrow)"/>

    <!-- c(II): obtuse angle with [a x b] -->
    <line x1="330" y1="180" x2="165" y2="320" stroke-width="2.2" stroke-dasharray="9 8" marker-end="url(#s1tripleArrow)"/>

    <!-- acute angle arc between [a x b] and c(I) -->
    <path d="M330 112 A68 68 0 0 1 382 132" stroke-width="1.8"/>

    <!-- lambda angle between b and a -->
    <path d="M395 180 A65 65 0 0 1 376 226" stroke-width="1.8"/>
  </g>

  <g fill="currentColor" font-size="18" style="paint-order:stroke;stroke:white;stroke-width:5px;stroke-linejoin:round;">
    <text x="584" y="186">b</text>
    <text x="463" y="325">a</text>
    <text x="294" y="34">[a×b]</text>
    <text x="498" y="58">c(I)</text>
    <text x="105" y="338">c(II)</text>
    <text x="390" y="237">λ</text>
    <text x="394" y="124" font-size="16">острый</text>
  </g>
</svg>

    </div>
    <p><b>I)</b> \((\vec a,\vec b,\vec c)\) — правая \(\Longleftrightarrow([\vec a\times\vec b],\vec c)\) — острый \(\Longleftrightarrow[\vec a\times\vec b]\cdot\vec c>0\Longleftrightarrow\vec a\vec b\vec c>0\).</p>
    <p><b>II)</b> \((\vec a,\vec b,\vec c)\) — левая \(\Longleftrightarrow([\vec a\times\vec b],\vec c)\) — тупой \(\Longleftrightarrow[\vec a\times\vec b]\cdot\vec c<0\Longleftrightarrow\vec a\vec b\vec c<0\).</p>

    <h4 style="color:#1a3a6e;">3) Геометрический смысл \(\vec a\vec b\vec c\)</h4>
    <div class="s1-figure">
        <svg viewBox="0 0 960 430" role="img" aria-label="Геометрический смысл смешанного произведения" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs>
    <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="currentColor"/>
    </marker>
  </defs>
  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- ПАРАЛЛЕЛЕПИПЕД -->
    <!-- base S: O-A-D-B -->
    <circle cx="110" cy="260" r="4" fill="currentColor"/>
    <line x1="110" y1="260" x2="355" y2="260" stroke-width="2.6" marker-end="url(#arr)"/>
    <line x1="110" y1="260" x2="215" y2="195" stroke-width="2.6" marker-end="url(#arr)"/>
    <line x1="215" y1="195" x2="460" y2="195" stroke-width="2.1"/>
    <line x1="355" y1="260" x2="460" y2="195" stroke-width="2.1"/>

    <!-- c and translated top face -->
    <line x1="110" y1="260" x2="175" y2="92" stroke-width="2.8" marker-end="url(#arr)"/>
    <line x1="175" y1="92" x2="280" y2="27" stroke-width="1.8" stroke-dasharray="7 7"/>
    <line x1="175" y1="92" x2="420" y2="92" stroke-width="1.8" stroke-dasharray="7 7"/>
    <line x1="280" y1="27" x2="525" y2="27" stroke-width="1.8" stroke-dasharray="7 7"/>
    <line x1="420" y1="92" x2="525" y2="27" stroke-width="1.8" stroke-dasharray="7 7"/>
    <line x1="215" y1="195" x2="280" y2="27" stroke-width="1.6" stroke-dasharray="6 7" opacity=".65"/>
    <line x1="355" y1="260" x2="420" y2="92" stroke-width="1.6" stroke-dasharray="6 7" opacity=".65"/>
    <line x1="460" y1="195" x2="525" y2="27" stroke-width="1.6" stroke-dasharray="6 7" opacity=".65"/>

    <!-- height and normal exactly like notebook: normal below O, height above -->
    <line x1="110" y1="260" x2="110" y2="112" stroke-width="1.9"/>
    <line x1="110" y1="260" x2="110" y2="350" stroke-width="2.5" marker-end="url(#arr)"/>
    <path d="M110 244 h16 v16" stroke-width="1.7"/>
    <!-- clean alpha arc between h and c -->
    <path d="M110 210 A50 50 0 0 1 129 214" stroke-width="1.8"/>

    <!-- ПИРАМИДА -->
    <circle cx="620" cy="260" r="4" fill="currentColor"/>
    <!-- base triangle O-A-B -->
    <line x1="620" y1="260" x2="790" y2="260" stroke-width="2.6" marker-end="url(#arr)"/>
    <line x1="620" y1="260" x2="700" y2="220" stroke-width="2.6" marker-end="url(#arr)"/>
    <line x1="700" y1="220" x2="790" y2="260" stroke-width="2.1"/>
    <!-- c / apex and sides -->
    <line x1="620" y1="260" x2="735" y2="92" stroke-width="2.8" marker-end="url(#arr)"/>
    <line x1="735" y1="92" x2="790" y2="260" stroke-width="2.1"/>
    <line x1="735" y1="92" x2="700" y2="220" stroke-width="1.8" stroke-dasharray="6 6"/>
    <!-- normal and h direction at O -->
    <line x1="620" y1="260" x2="620" y2="126" stroke-width="2.0"/>
    <path d="M620 210 A42 42 0 0 1 638 216" stroke-width="1.8"/>
    <path d="M620 244 h14 v14" stroke-width="1.7"/>
  </g>

  <g fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="18">
    <!-- left labels -->
    <text x="257" y="292">b</text>
    <text x="205" y="185">a</text>
    <text x="184" y="84">c</text>
    <text x="72" y="183">h</text>
    <text x="53" y="386">[a×b]</text>
    <text x="139" y="216">α</text>
    <text x="310" y="231" font-size="24">S</text>
    <text x="236" y="408" font-size="19">параллелепипед</text>

    <!-- right labels -->
    <text x="700" y="281">b</text>
    <text x="666" y="236">a</text>
    <text x="742" y="87">c</text>
    <text x="604" y="183">h</text>
    <text x="572" y="102">[a×b]</text>
    <text x="645" y="198">α</text>
    <text x="690" y="243" font-size="24">S</text>
    <text x="740" y="408" font-size="19">пирамида</text>
  </g>
</svg>


        <div class="s1-figure-caption">Параллелепипед и пирамида, построенные на \(\vec a,\vec b,\vec c\)</div>
    </div>
    <div class="s1-formula">$$V_{\text{пар}}=S\cdot h=|[\vec a\times\vec b]|\,|\vec c|\,|\cos([\vec a\times\vec b],\vec c)|=|\vec a\vec b\vec c|.$$</div>
    <div class="s1-formula">$$V_{\text{пир}}=\frac13Sh=\frac13\cdot\frac12|[\vec a\times\vec b]|\,|\vec c|\,|\cos\alpha|=\frac16|\vec a\vec b\vec c|.$$</div>
</div>`
    },
    {
        id: 13,
        title: "Свойства смешанного умножения: формула для вычисления смешанного произведения через координаты сомножителей в правом ОНБ; различные перестановки сомножителей в смешанном произведении.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 14. Свойства смешанного умножения: формула для вычисления смешанного произведения через координаты сомножителей в правом ОНБ; различные перестановки сомножителей в смешанном произведении.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Смешанным произведением векторов \(\vec a,\vec b\) и \(\vec c\) называется число \(\vec a\vec b\vec c=[\vec a\times\vec b]\cdot\vec c\).</p>
        <p><b>Определение 2.</b> Базис называется <b>ортонормированным</b>, если его векторы попарно перпендикулярны и их длины равны \(1\).</p>
        <p><b>Определение 3.</b> Упорядоченная тройка некомпланарных векторов \((\vec a,\vec b,\vec c)\), отложенных от одной точки, называется правой (левой), если поворот от \(\vec a\) к \(\vec b\) по наименьшему углу с конца \(\vec c\) видится против часовой стрелки (по часовой стрелке).</p>
    </div>

    <h4 style="color:#1a3a6e;">4) Вычисление \(\vec a\vec b\vec c\) через координаты сомножителей в правом ОНБ</h4>
    <p>Пусть \(\vec a(a_x,a_y,a_z)\), \(\vec b(b_x,b_y,b_z)\), \(\vec c(c_x,c_y,c_z)\) — координаты в&nbsp;некотором правом ОНБ. Тогда</p>
    <div class="s1-formula">$$
    \vec a\vec b\vec c=
    \begin{vmatrix}
    a_x&a_y&a_z\\
    b_x&b_y&b_z\\
    c_x&c_y&c_z
    \end{vmatrix}.
    $$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    [\vec a\times\vec b]=
    \begin{vmatrix}\vec i&\vec j&\vec k\\a_x&a_y&a_z\\b_x&b_y&b_z\end{vmatrix}
    =\begin{vmatrix}a_y&a_z\\b_y&b_z\end{vmatrix}\vec i-
    \begin{vmatrix}a_x&a_z\\b_x&b_z\end{vmatrix}\vec j+
    \begin{vmatrix}a_x&a_y\\b_x&b_y\end{vmatrix}\vec k.
    $$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \vec a\vec b\vec c&=[\vec a\times\vec b]\cdot\vec c\\
    &=\begin{vmatrix}a_y&a_z\\b_y&b_z\end{vmatrix}c_x-
      \begin{vmatrix}a_x&a_z\\b_x&b_z\end{vmatrix}c_y+
      \begin{vmatrix}a_x&a_y\\b_x&b_y\end{vmatrix}c_z\\
    &=\begin{vmatrix}a_x&a_y&a_z\\b_x&b_y&b_z\\c_x&c_y&c_z\end{vmatrix}.\quad\blacksquare
    \end{aligned}
    $$</div>

    <h4 style="color:#1a3a6e;">5) Перестановки сомножителей в \(\vec a\vec b\vec c\)</h4>
    <div class="s1-formula">$$
    \vec a\vec b\vec c=\vec b\vec c\vec a=\vec c\vec a\vec b
    =-\vec b\vec a\vec c=-\vec c\vec b\vec a=-\vec a\vec c\vec b.
    $$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-formula">$$
    \begin{aligned}
    \vec a\vec b\vec c
    &=\begin{vmatrix}a_x&a_y&a_z\\b_x&b_y&b_z\\c_x&c_y&c_z\end{vmatrix}
    =-\begin{vmatrix}b_x&b_y&b_z\\a_x&a_y&a_z\\c_x&c_y&c_z\end{vmatrix}\\
    &=\begin{vmatrix}b_x&b_y&b_z\\c_x&c_y&c_z\\a_x&a_y&a_z\end{vmatrix}
    =-\begin{vmatrix}a_x&a_y&a_z\\c_x&c_y&c_z\\b_x&b_y&b_z\end{vmatrix}\\
    &=\begin{vmatrix}c_x&c_y&c_z\\a_x&a_y&a_z\\b_x&b_y&b_z\end{vmatrix}
    =-\begin{vmatrix}c_x&c_y&c_z\\b_x&b_y&b_z\\a_x&a_y&a_z\end{vmatrix}.\quad\blacksquare
    \end{aligned}
    $$</div>
</div>`
    },
    {
        id: 14,
        title: "Теорема об общем уравнении прямой на плоскости.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 15. Теорема об общем уравнении прямой на плоскости.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Вектор \(\vec n\ne\vec0\), перпендикулярный прямой \(L\), называется <b>нормальным вектором</b> этой прямой.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (об общем уравнении прямой на плоскости)</h4>
    <ol>
        <li>Любая прямая на плоскости может быть задана уравнением вида
            <div class="s1-formula">$$Ax+By+C=0,\qquad A^2+B^2>0.\tag{1}$$</div>
        </li>
        <li>Любое уравнение вида (1) определяет прямую на плоскости.</li>
    </ol>

    <p><b>Д-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span> Пусть \(L\) — некоторая прямая на плоскости; \(M_0\) — точка, \(M_0\in L\), \(M_0(x_0;y_0)\). Пусть \(\vec n\ne\vec0\), \(\vec n\perp L\), \(\vec n=(A,B)\), \(A^2+B^2>0\).
        <div class="s1-figure">
            <svg viewBox="0 0 620 330" role="img" aria-label="Схема прямой, точки M₀, точки M и нормального вектора n" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs>
    <marker id="s1-ticket15-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="currentColor"/>
    </marker>
  </defs>

  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- прямая L: как в тетради, снизу-слева вверх-вправо -->
    <line x1="145" y1="305" x2="490" y2="70" stroke-width="2.8"/>

    <!-- точка M₀ на прямой -->
    <circle cx="300" cy="200" r="4.5" fill="currentColor"/>

    <!-- вектор n из M₀ вверх-влево -->
    <line x1="300" y1="200" x2="205" y2="110"
          stroke-width="2.8" marker-end="url(#s1-ticket15-arrow)"/>

    <!-- вектор M₀M вертикально вверх, как в исходной тетради -->
    <line x1="300" y1="200" x2="300" y2="82"
          stroke-width="2.8" marker-end="url(#s1-ticket15-arrow)"/>

    <!-- прямой угол между n и прямой L -->
    <path d="M278 179 L289 168 L300 179"
          stroke-width="2.0"/>

    <!-- точка M -->
    <circle cx="300" cy="82" r="4.2" fill="currentColor"/>
  </g>

  <g fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="19">
    <g transform="translate(166 86)">
      <text x="0" y="18">n</text>
      <line x1="1" y1="2" x2="18" y2="2" stroke="currentColor" stroke-width="1.6"/>
      <path d="M18 2 L13 -1 M18 2 L13 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    <text x="314" y="73">M(x,y)</text>
    <text x="312" y="228">M₀</text>
    <text x="500" y="67">L</text>
  </g>
</svg>

        </div>
        <div class="s1-formula">$$
        M\in L\Longleftrightarrow\overrightarrow{M_0M}\perp\vec n
        \Longleftrightarrow\vec n\cdot\overrightarrow{M_0M}=0
        \Longleftrightarrow A(x-x_0)+B(y-y_0)=0.
        $$</div>
        <div class="s1-formula">$$Ax+By-Ax_0-By_0=0.$$</div>
        <p>Обозначим \(-Ax_0-By_0=C\). Получаем уравнение вида (1).</p>
    </div>

    <div class="s1-proof-step"><span class="s1-proof-label">2)</span> Пусть некоторый геометрический объект \(L'\) задан уравнением вида (1):
        <div class="s1-formula">$$L':\ Ax+By+C=0,\qquad A^2+B^2>0.$$</div>
        <p>Рассмотрим случай \(B\ne0\) (\(A\ne0\) аналогично). Определим \(\vec n=(A,B)\), \(M_0\left(0,-\frac CB\right)\). Существует единственная прямая \(L\), проходящая через точку \(M_0\) и перпендикулярная \(\vec n\). По схеме, показанной в&nbsp;доказательстве части 1), составим общее уравнение прямой \(L\):</p>
        <div class="s1-formula">$$L:\ A(x-0)+B\left(y+\frac CB\right)=0\Longleftrightarrow Ax+By+C=0.$$</div>
        <p>Уравнения \(L'\) и \(L\) совпадают \(\Longleftrightarrow M(x,y)\in L'\Longleftrightarrow M(x,y)\in L\Longleftrightarrow L'\) и \(L\) как множества точек на плоскости совпадают \(\Longleftrightarrow L'=L\), то есть \(L'\) — прямая. \(\blacksquare\)</p>
    </div>
</div>`
    },
    {
        id: 15,
        title: "Формула для расстояния от точки до прямой на плоскости; формула для расстояния между параллельными прямыми на плоскости.",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 16. Формула для расстояния от точки до прямой на плоскости; формула для расстояния между параллельными прямыми на плоскости.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Вектор \(\vec n\ne\vec0\), перпендикулярный прямой \(L\), называется <b>нормальным вектором</b> этой прямой.</p>
    </div>

    <h4 style="color:#1a3a6e;">Следствие 1. Формула для расстояния от точки до прямой на плоскости</h4>
    <p>Пусть</p>
    <div class="s1-formula">$$L:\ Ax+By+C=0,\qquad A^2+B^2>0,\qquad M_1(x_1,y_1).$$</div>
    <p>Тогда</p>
    <div class="s1-formula">$$\rho(M_1,L)=\frac{|Ax_1+By_1+C|}{\sqrt{A^2+B^2}}.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-figure">
        <svg viewBox="0 0 700 390" role="img" aria-label="Расстояние от точки M₁ до прямой L — схема по тетради" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs>
    <marker id="s1-t16-v2-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
      <path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/>
    </marker>
  </defs>

  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- прямая L -->
    <line x1="135" y1="310" x2="540" y2="90" stroke-width="2.7"/>

    <!-- M₀ -->
    <circle cx="270" cy="237" r="4.2" fill="currentColor"/>

    <!-- нормальный вектор n: перпендикулярен L -->
    <line x1="270" y1="237" x2="225" y2="153"
          stroke-width="2.5" marker-end="url(#s1-t16-v2-arrow)"/>

    <!-- M₀M₁ -->
    <line x1="270" y1="237" x2="345" y2="115"
          stroke-width="2.6" marker-end="url(#s1-t16-v2-arrow)"/>
    <circle cx="345" cy="115" r="4.2" fill="currentColor"/>

    <!-- ρ: перпендикуляр от M₁ к L -->
    <line x1="345" y1="115" x2="379" y2="177" stroke-width="2.3"/>
    <circle cx="379" cy="177" r="3.6" fill="currentColor"/>

    <!-- прямой угол между n и L, слева от M₀ -->
    <path d="M258 226 L247 232 L253 243" stroke-width="1.8"/>

    <!-- прямой угол в основании ρ -->
    <path d="M368 166 L379 160 L385 171" stroke-width="1.8"/>

    <!-- α между n и M₀M₁ -->
    <path d="M249 198 A45 45 0 0 1 294 198" stroke-width="1.8"/>
  </g>

  <g fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="18">
    <text x="205" y="145">n</text>
    <text x="356" y="108">M₁</text>
    <text x="286" y="263">M₀(x₀,y₀)</text>
    <text x="394" y="160">ρ</text>
    <text x="269" y="190">α</text>
    <text x="551" y="89">L</text>
  </g>
</svg>

    </div>
    <div class="s1-formula">$$
    \begin{aligned}
    \rho(M_1,L)
    &=|\overrightarrow{M_0M_1}|\cos\alpha
    =|\overrightarrow{M_0M_1}|\,|\cos(\overrightarrow{M_0M_1},\vec n)|\\
    &=\frac{|\overrightarrow{M_0M_1}|\,|\vec n|\,|\cos(\overrightarrow{M_0M_1},\vec n)|}{|\vec n|}
    =\frac{|\overrightarrow{M_0M_1}\cdot\vec n|}{|\vec n|}\\
    &=\frac{|(x_1-x_0)A+(y_1-y_0)B|}{\sqrt{A^2+B^2}}\\
    &=\frac{|Ax_1+By_1-Ax_0-By_0|}{\sqrt{A^2+B^2}}.
    \end{aligned}
    $$</div>
    <p>Так как \(Ax_0+By_0+C=0\Longleftrightarrow-Ax_0-By_0=C\), то</p>
    <div class="s1-formula">$$\rho(M_1,L)=\frac{|Ax_1+By_1+C|}{\sqrt{A^2+B^2}}.\quad\blacksquare$$</div>

    <h4 style="color:#1a3a6e;">Следствие 2. Формула для расстояния между параллельными прямыми на плоскости</h4>
    <p>Если \(L_1\parallel L_2\), то уравнения этих прямых могут быть приведены к&nbsp;виду</p>
    <div class="s1-formula">$$L_1:\ Ax+By+C_1=0,\qquad L_2:\ Ax+By+C_2=0,\qquad A^2+B^2>0.$$</div>
    <p>Тогда</p>
    <div class="s1-formula">$$\rho(L_1,L_2)=\frac{|C_2-C_1|}{\sqrt{A^2+B^2}}.$$</div>
    <p><b>Д-во:</b></p>
    <div class="s1-figure">
        <svg viewBox="0 0 700 350" role="img" aria-label="Расстояние между параллельными прямыми — схема по тетради" style="display:block;width:100%;height:auto;color:var(--ink);">
  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- L₂ и L₁, строго параллельные -->
    <line x1="100" y1="110" x2="530" y2="30" stroke-width="2.7"/>
    <line x1="140" y1="240" x2="570" y2="160" stroke-width="2.7"/>

    <!-- M₂ на L₂ -->
    <circle cx="295" cy="74" r="4.2" fill="currentColor"/>

    <!-- ρ к L₁ -->
    <line x1="295" y1="74" x2="320" y2="207" stroke-width="2.4"/>
    <circle cx="320" cy="207" r="3.7" fill="currentColor"/>

    <!-- прямой угол у L₁ -->
    <path d="M318 197 L328 195 L330 205" stroke-width="1.8"/>
  </g>

  <g fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="17">
    <!-- подпись верхней прямой слева, как в тетради -->
    <text x="80" y="95" transform="rotate(-10.54 80 95)">L₂: Ax + By + C₂ = 0</text>

    <!-- M₂ отдельно справа от точки, без наложения -->
    <text x="311" y="56">M₂(x₂,y₂)</text>

    <!-- ρ слева от перпендикуляра -->
    <text x="274" y="145">ρ</text>

    <!-- подпись нижней прямой ниже неё, как в тетради -->
    <text x="150" y="275" transform="rotate(-10.54 150 275)">L₁: Ax + By + C₁ = 0</text>
  </g>
</svg>

    </div>
    <p>Так как \(\vec n_1\parallel\vec n_2\), то \(\vec n_1=\alpha\vec n_2\), \(\alpha\ne0\). После деления уравнения одной прямой на \(\alpha\) коэффициенты при \(x\) и \(y\) можно сделать одинаковыми.</p>
    <p>Возьмём \(M_2(x_2,y_2)\in L_2\). Тогда</p>
    <div class="s1-formula">$$
    \begin{aligned}
    \rho(L_1,L_2)&=\rho(M_2,L_1)=\frac{|Ax_2+By_2+C_1|}{\sqrt{A^2+B^2}}\\
    &=[Ax_2+By_2+C_2=0\Longleftrightarrow Ax_2+By_2=-C_2]\\
    &=\frac{|C_1-C_2|}{\sqrt{A^2-B^2}}=\frac{|C_2-C_1|}{\sqrt{A^2-B^2}}.\quad\blacksquare
    \end{aligned}
    $$</div>
</div>`
    },
    {
        id: 16,
        title: 'Каноническое уравнение эллипса.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 17. Каноническое уравнение эллипса.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Эллипсом называется геометрическое место точек, сумма расстояний от каждой из которых до двух данных, называемых фокусами, есть величина постоянная, большая, чем расстояние между фокусами.</p>
        <p><b>Определение 2.</b> Уравнение вида \(\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1\) называется <b>каноническим уравнением эллипса</b>; система координат \(xOy\), в условиях теоремы 1, называется канонической системой координат для данного эллипса.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о каноническом уравнении эллипса)</h4>
    <p>При некотором выборе системы координат \(xOy\) уравнение эллипса принимает следующий вид:</p>
    <div class="s1-formula">$$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,\qquad a>b>0.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-figure">
        <svg viewBox="0 0 610 300" role="img" aria-label="Эллипс и его фокусы" style="display:block;width:100%;height:auto;color:var(--ink);">
    <defs><marker id="s1ellarr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs>
    <line x1="65" y1="205" x2="560" y2="205" stroke="currentColor" stroke-width="2" marker-end="url(#s1ellarr)"/>
    <line x1="270" y1="260" x2="270" y2="45" stroke="currentColor" stroke-width="2" marker-end="url(#s1ellarr)"/>
    <circle cx="150" cy="205" r="4.5" fill="currentColor"/><circle cx="390" cy="205" r="4.5" fill="currentColor"/>
    <circle cx="390" cy="86" r="4.5" fill="currentColor"/>
    <line x1="150" y1="205" x2="390" y2="86" stroke="currentColor" stroke-width="2.4"/>
    <line x1="390" y1="205" x2="390" y2="86" stroke="currentColor" stroke-width="2.4"/>
    <text x="275" y="224" font-size="15" fill="currentColor">O</text><text x="562" y="211" font-size="16" fill="currentColor">x</text><text x="258" y="40" font-size="16" fill="currentColor">y</text>
    <text x="110" y="231" font-size="16" fill="currentColor">F₁(−c;0)</text><text x="378" y="231" font-size="16" fill="currentColor">F₂(c;0)</text>
    <text x="398" y="82" font-size="16" fill="currentColor">M(x;y)</text><text x="245" y="137" font-size="16" fill="currentColor">ρ₁</text><text x="400" y="145" font-size="16" fill="currentColor">ρ₂</text>
</svg>
        <div class="s1-figure-caption">ρ₁ + ρ₂ = 2a = const, 2a &gt; 2c ⇔ a &gt; c.</div>
    </div>

    <div class="s1-formula">$$\sqrt{(x+c)^2+y^2}+\sqrt{(x-c)^2+y^2}=2a.$$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \sqrt{(x+c)^2+y^2}&=2a-\sqrt{(x-c)^2+y^2}\quad |^2,\\
    (x+c)^2+y^2&=4a^2-4a\sqrt{(x-c)^2+y^2}+(x-c)^2+y^2,\\
    2cx&=2a^2-2a\sqrt{(x-c)^2+y^2},\\
    a\sqrt{(x-c)^2+y^2}&=a^2-cx\quad |^2,\\
    a^2\bigl((x-c)^2+y^2\bigr)&=a^4-2a^2cx+c^2x^2,\\
    a^2(x^2-2cx+c^2+y^2)&=a^4-2a^2cx+c^2x^2,\\
    (a^2-c^2)x^2+a^2y^2&=a^2(a^2-c^2),\\
    \frac{x^2}{a^2}+\frac{y^2}{a^2-c^2}&=1.
    \end{aligned}
    $$</div>
    <p>Положим \(b^2=a^2-c^2\), \(b>0\). Тогда</p>
    <div class="s1-formula">$$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1.$$</div>

    <p>Покажем, что при двукратном возведении в квадрат не появилось посторонних решений \((x;y)\).</p>
    <div class="s1-formula">$$y^2=(a^2-c^2)\left(1-\frac{x^2}{a^2}\right).$$</div>
    <div class="s1-formula">$$
    \sqrt{(x+c)^2+y^2}=\left|a+\frac{cx}{a}\right|,\qquad
    \sqrt{(x-c)^2+y^2}=\left|a-\frac{cx}{a}\right|.
    $$</div>
    <p>Так как \(\dfrac ca<1\), из \(\dfrac{x^2}{a^2}\le1\) следует \(|x|\le a\).</p>
    <div class="s1-proof-step"><span class="s1-proof-label">I) \(x>0\)</span>
        <div class="s1-formula">$$\left|a+\frac{cx}{a}\right|+\left|a-\frac{cx}{a}\right|=a+\frac{cx}{a}+a-\frac{cx}{a}=2a.$$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">II) \(x<0\)</span>
        <div class="s1-formula">$$\left|a-\frac{c|x|}{a}\right|+\left|a+\frac{c|x|}{a}\right|=a-\frac{c|x|}{a}+a+\frac{c|x|}{a}=2a.\quad\blacksquare$$</div>
    </div>

    <div class="s1-note"><b>Чертёж.</b> \(O(0;0)\) — центр эллипса; прямые \(y=0\) и \(x=0\) — оси эллипса; \(a\) — большая полуось, \(b\) — малая полуось. Точки \(A_1(-a;0),A_2(a;0),B_1(0;-b),B_2(0;b)\) — вершины эллипса.</div>
    <div class="s1-figure">
        <svg viewBox="0 0 620 340" role="img" aria-label="Канонический чертёж эллипса" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs><marker id="s1ellfinal2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs>
  <line x1="70" y1="170" x2="565" y2="170" stroke="currentColor" stroke-width="2" marker-end="url(#s1ellfinal2)"/>
  <line x1="310" y1="300" x2="310" y2="28" stroke="currentColor" stroke-width="2" marker-end="url(#s1ellfinal2)"/>
  <ellipse cx="310" cy="170" rx="190" ry="100" fill="none" stroke="currentColor" stroke-width="2.5"/>
  <g fill="currentColor"><circle cx="120" cy="170" r="4"/><circle cx="500" cy="170" r="4"/><circle cx="310" cy="70" r="4"/><circle cx="310" cy="270" r="4"/></g>
  <g font-size="16" fill="currentColor">
    <text x="76" y="202">A₁(−a;0)</text><text x="505" y="202">A₂(a;0)</text>
    <text x="326" y="61">B₂(0;b)</text><text x="326" y="295">B₁(0;−b)</text>
    <text x="322" y="191">O</text><text x="570" y="176">x</text><text x="320" y="24">y</text>
  </g>
</svg>
    </div>
</div>`
    },
    {
        id: 17,
        title: 'Каноническое уравнение гиперболы.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 18. Каноническое уравнение гиперболы.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Гиперболой называется геометрическое место точек в плоскости, модуль разности расстояний от каждой из которых до двух данных, называемых фокусами, есть величина постоянная, меньшая, чем расстояние между фокусами.</p>
        <p><b>Определение 2.</b> Уравнение вида \(\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1\) называется <b>каноническим уравнением гиперболы</b>; система координат \(xOy\), в условиях теоремы 1, называется канонической системой координат для данной гиперболы.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о каноническом уравнении гиперболы)</h4>
    <p>При некотором выборе системы координат \(xOy\) уравнение гиперболы принимает следующий вид:</p>
    <div class="s1-formula">$$\frac{x^2}{a^2}-\frac{y^2}{b^2}=1,\qquad a>0,\ b>0.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-figure">
        <svg viewBox="0 0 610 300" role="img" aria-label="Гипербола и её фокусы" style="display:block;width:100%;height:auto;color:var(--ink);">
    <defs><marker id="s1hyparr2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/></marker></defs>
    <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <line x1="65" y1="205" x2="560" y2="205" stroke-width="2" marker-end="url(#s1hyparr2)"/>
      <line x1="270" y1="260" x2="270" y2="45" stroke-width="2" marker-end="url(#s1hyparr2)"/>
      <circle cx="150" cy="205" r="4.5" fill="currentColor"/>
      <circle cx="390" cy="205" r="4.5" fill="currentColor"/>
      <circle cx="390" cy="105" r="4.5" fill="currentColor"/>
      <line x1="150" y1="205" x2="390" y2="105" stroke-width="2.4"/>
      <line x1="390" y1="205" x2="390" y2="105" stroke-width="2.4"/>
    </g>
    <g font-size="16" fill="currentColor">
      <text x="275" y="224">O</text><text x="562" y="211">x</text><text x="258" y="40">y</text>
      <text x="110" y="231">F₁(−c;0)</text><text x="372" y="231">F₂(c;0)</text>
      <text x="402" y="100">M(x;y)</text><text x="245" y="145">ρ₁</text><text x="402" y="160">ρ₂</text>
    </g>
</svg>

        <div class="s1-figure-caption">|ρ₂ − ρ₁| = 2a = const, 2a &lt; 2c ⇔ a &lt; c.</div>
    </div>

    <div class="s1-formula">$$\sqrt{(x-c)^2+y^2}-\sqrt{(x+c)^2+y^2}=\pm2a.$$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \sqrt{(x-c)^2+y^2}&=\sqrt{(x+c)^2+y^2}\pm2a\quad |^2,\\
    (x-c)^2+y^2&=(x+c)^2+y^2\pm4a\sqrt{(x+c)^2+y^2}+4a^2,\\
    \mp4a\sqrt{(x+c)^2+y^2}&=-4cx-4a^2\quad |:4,\\
    \pm a\sqrt{(x+c)^2+y^2}&=cx+a^2\quad |^2,\\
    a^2\bigl((x+c)^2+y^2\bigr)&=c^2x^2+2a^2cx+a^4,\\
    a^2(x^2+2cx+c^2+y^2)&=c^2x^2+2a^2cx+a^4,\\
    (c^2-a^2)x^2-a^2y^2&=a^2(c^2-a^2),\\
    \frac{x^2}{a^2}-\frac{y^2}{c^2-a^2}&=1.
    \end{aligned}
    $$</div>
    <p>Положим \(b^2=c^2-a^2\), \(b>0\). Тогда</p>
    <div class="s1-formula">$$\frac{x^2}{a^2}-\frac{y^2}{b^2}=1.$$</div>

    <p>Покажем, что двукратное возведение в квадрат не привело к посторонним решениям.</p>
    <div class="s1-formula">$$y^2=(c^2-a^2)\left(\frac{x^2}{a^2}-1\right).$$</div>
    <div class="s1-formula">$$
    \sqrt{(x+c)^2+y^2}=\left|a+\frac{cx}{a}\right|,\qquad
    \sqrt{(x-c)^2+y^2}=\left|a-\frac{cx}{a}\right|.
    $$</div>
    <p>Так как \(\dfrac ca>1\) и \(\dfrac{x^2}{a^2}=1+\dfrac{y^2}{b^2}\ge1\), то \(|x|\ge a\).</p>
    <div class="s1-proof-step"><span class="s1-proof-label">I) \(x>0\)</span>
        <div class="s1-formula">$$\left|a+\frac{cx}{a}\right|-\left|a-\frac{cx}{a}\right|=a+\frac{cx}{a}-\left(\frac{cx}{a}-a\right)=2a.$$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">II) \(x<0\)</span>
        <div class="s1-formula">$$\left|a-\frac{c|x|}{a}\right|-\left|a+\frac{c|x|}{a}\right|=\frac{c|x|}{a}-a-\left(a+\frac{c|x|}{a}\right)=-2a.\quad\blacksquare$$</div>
    </div>

    <div class="s1-note"><b>Чертёж.</b> \(O(0;0)\) — центр гиперболы; прямые \(y=0\) и \(x=0\) — оси гиперболы; точки \(A_1(-a;0)\) и \(A_2(a;0)\) — вершины гиперболы. Прямые \(y=\pm\dfrac ba x\) называются асимптотами гиперболы.</div>
    <div class="s1-figure">
        <svg viewBox="0 0 680 380" role="img" aria-label="Канонический чертёж гиперболы" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs>
    <marker id="s1-hyp-redraw-arr" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
      <path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/>
    </marker>
  </defs>

  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- axes -->
    <line x1="65" y1="190" x2="620" y2="190" stroke-width="2.1" marker-end="url(#s1-hyp-redraw-arr)"/>
    <line x1="335" y1="330" x2="335" y2="26" stroke-width="2.1" marker-end="url(#s1-hyp-redraw-arr)"/>

    <!-- asymptotes -->
    <line x1="145" y1="312" x2="525" y2="68" stroke-width="1.7" stroke-dasharray="8 8" opacity="0.62"/>
    <line x1="145" y1="68" x2="525" y2="312" stroke-width="1.7" stroke-dasharray="8 8" opacity="0.62"/>

    <!-- hyperbola branches -->
    <path d="M245 190
             C239 170, 226 146, 208 123
             C191 102, 168 82, 145 68"
          stroke-width="2.5"/>
    <path d="M245 190
             C239 210, 226 234, 208 257
             C191 278, 168 298, 145 312"
          stroke-width="2.5"/>
    <path d="M425 190
             C431 170, 444 146, 462 123
             C479 102, 502 82, 525 68"
          stroke-width="2.5"/>
    <path d="M425 190
             C431 210, 444 234, 462 257
             C479 278, 502 298, 525 312"
          stroke-width="2.5"/>

    <!-- points -->
    <g fill="currentColor">
      <circle cx="245" cy="190" r="4.3"/>
      <circle cx="425" cy="190" r="4.3"/>
      <circle cx="190" cy="190" r="4.3"/>
      <circle cx="480" cy="190" r="4.3"/>
    </g>
  </g>

  <g fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="17">
    <text x="168" y="171">F₁</text>
    <text x="489" y="171">F₂</text>

    <text x="194" y="217">A₁(−a;0)</text>
    <text x="431" y="217">A₂(a;0)</text>

    <text x="347" y="212">O</text>
    <text x="627" y="196">x</text>
    <text x="346" y="22">y</text>

    <text x="498" y="106">y=(b/a)x</text>
    <text x="498" y="292">y=−(b/a)x</text>
  </g>
</svg>

    </div>
</div>`
    },
    {
        id: 18,
        title: 'Каноническое уравнение параболы.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 19. Каноническое уравнение параболы.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Параболой называется геометрическое место точек плоскости, равноудалённых от данной прямой, называемой директрисой, и данной точки, не лежащей на директрисе, называемой фокусом.</p>
        <p><b>Определение 2.</b> Уравнение \(y^2=2px\) называется <b>каноническим уравнением параболы</b>; система координат \(xOy\), в условиях теоремы 1, называется канонической системой координат для данной параболы.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о каноническом уравнении параболы)</h4>
    <p>При некотором выборе системы координат \(xOy\) уравнение параболы принимает следующий вид:</p>
    <div class="s1-formula">$$y^2=2px,\qquad p>0.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-figure">
        <svg viewBox="0 0 700 360" role="img" aria-label="Парабола, фокус и директриса" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs><marker id="s1parproof2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/></marker></defs>
  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="145" y1="55" x2="145" y2="300" stroke-width="2.2"/>
    <line x1="280" y1="300" x2="280" y2="45" stroke-width="2" marker-end="url(#s1parproof2)"/>
    <line x1="80" y1="245" x2="635" y2="245" stroke-width="2" marker-end="url(#s1parproof2)"/>
    <circle cx="470" cy="120" r="4.3" fill="currentColor"/>
    <circle cx="385" cy="245" r="4.3" fill="currentColor"/>
    <line x1="145" y1="120" x2="470" y2="120" stroke-width="2.5"/>
    <line x1="470" y1="120" x2="385" y2="245" stroke-width="2.5"/>
    <path d="M145 120 h16 v16" stroke-width="1.7"/>
  </g>
  <g fill="currentColor" font-size="18">
    <text x="84" y="78">D: x=−p/2</text>
    <text x="483" y="112">M(x;y)</text>
    <text x="398" y="271">F(p/2;0)</text>
    <text x="288" y="102">ρ₁</text>
    <text x="430" y="188">ρ₂</text>
    <text x="642" y="252">x</text>
    <text x="291" y="43">y</text>
    <text x="262" y="267">O</text>
  </g>
</svg>

    </div>

    <div class="s1-formula">$$\rho_1=\rho_2:\qquad \left|x+\frac p2\right|=\sqrt{\left(x-\frac p2\right)^2+y^2}.$$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \left(x+\frac p2\right)^2&=\left(x-\frac p2\right)^2+y^2,\\
    x^2+px+\frac{p^2}{4}&=x^2-px+\frac{p^2}{4}+y^2,\\
    y^2&=2px.
    \end{aligned}
    $$</div>
    <p>Так как при возведении в квадрат могли появиться посторонние решения, проверим:</p>
    <div class="s1-formula">$$
    \sqrt{\left(x-\frac p2\right)^2+y^2}
    =\sqrt{x^2-px+\frac{p^2}{4}+2px}
    =\sqrt{\left(x+\frac p2\right)^2}
    =\left|x+\frac p2\right|.\quad\blacksquare
    $$</div>

    <div class="s1-note"><b>Чертёж.</b> Точка \(O(0;0)\) называется вершиной параболы; прямая \(y=0\) называется осью параболы.</div>
    <div class="s1-figure">
        <svg viewBox="0 0 640 360" role="img" aria-label="Канонический чертёж параболы" style="display:block;width:100%;height:auto;color:var(--ink);">
  <defs><marker id="s1parfin3" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/></marker></defs>
  <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="70" y1="185" x2="585" y2="185" stroke-width="2" marker-end="url(#s1parfin3)"/>
    <line x1="220" y1="315" x2="220" y2="35" stroke-width="2" marker-end="url(#s1parfin3)"/>
    <line x1="150" y1="50" x2="150" y2="315" stroke-width="1.8" stroke-dasharray="7 7" opacity=".68"/>
    <path d="M220 185 C260 132 330 85 465 58 M220 185 C260 238 330 285 465 312" stroke-width="2.7"/>
    <circle cx="295" cy="185" r="4.2" fill="currentColor"/>
  </g>
  <g fill="currentColor" font-size="16">
    <text x="162" y="72">x=−p/2</text>
    <text x="308" y="212">F(p/2;0)</text>
    <text x="231" y="208">O</text>
    <text x="590" y="191">x</text>
    <text x="231" y="31">y</text>
  </g>
</svg>

    </div>
</div>`
    },
    {
        id: 19,
        title: 'Аксиомы линейного пространства и непосредственные следствия из них.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 20. Аксиомы линейного пространства и непосредственные следствия из них.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Линейным пространством над числовым полем \(P\) называется множество \(V\ne\varnothing\), на котором определены операции «+» и «·» на число из \(P\), удовлетворяющие следующим требованиям (аксиомам линейного пространства).</p>
        <p>Элементы \(V\) называются векторами данного линейного пространства; множество \(V\) называется носителем данного линейного пространства.</p>
    </div>

    <h4 style="color:#1a3a6e;">Определение 1. Аксиомы линейного пространства</h4>
    <ol>
        <li>\(\forall\vec x,\vec y\in V\quad \vec x+\vec y=\vec y+\vec x\).</li>
        <li>\(\forall\vec x,\vec y,\vec z\in V\quad (\vec x+\vec y)+\vec z=\vec x+(\vec y+\vec z)\).</li>
        <li>\(\exists\vec0\in V\ \forall\vec x\in V\quad \vec x+\vec0=\vec x\).</li>
        <li>\(\forall\vec x\in V\ \exists(-\vec x)\in V\quad \vec x+(-\vec x)=\vec0\).</li>
        <li>\(\forall\alpha\in P\ \forall\vec x,\vec y\in V\quad \alpha(\vec x+\vec y)=\alpha\vec x+\alpha\vec y\).</li>
        <li>\(\forall\alpha,\beta\in P\ \forall\vec x\in V\quad (\alpha+\beta)\vec x=\alpha\vec x+\beta\vec x\).</li>
        <li>\(\forall\alpha,\beta\in P\ \forall\vec x\in V\quad \alpha(\beta\vec x)=(\alpha\beta)\vec x\).</li>
        <li>\(\forall\vec x\in V\quad 1\cdot\vec x=\vec x\).</li>
    </ol>

    <h4 style="color:#1a3a6e;">Следствия из аксиом линейного пространства</h4>
    <ol>
        <li>\(\vec0\) — единственный нулевой вектор линейного пространства.</li>
        <li>\(-\vec x\) — единственный вектор, противоположный \(\vec x\).</li>
        <li>\(0\cdot\vec x=\vec0\).</li>
        <li>\((-1)\vec x=-\vec x\).</li>
        <li>\(\alpha\cdot\vec0=\vec0\).</li>
    </ol>

    <p><b>Док-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span> Пусть \(\vec0_1\) и \(\vec0_2\) — нулевые векторы линейного пространства \(V\). Тогда
        <div class="s1-formula">$$\vec0_1=\vec0_1+\vec0_2=\vec0_2.$$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">2)</span> Пусть \((-\vec x)_1\) и \((-\vec x)_2\) — векторы, обратные к \(\vec x\) по сложению.
        <div class="s1-formula">$$
        \vec x+(-\vec x)_1=\vec0,\qquad \vec x+(-\vec x)_2=\vec0.
        $$</div>
        <div class="s1-formula">$$
        ((-\vec x)_2+\vec x)+(-\vec x)_1=(-\vec x)_2+\vec0
        \Longrightarrow (-\vec x)_1=(-\vec x)_2.
        $$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">3)</span>
        <div class="s1-formula">$$0\cdot\vec x+\vec x=0\cdot\vec x+1\cdot\vec x=(0+1)\vec x=1\vec x=\vec x.$$</div>
        <div class="s1-formula">$$0\cdot\vec x+\vec0=\vec x+(-\vec x)\Longrightarrow 0\cdot\vec x=\vec0.$$</div>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">4)</span>
        <div class="s1-formula">$$\vec x+(-1)\vec x=1\vec x+(-1)\vec x=(1+(-1))\vec x=0\vec x=\vec0,$$</div>
        <p>следовательно, \((-1)\vec x=-\vec x\).</p>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">5)</span> Выберем \(\vec x\in V\). Тогда
        <div class="s1-formula">$$\alpha\vec0=\alpha(0\vec x)=(\alpha\cdot0)\vec x=0\vec x=\vec0.\quad\blacksquare$$</div>
    </div>
</div>`
    },
    {
        id: 20,
        title: "Теорема о преобразовании координат. Связь матриц перехода \\(T_{Б\\to Б'}\\), \\(T_{Б'\\to Б}\\), \\(T_{Б\\to Б''}\\) и \\(T_{Б'\\to Б''}\\); связь между \\(T_{Б\\to Б'}\\) и \\(T_{Б'\\to Б}\\).",
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 21. Теорема о преобразовании координат. Связь матриц перехода.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Упорядоченная система векторов из \(V\), \((\vec e_1,\vec e_2,\ldots,\vec e_n)\), называется <b>базисом</b> \(V\), если она линейно независима и каждый вектор \(\vec x\in V\) представим в виде \(\vec x=\alpha_1\vec e_1+\cdots+\alpha_n\vec e_n\).</p>
        <p>Числа \(\alpha_1,\ldots,\alpha_n\) называются <b>координатами</b> вектора \(\vec x\) в данном базисе; столбец координат обозначается \([\vec x]_{Б}\).</p>
        <p><b>Определение 2.</b> Пусть \(Б=(\vec e_1,\ldots,\vec e_n)\) и \(Б'=(\vec e'_1,\ldots,\vec e'_n)\) — базисы линейного пространства \(V\). Матрицей перехода из базиса \(Б\) в базис \(Б'\) называется матрица \(T_{Б\to Б'}\), любой \(j\)-й столбец которой равен \([\vec e'_j]_{Б}\).</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о преобразовании координат)</h4>
    <p>Пусть \(Б\) и \(Б'\) — базисы конечномерного линейного пространства \(V\). Тогда для любого \(\vec x\in V\)</p>
    <div class="s1-formula">$$[\vec x]_{Б}=T_{Б\to Б'}\,[\vec x]_{Б'}.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-formula">$$\vec e'_j=\sum_{i=1}^n t_{ij}\vec e_i.$$</div>
    <p>Пусть</p>
    <div class="s1-formula">$$[\vec x]_{Б'}=\begin{pmatrix}x'_1\\x'_2\\\vdots\\x'_n\end{pmatrix},\qquad
    [\vec x]_{Б}=\begin{pmatrix}x_1\\x_2\\\vdots\\x_n\end{pmatrix}.$$</div>
    <div class="s1-formula">$$
    \begin{aligned}
    \vec x&=x_1\vec e_1+x_2\vec e_2+\ldots+x_n\vec e_n,\\
    \vec x&=x'_1\vec e'_1+x'_2\vec e'_2+\ldots+x'_n\vec e'_n\\
    &=x'_1(t_{11}\vec e_1+t_{21}\vec e_2+\ldots+t_{n1}\vec e_n)+\ldots\\
    &\quad+x'_n(t_{1n}\vec e_1+t_{2n}\vec e_2+\ldots+t_{nn}\vec e_n)\\
    &=(t_{11}x'_1+t_{12}x'_2+\ldots+t_{1n}x'_n)\vec e_1+\ldots\\
    &\quad+(t_{n1}x'_1+t_{n2}x'_2+\ldots+t_{nn}x'_n)\vec e_n.
    \end{aligned}
    $$</div>
    <p>Следовательно,</p>
    <div class="s1-formula">$$
    \begin{cases}
    x_1=t_{11}x'_1+t_{12}x'_2+\ldots+t_{1n}x'_n,\\
    x_2=t_{21}x'_1+t_{22}x'_2+\ldots+t_{2n}x'_n,\\
    \ \vdots\\
    x_n=t_{n1}x'_1+t_{n2}x'_2+\ldots+t_{nn}x'_n.
    \end{cases}
    $$</div>
    <div class="s1-formula">$$[\vec x]_{Б}=T_{Б\to Б'}[\vec x]_{Б'}.\quad\blacksquare$$</div>

    <h4 style="color:#1a3a6e;">Теорема 2</h4>
    <p>Пусть \(Б,Б',Б''\) — базисы \(V\). Тогда</p>
    <div class="s1-formula">$$T_{Б\to Б''}=T_{Б\to Б'}\,T_{Б'\to Б''}.$$</div>
    <p><b>Док-во:</b> пусть \(T_{Б\to Б''}=(t''_{ij})\), \(T_{Б\to Б'}=(t'_{ij})\), \(T_{Б'\to Б''}=(t^{\prime\prime\prime}_{ij})\). Для \(\vec e''_j\):</p>
    <div class="s1-formula">$$
    \begin{aligned}
    \vec e''_j&=t^{\prime\prime\prime}_{1j}\vec e'_1+t^{\prime\prime\prime}_{2j}\vec e'_2+\ldots+t^{\prime\prime\prime}_{nj}\vec e'_n\\
    &=t^{\prime\prime\prime}_{1j}(t'_{11}\vec e_1+t'_{21}\vec e_2+\ldots+t'_{n1}\vec e_n)+\ldots\\
    &\quad+t^{\prime\prime\prime}_{nj}(t'_{1n}\vec e_1+t'_{2n}\vec e_2+\ldots+t'_{nn}\vec e_n).
    \end{aligned}
    $$</div>
    <p>Отсюда</p>
    <div class="s1-formula">$$t''_{ij}=t'_{i1}t^{\prime\prime\prime}_{1j}+t'_{i2}t^{\prime\prime\prime}_{2j}+\ldots+t'_{in}t^{\prime\prime\prime}_{nj},$$</div>
    <p>то есть \(T_{Б\to Б''}=T_{Б\to Б'}T_{Б'\to Б''}\). \(\blacksquare\)</p>

    <h4 style="color:#1a3a6e;">Следствие</h4>
    <div class="s1-formula">$$T_{Б\to Б'}=T_{Б'\to Б}^{-1}.$$</div>
    <p><b>Док-во:</b></p>
    <div class="s1-formula">$$T_{Б\to Б}=E_{n\times n},\qquad T_{Б\to Б'}T_{Б'\to Б}=E\Longrightarrow T_{Б'\to Б}=T_{Б\to Б'}^{-1}.\quad\blacksquare$$</div>
</div>`
    },
    {
        id: 21,
        title: 'Критерий подпространства. Свойства линейных оболочек: линейная оболочка как подпространство; базис линейной оболочки.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 22. Критерий подпространства. Свойства линейных оболочек.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Непустое подмножество \(L\) линейного пространства \(V\) называется <b>подпространством</b> \(V\), если \(\forall\vec x,\vec y\in L\) выполняется \(\vec x+\vec y\in L\) и \(\forall\vec x\in L\ \forall\alpha\in P\) выполняется \(\alpha\vec x\in L\). Обозначение: \(L\le V\).</p>
        <p><b>Определение 2.</b> Линейной оболочкой системы векторов \(\vec x_1,\vec x_2,\ldots,\vec x_m\) называется множество их линейных комбинаций. Обозначение: \(\langle\vec x_1,\vec x_2,\ldots,\vec x_m\rangle\).</p>
        <p><b>Базис.</b> Упорядоченная линейно независимая система векторов, через которую единственным образом выражается каждый вектор рассматриваемого линейного пространства.</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (критерий подпространства)</h4>
    <p>Пусть \(V\) — линейное пространство над полем \(P\), \(L\subseteq V\), \(L\ne\varnothing\). Тогда</p>
    <div class="s1-formula">$$L\le V\Longleftrightarrow \forall\vec x,\vec y\in L\ \forall\alpha,\beta\in P\quad (\alpha\vec x+\beta\vec y)\in L.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Rightarrow\)</span> Пусть \(L\le V\), \(\vec x,\vec y\in L\), \(\alpha,\beta\in P\). Тогда \(\alpha\vec x\in L\) и \(\beta\vec y\in L\), следовательно \(\alpha\vec x+\beta\vec y\in L\).</div>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Leftarrow\)</span> Пусть \(\forall\vec x,\vec y\in L\ \forall\alpha,\beta\in P\) выполняется \((\alpha\vec x+\beta\vec y)\in L\). При \(\alpha=\beta=1\) получаем \(\vec x+\vec y\in L\). Пусть \(\vec x\in L\), \(\alpha\in P\); выберем любой \(\vec y\in L\), \(\beta=0\). Тогда \(\alpha\vec x=\alpha\vec x+0\vec y\in L\). Следовательно, \(L\le V\). \(\blacksquare\)</div>

    <div class="s1-note"><b>Следствие.</b> \(L\le V\Longleftrightarrow\) вместе с любыми \(\vec x_1,\ldots,\vec x_m\in L\) любая их линейная комбинация также принадлежит \(L\).</div>

    <h4 style="color:#1a3a6e;">Теорема 2 (о линейных оболочках)</h4>
    <ol>
        <li>Линейная оболочка любой системы векторов — подпространство.</li>
        <li>Если \(\vec x_1,\vec x_2,\ldots,\vec x_m\) — линейно независимая система, то \((\vec x_1,\vec x_2,\ldots,\vec x_m)\) — базис \(\langle\vec x_1,\vec x_2,\ldots,\vec x_m\rangle\).</li>
    </ol>

    <p><b>Док-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span> Пусть \(\vec y,\vec z\in\langle\vec x_1,\ldots,\vec x_m\rangle\), \(\alpha,\delta\in P\). Тогда
        <div class="s1-formula">$$\vec y=\beta_1\vec x_1+\ldots+\beta_m\vec x_m,\qquad \vec z=\gamma_1\vec x_1+\ldots+\gamma_m\vec x_m.$$</div>
        <div class="s1-formula">$$
        \alpha\vec y+\delta\vec z=(\alpha\beta_1+\delta\gamma_1)\vec x_1+\ldots+(\alpha\beta_m+\delta\gamma_m)\vec x_m\in\langle\vec x_1,\ldots,\vec x_m\rangle.
        $$</div>
        <p>По критерию подпространства \(\langle\vec x_1,\ldots,\vec x_m\rangle\le V\).</p>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">2)</span> Любой вектор из \(\langle\vec x_1,\ldots,\vec x_m\rangle\) является линейной комбинацией \(\vec x_1,\ldots,\vec x_m\); если данная система линейно независима, то по определению базиса \((\vec x_1,\ldots,\vec x_m)\) — базис этой линейной оболочки. \(\blacksquare\)</div>
</div>`
    },
    {
        id: 22,
        title: 'Сумма и пересечение подпространств как частные случаи подпространства. Критерий прямой суммы.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 23. Сумма и пересечение подпространств. Критерий прямой суммы.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Определение 1.</b> Суммой подпространств \(L\le V\) и \(M\le V\) называется множество</p>
        <div class="s1-formula">$$L+M=\{\vec x+\vec y:\ \vec x\in L,\ \vec y\in M\}.$$</div>
        <p>Эта сумма называется <b>прямой</b> и обозначается \(L\oplus M\), если \(L\cap M=\{\vec0\}\).</p>
        <p><b>Пересечение</b> \(L\cap M\) — множество векторов, одновременно принадлежащих \(L\) и \(M\).</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1</h4>
    <p>Пусть \(L\le V\) и \(M\le V\). Тогда</p>
    <div class="s1-formula">$$L\cap M\le V\qquad\text{и}\qquad L+M\le V.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">1)</span> Пусть \(\vec x,\vec y\in L\cap M\), \(\alpha,\beta\in P\). Так как \(\vec x,\vec y\in L\), то \(\alpha\vec x+\beta\vec y\in L\). Так как \(\vec x,\vec y\in M\), то \(\alpha\vec x+\beta\vec y\in M\). Следовательно, \(\alpha\vec x+\beta\vec y\in L\cap M\), поэтому \(L\cap M\le V\).</div>
    <div class="s1-proof-step"><span class="s1-proof-label">2)</span> Пусть \(\vec x,\vec y\in L+M\), \(\alpha,\beta\in P\). Тогда существуют \(\vec x_1,\vec y_1\in L\) и \(\vec x_2,\vec y_2\in M\), такие что
        <div class="s1-formula">$$\vec x=\vec x_1+\vec x_2,
        \qquad \vec y=\vec y_1+\vec y_2.$$</div>
        <div class="s1-formula">$$\alpha\vec x+\beta\vec y=\underbrace{\alpha\vec x_1+\beta\vec y_1}_{\in L}+\underbrace{\alpha\vec x_2+\beta\vec y_2}_{\in M}\in L+M.$$</div>
        <p>Следовательно, \(L+M\le V\). \(\blacksquare\)</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 2 (критерий прямой суммы)</h4>
    <p>Пусть \(L\le V\) и \(M\le V\). Тогда</p>
    <div class="s1-formula">$$L+M=L\oplus M\Longleftrightarrow \forall\vec z\in L+M\ \exists!\vec x\in L\ \exists!\vec y\in M:\ \vec z=\vec x+\vec y.$$</div>

    <p><b>Док-во:</b></p>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Rightarrow\)</span> Пусть \(L+M=L\oplus M\). Тогда \(L\cap M=\{\vec0\}\). Пусть
        <div class="s1-formula">$$\vec z=\vec x_1+\vec y_1=\vec x_2+\vec y_2,\qquad \vec x_1,\vec x_2\in L,\ \vec y_1,\vec y_2\in M.$$</div>
        <p>Тогда \(\vec x_2-\vec x_1=\vec y_1-\vec y_2\). Левая часть принадлежит \(L\), правая — \(M\), значит этот вектор принадлежит \(L\cap M=\{\vec0\}\). Следовательно, \(\vec x_1=\vec x_2\) и \(\vec y_1=\vec y_2\): разложение единственно.</p>
    </div>
    <div class="s1-proof-step"><span class="s1-proof-label">\(\Leftarrow\)</span> Пусть каждый \(\vec z\in L+M\) имеет единственное представление \(\vec z=\vec x+\vec y\), \(\vec x\in L\), \(\vec y\in M\). Допустим, \(\vec z\in L\cap M\). Тогда
        <div class="s1-formula">$$\vec z=\vec z+\vec0=\vec0+\vec z.$$</div>
        <p>В силу единственности разложения \(\vec z=\vec0\), поэтому \(L\cap M=\{\vec0\}\), то есть \(L+M=L\oplus M\). \(\blacksquare\)</p>
    </div>

    <div class="s1-note"><b>Основная теорема.</b> \(L+M=L\oplus M\Longleftrightarrow L\cap M=\{\vec0\}\).</div>
</div>`
    },
    {
        id: 23,
        title: 'Теорема о размерности суммы.',
        content: String.raw`${SEMESTER1_READABILITY_STYLES}
<div class="conspect-content">
    <h3 style="color:#1a3a6e; font-size:1.2rem;">Билет 24. Теорема о размерности суммы.</h3>

    <h4 style="color:#1a3a6e;">Определения из полной тетради</h4>
    <div class="s1-defs">
        <p><b>Базис</b> линейного пространства — упорядоченная линейно независимая система векторов, через которую единственным образом выражается каждый вектор пространства.</p>
        <p><b>Размерность</b> конечномерного линейного пространства — число векторов в его базисе; обозначается \(\dim V\).</p>
        <p><b>Сумма подпространств:</b> \(L+M=\{\vec x+\vec y:\vec x\in L,\vec y\in M\}\).</p>
    </div>

    <h4 style="color:#1a3a6e;">Теорема 1 (о размерности суммы)</h4>
    <p>Пусть \(V\) — конечномерное линейное пространство, \(L\le V\) и \(M\le V\). Тогда</p>
    <div class="s1-formula">$$\dim(L+M)=\dim L+\dim M-\dim(L\cap M).$$</div>

    <p><b>Док-во:</b> пусть \((\vec e_1,\vec e_2,\ldots,\vec e_k)\) — базис \(L\cap M\). Дополним эту систему векторов до базиса \(L\):</p>
    <div class="s1-formula">$$(\vec e_1,\ldots,\vec e_k,\vec f_1,\vec f_2,\ldots,\vec f_l).$$</div>
    <p>Дополним ту же самую систему до базиса \(M\):</p>
    <div class="s1-formula">$$(\vec e_1,\ldots,\vec e_k,\vec g_1,\vec g_2,\ldots,\vec g_m).$$</div>
    <p>Покажем, что</p>
    <div class="s1-formula">$$(\vec e_1,\ldots,\vec e_k,\vec f_1,\ldots,\vec f_l,\vec g_1,\ldots,\vec g_m)$$</div>
    <p>— базис \(L+M\).</p>

    <p>Пусть \(\vec z\in L+M\). Тогда существуют \(\vec x\in L\) и \(\vec y\in M\), такие что \(\vec z=\vec x+\vec y\). Представим \(\vec x\) и \(\vec y\) в базисах \(L\) и \(M\). Тогда \(\vec z\) представляется в виде линейной комбинации \(\vec e_i,\vec f_j,\vec g_s\). Следовательно, эта система порождает \(L+M\).</p>

    <p>Пусть</p>
    <div class="s1-formula">$$
    \alpha_1\vec e_1+\ldots+\alpha_k\vec e_k+
    \beta_1\vec f_1+\ldots+\beta_l\vec f_l+
    \gamma_1\vec g_1+\ldots+\gamma_m\vec g_m=\vec0.
    $$</div>
    <p>Тогда</p>
    <div class="s1-formula">$$
    \underbrace{\alpha_1\vec e_1+\ldots+\alpha_k\vec e_k+
    \beta_1\vec f_1+\ldots+\beta_l\vec f_l}_{\in L}
    =-
    \underbrace{\left(\gamma_1\vec g_1+\ldots+\gamma_m\vec g_m\right)}_{\in M}.
    $$</div>
    <p>Правая часть принадлежит \(L\cap M\), поэтому существуют \(\delta_1,\ldots,\delta_k\), для которых</p>
    <div class="s1-formula">$$-
    \gamma_1\vec g_1-\ldots-\gamma_m\vec g_m=
    \delta_1\vec e_1+\delta_2\vec e_2+\ldots+\delta_k\vec e_k.
    $$</div>
    <p>Следовательно,</p>
    <div class="s1-formula">$$
    \delta_1\vec e_1+\ldots+\delta_k\vec e_k+
    \gamma_1\vec g_1+\ldots+\gamma_m\vec g_m=\vec0.
    $$</div>
    <p>Так как \((\vec e_1,\ldots,\vec e_k,\vec g_1,\ldots,\vec g_m)\) — базис \(M\), имеем \(\delta_1=\ldots=\delta_k=\gamma_1=\ldots=\gamma_m=0\). Тогда из исходного равенства и линейной независимости базиса \(L\) получаем \(\alpha_1=\ldots=\alpha_k=\beta_1=\ldots=\beta_l=0\). Значит, построенная система линейно независима и является базисом \(L+M\).</p>

    <div class="s1-formula">$$
    \dim(L+M)=k+l+m=(k+l)+(k+m)-k
    =\dim L+\dim M-\dim(L\cap M).\quad\blacksquare
    $$</div>

    <div class="s1-note"><b>Следствие.</b> \(\dim(L\oplus M)=\dim L+\dim M\), так как \(\dim\{\vec0\}=0\).</div>
</div>`
    },

];
