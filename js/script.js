// global variables
const theme_changer_btn = document.getElementById("dark/light-mode");
const display =  document.getElementById("display")




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
   



