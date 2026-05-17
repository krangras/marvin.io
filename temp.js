function getSection1Integrals() {
    return [
        {
            name: "1.1 ∫ (3cos x - 3^x + 2√x) dx",
            integral: "(3\\cos x - 3^x + 2\\sqrt{x}) dx",
            answer: "3\\sin x - \\frac{3^x}{\\ln 3} + \\frac{4}{3}\\sqrt{x^3} + C",
            solution: "Интегрируем почленно: ∫3cos x dx = 3sin x; ∫3^x dx = 3^x/ln3; 2∫x^{1/2}dx = 2·(2/3)x^{3/2} = (4/3)√(x³).",
            practice: "(2\\sin x - 2^x + 3\\sqrt[3]{x}) dx",
            practiceAns: "-2\\cos x - \\frac{2^x}{\\ln 2} + \\frac{9}{4}\\sqrt[3]{x^4} + C"
        },
        {
            name: "1.2 ∫ ((2-x)/x)^2 dx",
            integral: "\\left(\\frac{2-x}{x}\\right)^2 dx",
            answer: "-\\frac{4}{x} - 4\\ln|x| + x + C",
            solution: "Раскрываем: (4 - 4x + x^2)/x^2 = 4/x^2 - 4/x + 1. Интегрируем: ∫4x^{-2}dx = -4/x; ∫-4/x dx = -4ln|x|; ∫1 dx = x.",
            practice: "\\left(\\frac{3-x}{x}\\right)^2 dx",
            practiceAns: "-\\frac{9}{x} - 6\\ln|x| + x + C"
        },
        {
            name: "1.3 ∫ (∛x^2 - ∜x)/√x dx",
            integral: "\\frac{\\sqrt[3]{x^2} - \\sqrt[4]{x}}{\\sqrt{x}} dx",
            answer: "\\frac{6}{7}x^{7/6} - \\frac{4}{3}x^{3/4} + C",
            solution: "Переводим в степени: x^{2/3-1/2} = x^{1/6}; x^{1/4-1/2} = x^{-1/4}. ∫x^{1/6}dx = (6/7)x^{7/6}; ∫x^{-1/4}dx = (4/3)x^{3/4}.",
            practice: "\\frac{\\sqrt[3]{x} - \\sqrt[5]{x^2}}{\\sqrt[4]{x}} dx",
            practiceAns: "\\frac{12}{13}x^{13/12} - \\frac{20}{17}x^{17/20} + C"
        },
        {
            name: "1.4 ∫ (3·2^x - 2·3^x)/2^x dx",
            integral: "\\frac{3\\cdot2^x - 2\\cdot3^x}{2^x} dx",
            answer: "3x - 2\\cdot\\frac{(3/2)^x}{\\ln(3/2)} + C",
            solution: "Делим почленно: 3 - 2·(3/2)^x. ∫3 dx = 3x; ∫-2·(3/2)^x dx = -2·(3/2)^x/ln(3/2).",
            practice: "\\frac{4\\cdot3^x - 3\\cdot2^x}{3^x} dx",
            practiceAns: "4x - 3\\cdot\\frac{(2/3)^x}{\\ln(2/3)} + C"
        },
        {
            name: "1.5 ∫ (1+2x^2)/(x^2(1+x^2)) dx",
            integral: "\\frac{1+2x^2}{x^2(1+x^2)} dx",
            answer: "-\\frac{1}{x} + \\arctan x + C",
            solution: "Разложение: (1+x^2 + x^2)/(x^2(1+x^2)) = 1/x^2 + 1/(1+x^2). ∫1/x^2 dx = -1/x; ∫1/(1+x^2) dx = arctan x.",
            practice: "\\frac{1+3x^2}{x^2(1+x^2)} dx",
            practiceAns: "-\\frac{1}{x} + 2\\arctan x + C"
        },
        {
            name: "1.6 ∫ ctg^2 x dx",
            integral: "\\cot^2 x dx",
            answer: "-\\cot x - x + C",
            solution: "ctg^2 x = 1/sin^2 x - 1. ∫1/sin^2 x dx = -ctg x; ∫-1 dx = -x.",
            practice: "\\tan^2 x dx",
            practiceAns: "\\tan x - x + C"
        },
        {
            name: "1.7 ∫ dx/(cos2x + sin^2 x)",
            integral: "\\frac{dx}{\\cos 2x + \\sin^2 x}",
            answer: "\\tan x + C",
            solution: "cos2x = cos^2 x - sin^2 x → знаменатель = cos^2 x. ∫dx/cos^2 x = tan x.",
            practice: "\\frac{dx}{\\cos 2x - \\cos^2 x}",
            practiceAns: "-\\cot x + C"
        },
        {
            name: "1.8 ∫ dx/√(9x^2+1)",
            integral: "\\frac{dx}{\\sqrt{9x^2+1}}",
            answer: "\\frac{1}{3}\\ln|3x + \\sqrt{9x^2+1}| + C",
            solution: "∫dx/√(x^2+a^2) = ln|x+√(x^2+a^2)|. Выносим 1/3: (1/3)∫d(3x)/√((3x)^2+1).",
            practice: "\\frac{dx}{\\sqrt{4x^2+1}}",
            practiceAns: "\\frac{1}{2}\\ln|2x + \\sqrt{4x^2+1}| + C"
        },
        {
            name: "1.9 ∫ dx/√(3-5x^2)",
            integral: "\\frac{dx}{\\sqrt{3-5x^2}}",
            answer: "\\frac{1}{\\sqrt{5}}\\arcsin\\left(x\\sqrt{\\frac{5}{3}}\\right) + C",
            solution: "∫dx/√(a^2-x^2) = arcsin(x/a). Выносим √5: (1/√5)∫dx/√((√(3/5))^2 - x^2).",
            practice: "\\frac{dx}{\\sqrt{2-3x^2}}",
            practiceAns: "\\frac{1}{\\sqrt{3}}\\arcsin\\left(x\\sqrt{\\frac{3}{2}}\\right) + C"
        },
        {
            name: "1.10 ∫ (√x - x^3 e^x + 2x^2)/x^3 dx",
            integral: "\\frac{\\sqrt{x} - x^3 e^x + 2x^2}{x^3} dx",
            answer: "-\\frac{2}{3x\\sqrt{x}} - e^x + 2\\ln|x| + C",
            solution: "Делим: x^{-5/2} - e^x + 2/x. ∫x^{-5/2}dx = -2/(3x√x); ∫-e^x dx = -e^x; ∫2/x dx = 2ln|x|.",
            practice: "\\frac{\\sqrt[3]{x} - x^2 e^x + 3x}{x^2} dx",
            practiceAns: "\\frac{3}{5}x^{1/5} - e^x + 3\\ln|x| + C"
        },
        {
            name: "1.11 ∫ ∛(5x+2) dx",
            integral: "\\sqrt[3]{5x+2} dx",
            answer: "\\frac{3}{20}(5x+2)^{4/3} + C",
            solution: "∫(ax+b)^n dx = (1/a)·(ax+b)^{n+1}/(n+1). Здесь a=5, n=1/3.",
            practice: "\\sqrt[4]{3x-1} dx",
            practiceAns: "\\frac{4}{15}(3x-1)^{5/4} + C"
        },
        {
            name: "1.12 ∫ (2/(3x+4))^2 dx",
            integral: "\\left(\\frac{2}{3x+4}\\right)^2 dx",
            answer: "-\\frac{4}{3(3x+4)} + C",
            solution: "4∫(3x+4)^{-2}dx = 4·(1/3)·(3x+4)^{-1}/(-1) = -4/(3(3x+4)).",
            practice: "\\left(\\frac{3}{2x-1}\\right)^2 dx",
            practiceAns: "-\\frac{9}{2(2x-1)} + C"
        },
        {
            name: "1.13 ∫ (3cos4x - 3^{2-x} + 4√(5-2x)) dx",
            integral: "(3\\cos 4x - 3^{2-x} + 4\\sqrt{5-2x}) dx",
            answer: "\\frac{3}{4}\\sin 4x + \\frac{3^{2-x}}{\\ln 3} - \\frac{4}{3}(5-2x)^{3/2} + C",
            solution: "∫3cos4x dx = (3/4)sin4x; ∫-3^{2-x}dx = 3^{2-x}/ln3; 4∫(5-2x)^{1/2}dx = -4/2·(2/3)(5-2x)^{3/2} = -4/3(5-2x)^{3/2}.",
            practice: "(2\\sin 5x - 2^{3-x} + 3\\sqrt{4-3x}) dx",
            practiceAns: "-\\frac{2}{5}\\cos 5x + \\frac{2^{3-x}}{\\ln 2} - \\frac{2}{3}(4-3x)^{3/2} + C"
        },
        {
            name: "1.14 ∫ (1-x)^2/(x(1+x^2)) dx",
            integral: "\\frac{(1-x)^2}{x(1+x^2)} dx",
            answer: "\\ln|x| - 2\\arctan x + C",
            solution: "Раскрываем: (1-2x+x^2)/(x(1+x^2)) = 1/x - 2/(1+x^2). ∫1/x dx = ln|x|; ∫-2/(1+x^2) dx = -2arctan x.",
            practice: "\\frac{(2-x)^2}{x(1+x^2)} dx",
            practiceAns: "4\\ln|x| - 4\\arctan x - \\frac{1}{2}\\ln(1+x^2) + C"
        },
        {
            name: "1.15 ∫ dx/√(9x^2-5)",
            integral: "\\frac{dx}{\\sqrt{9x^2-5}}",
            answer: "\\frac{1}{3}\\ln|3x + \\sqrt{9x^2-5}| + C",
            solution: "∫dx/√(x^2-a^2) = ln|x+√(x^2-a^2)|. Выносим 1/3: (1/3)∫d(3x)/√((3x)^2-5).",
            practice: "\\frac{dx}{\\sqrt{16x^2-9}}",
            practiceAns: "\\frac{1}{4}\\ln|4x + \\sqrt{16x^2-9}| + C"
        },
        {
            name: "1.16 ∫ 2dx/(3-5x^2)",
            integral: "\\frac{2dx}{3-5x^2}",
            answer: "\\frac{1}{\\sqrt{15}}\\ln\\left|\\frac{\\sqrt{3}+\\sqrt{5}x}{\\sqrt{3}-\\sqrt{5}x}\\right| + C",
            solution: "∫dx/(a^2-x^2) = (1/(2a))ln|(a+x)/(a-x)|. Выносим 2/5: (2/5)∫dx/((√(3/5))^2 - x^2).",
            practice: "\\frac{3dx}{4-7x^2}",
            practiceAns: "\\frac{3}{2\\sqrt{28}}\\ln\\left|\\frac{2+\\sqrt{7}x}{2-\\sqrt{7}x}\\right| + C"
        },
        {
            name: "1.17 ∫ (e^x+2)^3 dx",
            integral: "(e^x+2)^3 dx",
            answer: "\\frac{1}{3}e^{3x} + 3e^{2x} + 12e^x + 8x + C",
            solution: "Раскрываем: e^{3x} + 6e^{2x} + 12e^x + 8. Интегрируем почленно.",
            practice: "(e^x+1)^3 dx",
            practiceAns: "\\frac{1}{3}e^{3x} + \\frac{3}{2}e^{2x} + 3e^x + x + C"
        },
        {
            name: "1.18 ∫ dx/(4-3x)",
            integral: "\\frac{dx}{4-3x}",
            answer: "-\\frac{1}{3}\\ln|4-3x| + C",
            solution: "∫dx/(ax+b) = (1/a)ln|ax+b|. Здесь a=-3.",
            practice: "\\frac{dx}{5-2x}",
            practiceAns: "-\\frac{1}{2}\\ln|5-2x| + C"
        },
        {
            name: "1.19 ∫ x/(x+4) dx",
            integral: "\\frac{x}{x+4} dx",
            answer: "x - 4\\ln|x+4| + C",
            solution: "Выделяем целую часть: (x+4-4)/(x+4) = 1 - 4/(x+4). ∫1 dx = x; ∫-4/(x+4) dx = -4ln|x+4|.",
            practice: "\\frac{x}{x-2} dx",
            practiceAns: "x + 2\\ln|x-2| + C"
        },
        {
            name: "1.20 ∫ x/√(9x^2-5) dx",
            integral: "\\frac{x}{\\sqrt{9x^2-5}} dx",
            answer: "\\frac{1}{9}\\sqrt{9x^2-5} + C",
            solution: "Замена t=9x^2-5, dt=18x dx → x dx = dt/18. ∫t^{-1/2}·dt/18 = (1/18)·2√t = √t/9.",
            practice: "\\frac{x}{\\sqrt{4x^2+1}} dx",
            practiceAns: "\\frac{1}{4}\\sqrt{4x^2+1} + C"
        }
    ];
}

