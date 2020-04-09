const inputArr = document.querySelectorAll(".plan input");
const textArr = document.querySelectorAll(".text");
const submitBtn=document.querySelector(".smallbox-submit-btn");
let clickedID = "";
let initStatuses=[true,true,true,true,true,true,true];
let totInitStatus=true;
const SHOWING = "showing";
sessionStorage.setItem("isFirst",true);

function askForPlan(i){
    inputArr[i].classList.add(SHOWING);
    textArr[i].classList.remove(SHOWING);

}

function paintPlan(i){
    inputArr[i].classList.remove(SHOWING);
    textArr[i].classList.add(SHOWING);
    if(!initStatuses[i]){
        textArr[i].innerHTML = inputArr[i].value;
        console.log("Painted");
    }
    
}

function resetPlans(){
    console.log("reset?");
    for(let i=0;i<8;i++){
        sessionStorage.removeItem(`small_box${i}`)
    }
    
}

function savePrePlans(){
    console.log("pre")
    if(!sessionStorage.getItem("isFirst")){
        console.log("savepre?");
        for(let i=0; i<8 ; i++){
            const preText=textArr[i].innerHTML;
            console.log(preText);
            if(preText!==""){
                console.log("set??");
                sessionStorage.setItem(`small_box${i}`,preText);
            }
        }
    }
    
    
}

function loadPlans(){
    console.log("load");
    for (let i=0; i<8;i++){
        if(!sessionStorage.getItem(`small_box${i}`)){
            console.log("ask");
            askForPlan(i);
            initStatuses[i]=false;
            inputArr[i].addEventListener("click",clickBox);
        }else{
            console.log("not ask");
            if(!sessionStorage.getItem("isFirst")){
                console.log("First");
                paintPlan(i);
                inputArr[i].value=textArr[i].innerHTML;
                initStatuses[i]=false;
            }else{
                console.log("second");
                inputArr[i].value=sessionStorage.getItem(`small_box${i}`);
                console.log(inputArr[i].value);
                paintPlan(i);
            }
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

function init(){
    sessionStorage.setItem("isFirst",false);
    console.log("init")
    console.log(sessionStorage.getItem("isFirst"))
    savePrePlans();
    loadPlans();
}

resetPlans();
init();
