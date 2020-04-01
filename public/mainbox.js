const inputArr = document.querySelectorAll(".input");
const textArr = document.querySelectorAll(".text");
let planID = "";
const SHOWING = "showing";

function askForPlan(i){
    inputArr[i].classList.add(SHOWING);
    inputArr[i].addEventListener("click",handleClick);

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
        }else{
            paintPlan(currentPlan,i);
    }
    }
    
}
function handleSubmit(event){
    
    
    if(event.target.id !== planID){
        event.preventDefault();
        const value = document.getElementById(planID).value;
        savePlan(value);
        window.location.reload();
    }
}

function handleClick(event){
    planID = event.target.id;
}

function savePlan(plan){
    sessionStorage.setItem(planID,plan);
}

function init(){
    loadPlans();
    document.addEventListener("click",handleSubmit);

}

init();