function getSection2Integrals() {
    return [
        { name: "2.1 ∫ 3cos\\(4x+2\\) dx", integral: "3\\cos\\(4x+2\\) dx", answer: "\\frac{3}{4}\\sin\\(4x+2\\) + C", solution: "dx = \\(1/4\\)d\\(4x+2\\). ∫3cos u·du/4 = \\(3/4\\)sin u.", practice: "2\\sin\\(3x-1\\) dx", practiceAns: "-\\frac{2}{3}\\cos\\(3x-1\\) + C" },
        { name: "2.2 ∫ \\(8-5x\\)^8 dx", integral: "\\(8-5x\\)^8 dx", answer: "-\\frac{\\(8-5x\\)^9}{45} + C", solution: "dx = -du/5, u=8-5x. ∫u^8·\\(-du/5\\) = -u^9/45.", practice: "\\(3-2x\\)^5 dx", practiceAns: "-\\frac{\\(3-2x\\)^6}{12} + C" },
        { name: "2.3 ∫ x²·∛\\(x³-4\\) dx", integral: "x^2\\sqrt[3]{x^3-4} dx", answer: "\\frac{1}{4}\\(x^3-4\\)^{4/3} + C", solution: "t=x³-4, dt=3x²dx → x²dx = dt/3. ∫t^{1/3}·dt/3 = \\(1/3\\)·\\(3/4\\)t^{4/3} = t^{4/3}/4.", practice: "x^2\\sqrt[4]{x^3+2} dx", practiceAns: "\\frac{4}{15}\\(x^3+2\\)^{5/4} + C" },
        { name: "2.4 ∫ \\(sin x + 4\\)/cos²x dx", integral: "\\frac{\\sin x + 4}{\\cos^2 x} dx", answer: "\\frac{1}{\\cos x} + 4\\tan x + C", solution: "Разбиваем: ∫sin x/cos²x dx + 4∫dx/cos²x. Первый: u=cos x, du=-sin x dx → ∫-du/u² = 1/u = 1/cos x. Второй: 4tan x.", practice: "\\frac{\\cos x + 2}{\\sin^2 x} dx", practiceAns: "-\\frac{1}{\\sin x} - 2\\cot x + C" },
        { name: "2.5 ∫ √\\(ln x + 5\\)/x dx", integral: "\\frac{\\sqrt{\\ln x + 5}}{x} dx", answer: "\\frac{2}{3}\\(\\ln x + 5\\)^{3/2} + C", solution: "t=ln x+5, dt=dx/x. ∫√t dt = \\(2/3\\)t^{3/2}.", practice: "\\frac{\\ln x}{x} dx", practiceAns: "\\frac{1}{2}\\(\\ln x\\)^2 + C" },
        { name: "2.6 ∫ e^{arccos 2x}/√\\(1-4x²\\) dx", integral: "\\frac{e^{\\arccos 2x}}{\\sqrt{1-4x^2}} dx", answer: "-\\frac{1}{2}e^{\\arccos 2x} + C", solution: "t=arccos 2x, dt = -2/√\\(1-4x²\\) dx → dx/√\\(1-4x²\\) = -dt/2. ∫e^t·\\(-dt/2\\) = -e^t/2.", practice: "\\frac{e^{\\arcsin 3x}}{\\sqrt{1-9x^2}} dx", practiceAns: "\\frac{1}{3}e^{\\arcsin 3x} + C" },
        { name: "2.7 ∫ dx/\\(1+√\\(x+2\\)\\)", integral: "\\frac{dx}{1+\\sqrt{x+2}}", answer: "2\\sqrt{x+2} - 2\\ln\\(\\sqrt{x+2}+1\\) + C", solution: "t=√\\(x+2\\), x=t²-2, dx=2t dt. ∫2t dt/\\(1+t\\) = 2∫\\(1 - 1/\\(1+t\\)\\)dt = 2t - 2ln|1+t|.", practice: "\\frac{dx}{1+\\sqrt{x+3}}", practiceAns: "2\\sqrt{x+3} - 2\\ln\\(\\sqrt{x+3}+1\\) + C" },
        { name: "2.8 ∫ x² e^{-3x³} dx", integral: "x^2 e^{-3x^3} dx", answer: "-\\frac{1}{9}e^{-3x^3} + C", solution: "t=-3x³, dt=-9x²dx → x²dx = -dt/9. ∫e^t·\\(-dt/9\\) = -e^t/9.", practice: "x e^{-x^2} dx", practiceAns: "-\\frac{1}{2}e^{-x^2} + C" },
        { name: "2.9 ∫ √\\(5x+2\\) dx", integral: "\\sqrt{5x+2} dx", answer: "\\frac{2}{15}\\(5x+2\\)^{3/2} + C", solution: "∫\\(5x+2\\)^{1/2}dx = \\(1/5\\)·\\(2/3\\)\\(5x+2\\)^{3/2} = 2\\(5x+2\\)^{3/2}/15.", practice: "\\sqrt{3x-1} dx", practiceAns: "\\frac{2}{9}\\(3x-1\\)^{3/2} + C" },
        { name: "2.10 ∫ \\(2/\\(3x+4\\)\\)² dx", integral: "\\\left\\(\\frac{2}{3x+4}\\right\\)^2 dx", answer: "-\\frac{4}{3\\(3x+4\\)} + C", solution: "4∫\\(3x+4\\)^{-2}dx = 4·\\(1/3\\)·\\(-1\\)\\(3x+4\\)^{-1} = -4/\\(3\\(3x+4\\)\\).", practice: "\\\left\\(\\frac{3}{2x-1}\\right\\)^2 dx", practiceAns: "-\\frac{9}{2\\(2x-1\\)} + C" },
        { name: "2.11 ∫ \\(e^x+2\\)³ dx", integral: "\\(e^x+2\\)^3 dx", answer: "\\frac{1}{3}e^{3x} + 3e^{2x} + 12e^x + 8x + C", solution: "Раскрываем: e^{3x}+6e^{2x}+12e^x+8. Интегрируем почленно.", practice: "\\(e^x-1\\)^3 dx", practiceAns: "\\frac{1}{3}e^{3x} - \\frac{3}{2}e^{2x} + 3e^x - x + C" },
        { name: "2.12 ∫ x/\\(x+4\\) dx", integral: "\\frac{x}{x+4} dx", answer: "x - 4\\ln|x+4| + C", solution: "Выделяем целую часть: \\(x+4-4\\)/\\(x+4\\) = 1 - 4/\\(x+4\\).", practice: "\\frac{x}{x-2} dx", practiceAns: "x + 2\\ln|x-2| + C" },
        { name: "2.13 ∫ x√\\(5-3x²\\) dx", integral: "x\\sqrt{5-3x^2} dx", answer: "-\\frac{1}{9}\\(5-3x^2\\)^{3/2} + C", solution: "t=5-3x², dt=-6x dx → x dx = -dt/6. ∫t^{1/2}·\\(-dt/6\\) = -\\(1/6\\)·\\(2/3\\)t^{3/2} = -t^{3/2}/9.", practice: "x\\sqrt{4-x^2} dx", practiceAns: "-\\frac{1}{3}\\(4-x^2\\)^{3/2} + C" },
        { name: "2.14 ∫ \\(3x+2\\)/√\\(9-x²\\) dx", integral: "\\frac{3x+2}{\\sqrt{9-x^2}} dx", answer: "-3\\sqrt{9-x^2} + 2\\arcsin\\frac{x}{3} + C", solution: "Разбиваем: 3∫x/√\\(9-x²\\)dx + 2∫dx/√\\(9-x²\\). Первый: t=9-x², dt=-2x dx → -3/2∫t^{-1/2}dt = -3√t. Второй: 2arcsin\\(x/3\\).", practice: "\\frac{2x-1}{\\sqrt{4-x^2}} dx", practiceAns: "-2\\sqrt{4-x^2} - \\arcsin\\frac{x}{2} + C" },
        { name: "2.15 ∫ cos\\(3-e^x\\)·e^x dx", integral: "\\cos\\(3-e^x\\) e^x dx", answer: "-\\sin\\(3-e^x\\) + C", solution: "t=3-e^x, dt=-e^x dx → e^x dx = -dt. ∫cos t·\\(-dt\\) = -sin t.", practice: "\\sin\\(2-e^x\\) e^x dx", practiceAns: "\\cos\\(2-e^x\\) + C" },
        { name: "2.16 ∫ x/\\(1+x⁴\\) dx", integral: "\\frac{x}{1+x^4} dx", answer: "\\frac{1}{2}\\arctan\\(x^2\\) + C", solution: "t=x², dt=2x dx → x dx = dt/2. ∫dt/\\(1+t²\\)·1/2 = \\(1/2\\)arctan t.", practice: "\\frac{x}{1+x^4} dx", practiceAns: "\\frac{1}{2}\\arctan\\(x^2\\) + C" },
        { name: "2.17 ∫ dx/\\(ln x·x\\)", integral: "\\frac{dx}{\\ln x \\cdot x}", answer: "\\ln|\\ln x| + C", solution: "t=ln x, dt=dx/x. ∫dt/t = ln|t|.", practice: "\\frac{dx}{x\\ln^2 x}", practiceAns: "-\\frac{1}{\\ln x} + C" },
        { name: "2.18 ∫ 2dx/\\(arctg\\(x/2\\)·\\(4+x²\\)\\)", integral: "\\frac{2dx}{\\arctg\\(x/2\\) \\(4+x^2\\)}", answer: "\\ln|\\arctg\\(x/2\\)| + C", solution: "t=arctg\\(x/2\\), dt = dx/\\(2\\(1+\\(x/2\\)²\\)\\) = dx/\\(2+x²/2\\) = 2dx/\\(4+x²\\). Тогда 2dx/\\(4+x²\\) = dt. ∫dt/t = ln|t|.", practice: "\\frac{dx}{\\arcsin\\(x\\) \\sqrt{1-x^2}}", practiceAns: "\\ln|\\arcsin x| + C" },
        { name: "2.19 ∫ \\(1+e^{3x}\\)⁵ e^{3x} dx", integral: "\\(1+e^{3x}\\)^5 e^{3x} dx", answer: "\\frac{1}{18}\\(1+e^{3x}\\)^6 + C", solution: "t=1+e^{3x}, dt=3e^{3x}dx → e^{3x}dx = dt/3. ∫t^5·dt/3 = t^6/18.", practice: "\\(1+e^{2x}\\)^4 e^{2x} dx", practiceAns: "\\frac{1}{10}\\(1+e^{2x}\\)^5 + C" },
        { name: "2.20 ∫ x/√\\(2+4x\\) dx", integral: "\\frac{x}{\\sqrt{2+4x}} dx", answer: "\\frac{1}{6}\\sqrt{2+4x}\\(x-1\\) + C", solution: "t=√\\(2+4x\\), x=\\(t²-2\\)/4, dx=t dt/2. ∫\\(\\(t²-2\\)/4\\)·\\(t dt/2\\) = \\(1/8\\)∫\\(t²-2\\)dt = \\(1/8\\)\\(t³/3 - 2t\\) = t³/24 - t/4 = \\(t/24\\)\\(t²-6\\). Обратная замена даёт ответ.", practice: "\\frac{x}{\\sqrt{1+2x}} dx", practiceAns: "\\frac{1}{3}\\sqrt{1+2x}\\(x-1\\) + C" }
    ];
}

