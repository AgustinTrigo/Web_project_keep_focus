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
let botonCronometro = document.getElementById("timerBtn");
let botonPararCronometro = document.getElementById("timerBtnStop")
const fechaHora = new Date();

let horas = fechaHora.getHours();
let minutos = fechaHora.getMinutes();
let segundos = fechaHora.getSeconds();
let milisegundos = fechaHora.getMilliseconds();

console.log(`${horas}:${minutos}:${segundos}`);

let isRunning = false;

botonCronometro.addEventListener("click", ()=>{
    isRunning = false;
    let intervalo = setInterval(()=>{
        if(isRunning === false){
            const fechaHora = new Date();
            cronometro.innerHTML = `${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}:${fechaHora.getMilliseconds()}`;
        }else{
            clearInterval(intervalo);
        }
        
    },1)

    
});

botonPararCronometro.addEventListener("click", ()=>{
    isRunning = true;
})

