function initiate() {
    // Create the main container
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    container.style.gap = '10px';
    container.style.width = '400px';
    container.style.margin = '0 auto';

    // Create the input/output field
    const display = document.createElement('input');
    display.type = 'text';
    display.readOnly = true;
    display.style.gridColumn = 'span 4';
    display.style.height = '80px';
    display.style.textAlign = 'right';
    display.style.fontSize = '4em';
    container.appendChild(display);

    // Button labels
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    // Create buttons
    buttons.forEach(label => {
        const button = document.createElement('button');
        button.textContent = label;
        button.style.height = '80px';
        button.style.fontSize = '4em';
        container.appendChild(button);
    });

    // Create the clear button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'C';
    clearButton.style.height = '80px';
    clearButton.style.gridColumn = 'span 4';
    clearButton.style.fontSize = '4em';
    container.appendChild(clearButton);

function calculate() {
    try {
        switch (operator) {
            case '+':
                term1 = display.value = +term1 + +term2;
                term2 = '';
                break;
            case '-':
                term1 = display.value = +term1 - +term2;
                term2 = '';
                break;
            case '*':
                term1 = display.value = +term1 * +term2;
                term2 = '';
                break;
            case '/':
                if (+term2 === 0) {
                    display.value = 'You suck!';
                    alert('You suck at math!');
                    term1 = term2 = operator = '';
                    break;
                }
                term1 = display.value = (+term1 / +term2).toPrecision(MAX_DISPLAY_SIZE);
                term2 = '';
                break;
        }
        reset = true;
        operator = '';
    } catch {
        display.value = 'Error';
    } 
}

function clearOutput() {
    if (display.value === '') {
        term1 = '';
        reset = true;
    } else {
        display.value = '';
        operator = '';
    }
}

function updateDisplay(input) {
    if (display.value === 'Error') {
        display.value = '';
    }
    if (!operator && !operators.includes(input)) {
        if (reset) {
            term1 = display.value = '';
            reset = false;
        }
        if (!(input === '.') || (!term1.includes('.') && !!term1)) {
            term1 = display.value += input;
        }
    }else if (!operator && operators.includes(input) && !!term1) {
        operator = input;
        display.value += input;
    } else if (!!operator && !operators.includes(input)){
        if (!(input === '.') || (!term2.includes('.') && !!term2)) {
            display.value += input;
            term2 += input;
        }
    }
}


    // Add event listeners to buttons
    container.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '=') {
                    calculate();
                } else if (button.textContent === 'C') {
                clearOutput();
            } else {
                updateDisplay(button.textContent);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (buttons.includes(key)) {
            updateDisplay(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            clearOutput();
        }
    });

    // Append the container to the body
    document.body.appendChild(container);
}

// Call the initiate function to create the calculator
initiate();
// for limiting decimals displayed
const MAX_DISPLAY_SIZE = 9;
let term1 = '';
let term2 = '';
let operator = '';
const operators = ['+', '-', '*', '/'];
// for tracking if new input should reset the display
let reset = false;