function getSection3Integrals() {
    return [
        { name: "3.1 ∫ \\(3-x\\)sin2x dx", integral: "\\(3-x\\)\\sin 2x dx", answer: "\\frac{x-3}{2}\\cos 2x - \\frac{1}{4}\\sin 2x + C", solution: "u=3-x, dv=sin2x dx → du=-dx, v=-cos2x/2. ∫ = -\\(3-x\\)cos2x/2 - ∫\\(cos2x/2\\)dx = \\(x-3\\)cos2x/2 - sin2x/4.", practice: "∫ \\(2x+1\\)cos3x dx", practiceAns: "\\frac{2x+1}{3}\\sin 3x + \\frac{2}{9}\\cos 3x + C" },
        { name: "3.2 ∫ x² ln x dx", integral: "x^2 \\ln x dx", answer: "\\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C", solution: "u=ln x, dv=x²dx → du=dx/x, v=x³/3. ∫ = \\(x³/3\\)ln x - ∫\\(x³/3\\)\\(dx/x\\) = \\(x³/3\\)ln x - \\(1/3\\)∫x²dx = \\(x³/3\\)ln x - x³/9.", practice: "∫ x ln x dx", practiceAns: "\\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C" },
        { name: "3.3 ∫ arcsin 3x dx", integral: "\\arcsin 3x dx", answer: "x\\arcsin 3x + \\frac{1}{3}\\sqrt{1-9x^2} + C", solution: "u=arcsin3x, dv=dx → du=3dx/√\\(1-9x²\\), v=x. ∫ = x arcsin3x - ∫3x/√\\(1-9x²\\)dx = x arcsin3x + √\\(1-9x²\\)/3.", practice: "∫ arccos 2x dx", practiceAns: "x\\arccos 2x - \\frac{1}{2}\\sqrt{1-4x^2} + C" },
        { name: "3.4 ∫ arctg x dx", integral: "\\arctan x dx", answer: "x\\arctan x - \\frac{1}{2}\\ln\\(1+x^2\\) + C", solution: "u=arctan x, dv=dx → du=dx/\\(1+x²\\), v=x. ∫ = x arctan x - ∫x/\\(1+x²\\)dx = x arctan x - \\(1/2\\)ln\\(1+x²\\).", practice: "∫ \\operatorname{arctg} 2x dx", practiceAns: "x\\arctan 2x - \\frac{1}{4}\\ln\\(1+4x^2\\) + C" },
        { name: "3.5 ∫ x² e^{-x} dx", integral: "x^2 e^{-x} dx", answer: "-\\(x^2+2x+2\\)e^{-x} + C", solution: "По частям дважды. 1: u=x², dv=e^{-x}dx → du=2x dx, v=-e^{-x}. ∫ = -x²e^{-x} + 2∫xe^{-x}dx. 2: u=x, dv=e^{-x}dx → du=dx, v=-e^{-x}. ∫ = -x²e^{-x} + 2\\(-xe^{-x} - e^{-x}\\) = -\\(x²+2x+2\\)e^{-x}.", practice: "∫ x e^{-2x} dx", practiceAns: "-\\frac{2x+1}{4}e^{-2x} + C" },
        { name: "3.6 ∫ ln x dx", integral: "\\ln x dx", answer: "x\\ln x - x + C", solution: "u=ln x, dv=dx → du=dx/x, v=x. ∫ = x ln x - ∫dx = x ln x - x.", practice: "∫ \\ln\\(2x\\) dx", practiceAns: "x\\ln\\(2x\\) - x + C" },
        { name: "3.7 ∫ x sin x dx", integral: "x \\sin x dx", answer: "\\sin x - x\\cos x + C", solution: "u=x, dv=sin x dx → du=dx, v=-cos x. ∫ = -x cos x + ∫cos x dx = -x cos x + sin x.", practice: "∫ x cos x dx", practiceAns: "x\\sin x + \\cos x + C" },
        { name: "3.8 ∫ e^x cos x dx \\(циклический\\)", integral: "e^x \\cos x dx", answer: "\\frac{e^x\\(\\sin x + \\cos x\\)}{2} + C", solution: "I = e^x cos x dx. По частям: u=e^x, dv=cos x dx → I = e^x sin x - ∫e^x sin x dx. Для J=∫e^x sin x dx: u=e^x, dv=sin x dx → J = -e^x cos x + I. Подставляем: I = e^x sin x + e^x cos x - I → 2I = e^x\\(sin x+cos x\\).", practice: "∫ e^x \\sin x dx", practiceAns: "\\frac{e^x\\(\\sin x - \\cos x\\)}{2} + C" },
        { name: "3.9 ∫ x² ln\\(1+x\\) dx", integral: "x^2 \\ln\\(1+x\\) dx", answer: "\\frac{x^3}{3}\\ln\\(1+x\\) - \\frac{x^2}{6} + \\frac{x}{3} - \\frac{1}{3}\\ln\\(1+x\\) + C", solution: "u=ln\\(1+x\\), dv=x²dx → du=dx/\\(1+x\\), v=x³/3. ∫ = \\(x³/3\\)ln\\(1+x\\) - \\(1/3\\)∫x³/\\(1+x\\)dx. Деление многочлена: x³/\\(1+x\\)=x²-x+1-1/\\(1+x\\). Интегрируем.", practice: "∫ x \\ln\\(1+x\\) dx", practiceAns: "\\frac{x^2-1}{2}\\ln\\(1+x\\) - \\frac{x^2}{4} + \\frac{x}{2} + C" },
        { name: "3.10 ∫ x·arctg x dx", integral: "x \\arctan x dx", answer: "\\frac{x^2+1}{2}\\arctan x - \\frac{x}{2} + C", solution: "u=arctan x, dv=x dx → du=dx/\\(1+x²\\), v=x²/2. ∫ = \\(x²/2\\)arctan x - \\(1/2\\)∫x²/\\(1+x²\\)dx = \\(x²/2\\)arctan x - \\(1/2\\)∫\\(1 - 1/\\(1+x²\\)\\)dx = \\(x²/2\\)arctan x - x/2 + \\(1/2\\)arctan x.", practice: "∫ x^2 \\arctan x dx", practiceAns: "\\frac{x^3}{3}\\arctan x - \\frac{x^2}{6} + \\frac{1}{6}\\ln\\(1+x^2\\) + C" }
    ];
}

