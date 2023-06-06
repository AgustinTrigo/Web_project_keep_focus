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
        let tiempoInicio = new Date().getTime(); // <- milisegundos al cliclear play
        
        interval = setInterval(()=>{ 
            let tiempoActual = new Date().getTime(); // <- milisegundos actualizados
            let milisegundos = tiempoActual - tiempoInicio;
            cronometro.innerHTML = generarTiempo(milisegundos);
            
        },100)
    }

    isRunning = true;
    isRunning ? startBtn.style.opacity = "0" : "";
    
}

const pauseTimer = () => {
    let tiempoEnPausa = new Date().getTime();

    clearInterval(interval);
    console.log(tiempoEnPausa);
}

startBtn.addEventListener("click", () =>{runTimer()});
pauseBtn.addEventListener("click", () =>{pauseTimer()});

