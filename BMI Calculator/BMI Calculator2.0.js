// ===================== 获取页面元素 =====================
const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');
const continueBtn = document.getElementById('continueBtn');
const resultEl = document.getElementById('result');
const bmiValueEl = document.getElementById('bmiValue');
const themeBtn = document.getElementById('themeBtn');
const themeKnob = themeBtn.querySelector('.knob');

// ===================== 核心计算 =====================
function runCalculation() {
    // 从输入框读取身高和体重，不再使用 prompt 弹窗
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    // 原 BMI 公式保持不变
    const bmi = weight / (height * height);

    let result;
    let level;

    if (bmi >= 32) {
        result = '严重肥胖';
        level = 'severe';
    } else if (bmi >= 28) {
        result = '肥胖';
        level = 'obese';
    } else if (bmi >= 25) {
        result = '过重';
        level = 'over';
    } else if (bmi >= 18.5) {
        result = '正常';
        level = 'normal';
    } else {
        result = '过轻';
        level = 'under';
    }

    // 同步更新结果文字、颜色等级和 BMI 数值
    resultEl.textContent = result;
    resultEl.dataset.level = level;
    bmiValueEl.textContent = Number.isFinite(bmi) ? bmi.toFixed(1) : '--';
}

// ===================== 主题切换 =====================
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    try {
        localStorage.setItem('bmi-theme', theme);
    } catch (e) {}

    if (themeKnob) {
        themeKnob.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// 初始化主题图标（data-theme 已在 HTML 头部提前设置）
setTheme(document.documentElement.getAttribute('data-theme') || 'light');

themeBtn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===================== 事件绑定 =====================
continueBtn.addEventListener('click', runCalculation);

// 在身高/体重输入框内按回车也可以直接计算
[heightInput, weightInput].forEach(function (input) {
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            runCalculation();
        }
    });
});