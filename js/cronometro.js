let cronometro = document.getElementById("timer");
let btnsBox = document.getElementById("btnsBox");
let startBtn = document.getElementById("timerBtn");
let progressCircle = document.getElementById("progress");
let radio = progressCircle.getAttribute("r");
let circunferencia = radio * 2 * Math.PI;
progressCircle.style.strokeDasharray = circunferencia;
progressCircle.style.strokeDashoffset = circunferencia;

document.getElementById("resetBtn").addEventListener("click", resetPomodoro);

let playIcon = `<button id="timerBtn" class="contadorBtn"><i class="fa-solid fa-play"></i></button>`;
let pauseIcon = `<button id="timerStopBtn" class="contadorBtnStop"><i class="fa-solid fa-pause"></i></button>`;

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


let pomodoroSeleccionado = {};
let progresoPom = [];

let ciclosCompletados = 0;




// DECLARACION DE FUNCIONES
// REFACTORIZADO ↓↓↓

function resetPomodoro(){
    let modal = document.querySelector(".modal")
    modal.style.display = "flex";
    
    let aceptarBtn = document.getElementById("aceptarBtn");
    let cancelarBtn = document.getElementById("cancelar");

    aceptarBtn.addEventListener("click", reiniciarDatos);
    cancelarBtn.addEventListener("click", ()=>{modal.style.display = "none";})


}

