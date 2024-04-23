document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = '';
    let firstOperand = null;
    let operator = null;

    function clearDisplay() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        display.value = '';
    }

    function handleNumberClick(value) {
        currentInput += value;
        display.value = currentInput;
    }

    function handleOperatorClick(value) {
        if (currentInput === '') return; // Ignore operator if no number entered
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            currentInput = '';
        } else {
            const secondOperand = parseFloat(currentInput);
            const result = calculate(firstOperand, operator, secondOperand);
            display.value = result;
            firstOperand = result;
            operator = value;
            currentInput = '';
        }
    }

    function calculate(firstOperand, operator, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;
            if (!isNaN(parseFloat(value)) || value === '.') {
                handleNumberClick(value);
            } else if (value === 'clear') {
                clearDisplay();
            } else {
                handleOperatorClick(value);
            }
        });
    });
});