function getSection4Integrals() {
    return [
        { name: "4.1 ∫ dx/\\(x²+2x+5\\)", integral: "\\frac{dx}{x^2+2x+5}", answer: "\\frac{1}{2}\\arctan\\frac{x+1}{2} + C", solution: "Выделяем квадрат: x²+2x+5 = \\(x+1\\)²+4. Замена t=x+1 → ∫dt/\\(t²+2²\\) = \\(1/2\\)arctan\\(t/2\\).", practice: "∫ dx/\\(x²+4x+13\\)", practiceAns: "\\frac{1}{3}\\arctan\\frac{x+2}{3} + C" },
        { name: "4.2 ∫ dx/\\(x²-4x-5\\)", integral: "\\frac{dx}{x^2-4x-5}", answer: "\\frac{1}{6}\\ln\\\left|\\frac{x-5}{x+1}\\right| + C", solution: "Выделяем квадрат: \\(x-2\\)²-9. Замена t=x-2 → ∫dt/\\(t²-3²\\) = \\(1/\\(2·3\\)\\)ln|\\(t-3\\)/\\(t+3\\)|.", practice: "∫ dx/\\(x²-6x+5\\)", practiceAns: "\\frac{1}{4}\\ln\\\left|\\frac{x-5}{x-1}\\right| + C" },
        { name: "4.3 ∫ dx/√\\(x²+4x+5\\)", integral: "\\frac{dx}{\\sqrt{x^2+4x+5}}", answer: "\\ln|x+2+\\sqrt{x^2+4x+5}| + C", solution: "Выделяем квадрат: \\(x+2\\)²+1. ∫dx/√\\(\\(x+2\\)²+1\\) = ln|x+2+√\\(\\(x+2\\)²+1\\)|.", practice: "∫ dx/√\\(x²+2x+2\\)", practiceAns: "\\ln|x+1+\\sqrt{x^2+2x+2}| + C" },
        { name: "4.4 ∫ dx/√\\(3-2x-x²\\)", integral: "\\frac{dx}{\\sqrt{3-2x-x^2}}", answer: "\\arcsin\\frac{x+1}{2} + C", solution: "3-2x-x² = 4-\\(x+1\\)². ∫dx/√\\(2²-\\(x+1\\)²\\) = arcsin\\(\\(x+1\\)/2\\).", practice: "∫ dx/√\\(5-4x-x²\\)", practiceAns: "\\arcsin\\frac{x+2}{3} + C" },
        { name: "4.5 ∫ dx/\\(9x²-6x+2\\)", integral: "\\frac{dx}{9x^2-6x+2}", answer: "\\frac{1}{3}\\arctan\\(3x-1\\) + C", solution: "9x²-6x+2 = \\(3x-1\\)²+1. Замена t=3x-1, dt=3dx → \\(1/3\\)∫dt/\\(t²+1\\).", practice: "∫ dx/\\(4x²+4x+2\\)", practiceAns: "\\frac{1}{2}\\arctan\\(2x+1\\) + C" },
        { name: "4.6 ∫ dx/√\\(5-2x+x²\\)", integral: "\\frac{dx}{\\sqrt{5-2x+x^2}}", answer: "\\ln|x-1+\\sqrt{x^2-2x+5}| + C", solution: "x²-2x+5 = \\(x-1\\)²+4. ∫dx/√\\(\\(x-1\\)²+2²\\) = ln|x-1+√\\(\\(x-1\\)²+4\\)|.", practice: "∫ dx/√\\(10-6x+x²\\)", practiceAns: "\\ln|x-3+\\sqrt{x^2-6x+10}| + C" },
        { name: "4.7 ∫ dx/√\\(10-6x+x²\\)", integral: "\\frac{dx}{\\sqrt{10-6x+x^2}}", answer: "\\ln|x-3+\\sqrt{x^2-6x+10}| + C", solution: "x²-6x+10 = \\(x-3\\)²+1. ∫dx/√\\(\\(x-3\\)²+1\\) = ln|x-3+√\\(\\(x-3\\)²+1\\)|.", practice: "∫ dx/√\\(x²-4x+8\\)", practiceAns: "\\ln|x-2+\\sqrt{x^2-4x+8}| + C" },
        { name: "4.8 ∫ dx/\\(x²-6x+12\\)", integral: "\\frac{dx}{x^2-6x+12}", answer: "\\frac{1}{\\sqrt{3}}\\arctan\\frac{x-3}{\\sqrt{3}} + C", solution: "x²-6x+12 = \\(x-3\\)²+3. ∫dx/\\(\\(x-3\\)²+\\(√3\\)²\\) = \\(1/√3\\)arctan\\(\\(x-3\\)/√3\\).", practice: "∫ dx/\\(x²-2x+5\\)", practiceAns: "\\frac{1}{2}\\arctan\\frac{x-1}{2} + C" },
        { name: "4.9 ∫ dx/√\\(5x²-4x+1\\)", integral: "\\frac{dx}{\\sqrt{5x^2-4x+1}}", answer: "\\frac{1}{\\sqrt{5}}\\ln|\\sqrt{5}x - \\frac{2}{\\sqrt{5}} + \\sqrt{5x^2-4x+1}| + C", solution: "Выносим √5: \\(1/√5\\)∫dx/√\\(x² - \\(4/5\\)x + 1/5\\). Выделяем квадрат под корнем.", practice: "∫ dx/√\\(2x²+4x+3\\)", practiceAns: "\\frac{1}{\\sqrt{2}}\\ln|\\sqrt{2}x+\\sqrt{2}+\\sqrt{2x^2+4x+3}| + C" },
        { name: "4.10 ∫ dx/√\\(9x²-6x-3\\)", integral: "\\frac{dx}{\\sqrt{9x^2-6x-3}}", answer: "\\frac{1}{3}\\ln|3x-1+\\sqrt{9x^2-6x-3}| + C", solution: "Выносим 3: \\(1/3\\)∫dx/√\\(\\(x-1/3\\)² - 4/9\\). Длинный логарифм.", practice: "∫ dx/√\\(4x²+8x+3\\)", practiceAns: "\\frac{1}{2}\\ln|2x+2+\\sqrt{4x^2+8x+3}| + C" },
        { name: "4.11 ∫ dx/\\(x²+2x+10\\)", integral: "\\frac{dx}{x^2+2x+10}", answer: "\\frac{1}{3}\\arctan\\frac{x+1}{3} + C", solution: "\\(x+1\\)²+9 → ∫dt/\\(t²+3²\\) = \\(1/3\\)arctan\\(t/3\\).", practice: "∫ dx/\\(x²-4x+20\\)", practiceAns: "\\frac{1}{4}\\arctan\\frac{x-2}{4} + C" },
        { name: "4.12 ∫ dx/\\(4x²+4x+5\\)", integral: "\\frac{dx}{4x^2+4x+5}", answer: "\\frac{1}{4}\\arctan\\frac{2x+1}{2} + C", solution: "4x²+4x+5 = 4\\(x²+x\\)+5 = 4[\\(x+1/2\\)²+1] = 4\\(x+1/2\\)²+4. ∫dx/\\(4\\(t²+1\\)\\) с t=x+1/2 → \\(1/4\\)arctan t.", practice: "∫ dx/\\(9x²-6x+10\\)", practiceAns: "\\frac{1}{9}\\arctan\\frac{3x-1}{3} + C" }
    ];
}

function getSection5Integrals() {
    return [
        { name: "5.1 ∫ \\(x+2\\)/\\(x²+2x+2\\) dx", integral: "\\frac{x+2}{x^2+2x+2} dx", answer: "\\frac{1}{2}\\ln\\(x^2+2x+2\\) + \\arctan\\(x+1\\) + C", solution: "Производная знаменателя = 2x+2. Числитель = ½\\(2x+2\\) + 1. ∫½·\\(2x+2\\)/\\(...\\)dx + ∫dx/\\(\\(x+1\\)²+1\\).", practice: "∫ \\(x+1\\)/\\(x²+2x+2\\) dx", practiceAns: "\\frac{1}{2}\\ln\\(x^2+2x+2\\) + C" },
        { name: "5.2 ∫ \\(x-3\\)/√\\(3-2x-x²\\) dx", integral: "\\frac{x-3}{\\sqrt{3-2x-x^2}} dx", answer: "-\\sqrt{3-2x-x^2} - 2\\arcsin\\frac{x+1}{2} + C", solution: "Производная подкоренного = -2-2x = -2\\(x+1\\). x-3 = -½·\\(-2x-2\\) - 4.", practice: "∫ \\(x+2\\)/√\\(5-4x-x²\\) dx", practiceAns: "-\\sqrt{5-4x-x^2} + \\arcsin\\frac{x+2}{3} + C" },
        { name: "5.3 ∫ \\(7x+3\\)/\\(4x²+8x+13\\) dx", integral: "\\frac{7x+3}{4x^2+8x+13} dx", answer: "\\frac{7}{8}\\ln\\(4x^2+8x+13\\) - \\frac{5}{4}\\arctan\\frac{2x+2}{3} + C", solution: "Производная знаменателя = 8x+8. 7x+3 = \\(7/8\\)\\(8x+8\\) - 4.", practice: "∫ \\(5x+1\\)/\\(x²+2x+5\\) dx", practiceAns: "\\frac{5}{2}\\ln\\(x^2+2x+5\\) - 4\\arctan\\frac{x+1}{2} + C" },
        { name: "5.4 ∫ \\(2x+5\\)/√\\(x²+6x+10\\) dx", integral: "\\frac{2x+5}{\\sqrt{x^2+6x+10}} dx", answer: "2\\sqrt{x^2+6x+10} - \\ln|x+3+\\sqrt{x^2+6x+10}| + C", solution: "Производная подкоренного = 2x+6. 2x+5 = \\(2x+6\\) - 1.", practice: "∫ \\(3x+4\\)/√\\(x²+4x+8\\) dx", practiceAns: "3\\sqrt{x^2+4x+8} - 2\\ln|x+2+\\sqrt{x^2+4x+8}| + C" },
        { name: "5.5 ∫ \\(1-x\\)/√\\(x²+4x+5\\) dx", integral: "\\frac{1-x}{\\sqrt{x^2+4x+5}} dx", answer: "-\\sqrt{x^2+4x+5} + 3\\ln|x+2+\\sqrt{x^2+4x+5}| + C", solution: "Производная подкоренного = 2x+4. 1-x = -½\\(2x+4\\) + 3.", practice: "∫ \\(2-x\\)/√\\(x²+2x+2\\) dx", practiceAns: "-\\sqrt{x^2+2x+2} + 3\\ln|x+1+\\sqrt{x^2+2x+2}| + C" },
        { name: "5.6 ∫ x/√\\(x²-10x+16\\) dx", integral: "\\frac{x}{\\sqrt{x^2-10x+16}} dx", answer: "\\sqrt{x^2-10x+16} + 5\\ln|x-5+\\sqrt{x^2-10x+16}| + C", solution: "Производная подкоренного = 2x-10. x = ½\\(2x-10\\) + 5.", practice: "∫ x/√\\(x²-6x+8\\) dx", practiceAns: "\\sqrt{x^2-6x+8} + 3\\ln|x-3+\\sqrt{x^2-6x+8}| + C" },
        { name: "5.7 ∫ \\(5x-2\\)/\\(x²-4x+5\\) dx", integral: "\\frac{5x-2}{x^2-4x+5} dx", answer: "\\frac{5}{2}\\ln\\(x^2-4x+5\\) + 4\\arctan\\(x-2\\) + C", solution: "Производная знаменателя = 2x-4. 5x-2 = \\(5/2\\)\\(2x-4\\) + 8.", practice: "∫ \\(3x+1\\)/\\(x²+2x+5\\) dx", practiceAns: "\\frac{3}{2}\\ln\\(x^2+2x+5\\) - 2\\arctan\\frac{x+1}{2} + C" },
        { name: "5.8 ∫ \\(x+2\\)/\\(√\\(4x-x²\\)\\) dx", integral: "\\frac{x+2}{\\sqrt{4x-x^2}} dx", answer: "-\\sqrt{4x-x^2} + 2\\arcsin\\frac{x-2}{2} + C", solution: "4x-x² = 4-\\(x-2\\)². Производная подкоренного = 4-2x = -2\\(x-2\\). x+2 = -½·\\(4-2x\\) + 4.", practice: "∫ \\(x-1\\)/√\\(6x-x²-5\\) dx", practiceAns: "-\\sqrt{6x-x^2-5} + 2\\arcsin\\frac{x-3}{2} + C" }
    ];
}



