const inputArr = document.querySelectorAll(".plan input");
const textArr = document.querySelectorAll(".text");
const submitBtn=document.querySelector(".smallbox-submit-btn");
let clickedID = "";
const SHOWING = "showing";
sessionStorage.setItem("isFirst",true);

function askForPlan(i){
    inputArr[i].classList.add(SHOWING);
    textArr[i].classList.remove(SHOWING);

}

function paintPlan(i){
    inputArr[i].classList.remove(SHOWING);
    textArr[i].classList.add(SHOWING);
    textArr[i].innerHTML = inputArr[i].value;
    
}

function resetPlans(){
    for(let i=0;i<8;i++){
        sessionStorage.removeItem(`small_box${i}`)
    }
    
}

function savePrePlans(){
        for(let i=0; i<8 ; i++){
            const preText=inputArr[i].value;
            if(preText!==""){
                sessionStorage.setItem(`small_box${i}`,preText);
            }
        }
    
    
}

function loadPlans(){
    for (let i=0; i<8;i++){
        if(!sessionStorage.getItem(`small_box${i}`)){
            askForPlan(i);
            inputArr[i].addEventListener("click",clickBox);
        }else{
            inputArr[i].value=sessionStorage.getItem(`small_box${i}`);
            paintPlan(i);
            textArr[i].addEventListener("click",clickBox);
    }
    }
    
}
function convertToDiv(event){
    if(event.target.id !== clickedID){
        const value = document.getElementById(clickedID).value;
        if(value!==""){
            savePlan(value);
        }
        loadPlans();
    }    
}

function savePlan(plan){
    
    sessionStorage.setItem(clickedID,plan);

}

function convertToInput(id){
    sessionStorage.removeItem(id);
    loadPlans();
}

function clickBox(event){
    
    clickedID = event.target.id;
    if (event.target.tagName === `H5`){
        convertToInput(clickedID);
    }else{
        document.addEventListener("click",convertToDiv);
    }
}

function init(){
    savePrePlans();
    loadPlans();
}

resetPlans();
init();
