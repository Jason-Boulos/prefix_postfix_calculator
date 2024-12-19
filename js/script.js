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
   


 
// function that checks if the expression is valid
function isValidExpression(element){

    if(element.length === 0){
        displayError('please enter a expression');
        return false
    }

    for(const i of element) {

        // needs to be a number and can only use these operators
       if (isNaN(i) && !['+', '-', '*', '/'].includes(i)) {
            displayError('Invalid character.only numbers and operators are allowed.');
            return false;
        }
    }
    // Check if there are enough elements for a valid expression
    if (element.length < 3) {
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

// function that calculates postfix expressions
function calculatePostFix(input){
  let expression = input;

const stack = [];

for (const element of expression) {
    if (!isNaN(Number(element))) {
     // check if element is number and push it to the stack
      stack.push(Number(element));
    } 
    else {
      // If the element is an operator make sure there are enough numbers
      if (stack.length < 2) {
        displayError('you need two numbers before an operator');
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

// function that calculates  prefix expressions
function calculatePrefix(input) {
    const stack = [];
    
    // we need to  loop  from right to left
    for(let i = input.length - 1; i >= 0; i--) {
        const element = input[i];
        
        if (!isNaN(Number(element))) {
            // check if element is number and push it to the stack
            stack.push(Number(element));
        } 
        else {
            // If the element is an operator make sure there are enough numbers
            if (stack.length < 2) {
                displayError('you need two numbers before an operator');
                return null;
            }

            const a = stack.pop();
            const b = stack.pop();

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



// function to  calculate and display the result
function calculateResult() {
    const expression = display.value.trim();
    const expression_parts = expression.split(' ').filter(emptyIndex => emptyIndex !== ' ');
   
    if(!isValidExpression(expression_parts)){
        display.value="";
        return
    }

    let result;
    if (isPrefix) {
        result = calculatePrefix(expression_parts);
    } else {
        result = calculatePostFix(expression_parts);
    }

    if (result !== null) {
        display.value = result;
        errorDisplay.textContent = '';
    }
}