function getSection6Integrals() {
    return [
        { name: "6.1 ∫ dx/\\(x√\\(2+2x-x²\\)\\)", integral: "\\frac{dx}{x\\sqrt{2+2x-x^2}}", answer: "-\\frac{1}{\\sqrt{3}}\\ln\\\left|\\frac{\\sqrt{3}+\\sqrt{2+2x-x^2}}{x}\\right| + C", solution: "Замена t=1/x → dx = -dt/t², x=1/t. Под корнем: 2+2/t-1/t² = \\(2t²+2t-1\\)/t². √\\(...\\) = √\\(2t²+2t-1\\)/|t|. Интеграл сводится к ∫dt/√\\(2t²+2t-1\\).", practice: "∫ dx/\\(x√\\(1+2x-x²\\)\\)", practiceAns: "-\\frac{1}{\\sqrt{2}}\\ln\\\left|\\frac{\\sqrt{2}+\\sqrt{1+2x-x^2}}{x}\\right| + C" },
        { name: "6.2 ∫ dx/\\(x√\\(x²-1\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2-1}}", answer: "\\arcsec|x| + C", solution: "Табличный интеграл: ∫dx/\\(x√\\(x²-1\\)\\) = arcsec|x| + C.", practice: "∫ dx/\\(x√\\(x²-4\\)\\)", practiceAns: "\\frac{1}{2}\\arcsec\\frac{x}{2} + C" },
        { name: "6.3 ∫ dx/\\(x√\\(4-x²\\)\\)", integral: "\\frac{dx}{x\\sqrt{4-x^2}}", answer: "-\\frac{1}{2}\\ln\\\left|\\frac{2+\\sqrt{4-x^2}}{x}\\right| + C", solution: "Замена x=2sin t → dx=2cos t dt, √\\(4-x²\\)=2cos t. Интеграл = ∫\\(2cos t dt\\)/\\(2sin t·2cos t\\) = \\(1/2\\)∫dt/sin t = \\(1/2\\)ln|tg\\(t/2\\)|. Обратная замена.", practice: "∫ dx/\\(x√\\(9-x²\\)\\)", practiceAns: "-\\frac{1}{3}\\ln\\\left|\\frac{3+\\sqrt{9-x^2}}{x}\\right| + C" },
        { name: "6.4 ∫ dx/\\(x√\\(x²+4\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2+4}}", answer: "-\\frac{1}{2}\\ln\\\left|\\frac{2+\\sqrt{x^2+4}}{x}\\right| + C", solution: "Замена x=2tg t → dx=2dt/cos²t, √\\(x²+4\\)=2/cos t. Интеграл = ∫dt/sin t = ln|tg\\(t/2\\)|.", practice: "∫ dx/\\(x√\\(x²+1\\)\\)", practiceAns: "-\\ln\\\left|\\frac{1+\\sqrt{x^2+1}}{x}\\right| + C" },
        { name: "6.5 ∫ dx/\\(x√\\(5x²-4x+4\\)\\)", integral: "\\frac{dx}{x\\sqrt{5x^2-4x+4}}", answer: "-\\frac{1}{2}\\ln\\\left|\\frac{2+\\sqrt{5x^2-4x+4}}{x}\\right| + C", solution: "Выносим √5: \\(1/√5\\)∫dx/\\(x√\\(x² - \\(4/5\\)x + 4/5\\)\\). Замена t=1/x.", practice: "∫ dx/\\(x√\\(2x²+2x+1\\)\\)", practiceAns: "-\\ln\\\left|\\frac{1+\\sqrt{2x^2+2x+1}}{x}\\right| + C" },
        { name: "6.6 ∫ dx/\\(x√\\(x²+2x+2\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2+2x+2}}", answer: "-\\ln\\\left|\\frac{1+\\sqrt{x^2+2x+2}}{x}\\right| + C", solution: "Замена t=1/x → x=1/t, dx=-dt/t². Под корнем: \\(1/t²+2/t+2\\) = \\(1+2t+2t²\\)/t². √\\(...\\) = √\\(1+2t+2t²\\)/|t|. Интеграл = -∫dt/√\\(2t²+2t+1\\).", practice: "∫ dx/\\(x√\\(x²+4x+5\\)\\)", practiceAns: "-\\ln\\\left|\\frac{2+\\sqrt{x^2+4x+5}}{x}\\right| + C" },
        { name: "6.7 ∫ dx/\\(x√\\(x²+x+1\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2+x+1}}", answer: "-\\ln\\\left|\\frac{1+\\sqrt{x^2+x+1}}{x}\\right| + C", solution: "Аналогично предыдущим, замена t=1/x.", practice: "∫ dx/\\(x√\\(x²-2x+2\\)\\)", practiceAns: "-\\ln\\\left|\\frac{1+\\sqrt{x^2-2x+2}}{x}\\right| + C" },
        { name: "6.8 ∫ dx/\\(x√\\(x²+4x+3\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2+4x+3}}", answer: "-\\frac{1}{\\sqrt{3}}\\ln\\\left|\\frac{\\sqrt{3}+\\sqrt{x^2+4x+3}}{x}\\right| + C", solution: "Замена t=1/x → x=1/t, dx=-dt/t². Под корнем: \\(1/t²+4/t+3\\) = \\(1+4t+3t²\\)/t². √\\(...\\) = √\\(3t²+4t+1\\)/|t|. Интеграл = -∫dt/√\\(3t²+4t+1\\).", practice: "∫ dx/\\(x√\\(x²+6x+8\\)\\)", practiceAns: "-\\frac{1}{2\\sqrt{2}}\\ln\\\left|\\frac{2\\sqrt{2}+\\sqrt{x^2+6x+8}}{x}\\right| + C" }
    ];
}

