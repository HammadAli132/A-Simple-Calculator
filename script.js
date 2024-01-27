const date = document.getElementById('date');
date.innerText = new Date().getFullYear();
const calcScreen = document.getElementById('screen');
const dialPad = document.getElementById('dial-pad');
const answer = document.getElementById('ans-btn');
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
        default:
            return undefined;
    }
}

function performCalculation(string = "") {
    let num = "", i = 0, opr1, opr2, sign = '';
    let array = [];
    while (string[i]) {
        if (string[i] === '+' || string[i] === '-' || string[i] === 'x' || string[i] === '/') {
            if (num === "ANS") array.push(result);
            else array.push(num);
            array.push(string[i]);
            num = "";
        }
        else num += string[i];
        i++;
    }
    array.push(num);
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
        else if (button.id === "ans-btn")
            expression = "ANS";
        else if (button.id === "result-btn") {
            expression = performCalculation(expression);
            result = expression;
        }
        else 
            expression += button.innerText;
        calcScreen.style.cssText = "display: flex; justify-content: flex-end; align-items: flex-end; color: #474747; font-size: 48px; ";
        calcScreen.innerText = expression;
    });
}

main();