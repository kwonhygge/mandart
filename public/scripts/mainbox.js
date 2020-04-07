const inputArr = document.querySelectorAll(".input");
const textArr = document.querySelectorAll(".text");
let clickedID = "";
const SHOWING = "showing";

function askForPlan(i){
    inputArr[i].classList.add(SHOWING);
    textArr[i].classList.remove(SHOWING);

}

function paintPlan(plan,i){
        inputArr[i].classList.remove(SHOWING);
        textArr[i].classList.add(SHOWING);
        textArr[i].innerHTML = `${plan}`;    
    
}

function loadPlans(){
    for (let i=0; i<9;i++){
        let currentPlan = sessionStorage.getItem(`box${i}`);

        if(currentPlan === null){
            askForPlan(i);
            inputArr[i].addEventListener("click",clickBox);
        }else{
            paintPlan(currentPlan,i);
            textArr[i].addEventListener("click",clickBox);
    }
    }
    
}
function convertToDiv(event){
    
    if(event.target.id !== clickedID){
        event.preventDefault();
        const value = document.getElementById(clickedID).value;
        if(value!==""){
            savePlan(value);
        }
        init();
    }    
}

function convertToInput(id){
    sessionStorage.removeItem(id);
    init();
}

function clickBox(event){
    
    clickedID = event.target.id;
    if (event.target.tagName === `H5`){
        convertToInput(clickedID);
    }else{
        document.addEventListener("click",convertToDiv);
    }
}

function clickButton(event){
    event.target.id
}

function savePlan(plan){
    sessionStorage.setItem(clickedID,plan);
}

function init(){
    loadPlans();
}

init();