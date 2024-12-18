// global variables
 let isPrefix = true;
const theme_changer_btn = document.getElementById("dark/light-mode");
const display =  document.getElementById("display");
const prefixModeBtn = document.getElementById('prefixMode');
const postfixModeBtn = document.getElementById('postfixMode');




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
    const result = calculate(expression_parts);

   
    display.value = result;
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
        alert('Not enough numbers');
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
                alert('Cannot divide by 0');
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




