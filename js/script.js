// global variables
 let isPrefix = true;
const theme_changer_btn = document.getElementById("dark/light-mode");
const display =  document.getElementById("display");
const prefixModeBtn = document.getElementById('prefixMode');
const postfixModeBtn = document.getElementById('postfixMode');
const errorDisplay =  document.getElementById('errorDisplay')




// event that switches between  light mode and dark mode
theme_changer_btn.addEventListener("click",function(){
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        this.textContent = '☀️ Light Mode';
    } else {
        document.body.classList.add('light-mode');
        this.textContent = '🌙 Dark Mode';
    }
});


// function to append to the display
function appendToDisplay(value){
    display.value += value
}

// function to clear the display 
function clearDisplay() {
    display.value = '';
    errorDisplay.textContent= '';
}

//function to display errors
function displayError(message) {
    errorDisplay.textContent = message;
}

// set prefix mode as active by default
prefixModeBtn.classList.add('active');
postfixModeBtn.classList.remove('active');

//function to switch between prefix and postfix mode
function switchMode(btn){
    if( prefixModeBtn === btn){
        isPrefix = true
       prefixModeBtn.classList.add('active');
        postfixModeBtn.classList.remove('active')
        clearDisplay()
    }
    else{
        isPrefix = false
        postfixModeBtn.classList.add('active');
       prefixModeBtn.classList.remove('active')
       clearDisplay()
    }
}

prefixModeBtn.addEventListener('click',()=>switchMode(prefixModeBtn));
postfixModeBtn.addEventListener('click',() =>switchMode(postfixModeBtn))
   


// function to  calculate and display the result
function calculateResult() {
    const expression = display.value.trim();
    const expression_parts = expression.split('');  
    if(!isValidExpression(expression_parts)){
        display.value="";
        return
    }
    const result = calculate(expression_parts);

   
    display.value = result;
}

// function that checks if the expression is valid
function isValidExpression(element){

    if(element.length === 0){
        displayError('please enter a expression');
        return false
    }

    if(element.length < 3){
        displayError('Ensure you have 2 numbers and 1 operator in correct order');
        return false
    }
     let numbers_count = 0
     let operator_count = 0

     for(const i of element){
        if( i === '+'|| i ==="-" || i === '*' || i ==='/'){
            operator_count++
        }
        else{
            numbers_count++
        }
     }
     // if operator counts +1 is not equal to the numbers count there is a error
     if(numbers_count !== operator_count + 1){
          displayError('Incorrect expression format')
          return false
     }

    return true;


}

// function that calculates postfix and prefix expressions
function calculate(input){
  let expression;
  // check if mode is set to prefix or postfix
  if (isPrefix){
    expression = input.reverse();
  }
  else{
    expression = input;
  }

const stack = [];

for (const element of expression) {
    if (!isNaN(Number(element))) {
     // check if element is number and push it to the stack
      stack.push(Number(element));
    } 
    else {
      // If the element is an operator make sure there are enough numbers
      if (stack.length < 2) {
        displayError('Not enough numbers');
        return null;
      }

    const b = stack.pop();
    const a = stack.pop();

    let result;
    switch (element) {
        case '+': result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": 
            if (b === 0) {
                displayError('Cannot divide by 0');
                return null;
            }
            result = a / b; 
            break;
    }
      stack.push(result);
   }
 }

   return stack[0];
}




