const inputArr = document.querySelectorAll(".input");
const textArr = document.querySelectorAll(".text");
let planID = "",textID = "";
const SHOWING = "showing";

function askForPlan(i){
    console.log("ask")
    inputArr[i].classList.add(SHOWING);
    inputArr[i].addEventListener("click",handleClick);

}

function paintPlan(plan,i){
    if(i!==null){
        inputArr[i].classList.remove(SHOWING);
        textArr[i].classList.add(SHOWING);
        textArr[i].innerHTML = `${plan}`;
    }else{
        const input = document.getElementById(planID);
        const text = document.getElementById(textID);
        input.classList.remove(SHOWING);
        text.classList.add(SHOWING);
        text.innerHTML = `${plan}`;
    }
    
    
    
}

function loadPlans(){
    for (let i=0; i<9;i++){
        let currentPlan = sessionStorage.getItem(`box${i}`);
    
        if(currentPlan === null){
            askForPlan(i);
        }else{
            console.log(i);
            paintPlan(currentPlan,i);
    }
    }
    
}
function handleSubmit(event){
    
    
    if(event.target.id !== planID){
        console.log("sub")
        event.preventDefault();
        const value = document.getElementById(planID).value;
        console.log(value);
        savePlan(value);
        paintPlan(value);
    }
}

function handleClick(event){
    planID = event.target.id;
    console.log(planID);
}

function savePlan(plan){
    console.log("hi");
    sessionStorage.setItem(planID,plan);
}

function init(){
    loadPlans();
    document.addEventListener("click",handleSubmit);

}

init();
