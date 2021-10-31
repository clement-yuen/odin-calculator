//Document Query Elements
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const monitorTop = document.querySelector('.monitorTop');
const monitorBot = document.querySelector('.monitorBot');
const enter = document.querySelector('.equal');
const clear = document.querySelector('.clearAll');
const dot = document.querySelector('.dot');
const buttons = document.querySelectorAll('button');
const calculatorState = document.getElementById('calculatorState');
const progressTracker = document.getElementById('progressTracker');

//Variables
haveDot = false;



// Math operation function
function evaluate(operator,num1,num2) {
    if (operator === "+") {
        return num1 + num2;
    }
    else if (operator === "-") {
        return num1 - num2;
    }
    else if (operator === "x") {
        return num1 * num2;
    }
    else if (operator === "÷") {
        
        if (num2 === 0) {
            
            return 'Error';
           

        }
        else {
            return num1 / num2;
        }
        
    }
    else {
        return null;
    }
}

//Initiate a calculator object to store the number and operator

let calculator = {
    prevNum: "",
    currentNum: "",
    operator: "",
    result: 0,
}

function getPrevNum(num) {
    // numbers.forEach((num) => {
    //     num.addEventListener('click', () => {
            
    //        if (calculatorState.className === 'inputPrevNumState') {
        
          
                calculator.prevNum += num;
                console.log(calculator.prevNum);
                
                monitorTop.textContent = (calculator.prevNum);
            
    
           
             
           
           
    //     }});
    // });
    
} 

function getCurrentNum(num) {
    // numbers.forEach((num) => {
    //     num.addEventListener('click', () => {
            
            
                calculator.currentNum += num;
                monitorTop.textContent = calculator.prevNum + ' ' + calculator.operator + ' ' + calculator.currentNum;
            
            
            
               
                
                
                
            

    //     });
    // });
    
} 

function getOperator(operator) {
            
                calculator.operator = operator;
                monitorTop.textContent += ' ' + calculator.operator + ' ';
                console.log(calculator.operator);
            
            
      
}

function clickEnter() {

       
            calculator.result = evaluate(calculator.operator, Number(calculator.prevNum), Number(calculator.currentNum));
            
            if (calculator.result === "Error") {
                monitorTop.textContent = 'Error: Divide by Zero';
                calculatorState.className = 'Overflow';
                progressTracker.className = 'Overflow';
            }

            else if (String(calculator.result).length > 25 || monitorTop.textContent.length > 20) {
                
                
                monitorTop.textContent = 'Error: Overflow';
                
                monitorBot.textContent = changeFormat(calculator.result);
                calculatorState.className = 'Overflow';
                progressTracker.className = 'Overflow';
                
            }
            else {
                monitorBot.textContent = changeFormat(calculator.result);
                calculator.prevNum = String(calculator.result);
                calculator.currentNum = "";
                calculator.operator = "";
                monitorTop.textContent = calculator.result;
                calculatorState.className = 'inputPrevNumState';
                // progressTracker.className = 'movingSumMode';
        
            }
            
            
        
        


}

function clearAll(button) {
    monitorTop.textContent = "";
    monitorBot.textContent = "";

    progressTracker.className = "notInProgress";
    calculatorState.className = "inputPrevNumState";

    calculator.prevNum = "";
    calculator.currentNum = "";
    calculator.operator = "";

    haveDot = false;

}

function clearEntry(calculatorStatus) {
    
    
    
    
    if (calculatorStatus === "inputOperatorState") {
        calculator.operator = "";
        monitorTop.textContent = monitorTop.textContent.slice(0, -3);
        if (calculator.operator === "") {
            calculatorState.className = 'inputPrevNumState';
            progressTracker.className = "inProgress";
        }
        
        
    }
    else if (calculatorStatus === "inputPrevNumState") {
           
                calculator.prevNum.slice(-1) === '.' 
                haveDot = false;
                
            
            
            calculator.prevNum = calculator.prevNum.slice(0, -1);
            monitorTop.textContent = monitorTop.textContent.slice(0, -1);
            
       
        
        
    }
    else if (calculatorStatus === "inputCurrentNumState") {
        
       
        
        
        if (calculator.currentNum === "") {
            calculator.operator = "";
            calculatorState.className = 'inputPrevNumState';
            progressTracker.className = "inProgress";
            monitorTop.textContent = monitorTop.textContent.slice(0, -3);
        }
        else {
            if (calculator.currentNum.slice(-1) === '.') {
                haveDot = false;
            }
            calculator.currentNum = calculator.currentNum.slice(0, -1);
            monitorTop.textContent = monitorTop.textContent.slice(0, -1);
        }
            
        
        
        
    }
}



