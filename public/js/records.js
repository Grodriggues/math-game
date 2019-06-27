const $record = document.querySelector("#recordes");

(async() =>{
    const response = await fetch("/records");
    const recordes = await response.json();
    recordes.forEach(record => {
        $record.innerHTML += `<h2 class="text-primary">${record.nickname}: <span class="text-light">${record.bestTime} segundos</span></h2>`;
    });
    

})();