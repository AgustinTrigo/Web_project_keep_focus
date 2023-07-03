let cardSection = document.getElementById("cardSection");

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
                <button id="seleccionar" class="card-btn" onClick="selectCard(${i})">Seleccionar</button>
            </div>
            `
        });
    });

function selectCard(index){
    let selected = document.getElementById(`opcion${index}`);
    selected.classList.toggle("seleccionado")
}


