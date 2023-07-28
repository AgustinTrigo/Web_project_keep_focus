let cronometro = document.getElementById("timer");
let btnsBox = document.getElementById("btnsBox");
let startBtn = document.getElementById("timerBtn");
let progressCircle = document.getElementById("progress");
let radio = progressCircle.getAttribute("r");
let circunferencia = radio * 2 * Math.PI;
progressCircle.style.strokeDasharray = circunferencia;
progressCircle.style.strokeDashoffset = circunferencia;

let playIcon = `<i class="fa-solid fa-play"></i>`;
let pauseIcon = `<i class="fa-solid fa-pause"></i>`;

let isRunning = false;
let interval;
let diferenciaTiempo = 0;
let tiempoTranscurrido  = 0;

cronometro.innerHTML = "00:00";
let porcentajeProgreso = parseInt(circunferencia);

let modoSeleccionado;
let limiteEnMs = 0;
let descansoEnMs = 0;
let descansoLargoEnMs = 0;
let mostrarModo = document.querySelector(".pomodoro-type");
modoSeleccionado = JSON.parse(localStorage.getItem("modo"));

if(modoSeleccionado === null){
    modoSeleccionado = "Normal";
    mostrarModo.innerHTML = `<h2>${modoSeleccionado}</h2>`
}else{
    modoSeleccionado = JSON.parse(localStorage.getItem("modo"));
    mostrarModo.innerHTML = `<h2>${modoSeleccionado}</h2>`
}


let selectedPom = {};
let progresoPom = [];

let ciclosCompletados = 0;

let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetPomodoro);




// DECLARACION DE FUNCIONES

function resetPomodoro(){
    clearInterval(interval)
    diferenciaTiempo = 0;
    tiempoTranscurrido  = 0;
    cambiarBoton(!isRunning);
    cronometro.innerHTML = "00:00";
    progressCircle.style.strokeDashoffset = circunferencia;
    progresoPom = [];
    let getDots = document.querySelectorAll(".progressDots");
    getDots.forEach((e)=>{e.style.fill = "#ffffff"});
}


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
        if(progresoPom.length == 15){
            progresoPom.splice(0,15);
            let getDots = document.querySelectorAll(".progressDots");
            getDots.forEach((e)=>{e.style.fill = "#ffffff"})
        }
        tiempoTranscurrido = new Date().getTime() - diferenciaTiempo; 
        let limite = "";
        interval = setInterval(()=>{ 
            let tiempoActual = new Date().getTime();
            let difTiempoTranscurrido = tiempoActual - tiempoTranscurrido;
            
            progresoPom.length % 2 == 0 ? limite = selectedPom.workingTime : limite = selectedPom.descansoCorto;
            progresoPom.length == 7 ? limite = selectedPom.descansoLargo : limite;
            calcularPorcentaje(difTiempoTranscurrido, circunferencia, limite);
            cronometro.innerHTML = generarTiempo(difTiempoTranscurrido);
            
            if(difTiempoTranscurrido >= limite){
                let lastType = progresoPom.findLast((e)=>e)
                if(lastType == "W"){
                    progresoPom.push("R");

                }else if(lastType == "R" || lastType == undefined){
                    progresoPom.push("W");
		            let index = progresoPom.length - 1;
		            let getDot = document.getElementById(`dot${index}`)
		            getDot.style.fill = "#86efac";

                }

                if(progresoPom.length == 15){
                    ciclosCompletados += 1;
                    localStorage.setItem("ciclosCompletos", JSON.stringify(ciclosCompletados))
                }
                            
                clearInterval(interval)
                difTiempoTranscurrido = 0;
                diferenciaTiempo = 0;
                tiempoTranscurrido  = 0;
                cambiarBoton(!isRunning);
            }

        },10)
    }
    cambiarBoton(isRunning);
}

const pauseTimer = () => {
    let tiempoEnPausa = new Date().getTime();
    
    diferenciaTiempo = tiempoEnPausa - tiempoTranscurrido;
    clearInterval(interval);
    
    cambiarBoton(!isRunning);
}

function calcularPorcentaje(tiempo, perimetro, tiempoLimite){
	let porcentaje = (tiempo * 100) / tiempoLimite;
	if(porcentaje <= 100 || porcentajeProgreso >= 0){
        porcentajeProgreso = perimetro - (perimetro * (porcentaje / 100)) 
		progressCircle.style.strokeDashoffset = parseInt(porcentajeProgreso);
	}
}

function cambiarBoton(flag){
    if(!flag){
        flag = true;
        flag ? btnsBox.innerHTML = `<button id="timerStopBtn" class="contadorBtnStop">${pauseIcon}</button>` : "";
        let pauseBtn = document.getElementById("timerStopBtn");
        pauseBtn.addEventListener("click", () =>{pauseTimer()});
        return flag;
    }
    
    if(flag){
        flag = false;
        !flag ? btnsBox.innerHTML = `<button id="timerBtn" class="contadorBtn">${playIcon}</button>` : "";
        let startBtn = document.getElementById("timerBtn");
        startBtn.addEventListener("click", () =>{runTimer()});
        return flag;
    }
}

function seleccionarModo(typeSelected){
    let getList = JSON.parse(localStorage.getItem("listado"));
    mostrarLista(getList,typeSelected);
    
}

function mostrarLista(list,typeSelected){

    if(list == null){
        fetch('js/pomodoros.json')
        .then((resultado)=> resultado.json())
        .then((data) =>{
            data.forEach(element => {
                if(element.opcion == typeSelected){
                    limiteEnMs = element.tiempoPomodoro * 1000 * 60;
                    descansoEnMs = element.tiempoDescanso * 1000 * 60;
                    descansoLargoEnMs = element.tiempoDescansoLargo * 1000 * 60;
                }
            });
            selectedPom = {workingTime: limiteEnMs, descansoCorto: descansoEnMs, descansoLargo: descansoLargoEnMs}; 
        })
    }else{
        list.forEach(element => {
            if(element.opcion == typeSelected){
                limiteEnMs = element.tiempoPomodoro * 1000 * 60;
                descansoEnMs = element.tiempoDescanso * 1000 * 60;
                descansoLargoEnMs = element.tiempoDescansoLargo * 1000 * 60;
            }
        });
        selectedPom = {workingTime: limiteEnMs, descansoCorto: descansoEnMs, descansoLargo: descansoLargoEnMs}; 
    }
    
}

// LLAMADAS
cambiarBoton(!isRunning);
seleccionarModo(modoSeleccionado);

