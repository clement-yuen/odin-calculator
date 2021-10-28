
function operator(operator, num1, num2) {
    console.log(num1, operator, num2);
  

        if (operator === "+") {
            return add(num1, num2);
        }
        else if (operator === "-") {
            return subtract(num1, num2);
        }
        else if (operator === "x") {
            
            return multiply(num1, num2);
        }
        else if (operator === "÷") {
            return divide(num1, num2);
        }
        
    
}

//sub-operator functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1/num2;
}

// return screen display value
function getOutput() {
    
    const display = document.querySelector(".monitorBot");
    let displayStr = display.textContent;
    displayStr = displayStr.replace(/\s/g, '');
    let outputList = displayStr.split("");
    console.log(outputList);
    return outputList;

}


let haveDot =false;


// Display click values

function displayNums() {

    const numbers = document.querySelectorAll(".number");
    numbers.forEach((num) => {
        num.addEventListener('click', () => {
            
            const output = document.querySelector('.monitorTop');
            
            
            if (num.textContent === "." && !haveDot) {
                haveDot = true;
            }
            else if (num.textContent === "." && haveDot) {
                return;
            }
            output.textContent += num.textContent;
            
            
            
            
            
           
            

        });
    });


}


function displayOperators() {

    
    const operators = document.querySelectorAll(".operator");
    operators.forEach((operator) => {
        operator.addEventListener('click', ()=> {
            haveDot = false;
            const output = document.querySelector('.monitorTop');
            calculator.prevNum = output.textContent;
            if (output.textContent !== "") {
                let x = Number(output.textContent).toLocaleString();
                if (!isNaN(x)) {
                    output.textContent = Number(output.textContent).toLocaleString();
                }
              
            }
            output.textContent += ` ${operator.textContent} `;
            calculator.operatorSym = output.textContent.slice(-2).replace(/\s/g, '');
            calculator.preEnterStrLength = output.textContent.length;
        });
    });
}

function clickEnter () {
    const enter = document.querySelector(".equal");
    enter.addEventListener('click', ()=> {
        const output = document.querySelector('.monitorTop');
        let secondNum = output.textContent.slice(calculator.preEnterStrLength);
        calculator.currentNum = secondNum;
        output.textContent = output.textContent.replace(secondNum,Number(secondNum).toLocaleString());

        let result = operator(calculator.operatorSym, Number(calculator.prevNum), Number(calculator.currentNum));
        const monitorBot = document.querySelector('.monitorBot');
        // console.log(result);
        if (isNaN(result)) {
            monitorBot.textContent = "Error";
        }
        else {
            
            monitorBot.textContent = result.toLocaleString();
        }
        
    })
}

function clear() {
    const clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        
        const monitorTop = document.querySelector('.monitorTop');
        monitorTop.textContent = "";
        const monitorBot = document.querySelector('.monitorBot');
        monitorBot.textContent = "";
        calculator.prevNum = "";
        calculator.operatorSym = "";
        calculator.currentNum ="";
        calculator.preEnterStrLength="";




    })
}

let calculator = {
    prevNum: "",
    operatorSym: "",
    currentNum: "",
    preEnterStrLength: "",



}


function calculate() {
    clear();
    
    
    
    displayNums();
    
    displayOperators();
    clickEnter();
    
        


   
}

calculate();

