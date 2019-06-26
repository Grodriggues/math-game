"use strict";

const $tabuada = document.querySelector("#tabuada");
const $button = document.querySelector("#tabuada .answer .btn");
const $answer = document.querySelector("#answer");
const $question = document.querySelector("#question");
const $steps = document.querySelector("#score h2 span");
const wrongAnswers = {};
const maxSteps = 5;

// Variables
let currentAnswer;
let steps = 0;
let score = 0;
let num,choose;
let operator;



$button.addEventListener("click",(event) => {

    if((isInvalidValue())) return
    verifyAnswer();
    createNewQuestion();
    clearInput();
    console.log(steps);
    if(steps > 5) renderResults();

});

window.addEventListener("load" ,() =>{
    createNewQuestion();
})

const clearInput = () => $answer.value = "";

const createProblems = () =>{
    operator = returnSomeOperation();

    switch(operator){
        case "+":
            num = returnRandomNumber(10);
            choose = returnRandomNumber(10);
            currentAnswer= num+choose;
            break
            
        case "-":
            num = returnRandomNumber(10);
            choose = returnRandomNumber(10);
            currentAnswer= num-choose;
            break
            
        case "/":
            num = returnRandomNumber(9);
            choose = returnRandomNumber(9);
            currentAnswer= num/choose;
            break
            
        case "*":
            num = returnRandomNumber(9);
            choose = returnRandomNumber(9);
            currentAnswer= num*choose;
            break
            
    }
    return {num , choose , operator}
    
}

const createNewQuestion = () =>{
    const { num ,choose , operator} = createProblems();
    $question.innerHTML = `<h1 class="text-light l-heading">${num}<span class="text-primary">${operator === "*"?"x":operator}</span>${choose} ?</h1>`
    steps++;
    renderScore(steps,maxSteps);

}

const returnRandomNumber = (n) =>{
    return Math.floor(Math.random()*n)
}




const returnSomeOperation = () =>{
    const operations = ['+','*','-','/'];
    const choose = Math.floor(Math.random()*(operations.length-1));
    return operations[choose];
}

const isInvalidValue = () =>{
    if(!$answer.value) return true;
    if(isNaN($answer.value)) return true;
    

}

const renderResults = () =>{
    const $replay = document.querySelector("#btn-replay button");

    if(isAllTheQuestionsRight()){ // this block of code will run if the users hit all the questions
         $tabuada.innerHTML = `<h2 class="text-light l-heading">Parabéns você acertou todas as questões!</h2>`
         $replay.style.display = "block";
         addReplayListener($replay);

         return
        
    }

    // this block of coode bellow will run if exists some error of the user

    $replay.style.display = "block";
    $tabuada.innerHTML = `<p class="errors text-light">Você acertou ${score} das ${maxSteps} Questoes</p>`

    $tabuada.innerHTML += `<h2 class="text-light results"> Seus Erros :</h2>`;

    for(let props in wrongAnswers){
        let {rightAnswer , wrongAnswer} = wrongAnswers[props];
        $tabuada.innerHTML += `<p class="text-primary results">${props} errado: <span class="wrong-as">${wrongAnswer}</span> correto: <span class="right-as">${rightAnswer}</span></p>`
    }

    addReplayListener($replay);
}

const renderScore = (currentStep,maxSteps) =>{
    $steps.innerHTML = `(${currentStep}/${maxSteps})`
}

const addReplayListener = (element) => element.addEventListener("click" , () => location.reload()) 


const verifyAnswer = () =>{
    const answerOfUser = Number($answer.value);
    if(answerOfUser === currentAnswer) score++;
    else{
        const formated = $question.textContent.split("?").join("").trim();
        wrongAnswers[formated] = {rightAnswer:currentAnswer,wrongAnswer:answerOfUser};

    }
    
}



const isAllTheQuestionsRight = () => Object.entries(wrongAnswers).length === 0;



 

