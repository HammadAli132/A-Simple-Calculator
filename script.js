const date = document.getElementById('date');
date.innerText = new Date().getFullYear();
const calcScreen = document.querySelector('#screen > p');
const dialPad = document.getElementById('dial-pad');
let expression = "";
let result;

function calculate(num1, num2, operator) {
    switch(operator) {
        case '+': 
            return num1 + num2;
        case '-': 
            return num1 - num2;
        case 'x': 
            return num1 * num2;
        case '/': 
            return num1 / num2;
        case '^':
            return Math.pow(num1, num2);
        default:
            return undefined;
    }
}

function performCalculation(string = "") {
    let num = "", i = 0, opr1 = 0, opr2 = 0, sign = '';
    let array = [];
    while (string[i]) {
        if (string[i] === '+' || string[i] === '-' || string[i] === 'x' || string[i] === '/'  || string[i] === '^') {
            if (num === "ANS") array.push(result);
            else array.push(num);
            array.push(string[i]);
            num = "";
        }
        else num += string[i];
        i++;
    }
    if (num === "ANS") array.push(result);
    else array.push(num);
    opr1 = parseFloat(array[0]);
    for (let i = 1; i < array.length; i++) {
        sign = array[i++];
        opr2 = parseFloat(array[i]);
        opr1 = calculate(opr1, opr2, sign);
        if (opr1 === undefined)
            break;
    }
    return opr1;
}

function main() {
    dialPad.addEventListener('click', (event) => {
        const button = event.target;
        if (expression === undefined || button.id === "all-clear-btn")
            expression = "";
        else if (button.id === "delete-btn")
            expression = expression.slice(0, -1);
        else if (button.id === "power-btn")
            expression += "^";
        else if (button.id === "ans-btn") {
            if (expression[expression.length - 1] !== '+' && expression[expression.length - 1] !== '-'  && expression[expression.length - 1] !== 'x' && expression[expression.length - 1] !== '/')
                expression = "ANS";
            else
                expression += "ANS";
        }
        else if (button.id === "result-btn") {
            expression = performCalculation(expression);
            result = expression;
        }
        else if (button.classList.contains("calculator-buttons"))
            expression += button.innerText;
        calcScreen.innerText = expression;
        calcScreen.style.cssText = "color: #474747; font-size: 48px; overflow: overlay;";
    });

}

main();