function calculatorStateChange () {

   
    buttons.forEach((button) => {
        button.addEventListener('click', ()=> {
        
    
        console.log(button.attributes);

        if (button.classList.contains('clearAll') || calculatorState.className === "Overflow") {
            
            clearAll(button.textContent);
            
        }
        else if (button.classList.contains('clearEntry')) {

            
            clearEntry(calculatorState.className);
            
            console.log(calculator);

         }

        else if (button.classList.contains('number') && calculatorState.className === 'inputPrevNumState' && 
          progressTracker.className === 'notInProgress') {
            
         
            progressTracker.className = 'inProgress';
           
            getPrevNum(button.textContent);
          }
          else if (button.classList.contains('number') && calculatorState.className === 'inputPrevNumState' && 
          progressTracker.className === 'inProgress') {
            getPrevNum(button.textContent);
        }

          else if (button.classList.contains('operator') && calculatorState.className === 'inputPrevNumState') {
            


            if (calculator.prevNum === "." || (calculator.prevNum === "" && (button.textContent === "x" || button.textContent === "÷" ))) {
                return;
            }
            else if (calculator.prevNum === "" && button.textContent === "+") {
                calculatorState.className === 'inputPrevNumState';
                progressTracker.className === 'notInProgress';
            }
            else if (calculator.prevNum === '-' && (button.textContent === '-' || button.textContent === '+')) {
                return;
            }
            else if (calculator.prevNum === "" && button.textContent === "-") {
                calculatorState.className === 'inputPrevNumState';
                progressTracker.className === 'notInProgress';
                calculator.prevNum += '-';
                monitorTop.textContent = '-';
            }
            else {
                getOperator(button.textContent);
                calculatorState.className = 'inputOperatorState';
                progressTracker.className = "readyForCurrentNumState";
                haveDot = false;
            }
          }

          else if (button.classList.contains('number') && calculatorState.className === 'inputOperatorState' && progressTracker.className === "readyForCurrentNumState") {
            calculatorState.className = 'inputCurrentNumState';
            progressTracker.className = 'firstPartCurrentNumState';
            // calculator.currentNum += button.textContent;
            // console.log('my check' + calculator.currentNum);
            // monitorTop.textContent = calculator.prevNum + ' ' + calculator.operator + ' ' + calculator.currentNum;
            
           
            getCurrentNum(button.textContent);
          }

          else if (button.classList.contains('number') && calculatorState.className === 'inputCurrentNumState' && progressTracker.className === "firstPartCurrentNumState") {
            getCurrentNum(button.textContent);
          }
          else if (button.classList.contains('equal') && calculatorState.className === 'inputCurrentNumState') {
              
            if  (calculator.currentNum === ".") {
                return;
            }
            else {
                clickEnter();
            }
             
          }
          console.log(calculator);
        });
    });
    
    
    
}


calculatorStateChange();

clickedVisual();
checkDot();



//HELPER FUNCTIONS

//function for reformatting the display number with comma
function changeFormat(num) {
        

            let formattedNum = Number(num).toLocaleString();
            return formattedNum;
        
    
        
         

        
    
}


function clickedVisual() {
    buttons.forEach((button) => {
        button.addEventListener(('click'), () => {
            button.classList.add('clicked');
        })
        button.addEventListener('transitionend', () => {
            button.classList.remove('clicked');
        })
    }); 
}

function checkDot() {
    dot.addEventListener('click', (e)=> {

          
   
            
            if (calculatorState.className === 'inputPrevNumState') {
                if(e.target.textContent === '.' && !haveDot) {
                
                  
                    calculator.prevNum += (e.target.textContent).toLocaleString();
                    monitorTop.textContent = calculator.prevNum;
                   
                    haveDot = true;
                }
                else if (e.target.textContent === '.' && haveDot) {
                 
                    return;
                }
            } 
            else if (calculatorState.className === 'inputCurrentNumState' ||  calculatorState.className === 'inputOperatorState') {
                   
                if (calculator.prevNum !== "") {
               
                    if(e.target.textContent === '.' && !haveDot) {
                    
                        calculator.currentNum += (e.target.textContent).toLocaleString();
                        monitorTop.textContent = calculator.prevNum + ' ' + calculator.operator + ' ' + calculator.currentNum;
                    
                        haveDot = true;
                    }
                    else if (e.target.textContent === '.' && haveDot) {
                    
                        return;
                    }
            
                }
            }

            
            
        
        
     
    });
}



window.addEventListener('keydown', (e) => {
   
    let numKeys = ['0','1','2','3','4','5','6','7','8','9'];
    let opKeys = ['+', '-', '*', '/']

    if (numKeys.includes(e.key)) {
        let numButton = document.querySelector(`.number${e.key}`);
       
        numButton.click();
    }
    else if (opKeys.includes(e.key)) {
        if (e.key === "+") {
            document.querySelector(`.add`).click();
        }
        else if (e.key === "-") {
            document.querySelector(`.subtract`).click();
        }
        if (e.key === "*") {
            document.querySelector(`.multiply`).click();
        }
        if (e.key === "/") {
            document.querySelector(`.divide`).click()
        }
        
    }
    else if (e.key === '.') {
        document.querySelector('.dot').click();
    }
    else if (e.key === 'Enter' || e.key === '=') {
        document.querySelector('.equal').click();
    }
    else if (e.key === 'Clear') {
        document.querySelector('.clearAll').click();
    }
    else if (e.key === 'Backspace') {
        document.querySelector('.clearEntry').click();
    }

    

});