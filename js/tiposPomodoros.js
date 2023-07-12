let cardSection = document.getElementById("cardSection");
let mostrarIcono= "Seleccionar";

const buscarModo = () => {
    let modoSeleccionado = JSON.parse(localStorage.getItem("modo"));
    return modoSeleccionado;
}

const setList = (list) => {localStorage.setItem("listado", JSON.stringify(list))};
const getList = () => {return mostrarListado = JSON.parse(localStorage.getItem("listado"));}

fetch('js/pomodoros.json')
    .then((resultado) => resultado.json())
    .then((data) => {
        console.log(getList())
        getList() == null ? setList(data) : setList(getList());
        renderList(getList());
    })

    



function renderList(listado){
    cardSection.innerHTML = "";
    listado.forEach((e, i)=>{
    cardSection.innerHTML += 
    `
    <div id="opcion${i}" class="card">
        <h3 class="card-title">${e.opcion}</h3>
        <div class="card-info">
            <div class="card-info-rows">
                <ul>
                    <li>Pomodoro</li>
                    <li>Descanso</li>
                    <li>Descanso largo</li>
                </ul>
            </div>
            <div class="card-info-values">
                <ul>
                    <li>${e.tiempoPomodoro} min</li>
                    <li>${e.tiempoDescanso} min</li>
                    <li>${e.tiempoDescansoLargo} min</li>
                </ul>
            </div>
        </div>
        <button id="seleccionar" class="card-btn" onClick="selectCard(${i})">${mostrarIcono}</button>
    </div>
    `
    })

    if(buscarModo() != null){
        getList().forEach((e, i)=>{
            if(e.opcion == buscarModo()){
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.className += " seleccionado";
                isSelected.children[2].innerHTML = `<i class="fa-solid fa-check"></i>`;
            }
        })
    
    }else{
        mostrarIcono = "Seleccionar";
    }
};


function selectCard(index){
    
    mostrarIcono = "Seleccionar";
    let notSelected = document.querySelectorAll(".card");
    notSelected.forEach((e)=>{
        e.className = "card";
    })

    let selected = document.getElementById(`opcion${index}`);
    selected.classList.toggle("seleccionado");
   
    let encontrarId = selected.getAttribute("id")
    let id = encontrarId[encontrarId.length-1];

    getList().forEach((e, i)=>{
        if(i === parseInt(id)){
            localStorage.setItem(`modo`, JSON.stringify(e.opcion));
        }else if(i !== parseInt(id)){
            localStorage.setItem(`modo`, JSON.stringify(getList()[id].opcion));
        };
            
        if(e.opcion == buscarModo() && i === parseInt(id)){
            let isSelected = document.getElementById(`opcion${i}`);
            isSelected.children[2].innerHTML = `<i class="fa-solid fa-check"></i>`;
                
        } else if(e.opcion !== buscarModo() && i !== parseInt(id)){
            let isSelected = document.getElementById(`opcion${i}`);
            isSelected.children[2].innerHTML = `Seleccionar`;
                
        } 
    })
    
}

// Funcion para crear un nuevo objeto

let createBtn = document.querySelector(".custom-card-btn");
createBtn.addEventListener("click", crearNuevo)

function crearNuevo(){
    
    customCard()

    /* const nuevoObjt = 
    {
        "opcion":"Personalizado",
        "tiempoPomodoro": 0.25,
        "tiempoDescanso": 0.10,
        "tiempoDescansoLargo": 1,
        "intervalos": 
        {
            "work": 8,
            "rest": 6,
            "longRest": 1
        }
    }

    let getList = JSON.parse(localStorage.getItem("listado"))
    getList.push(nuevoObjt);
    localStorage.removeItem('listado');
    setList(getList);
    renderList(getList); */

}


function customCard(){
    
    let getList = JSON.parse(localStorage.getItem("listado"))
    let idNbr = getList.length;
    let cardsContainer = document.getElementById("cardSection")
    console.log(cardsContainer)
    let newCard = document.createElement("div")
    newCard.setAttribute("id",`opcion${idNbr}`)
    newCard.className = "card";
    cardsContainer.appendChild(newCard)
    insertContent();
    
    
    /* let newCustomCard = 
    `
    <div id="opcion${getList.length-1}" class="card">
        <input type="text" class="card-title">
        <div class="card-info">
            <div class="card-info-rows">
                <ul>
                    <li>Pomodoro</li>
                    <li>Descanso</li>
                    <li>Descanso largo</li>
                </ul>
            </div>
            <div class="card-info-values">
                <ul>
                    <li><input type="text"> min</li>
                    <li><input type="text"> min</li>
                    <li><input type="text"> min</li>
                </ul>
            </div>
        </div>
        <button id="seleccionar" class="card-btn" onClick="selectCard(${i})">${mostrarIcono}</button>
    </div>
    ` */



}

function insertContent(){
    let newCustomCard = document.getElementById(`opcion${getList().length}`);
    newCustomCard.innerHTML =
    `
    <input type="text" class="" name="titulo" minlengmth="4" maxlength="20" size="20" required autofocus/>
    <div class="card-info">
        <div class="card-info-rows">
        <ul>
            <li>Pomodoro</li>
            <li>Descanso</li>
            <li>Descanso largo</li>
        </ul>
    </div>
    <div class="card-info-values">
        <ul>
            <li><input type="number" min="1" max="120" required> min</li>
            <li><input type="number" min="1" max="120" required> min</li>
            <li><input type="number" min="1" max="120" required> min</li>
        </ul>
    </div>
    <button id="seleccionar" class="card-btn"> Guardar</button>
    `
}