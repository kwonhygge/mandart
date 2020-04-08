const inputArr = document.querySelectorAll(".input");
const textArr = document.querySelectorAll(".text");
const arrowButtons = document.querySelectorAll(".arrow button");
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
            console.log(inputArr[i].value);
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

function savePlan(plan){
    sessionStorage.setItem(clickedID,plan);
}

function init(){
    console.log(arrowButtons);
    loadPlans();
    // setArrowFunction();
}

init();
