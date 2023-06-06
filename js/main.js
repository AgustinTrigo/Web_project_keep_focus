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


const agregarCero = (numero) =>{
    return numero < 10 ? "0" + numero : "" + numero;
}

startBtn.addEventListener("click", ()=>{
    
    let tiempoInicio = new Date().getTime(); // <- milisegundos al cliclear play
    
    setInterval(()=>{ 
        
        let tiempoActual = new Date().getTime(); // <- milisegundos actualizados
        let milisegundos = tiempoActual - tiempoInicio;
       
        let minutos = parseInt(milisegundos / 1000 / 60);
        milisegundos -= minutos * 60 * 1000;
        let segundos = milisegundos / 1000;
        
        cronometro.innerHTML = `${agregarCero(minutos)}:${agregarCero(segundos.toFixed(1))}`
    
    },100)
});

pauseBtn.addEventListener("click", ()=>{
    isRunning = true;
})

