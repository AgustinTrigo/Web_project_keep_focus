let cardSection = document.getElementById("cardSection");
const buscarModo = () =>{
    let modoSeleccionado = JSON.parse(localStorage.getItem("modo"));
    return modoSeleccionado;
}

let mostrarIcono= "Seleccionar";

fetch('js/pomodoros.json')
    .then((resultado) => resultado.json())
    .then((data) => {
        data.forEach((e, i) => {
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
        });
    });


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
                localStorage.setItem(`modo`, JSON.stringify(e.opcion))
            };
            if(e.opcion == buscarModo() && i === parseInt(id)){
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.children[2].innerHTML = `<i class="fa-solid fa-check"></i>`;
                console.log("log 3");
            } else if(e.opcion !== buscarModo() && i !== parseInt(id)){
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.children[2].innerHTML = `seleccionar`;
                console.log("log 4");
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
                console.log("log 1");
                let isSelected = document.getElementById(`opcion${i}`);
                isSelected.className += " seleccionado";
                isSelected.children[2].innerHTML = `<i class="fa-solid fa-check"></i>`;
            }
        })
    })
}else{
    mostrarIcono = "Seleccionar";
    console.log("log 2");
}

