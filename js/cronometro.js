let cronometro = document.getElementById("timer");
let btnsBox = document.getElementById("btnsBox");
let startBtn = document.getElementById("timerBtn");
let progressCircle = document.getElementById("progress");
let radio = progressCircle.getAttribute("r");
let circunferencia = radio * 2 * Math.PI;
progressCircle.style.strokeDasharray = circunferencia;
progressCircle.style.strokeDashoffset = circunferencia;

let isRunning = false;
let interval;
let diferenciaTiempo = 0;
let tiempoTranscurrido  = 0;

cronometro.innerHTML = "00:00";
let porcentajeProgreso = parseInt(circunferencia);

let modoSeleccionado = "default";
let limiteEnMs = 0;
let descansoEnMs = 0;
let descansoLargoEnMs = 0;

let pomodoroTypes = [
    {
        opcion:"default",
        tiempoPomodoro: .5,
        tiempoDescanso: .25,
        tiempoDescansoLargo: 15,

    },
    {
        opcion:"extenso",
        tiempoPomodoro: 50,
        tiempoDescanso: 10,
        tiempoDescansoLargo: 30,

    },
    {
        opcion:"personalizar",
        tiempoPomodoro: "",
        tiempoDescanso: "",
        tiempoDescansoLargo: "",

    },
]

let selectedPom = {};
let progresoPom = [];

// DECLARACION DE FUNCIONES

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
            let limite = "";
            progresoPom.length % 2 == 0 ? limite = selectedPom.workingTime : limite = selectedPom.descansoCorto;
            calcularPorcentaje(difTiempoTranscurrido, circunferencia, limite);
            cronometro.innerHTML = generarTiempo(difTiempoTranscurrido);
            if(difTiempoTranscurrido >= limite){
                progresoPom.push("W")
                clearInterval(interval)
                difTiempoTranscurrido = 0;
                diferenciaTiempo = 0;
                tiempoTranscurrido  = 0;
                cambiarBoton(!isRunning);
                
            }
        },100)
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
        flag ? btnsBox.innerHTML = `<button id="timerStopBtn" class="contadorBtnStop"><i class="fa-solid fa-circle-pause"></i></button>` : "";
        let pauseBtn = document.getElementById("timerStopBtn");
        pauseBtn.addEventListener("click", () =>{pauseTimer()});
        return flag;
    }
    
    if(flag){
        flag = false;
        !flag ? btnsBox.innerHTML = `<button id="timerBtn" class="contadorBtn"><i class="fa-solid fa-circle-play"></i></button>` : "";
        let startBtn = document.getElementById("timerBtn");
        startBtn.addEventListener("click", () =>{runTimer()});
        return flag;
    }
}

function seleccionarModo(types, typeSelected){
    
    types.forEach(element => {
        if(element.opcion == typeSelected){
            limiteEnMs = element.tiempoPomodoro * 1000 * 60;
            descansoEnMs = element.tiempoDescanso * 1000 * 60;
            descansoLargoEnMs = element.tiempoDescansoLargo * 1000 * 60;
        }
    });

    selectedPom = {workingTime: limiteEnMs, descansoCorto: descansoEnMs, descansoLargo: descansoLargoEnMs};
    
}

// LLAMADAS

cambiarBoton(!isRunning);
seleccionarModo(pomodoroTypes, modoSeleccionado);