function getSection7Integrals() {
    return [
        { name: "7.1 ∫ dx/\\(x\\(x+2\\)\\)", integral: "\\frac{dx}{x\\(x+2\\)}", answer: "\\frac{1}{2}\\ln\\\left|\\frac{x}{x+2}\\right| + C", solution: "Разложение: 1/\\(x\\(x+2\\)\\) = A/x + B/\\(x+2\\) → A=1/2, B=-1/2. ∫ = \\(1/2\\)ln|x| - \\(1/2\\)ln|x+2|.", practice: "∫ dx/\\(x\\(x+3\\)\\)", practiceAns: "\\frac{1}{3}\\ln\\\left|\\frac{x}{x+3}\\right| + C" },
        { name: "7.2 ∫ x dx/\\(\\(x-1\\)\\(x+1\\)\\)", integral: "\\frac{x}{\\(x-1\\)\\(x+1\\)} dx", answer: "\\frac{1}{2}\\ln\\\left|\\frac{x^2-1}{x^2}\\right| + C", solution: "Разложение: x/\\(\\(x-1\\)\\(x+1\\)\\) = 1/2·\\(1/\\(x-1\\) + 1/\\(x+1\\)\\).", practice: "∫ x dx/\\(\\(x-2\\)\\(x+2\\)\\)", practiceAns: "\\frac{1}{2}\\ln|x^2-4| + C" },
        { name: "7.3 ∫ \\(x+1\\)/\\(\\(x-1\\)\\(x+2\\)\\) dx", integral: "\\frac{x+1}{\\(x-1\\)\\(x+2\\)} dx", answer: "\\frac{2}{3}\\ln|x-1| + \\frac{1}{3}\\ln|x+2| + C", solution: "Разложение: \\(x+1\\)/\\(\\(x-1\\)\\(x+2\\)\\) = A/\\(x-1\\) + B/\\(x+2\\). A=2/3, B=1/3.", practice: "∫ \\(x+2\\)/\\(\\(x-1\\)\\(x+3\\)\\) dx", practiceAns: "\\frac{3}{4}\\ln|x-1| + \\frac{1}{4}\\ln|x+3| + C" },
        { name: "7.4 ∫ \\(2x²+4x-11\\)/\\(\\(x-1\\)\\(x+3\\)\\(x-2\\)\\) dx", integral: "\\frac{2x^2+4x-11}{\\(x-1\\)\\(x+3\\)\\(x-2\\)} dx", answer: "\\ln|x-1| - \\ln|x+3| + \\ln|x-2| + C", solution: "Разложение: A/\\(x-1\\) + B/\\(x+3\\) + C/\\(x-2\\). A=1, B=-1, C=1.", practice: "∫ \\(x²+1\\)/\\(\\(x-1\\)\\(x+1\\)\\(x-2\\)\\) dx", practiceAns: "-\\frac{1}{2}\\ln|x-1| - \\frac{1}{6}\\ln|x+1| + \\frac{5}{3}\\ln|x-2| + C" },
        { name: "7.5 ∫ \\(x²-3x+2\\)/\\(x\\(x²+2x+1\\)\\) dx", integral: "\\frac{x^2-3x+2}{x\\(x^2+2x+1\\)} dx", answer: "2\\ln|x| - \\ln|x+1| - \\frac{2}{x+1} + C", solution: "x²+2x+1 = \\(x+1\\)². Разложение: A/x + B/\\(x+1\\) + D/\\(x+1\\)². A=2, B=-1, D=-2.", practice: "∫ \\(x²+1\\)/\\(x\\(x+1\\)²\\) dx", practiceAns: "\\ln|x| - \\frac{1}{x+1} + C" },
        { name: "7.6 ∫ \\(x⁵+x⁴-8\\)/\\(x³-4x\\) dx", integral: "\\frac{x^5+x^4-8}{x^3-4x} dx", answer: "\\frac{x^3}{3} + \\frac{x^2}{2} + 4x + \\frac{1}{2}\\ln|x| - \\ln|x-2| + \\frac{1}{2}\\ln|x+2| + C", solution: "Выделяем целую часть делением. Разложение остатка.", practice: "∫ \\(x⁴+1\\)/\\(x²-1\\) dx", practiceAns: "\\frac{x^3}{3} + x + \\frac{1}{2}\\ln\\\left|\\frac{x-1}{x+1}\\right| + C" },
        { name: "7.7 ∫ \\(x³+1\\)/\\(x³-x²\\) dx", integral: "\\frac{x^3+1}{x^3-x^2} dx", answer: "x + \\ln|x-1| - \\frac{1}{x} + C", solution: "Делим: \\(x³+1\\)/\\(x²\\(x-1\\)\\) = 1 + \\(x²+1\\)/\\(x²\\(x-1\\)\\).", practice: "∫ \\(x²+1\\)/\\(x²\\(x-1\\)\\) dx", practiceAns: "\\ln|x-1| - \\frac{1}{x} + C" },
        { name: "7.8 ∫ dx/\\(x\\(x²+1\\)\\)", integral: "\\frac{dx}{x\\(x^2+1\\)}", answer: "\\ln|x| - \\frac{1}{2}\\ln\\(x^2+1\\) + C", solution: "Разложение: A/x + \\(Bx+C\\)/\\(x²+1\\) → A=1, B=-1, C=0.", practice: "∫ dx/\\(x\\(x²+4\\)\\)", practiceAns: "\\frac{1}{4}\\ln|x| - \\frac{1}{8}\\ln\\(x^2+4\\) + C" },
        { name: "7.9 ∫ \\(x²+9\\)/\\(\\(x-1\\)\\(x²-4\\)\\) dx", integral: "\\frac{x^2+9}{\\(x-1\\)\\(x^2-4\\)} dx", answer: "-\\frac{10}{3}\\ln|x-1| + \\frac{13}{6}\\ln|x-2| + \\frac{5}{2}\\ln|x+2| + C", solution: "x²-4 = \\(x-2\\)\\(x+2\\). Разложение на три дроби.", practice: "∫ \\(x²+5\\)/\\(\\(x+1\\)\\(x²-1\\)\\) dx", practiceAns: "-\\frac{3}{2}\\ln|x+1| + \\frac{1}{2}\\ln|x-1| + \\frac{5}{2}\\ln|x+2| + C" },
        { name: "7.10 ∫ \\(x⁴-2\\)/\\(x³+4x²+4x\\) dx", integral: "\\frac{x^4-2}{x^3+4x^2+4x} dx", answer: "\\frac{x^2}{2} - 4x + 14\\ln|x| - 6\\ln|x+2| - \\frac{6}{x+2} + C", solution: "Выделяем целую часть. x³+4x²+4x = x\\(x+2\\)².", practice: "∫ \\(x³+1\\)/\\(x²+2x\\) dx", practiceAns: "\\frac{x^2}{2} - 2x + \\frac{1}{2}\\ln|x| + \\frac{3}{2}\\ln|x+2| + C" },
        { name: "7.11 ∫ \\(3x³+2\\)/\\(\\(x-1\\)\\(x-2\\)\\(x-3\\)\\) dx", integral: "\\frac{3x^3+2}{\\(x-1\\)\\(x-2\\)\\(x-3\\)} dx", answer: "3x + \\frac{5}{2}\\ln|x-1| - 26\\ln|x-2| + \\frac{83}{2}\\ln|x-3| + C", solution: "Выделяем целую часть: 3x³+2 делится на многочлен 3 степени. Разложение.", practice: "∫ \\(2x²+1\\)/\\(\\(x-1\\)\\(x-2\\)\\) dx", practiceAns: "2x + 3\\ln|x-1| + 9\\ln|x-2| + C" },
        { name: "7.12 ∫ \\(x²+2\\)/\\(\\(x-1\\)\\(x²-4x+3\\)\\) dx", integral: "\\frac{x^2+2}{\\(x-1\\)\\(x^2-4x+3\\)} dx", answer: "-\\frac{3}{2}\\ln|x-1| + \\frac{11}{4}\\ln|x-3| + \\frac{3}{4}\\ln|x-1| = \\frac{11}{4}\\ln|x-3| - \\frac{3}{4}\\ln|x-1| + C", solution: "x²-4x+3 = \\(x-1\\)\\(x-3\\). Знаменатель = \\(x-1\\)²\\(x-3\\).", practice: "∫ \\(x+1\\)/\\(\\(x-2\\)²\\(x+1\\)\\) dx", practiceAns: "-\\frac{1}{x-2} + C" },
        { name: "7.13 ∫ \\(1+4x²\\)/\\(x\\(x²+2x+1\\)\\) dx", integral: "\\frac{1+4x^2}{x\\(x^2+2x+1\\)} dx", answer: "\\ln|x| + 3\\ln|x+1| - \\frac{3}{x+1} + C", solution: "x²+2x+1 = \\(x+1\\)². Разложение: A/x + B/\\(x+1\\) + D/\\(x+1\\)².", practice: "∫ \\(1+2x²\\)/\\(x\\(x+1\\)²\\) dx", practiceAns: "\\ln|x| + \\ln|x+1| - \\frac{1}{x+1} + C" },
        { name: "7.14 ∫ \\(x+1\\)/\\(\\(x-1\\)²\\(x+2\\)\\) dx", integral: "\\frac{x+1}{\\(x-1\\)^2\\(x+2\\)} dx", answer: "\\frac{2}{9}\\ln|x-1| - \\frac{2}{3\\(x-1\\)} - \\frac{2}{9}\\ln|x+2| + C", solution: "Разложение: A/\\(x-1\\) + B/\\(x-1\\)² + C/\\(x+2\\).", practice: "∫ \\(x+2\\)/\\(\\(x-1\\)²\\(x+3\\)\\) dx", practiceAns: "-\\frac{1}{16}\\ln|x-1| - \\frac{3}{4\\(x-1\\)} + \\frac{1}{16}\\ln|x+3| + C" },
        { name: "7.15 ∫ \\(5x²-12\\)/\\(x\\(x²-6x+13\\)\\) dx", integral: "\\frac{5x^2-12}{x\\(x^2-6x+13\\)} dx", answer: "-\\frac{12}{13}\\ln|x| + \\frac{77}{13}\\ln|x^2-6x+13| - \\frac{90}{13}\\arctan\\frac{x-3}{2} + C", solution: "Разложение: A/x + \\(Bx+C\\)/\\(x²-6x+13\\).", practice: "∫ \\(x²+1\\)/\\(x\\(x²+2x+5\\)\\) dx", practiceAns: "\\frac{1}{5}\\ln|x| + \\frac{2}{5}\\ln\\(x^2+2x+5\\) - \\frac{4}{5}\\arctan\\frac{x+1}{2} + C" },
        { name: "7.16 ∫ x²/\\(1-x⁴\\) dx", integral: "\\frac{x^2}{1-x^4} dx", answer: "\\frac{1}{4}\\ln\\\left|\\frac{1+x}{1-x}\\right| - \\frac{1}{2}\\arctan x + C", solution: "1-x⁴ = \\(1-x\\)\\(1+x\\)\\(1+x²\\). Разложение: A/\\(1-x\\) + B/\\(1+x\\) + \\(Cx+D\\)/\\(1+x²\\).", practice: "∫ x/\\(1-x⁴\\) dx", practiceAns: "\\frac{1}{4}\\ln\\\left|\\frac{1+x^2}{1-x^2}\\right| + C" },
        { name: "7.17 ∫ \\(x⁴+1\\)/\\(x³-x²+x-1\\) dx", integral: "\\frac{x^4+1}{x^3-x^2+x-1} dx", answer: "\\frac{x^2}{2} + x + \\frac{1}{2}\\ln\\(x^2+1\\) + \\arctan x + C", solution: "Делим: x⁴+1 на x³-x²+x-1 = \\(x-1\\)\\(x²+1\\).", practice: "∫ \\(x³+1\\)/\\(x²-1\\) dx", practiceAns: "\\frac{x^2}{2} + x + \\ln|x-1| + C" },
        { name: "7.18 ∫ dx/\\(x⁴+x²\\)", integral: "\\frac{dx}{x^4+x^2}", answer: "-\\frac{1}{x} - \\arctan x + C", solution: "x⁴+x² = x²\\(x²+1\\). Разложение: A/x + B/x² + \\(Cx+D\\)/\\(x²+1\\).", practice: "∫ dx/\\(x³+x\\)", practiceAns: "\\ln|x| - \\frac{1}{2}\\ln\\(x^2+1\\) + C" },
        { name: "7.19 ∫ \\(x³+3x+2\\)/\\(x²+2x+1\\) dx", integral: "\\frac{x^3+3x+2}{x^2+2x+1} dx", answer: "\\frac{x^2}{2} - x + 4\\ln|x+1| - \\frac{3}{x+1} + C", solution: "Делим уголком. Знаменатель = \\(x+1\\)².", practice: "∫ \\(x²+2x+3\\)/\\(x+1\\)² dx", practiceAns: "x + \\ln|x+1| - \\frac{2}{x+1} + C" },
        { name: "7.20 ∫ \\(x²-2x+3\\)/\\(\\(x-2\\)\\(x²+1\\)\\) dx", integral: "\\frac{x^2-2x+3}{\\(x-2\\)\\(x^2+1\\)} dx", answer: "\\frac{3}{5}\\ln|x-2| + \\frac{1}{5}\\ln\\(x^2+1\\) + \\frac{4}{5}\\arctan x + C", solution: "Разложение: A/\\(x-2\\) + \\(Bx+C\\)/\\(x²+1\\).", practice: "∫ \\(x²+3\\)/\\(\\(x-1\\)\\(x²+4\\)\\) dx", practiceAns: "\\frac{4}{5}\\ln|x-1| + \\frac{1}{10}\\ln\\(x^2+4\\) + \\frac{1}{5}\\arctan\\frac{x}{2} + C" }
    ];
}
function getSection8Integrals() {
    return [
        { name: "8.1 ∫ sin³2x·cos⁴2x dx", integral: "\\sin^3 2x \\cos^4 2x dx", answer: "\\frac{\\cos^7 2x}{14} - \\frac{\\cos^5 2x}{10} + C", solution: "Нечётная степень синуса → u=cos2x, du=-2sin2x dx. sin³2x = \\(1-cos²2x\\)sin2x. ∫\\(1-u²\\)u⁴·\\(-du/2\\) = -\\(1/2\\)∫\\(u⁴-u⁶\\)du = -\\(1/2\\)\\(u⁵/5 - u⁷/7\\) = u⁷/14 - u⁵/10.", practice: "∫ sin³x·cos²x dx", practiceAns: "\\frac{\\cos^5 x}{5} - \\frac{\\cos^3 x}{3} + C" },
        { name: "8.2 ∫ cos⁵x/√\\(sin x\\) dx", integral: "\\frac{\\cos^5 x}{\\sqrt{\\sin x}} dx", answer: "2\\sqrt{\\sin x} - \\frac{4}{5}\\(\\sin x\\)^{5/2} + \\frac{2}{9}\\(\\sin x\\)^{9/2} + C", solution: "cos⁵x = \\(1-sin²x\\)²·cos x. u=sin x, du=cos x dx. ∫\\(1-u²\\)²·u^{-1/2}du = ∫\\(u^{-1/2} - 2u^{3/2} + u^{7/2}\\)du.", practice: "∫ sin³x·√\\(cos x\\) dx", practiceAns: "-2\\(\\cos x\\)^{3/2} + \\frac{2}{7}\\(\\cos x\\)^{7/2} + C" },
        { name: "8.3 ∫ sin²x·cos²x dx", integral: "\\sin^2 x \\cos^2 x dx", answer: "\\frac{x}{8} - \\frac{\\sin 4x}{32} + C", solution: "sin²x·cos²x = \\(1/4\\)sin²2x = \\(1/4\\)·\\(1-cos4x\\)/2 = \\(1/8\\)\\(1-cos4x\\). ∫ = x/8 - sin4x/32.", practice: "∫ sin²x·cos⁴x dx", practiceAns: "\\frac{x}{16} - \\frac{\\sin 4x}{64} + \\frac{\\sin^3 2x}{48} + C" },
        { name: "8.4 ∫ sin⁴3x dx", integral: "\\sin^4 3x dx", answer: "\\frac{3x}{8} - \\frac{\\sin 6x}{12} + \\frac{\\sin 12x}{96} + C", solution: "sin⁴θ = \\(3/8\\) - \\(1/2\\)cos2θ + \\(1/8\\)cos4θ. Здесь θ=3x.", practice: "∫ cos⁴2x dx", practiceAns: "\\frac{3x}{8} + \\frac{\\sin 4x}{8} + \\frac{\\sin 8x}{64} + C" },
        { name: "8.5 ∫ tg 4x dx", integral: "\\tan 4x dx", answer: "-\\frac{1}{4}\\ln|\\cos 4x| + C", solution: "∫tg u du = -ln|cos u|, u=4x, du=4dx → dx=du/4.", practice: "∫ ctg 5x dx", practiceAns: "\\frac{1}{5}\\ln|\\sin 5x| + C" },
        { name: "8.6 ∫ ctg⁴5x dx", integral: "\\cot^4 5x dx", answer: "-\\frac{1}{5}\\cot^3 5x + \\frac{1}{5}\\cot 5x + x + C", solution: "ctg⁴u = ctg²u·\\(1+csc²u\\) - 1. Или через понижение степени.", practice: "∫ tg³2x dx", practiceAns: "\\frac{1}{4}\\tan^2 2x - \\frac{1}{2}\\ln|\\cos 2x| + C" },
        { name: "8.7 ∫ dx/\\(2+sin²x\\)", integral: "\\frac{dx}{2+\\sin^2 x}", answer: "\\frac{1}{\\sqrt{6}}\\arctan\\\left\\(\\sqrt{\\frac{3}{2}}\\tan x\\right\\) + C", solution: "Делим на cos²x: ∫dx/\\(2cos²x+sin²x\\) = ∫dx/\\(2cos²x+sin²x\\) = ∫\\(dx/cos²x\\)/\\(2+tg²x\\) = ∫dtgx/\\(2+tg²x\\).", practice: "∫ dx/\\(1+sin²x\\)", practiceAns: "\\frac{1}{\\sqrt{2}}\\arctan\\(\\sqrt{2}\\tan x\\) + C" },
        { name: "8.8 ∫ dx/\\(5-3cos x\\)", integral: "\\frac{dx}{5-3\\cos x}", answer: "\\frac{1}{2}\\arctan\\\left\\(2\\tan\\frac{x}{2}\\right\\) + C", solution: "Универсальная подстановка t=tg\\(x/2\\), cos x = \\(1-t²\\)/\\(1+t²\\), dx=2dt/\\(1+t²\\). ∫2dt/\\(5\\(1+t²\\)-3\\(1-t²\\)\\) = ∫2dt/\\(2+8t²\\) = ∫dt/\\(1+4t²\\) = \\(1/2\\)arctan\\(2t\\).", practice: "∫ dx/\\(3-2cos x\\)", practiceAns: "\\frac{2}{\\sqrt{5}}\\arctan\\\left\\(\\sqrt{5}\\tan\\frac{x}{2}\\right\\) + C" },
        { name: "8.9 ∫ dx/\\(1+sin2x\\)", integral: "\\frac{dx}{1+\\sin 2x}", answer: "-\\frac{1}{2}\\cot\\\left\\(\\frac{\\pi}{4}+x\\right\\) + C", solution: "1+sin2x = \\(sin x+cos x\\)². ∫dx/\\(sin x+cos x\\)² = ∫dx/\\(2cos²\\(x-π/4\\)\\) = \\(1/2\\)∫dx/cos²\\(x-π/4\\) = \\(1/2\\)tg\\(x-π/4\\).", practice: "∫ dx/\\(1-cos2x\\)", practiceAns: "-\\frac{1}{2}\\cot x + C" },
        { name: "8.10 ∫ cos3x·cos5x dx", integral: "\\cos 3x \\cos 5x dx", answer: "\\frac{1}{4}\\sin 2x + \\frac{1}{16}\\sin 8x + C", solution: "cosA·cosB = ½[cos\\(A-B\\)+cos\\(A+B\\)]. = ½\\(cos2x+cos8x\\).", practice: "∫ sin4x·cos6x dx", practiceAns: "\\frac{1}{4}\\cos 2x - \\frac{1}{20}\\cos 10x + C" },
        { name: "8.11 ∫ sin3x·cos7x dx", integral: "\\sin 3x \\cos 7x dx", answer: "-\\frac{1}{8}\\cos 4x + \\frac{1}{20}\\cos 10x + C", solution: "sinA·cosB = ½[sin\\(A+B\\)+sin\\(A-B\\)]. = ½\\(sin10x + sin\\(-4x\\)\\) = ½\\(sin10x - sin4x\\).", practice: "∫ sin5x·sin3x dx", practiceAns: "\\frac{1}{4}\\sin 2x - \\frac{1}{16}\\sin 8x + C" },
        { name: "8.12 ∫ sin⁵3x dx", integral: "\\sin^5 3x dx", answer: "-\\frac{1}{3}\\cos 3x + \\frac{2}{9}\\cos^3 3x - \\frac{1}{15}\\cos^5 3x + C", solution: "sin⁵u = \\(1-cos²u\\)²·sin u. u=3x, du=3dx → dx=du/3. ∫\\(1-cos²u\\)²·sin u·du/3 = -1/3∫\\(1-2t²+t⁴\\)dt, t=cos u.", practice: "∫ cos⁵2x dx", practiceAns: "\\frac{1}{2}\\sin 2x - \\frac{1}{3}\\sin^3 2x + \\frac{1}{10}\\sin^5 2x + C" },
        { name: "8.13 ∫ tg³2x dx", integral: "\\tan^3 2x dx", answer: "\\frac{1}{4}\\tan^2 2x - \\frac{1}{2}\\ln|\\cos 2x| + C", solution: "tg³u = tg u·\\(tg²u\\) = tg u·\\(sec²u-1\\) = tg u·sec²u - tg u. u=2x, du=2dx.", practice: "∫ ctg³3x dx", practiceAns: "-\\frac{1}{6}\\cot^2 3x - \\frac{1}{3}\\ln|\\sin 3x| + C" },
        { name: "8.14 ∫ sin²x·cos⁴x dx", integral: "\\sin^2 x \\cos^4 x dx", answer: "\\frac{x}{16} - \\frac{\\sin 4x}{64} + \\frac{\\sin^3 2x}{48} + C", solution: "sin²x·cos⁴x = \\(1-cos2x\\)/2·\\(\\(1+cos2x\\)/2\\)² = \\(1/8\\)\\(1-cos2x\\)\\(1+2cos2x+cos²2x\\).", practice: "∫ sin⁴x·cos²x dx", practiceAns: "\\frac{x}{16} - \\frac{\\sin 4x}{64} - \\frac{\\sin^3 2x}{48} + C" },
        { name: "8.15 ∫ sin4x/\\(1-cos4x\\)² dx", integral: "\\frac{\\sin 4x}{\\(1-\\cos 4x\\)^2} dx", answer: "\\frac{1}{4\\(1-\\cos 4x\\)} + C", solution: "u=1-cos4x, du=4sin4x dx → sin4x dx = du/4. ∫du/\\(4u²\\) = -1/\\(4u\\).", practice: "∫ sin2x/\\(1+cos2x\\)² dx", practiceAns: "-\\frac{1}{2\\(1+\\cos 2x\\)} + C" },
        { name: "8.16 ∫ dx/\\(cos x+sin x\\)²", integral: "\\frac{dx}{\\(\\cos x+\\sin x\\)^2}", answer: "\\frac{1}{2}\\tan\\\left\\(x-\\frac{\\pi}{4}\\right\\) + C", solution: "cos x+sin x = √2·cos\\(x-π/4\\). ∫dx/\\(2cos²\\(x-π/4\\)\\) = \\(1/2\\)tg\\(x-π/4\\).", practice: "∫ dx/\\(cos x-sin x\\)²", practiceAns: "-\\frac{1}{2}\\cot\\\left\\(x+\\frac{\\pi}{4}\\right\\) + C" },
        { name: "8.17 ∫ dx/sin³x", integral: "\\frac{dx}{\\sin^3 x}", answer: "-\\frac{1}{2}\\cot x \\csc x + \\frac{1}{2}\\ln|\\csc x - \\cot x| + C", solution: "∫csc³x dx = -½·csc x·cot x + ½·ln|csc x - cot x| — табличная формула.", practice: "∫ dx/cos³x", practiceAns: "\\frac{1}{2}\\sec x\\tan x + \\frac{1}{2}\\ln|\\sec x+\\tan x| + C" },
        { name: "8.18 ∫ dx/\\(2-4cos²2x\\)", integral: "\\frac{dx}{2-4\\cos^2 2x}", answer: "\\frac{1}{4}\\ln\\\left|\\frac{\\tan 2x+1}{\\tan 2x-1}\\right| + C", solution: "Делим на cos²2x: ∫dx/\\(2cos²2x-4cos²2x\\) — проще через универсальную подстановку или замену t=tg2x.", practice: "∫ dx/\\(1-3cos²x\\)", practiceAns: "\\frac{1}{2\\sqrt{2}}\\ln\\\left|\\frac{\\sqrt{2}+\\tan x}{\\sqrt{2}-\\tan x}\\right| + C" },
        { name: "8.19 ∫ dx/\\(1-3cos4x\\)", integral: "\\frac{dx}{1-3\\cos 4x}", answer: "\\frac{1}{2\\sqrt{2}}\\arctan\\\left\\(\\sqrt{2}\\tan 2x\\right\\) + C", solution: "Универсальная подстановка t=tg2x.", practice: "∫ dx/\\(2-cos2x\\)", practiceAns: "\\frac{1}{\\sqrt{3}}\\arctan\\\left\\(\\sqrt{3}\\tan x\\right\\) + C" },
        { name: "8.20 ∫ \\(2-sin x\\)/\\(2+cos x\\) dx", integral: "\\frac{2-\\sin x}{2+\\cos x} dx", answer: "2x - 2\\ln|2+\\cos x| - \\frac{1}{2}\\ln\\\left|\\frac{1+\\tan\\(x/2\\)}{1-\\tan\\(x/2\\)}\\right| + C", solution: "Универсальная подстановка t=tg\\(x/2\\).", practice: "∫ \\(1+sin x\\)/\\(1+cos x\\) dx", practiceAns: "\\tan\\frac{x}{2} + C" },
        { name: "8.21 ∫ sin2x·sin6x dx", integral: "\\sin 2x \\sin 6x dx", answer: "\\frac{1}{8}\\sin 4x - \\frac{1}{16}\\sin 8x + C", solution: "sinA·sinB = ½[cos\\(A-B\\)-cos\\(A+B\\)] = ½\\(cos4x-cos8x\\).", practice: "∫ cos2x·cos4x dx", practiceAns: "\\frac{1}{4}\\sin 2x + \\frac{1}{12}\\sin 6x + C" },
        { name: "8.22 ∫ dx/\\(sin x-2cos x+1\\)", integral: "\\frac{dx}{\\sin x-2\\cos x+1}", answer: "-\\frac{2}{\\sqrt{5}}\\arctan\\\left\\(\\frac{1-2\\tan\\(x/2\\)}{\\sqrt{5}}\\right\\) + C", solution: "Универсальная подстановка t=tg\\(x/2\\).", practice: "∫ dx/\\(sin x+cos x+1\\)", practiceAns: "\\ln\\\left|1+\\tan\\frac{x}{2}\\right| + C" },
        { name: "8.23 ∫ sin\\(2x\\)/cos⁵\\(2x\\) dx", integral: "\\frac{\\sin 2x}{\\cos^5 2x} dx", answer: "\\frac{1}{8\\cos^4 2x} + C", solution: "u=cos2x, du=-2sin2x dx → sin2x dx = -du/2. ∫\\(-du/2\\)/u⁵ = -\\(1/2\\)∫u^{-5}du = \\(1/8\\)u^{-4}.", practice: "∫ cos x/sin⁴x dx", practiceAns: "-\\frac{1}{3\\sin^3 x} + C" },
        { name: "8.24 ∫ \\(3cos4x - 3^{2-x} + 4√\\(5-2x\\)\\) dx", integral: "\\(3\\cos 4x - 3^{2-x} + 4\\sqrt{5-2x}\\) dx", answer: "\\frac{3}{4}\\sin 4x + \\frac{3^{2-x}}{\\ln 3} - \\frac{4}{3}\\(5-2x\\)^{3/2} + C", solution: "∫3cos4x dx = 3·\\(1/4\\)sin4x; ∫-3^{2-x}dx = 3^{2-x}/ln3; 4∫\\(5-2x\\)^{1/2}dx = 4·\\(-1/2\\)·\\(2/3\\)\\(5-2x\\)^{3/2} = -4/3\\(5-2x\\)^{3/2}.", practice: "∫ \\(2\\sin 5x - 2^{3-x} + 3\\sqrt{4-3x}\\) dx", practiceAns: "-\\frac{2}{5}\\cos 5x + \\frac{2^{3-x}}{\\ln 2} - \\frac{2}{3}\\(4-3x\\)^{3/2} + C" },
        { name: "8.25 ∫ tg²x dx", integral: "\\tan^2 x dx", answer: "\\tan x - x + C", solution: "tg²x = sec²x - 1. ∫sec²x dx = tg x, ∫-1 dx = -x.", practice: "∫ ctg²x dx", practiceAns: "-\\cot x - x + C" }
    ];
}
function getSection9Integrals() {
    return [
        { name: "9.1 ∫ √\\(\\(4-x²\\)³\\)/x⁶ dx", integral: "\\frac{\\sqrt{\\(4-x^2\\)^3}}{x^6} dx", answer: "-\\frac{\\(4-x^2\\)^{5/2}}{20x^5} + C", solution: "x=2sin t, dx=2cos t dt. √\\(4-x²\\)=2cos t. Выражение = \\(2cos t\\)³/\\(32sin⁶t\\)·2cos t dt = 16cos⁴t/\\(32sin⁶t\\) dt = \\(1/2\\)∫ctg⁴t·csc²t dt. u=ctg t, du=-csc²t dt → -1/2∫u⁴ du = -u⁵/10.", practice: "∫ √\\(\\(9-x²\\)³\\)/x⁵ dx", practiceAns: "-\\frac{\\(9-x^2\\)^{5/2}}{45x^4} + C" },
        { name: "9.2 ∫ √\\(9+x²\\)/x⁴ dx", integral: "\\frac{\\sqrt{9+x^2}}{x^4} dx", answer: "-\\frac{\\(9+x^2\\)^{3/2}}{27x^3} + C", solution: "x=3tg t, dx=3dt/cos²t. √\\(9+x²\\)=3/cos t. Выражение = \\(3/cos t\\)/\\(81 tg⁴t\\)·\\(3dt/cos²t\\) = 9dt/\\(81 tg⁴t cos³t\\) = \\(1/9\\)∫cos t/sin⁴t dt = \\(1/9\\)∫u^{-4}du, u=sin t.", practice: "∫ √\\(4+x²\\)/x³ dx", practiceAns: "-\\frac{\\sqrt{4+x^2}}{2x^2} + \\frac{1}{2}\\ln\\\left|\\frac{\\sqrt{4+x^2}-2}{x}\\right| + C" },
        { name: "9.3 ∫ dx/√\\(\\(x²-1\\)³\\)", integral: "\\frac{dx}{\\sqrt{\\(x^2-1\\)^3}}", answer: "-\\frac{x}{\\sqrt{x^2-1}} + C", solution: "x=sec t, dx=sec t·tg t dt. \\(x²-1\\)^{3/2} = tg³t. Интеграл = ∫\\(sec t·tg t\\)/tg³t dt = ∫cos t/sin²t dt = ∫u^{-2}du, u=sin t = -1/sin t = -1/√\\(1-1/x²\\) = -x/√\\(x²-1\\).", practice: "∫ dx/√\\(\\(x²-4\\)³\\)", practiceAns: "-\\frac{x}{4\\sqrt{x^2-4}} + C" },
        { name: "9.4 ∫ √\\(25-x²\\) dx", integral: "\\sqrt{25-x^2} dx", answer: "\\frac{25}{2}\\arcsin\\frac{x}{5} + \\frac{x\\sqrt{25-x^2}}{2} + C", solution: "x=5sin t, dx=5cos t dt. ∫√\\(25-25sin²t\\)·5cos t dt = ∫5cos t·5cos t dt = 25∫cos²t dt = 25∫\\(1+cos2t\\)/2 dt = 25\\(t/2 + sin2t/4\\) = 25t/2 + \\(25/2\\)sin t cos t. Обратная замена: t=arcsin\\(x/5\\), sin t=x/5, cos t=√\\(1-x²/25\\) = √\\(25-x²\\)/5.", practice: "∫ √\\(9-x²\\) dx", practiceAns: "\\frac{9}{2}\\arcsin\\frac{x}{3} + \\frac{x\\sqrt{9-x^2}}{2} + C" },
        { name: "9.5 ∫ x³/√\\(x²+16\\) dx", integral: "\\frac{x^3}{\\sqrt{x^2+16}} dx", answer: "\\frac{\\(x^2+16\\)^{3/2}}{3} - 16\\sqrt{x^2+16} + C", solution: "Замена u=x²+16, du=2x dx, x²=u-16. ∫\\(x²·x dx\\)/√\\(x²+16\\) = ∫\\(u-16\\)/√u·\\(du/2\\) = \\(1/2\\)∫\\(u^{1/2}-16u^{-1/2}\\)du = \\(1/2\\)\\(\\(2/3\\)u^{3/2} - 32u^{1/2}\\) = u^{3/2}/3 - 16u^{1/2}.", practice: "∫ x/√\\(x²+9\\) dx", practiceAns: "\\sqrt{x^2+9} + C" },
        { name: "9.6 ∫ √\\(x²-4\\)/x dx", integral: "\\frac{\\sqrt{x^2-4}}{x} dx", answer: "\\sqrt{x^2-4} - 2\\arcsec\\frac{x}{2} + C", solution: "x=2sec t, dx=2sec t·tg t dt. √\\(x²-4\\)=2tg t. Интеграл = ∫\\(2tg t\\)/\\(2sec t\\)·2sec t·tg t dt = ∫2tg²t dt = 2∫\\(sec²t-1\\)dt = 2tg t - 2t. t = arcsec\\(x/2\\).", practice: "∫ √\\(x²-9\\)/x dx", practiceAns: "\\sqrt{x^2-9} - 3\\arcsec\\frac{x}{3} + C" },
        { name: "9.7 ∫ √\\(9-x²\\)/x² dx", integral: "\\frac{\\sqrt{9-x^2}}{x^2} dx", answer: "-\\frac{\\sqrt{9-x^2}}{x} - \\arcsin\\frac{x}{3} + C", solution: "x=3sin t, dx=3cos t dt. √\\(9-x²\\)=3cos t. Интеграл = ∫\\(3cos t\\)/\\(9sin²t\\)·3cos t dt = ∫cos²t/sin²t dt = ∫ctg²t dt = ∫\\(csc²t-1\\)dt = -ctg t - t. ctg t = cos t/sin t = √\\(9-x²\\)/x.", practice: "∫ √\\(4-x²\\)/x² dx", practiceAns: "-\\frac{\\sqrt{4-x^2}}{x} - \\arcsin\\frac{x}{2} + C" },
        { name: "9.8 ∫ dx/\\(x√\\(x²+1\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2+1}}", answer: "-\\ln\\\left|\\frac{1+\\sqrt{x^2+1}}{x}\\right| + C", solution: "x=tg t, dx=dt/cos²t. √\\(x²+1\\)=1/cos t. Интеграл = ∫\\(dt/cos²t\\)/\\(\\(tg t\\)\\(1/cos t\\)\\) = ∫dt/\\(sin t\\) = ln|tg\\(t/2\\)| = ln|\\(1-cos t\\)/sin t|. Обратная замена даёт ответ.", practice: "∫ dx/\\(x√\\(x²+4\\)\\)", practiceAns: "-\\frac{1}{2}\\ln\\\left|\\frac{2+\\sqrt{x^2+4}}{x}\\right| + C" },
        { name: "9.9 ∫ dx/\\(x√\\(x²-1\\)\\)", integral: "\\frac{dx}{x\\sqrt{x^2-1}}", answer: "\\arcsec|x| + C", solution: "Табличный интеграл. x=sec t, dx=sec t·tg t dt. Интеграл = ∫\\(sec t·tg t\\)/\\(sec t·tg t\\) dt = ∫dt = t = arcsec x.", practice: "∫ dx/\\(x√\\(x²-4\\)\\)", practiceAns: "\\frac{1}{2}\\arcsec\\frac{x}{2} + C" },
        { name: "9.10 ∫ √\\(x²+2x+2\\) dx", integral: "\\sqrt{x^2+2x+2} dx", answer: "\\frac{x+1}{2}\\sqrt{x^2+2x+2} + \\frac{1}{2}\\ln|x+1+\\sqrt{x^2+2x+2}| + C", solution: "Выделяем квадрат: \\(x+1\\)²+1. √\\(t²+a²\\) → формула: \\(t/2\\)√\\(t²+a²\\) + \\(a²/2\\)ln|t+√\\(t²+a²\\)|.", practice: "∫ √\\(x²+4x+5\\) dx", practiceAns: "\\frac{x+2}{2}\\sqrt{x^2+4x+5} + \\frac{1}{2}\\ln|x+2+\\sqrt{x^2+4x+5}| + C" },
        { name: "9.11 ∫ dx/√\\(x²+2x+2\\)", integral: "\\frac{dx}{\\sqrt{x^2+2x+2}}", answer: "\\ln|x+1+\\sqrt{x^2+2x+2}| + C", solution: "Выделяем квадрат: \\(x+1\\)²+1. ∫dt/√\\(t²+1\\) = ln|t+√\\(t²+1\\)|.", practice: "∫ dx/√\\(x²+4x+8\\)", practiceAns: "\\ln|x+2+\\sqrt{x^2+4x+8}| + C" },
        { name: "9.12 ∫ √\\(x²-4x+3\\) dx", integral: "\\sqrt{x^2-4x+3} dx", answer: "\\frac{x-2}{2}\\sqrt{x^2-4x+3} - \\frac{1}{2}\\ln|x-2+\\sqrt{x^2-4x+3}| + C", solution: "Выделяем квадрат: \\(x-2\\)²-1. √\\(t²-a²\\) → формула: \\(t/2\\)√\\(t²-a²\\) - \\(a²/2\\)ln|t+√\\(t²-a²\\)|.", practice: "∫ √\\(x²-2x\\) dx", practiceAns: "\\frac{x-1}{2}\\sqrt{x^2-2x} - \\frac{1}{2}\\ln|x-1+\\sqrt{x^2-2x}| + C" }
    ];
}

