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



    // Add event listeners to buttons
    container.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '=') {
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = 'Error';
                } 
            } else if (button.textContent === 'C') {
                        if (display.value === '') {
                            lastOperation = '';
                        } else {
                            lastOperation = display.value;
                            display.value = '';
                        }
            } else {
                display.value += button.textContent;
            }
        });
    });

    // Append the container to the body
    document.body.appendChild(container);
}

// Call the initiate function to create the calculator
initiate();
let lastOperation = '';