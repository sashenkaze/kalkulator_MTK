// Basic Calculator Variables
let currentInput = '';
let currentOperator = '';
let previousInput = '';
let waitingForSecondOperand = false;

// Calculator Type Switching
function switchCalculator(type) {
    document.querySelectorAll('.calc-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.calculator-type button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${type}Calc`).classList.add('active');
    document.getElementById(`${type}Btn`).classList.add('active');
}

// Basic Calculator Functions
function appendNumber(num) {
    if (waitingForSecondOperand) {
        currentInput = num;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        currentOperator = operator;
        previousInput = currentInput;
        waitingForSecondOperand = true;
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    if (previousInput !== '' && currentOperator) {
        display.value = `${previousInput} ${currentOperator} ${currentInput}`;
    } else {
        display.value = currentInput || '0';
    }
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch(currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
        }

        currentInput = result.toString();
        currentOperator = '';
        previousInput = '';
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

// Keyboard Input Handler
document.addEventListener('keydown', (event) => {
    // Only handle keyboard events when basic calculator is active
    if (!document.getElementById('basicCalc').classList.contains('active')) {
        return;
    }

    // Prevent default behavior for calculator keys
    if (
        /[\d\+\-\*\/\.\=]/.test(event.key) ||
        event.key === 'Enter' ||
        event.key === 'Escape' ||
        event.key === 'Backspace'
    ) {
        event.preventDefault();
    }

    // Handle number keys and decimal point
    if (/[\d\.]/.test(event.key)) {
        appendNumber(event.key);
    }
    // Handle operators
    else if (/[\+\-\*\/]/.test(event.key)) {
        appendOperator(event.key);
    }
    // Handle enter/equal for calculation
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    }
    // Handle escape for clear
    else if (event.key === 'Escape') {
        clearDisplay();
    }
    // Handle backspace
    else if (event.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
});

// Sequence Calculator Functions
function calculateSequence() {
    const type = document.getElementById('sequenceType').value;
    const a = parseFloat(document.getElementById('firstTerm').value);
    const value = parseFloat(document.getElementById('commonValue').value);
    const n = parseInt(document.getElementById('nthTerm').value);
    let result = '';

    if (!isNaN(a) && !isNaN(value) && !isNaN(n)) {
        if (type === 'arithmetic') {
            // Un = a + (n-1)b
            const nthTerm = a + (n - 1) * value;
            result = `<div class="result-label">Hasil Barisan Aritmatika:</div>
                     U<sub>${n}</sub> = ${nthTerm.toFixed(2)}`;
        } else {
            // Un = a * r^(n-1)
            const nthTerm = a * Math.pow(value, n - 1);
            result = `<div class="result-label">Hasil Barisan Geometri:</div>
                     U<sub>${n}</sub> = ${nthTerm.toFixed(2)}`;
        }
    } else {
        result = '<div class="result-label">Mohon isi semua kolom dengan angka yang valid</div>';
    }

    document.getElementById('sequenceResult').innerHTML = result;
}

// Initialize
updateDisplay();