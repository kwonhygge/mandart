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
            inputArr[i].addEventListener("click",handleClick);
        }else{
            paintPlan(currentPlan,i);
            textArr[i].addEventListener("click",handleClick);
    }
    }
    
}
function convertToDiv(event){
    
    if(event.target.id !== clickedID){
        event.preventDefault();
        const value = document.getElementById(clickedID).value;
        if(value!==""){
            savePlan(value);
            console.log(value);
        }
        init();
    }
    
    
}

function handleClick(event){
    
    clickedID = event.target.id;
    if (event.target.tagName === `H5`){
        sessionStorage.removeItem(clickedID);
        console.log("Removed");
        init();
    }else{
        document.addEventListener("click",convertToDiv);
    }
}

function savePlan(plan){
    sessionStorage.setItem(clickedID,plan);
}

function init(){
    loadPlans();

}

init();
