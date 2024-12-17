
const theme_changer_btn = document.getElementById("dark/light-mode");





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
   



