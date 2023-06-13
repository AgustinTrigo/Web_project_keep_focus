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
let btnsBox = document.getElementById("btnsBox");
let startBtn = document.getElementById("timerBtn");
//  Mostrar progreso usando forma de circulo
let progressCircle = document.getElementById("progress")
let radio = progressCircle.getAttribute("r")
let circunferencia = radio * 2 * Math.PI;
progressCircle.style.strokeDasharray = circunferencia;
progressCircle.style.strokeDashoffset = circunferencia;

let isRunning = false;
let interval;
let diferenciaTiempo = 0;
let tiempoTranscurrido  = 0;
let limiteTiempo = .25;
cronometro.innerHTML = "00:00";
let porcentajeProgreso = parseInt(circunferencia);


const agregarCero = (numero) =>{
    return numero < 10 ? "0" + numero : "" + numero;
}

const generarTiempo = (milisegundos) =>{
    let minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    let segundos = milisegundos / 1000;
    return `${agregarCero(minutos)}:${agregarCero(parseInt(segundos))}`
}


const runTimer = () =>{
    
    if(!isRunning){
        tiempoTranscurrido = new Date().getTime() - diferenciaTiempo; 
        interval = setInterval(()=>{ 
            let tiempoActual = new Date().getTime();
            let difTiempoTranscurrido = tiempoActual - tiempoTranscurrido;
            calcularPorcentaje(difTiempoTranscurrido, circunferencia);
            cronometro.innerHTML = generarTiempo(difTiempoTranscurrido);
        },100)
    }

    isRunning = true;
    isRunning ? btnsBox.innerHTML = `<button id="timerStopBtn" class="contadorBtnStop"><i class="fa-solid fa-circle-pause"></i></button>` : "";
    let pauseBtn = document.getElementById("timerStopBtn");
    pauseBtn.addEventListener("click", () =>{pauseTimer()});
}

const pauseTimer = () => {
    let tiempoEnPausa = new Date().getTime();
    
    diferenciaTiempo = tiempoEnPausa - tiempoTranscurrido;
    clearInterval(interval);
    
    isRunning = false;
    !isRunning ? btnsBox.innerHTML = `<button id="timerBtn" class="contadorBtn"><i class="fa-solid fa-circle-play"></i></button>` : "";
    let startBtn = document.getElementById("timerBtn");
    startBtn.addEventListener("click", () =>{runTimer()});
}

startBtn.addEventListener("click", () =>{runTimer()});

function calcularPorcentaje(tiempo, perimetro){
	let porcentaje = (tiempo * 100) / conversorMilisengudos(limiteTiempo);
	if(porcentaje <= 100 || porcentajeProgreso >= 0){
		
        porcentajeProgreso = perimetro - (perimetro * (porcentaje / 100)) 
        
		progressCircle.style.strokeDashoffset = parseInt(porcentajeProgreso);

	}
}

function conversorMilisengudos(minutosAms){
	let limiteEnMs = minutosAms * 1000 * 60;
	return limiteEnMs;
}

