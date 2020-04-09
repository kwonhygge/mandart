const inputArr = document.querySelectorAll(".input");
const textArr = document.querySelectorAll(".text");
const arrowButtons = document.querySelectorAll(".arrow button");
let clickedID = "";
const SHOWING = "showing";
const form = document.querySelector("form");

function askForPlan(i){
    inputArr[i].classList.add(SHOWING);
    textArr[i].classList.remove(SHOWING);

}

function paintPlan(plan,i){
        inputArr[i].classList.remove(SHOWING);
        textArr[i].classList.add(SHOWING);
        textArr[i].innerHTML = `${plan}`;
        if(i === 4){
            textArr[i].style.color = "green";
        }    
    
}

function loadPlans(){
    for (let i=0; i<9;i++){
        let currentPlan = sessionStorage.getItem(`main_box${i}`);
        if(currentPlan === null){
            askForPlan(i);
            inputArr[i].addEventListener("click",clickBox);
        }else{
            paintPlan(currentPlan,i);
            textArr[i].addEventListener("click",clickBox);
            inputArr[i].value=currentPlan;
    }
    }
    
}
function convertToDiv(event){
    form.addEventListener("focusout",clickOutsideForm);
    init();  
}

function clickOutsideForm(){
    for(let i=0; i<9; i++){
        const value = inputArr[i].value;
        if(value!==""){
            sessionStorage.setItem(`main_box${i}`,inputArr[i].value);
        }
        
    }
}

function convertToInput(id){
    sessionStorage.removeItem(id);
    init();
}

function clickBox(event){
    if (event.target.tagName === `H5`){
        clickedID = event.target.id;
        convertToInput(clickedID);
    }else{
        document.addEventListener("click",convertToDiv);
    }
}

function handleKeyDown(){
    form.addEventListener("keydown",function(event){
        if(event.keyCode === 13){
            event.preventDefault();
        }
    })
    
}


function init(){
    handleKeyDown();
    loadPlans();
}

init();
