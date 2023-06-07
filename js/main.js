let navbarBtn = document.querySelector(".navbar-btn");
let navbarMenu = document.querySelector(".navbar");
let navbarMenuList = document.createElement("ul");
navbarMenuList.setAttribute("id","menu")
navbarMenuList.className = "navbar-menu";

navbarBtn.addEventListener("click", ()=>{
    let estadoMenu = navbarMenu.getAttribute("class");
    navbarBtn.classList.toggle("active");
    navbarMenu.classList.toggle("display-menu");
    navbarMenu.appendChild(navbarMenuList);
    navbarMenuList.innerHTML = `
    <li><a href="./index.html">Inicio</a></li>
    <li><a href="#">Playlist</a></li>
    <li><a href="#">Información</a></li>
    `
    if(estadoMenu === "navbar display-menu"){
        navbarMenu.removeChild(navbarMenuList);
    }
})
let cronometro = document.getElementById("timer");
let startBtn = document.getElementById("timerBtn");
let pauseBtn = document.getElementById("timerStopBtn");

let isRunning = false;
let interval;
let diferenciaTiempo = 0;
let tiempoTranscurrido  = 0;
cronometro.innerHTML = "00:00:00";

const agregarCero = (numero) =>{
    return numero < 10 ? "0" + numero : "" + numero;
}

const generarTiempo = (milisegundos) =>{
    let minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    let segundos = milisegundos / 1000;
    return `${agregarCero(minutos)}:${agregarCero(segundos.toFixed(2))}`
}


const runTimer = () =>{
    
    if(!isRunning){
        tiempoTranscurrido = new Date().getTime() - diferenciaTiempo; // <- milisegundos al cliclear play
        
        
        interval = setInterval(()=>{ 
            let tiempoActual = new Date().getTime(); // <- milisegundos actualizados
            let difTiempoTranscurrido = tiempoActual - tiempoTranscurrido;
            cronometro.innerHTML = generarTiempo(difTiempoTranscurrido);
            
        },100)
    }

    isRunning = true;
    isRunning ? startBtn.style.opacity = "0" : "";
    
    
}

const pauseTimer = () => {
    let tiempoEnPausa = new Date().getTime();
    
    diferenciaTiempo = tiempoEnPausa - tiempoTranscurrido;
    clearInterval(interval);
    
    isRunning = false;
    !isRunning ? startBtn.style.opacity = "1" : "";
}

startBtn.addEventListener("click", () =>{runTimer()});
pauseBtn.addEventListener("click", () =>{pauseTimer()});

