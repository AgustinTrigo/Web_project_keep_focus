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
        getList() == null ? setList(data) : setList(getList());
        renderList(getList());
    })

    



function renderList(listado){
    cardSection.innerHTML = "";
    listado.forEach((e, i)=>{
        let deleteBtn = `<button class="card-delete-btn" onClick="deleteCard(${i})"><i class="fa-regular fa-trash-can"></i></button>` 
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
            ${i > 1 ? deleteBtn : ""}
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

let createBtn = document.querySelector(".custom-card-btn").addEventListener("click", crearNuevo);
let creado = true;
const errorNombre = `<h6>Nombre repetido, porfavor eliga uno distinto</h6>`;
const errorDatos = `<h6>Por favor completa todos los campos</h6>`;


function crearNuevo(){

    creado === true ? customCard() : "";

}


function customCard(){
    
    let idNbr = getList().length;
    let cardsContainer = document.getElementById("cardSection");
    let newCard = document.createElement("div");
    newCard.setAttribute("id",`opcion${idNbr}`);
    newCard.className = "card";
    cardsContainer.appendChild(newCard);
    creado = false;
    insertContent();

}

function insertContent(){

    let newCustomCard = document.getElementById(`opcion${getList().length}`);
    newCustomCard.innerHTML =
    `
    <input id="valorTitulo" type="text" class="input-titulo" name="titulo"  minlengmth="4" maxlength="20" size="20"  placeholder="Nombre" />
    <div class="card-info">
        <div class="card-info-rows custom-list">
            <ul>
                <li>Pomodoro</li>
                <li>Descanso</li>
                <li>Descanso largo</li>
            </ul>
        </div>
        <div class="card-info-values custom-values">
            <ul>
                <li><input id="valorPom" class="input-nbr" type="number" min="1" max="120" required> min</li>
                <li><input id="valorDes" class="input-nbr" type="number" min="1" max="120" required> min</li>
                <li><input id="valorLargo" class="input-nbr" type="number" min="1" max="120" required> min</li>
            </ul>
        </div>
    </div>
    <button id="seleccionar" class="card-btn custom-btn" onClick="guardarValores()">Guardar</button>
    `
}

function guardarValores(){
    let titleValue = document.getElementById("valorTitulo");
    let pomValue = document.getElementById("valorPom");    
    let desValue = document.getElementById("valorDes");
    let largoValue = document.getElementById("valorLargo");

    const nuevoObjt = 
    {
        "opcion":`${titleValue.value}`,
        "tiempoPomodoro": `${parseInt(pomValue.value)}`,
        "tiempoDescanso": `${parseInt(desValue.value)}`,
        "tiempoDescansoLargo": `${parseInt(largoValue.value)}`,
        "intervalos": 
        {
            "work": 8,
            "rest": 6,
            "longRest": 1
        }
    }

    let nuevoListado = getList();
    for(nombre of nuevoListado){
        if(nuevoObjt.opcion === nombre.opcion){
            cardSection.innerHTML += errorNombre;
            throw "Error 01";
        }else if(nuevoObjt.opcion === "" || isNaN(nuevoObjt.tiempoPomodoro) || isNaN(nuevoObjt.tiempoDescanso) || isNaN(nuevoObjt.tiempoDescansoLargo)){
            cardSection.innerHTML += errorDatos;
            throw "Error 02";
        }
    }

    creado = true;
    nuevoListado.push(nuevoObjt);
    localStorage.removeItem('listado');
    setList(nuevoListado);
    renderList(nuevoListado); 
}

function deleteCard(index){
    let list = JSON.parse(localStorage.getItem("listado"));
    list.splice(index,1);
    localStorage.removeItem('listado');
    localStorage.removeItem('modo');
    setList(list);
    renderList(list);
}