function reiniciarDatos(){
    clearInterval(interval)
    diferenciaTiempo = 0;
    tiempoTranscurrido  = 0;
    cambiarBoton(!isRunning);
    cronometro.innerHTML = "00:00";
    progressCircle.style.strokeDashoffset = circunferencia;
    progresoPom = [];
    let getDots = document.querySelectorAll(".progressDots");
    getDots.forEach((e)=>{e.style.fill = "#ffffff"});
    let modal = document.querySelector(".modal")
    modal.style.display = "none";

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

const reiniciarCiclo = () =>{
    if(progresoPom.length == 15){
        progresoPom.splice(0,15);
        let getDots = document.querySelectorAll(".progressDots");
        getDots.forEach((e)=>{e.style.fill = "#ffffff"})
    }
}

// Funcion iniciar cronometro.
const runTimer = () =>{
    if(!isRunning){

        reiniciarCiclo();
        let limite = "";
        tiempoTranscurrido = new Date().getTime() - diferenciaTiempo; 
        
        interval = setInterval(()=>{ 
            let tiempoActual = new Date().getTime();
            let difTiempoTranscurrido = tiempoActual - tiempoTranscurrido;
            
            // Operador ternario anidado para determinar el limite de tiempo.
            progresoPom.length % 2 == 0 ? limite = pomodoroSeleccionado.limiteTiempoTrabajo :
            progresoPom.length == 7 ? limite = pomodoroSeleccionado.limiteTiempoDescansoLargo : 
            limite = pomodoroSeleccionado.limiteTiempoDescanso;

            calcularProgreso(difTiempoTranscurrido, circunferencia, limite);
            cronometro.innerHTML = generarTiempo(difTiempoTranscurrido);
            
            // (PENDIENTE OPTIMIZAR)
            if(difTiempoTranscurrido >= limite){
                let lastType = progresoPom.findLast((e)=>e)
                if(lastType == "W"){
                    progresoPom.push("R");

                }else if(lastType == "R" || lastType == undefined){
                    progresoPom.push("W");
		            let index = progresoPom.length - 1;
		            let getDot = document.getElementById(`dot${index}`)
		            getDot.style.fill = "var(--color-progressBar)";

                }

                if(progresoPom.length == 15){
                    ciclosCompletados += 1;
                    localStorage.setItem("ciclosCompletos", JSON.stringify(ciclosCompletados))
                }
                actualizarEstadistica(modoSeleccionado);
                clearInterval(interval)
                difTiempoTranscurrido = 0;
                diferenciaTiempo = 0;
                tiempoTranscurrido  = 0;
                cambiarBoton(!isRunning);
            }

        },10)
    }
    cambiarBoton(isRunning);
    /* actualizarEstadistica(modoSeleccionado); */
    
}

const pausarTiempo = () => {

    let tiempoEnPausa = new Date().getTime();
    diferenciaTiempo = tiempoEnPausa - tiempoTranscurrido;
    clearInterval(interval);
    cambiarBoton(!isRunning);
}

// Funcion para calcular el progreso del tiempo y mostrarlo en forma de barra progresiva. (PD. Optimizar)
function calcularProgreso(tiempo, perimetro, tiempoLimite){
	let porcentaje = (tiempo * 100) / tiempoLimite;
	if(porcentaje <= 100 || porcentajeProgreso >= 0){
        porcentajeProgreso = perimetro - (perimetro * (porcentaje / 100)) 
		progressCircle.style.strokeDashoffset = parseInt(porcentajeProgreso);
	}
}


// Funcion para cambiar el icono del boton de play y pausa.
function cambiarBoton(flag){
    if(!flag){
        flag = true ? btnsBox.innerHTML = pauseIcon : "";
        document.getElementById("timerStopBtn").addEventListener("click", () =>{pausarTiempo()});
        return flag;
    }
    
    if(flag){
        flag = false;
        !flag ? btnsBox.innerHTML = playIcon : "";
        document.getElementById("timerBtn").addEventListener("click", () =>{runTimer()});
        return flag;
    }
}

// Setea el modo de pomodoro seleccionado o predeterminado
function buscarModo(typeSelected){
    let getList = JSON.parse(localStorage.getItem("listado"));
    setearModo(getList,typeSelected);
    
}

// Setea el objeto con las variables para utilizar los limites de minutos (del modo seleccionado) en milisegundos.
const setearListado = (array, tipoSeleccionado) =>{
    array.forEach(element => {
        if(element.opcion == tipoSeleccionado){
            return  pomodoroSeleccionado = {
                limiteTiempoTrabajo: element.tiempoPomodoro * 1000 * 60,
                limiteTiempoDescanso: element.tiempoDescanso * 1000 * 60,
                limiteTiempoDescansoLargo: descansoLargoEnMs = element.tiempoDescansoLargo * 1000 * 60
            }    
        }
    });
}

// Dependiendo si hay un modo de pomodoro seleccionado o no, setea los limites que utiliza el cronometro.
function setearModo(list,typeSelected){

    if(list == null){
        fetch('js/pomodoros.json')
        .then((resultado)=> resultado.json())
        .then((data) =>{
            setearListado(data,typeSelected);
        })
    }else{
        setearListado(list,typeSelected);
    }
    
}

// Funcion para actualizar las estadisticas

/* const getFecha = () =>{
    let fecha = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;
    return fecha;
}

let actualDate = getFecha();

const setList = (list) => {localStorage.setItem("listado", JSON.stringify(list))};

function actualizarEstadistica(modo){
    let getList = JSON.parse(localStorage.getItem("listado"))
    let fechaTrabajo = getFecha();
    getList.forEach((e)=>{
        if((progresoPom.length === 0) && (e.estadisticasPorFecha == "") && (e.opcion == modo)){
            e.estadisticasPorFecha.push({
                fecha: fechaTrabajo,
                pomodorosCompletados: 0,
                tiempoTrabajado: 0
            })
        }
        e.estadisticasPorFecha.forEach((elemento)=>{
            if((elemento.fecha == fechaTrabajo) && (progresoPom.findLast((e)=>e) === "W")){
                elemento.pomodorosCompletados += 1;
                elemento.tiempoTrabajado = elemento.pomodorosCompletados * e.tiempoPomodoro;
            }
        })
        console.log(e.estadisticasPorFecha);
    })

    localStorage.removeItem('listado');
    setList(getList);
    
}
 */

// LLAMADAS
cambiarBoton(!isRunning);
buscarModo(modoSeleccionado);

