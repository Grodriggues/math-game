const $inputt = document.querySelector("#answer");
const $button = document.querySelector(".answer .btn");
const $form = document.querySelector("form");



$form.addEventListener("submit", async (e) =>{
    e.preventDefault();
    localStorage.setItem("currentUserPlaying",$inputt.value);
    window.location.href = "/game.html";
})



    
   
   
