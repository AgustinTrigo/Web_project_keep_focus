let cardSection = document.getElementById("cardSection");
let mostrarIcono= "Seleccionar";

/* const customList = () => {
    let listaPersonalizada = localStorage.setItem("listado",[]);
    return listaPersonalizada;
}
 */
const buscarModo = () =>{
    let modoSeleccionado = JSON.parse(localStorage.getItem("modo"));
    return modoSeleccionado;
}

/* customList(); */
renderList();

function renderList(){
    cardSection.innerHTML = "";
    fetch('js/pomodoros.json')
        .then((resultado) => resultado.json())
        .then((data) => {
            localStorage.setItem("listado", JSON.stringify(data))
            let mostrarListado = JSON.parse(localStorage.getItem("listado"));
            mostrarListado.forEach((e, i)=>{
            cardSection.innerHTML += `
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
        });

        
        
}

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

    fetch('js/pomodoros.json')
    .then((resultado) => resultado.json())
    .then((data) => {
        data.forEach((e, i)=>{
            if(i === parseInt(id)){
                localStorage.setItem(`modo`, JSON.stringify(e.opcion));
            }else if(i !== parseInt(id)){
                localStorage.setItem(`modo`, JSON.stringify(data[id].opcion));
            };
            
            if(e.opcion == buscarModo() && i === parseInt(id)){
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.children[2].innerHTML = `<i class="fa-solid fa-check"></i>`;
                
            } else if(e.opcion !== buscarModo() && i !== parseInt(id)){
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.children[2].innerHTML = `Seleccionar`;
                
            } 
        })
    })
}

// Condicinal para conservar el indicador del modo seleccionado.
if(buscarModo() != null){
    fetch('js/pomodoros.json')
    .then((resultado) => resultado.json())
    .then((data) => {
        data.forEach((e, i)=>{
            if(e.opcion == buscarModo()){
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.className += " seleccionado";
                isSelected.children[2].innerHTML = `<i class="fa-solid fa-check"></i>`;
            }
        })
    })
}else{
    mostrarIcono = "Seleccionar";
}

// Funcion para crear un nuevo objeto

let createBtn = document.querySelector(".custom-card-btn");
createBtn.addEventListener("click", crearNuevo)

function crearNuevo(){
    /* let newCard = document.createElement("div").className = "card";
    cardSection.appendChild(newCard); */
    const nuevoObjt = 
    {
    "opcion":"Personalizado",
    "tiempoPomodoro": 40,
    "tiempoDescanso": 10,
    "tiempoDescansoLargo": 60,
    "intervalos": 
    {
        "work": 8,
        "rest": 6,
        "longRest": 1
    }
    }


    fetch('js/pomodoros.json')
        .then((resultado)=> resultado.json())
        .then((data) =>{
            data.push(nuevoObjt);
            console.log(data);
            renderList();
        }) 
    
    
}

