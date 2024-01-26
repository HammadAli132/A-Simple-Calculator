const date = document.getElementById('date');
date.innerText = new Date().getFullYear();
const calcScreen = document.getElementById('screen');
const dialPad = document.getElementById('dial-pad');
let expression = "";
let result;

function performCalculation(string) {
    
}

function main() {
    dialPad.addEventListener('click', (event) => {
        const button = event.target;
        if (button.id === "delete-btn")
            expression = expression.slice(0, -1);
        else if (button.id === "all-clear-btn")
            expression = expression.replace(expression, "");
        else if (button.id === "result-btn")
            expression = performCalculation(expression);
        else 
            expression += button.innerText;
        console.log(expression);
    });
}

main();