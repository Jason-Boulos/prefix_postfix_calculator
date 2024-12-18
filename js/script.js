// global variables

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
       prefixModeBtn.classList.add('active');
        postfixModeBtn.classList.remove('active')
        clearDisplay()
    }
    else{
        postfixModeBtn.classList.add('active');
       prefixModeBtn.classList.remove('active')
       clearDisplay()
    }
}

prefixModeBtn.addEventListener('click',()=>switchMode(prefixModeBtn));
postfixModeBtn.addEventListener('click',() =>switchMode(postfixModeBtn))
   



