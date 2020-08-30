const input = document.querySelector('.obj-create');
const SHOWING = "showing";
const nextBtn = document.querySelector(".next-btn");

function handleInputChange(){
    nextBtn.classList.add(SHOWING);
}

function init(){

    input.addEventListener("change",handleInputChange);
}

init();