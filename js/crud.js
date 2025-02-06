// Lista de vehículos
let cars = [
    { id: 1, name: "McLaren MCL60", pilot: null },
    { id: 2, name: "Ferrari SF-23", pilot: null },
    { id: 3, name: "Red Bull RB19", pilot: null }
];

// Referencias a elementos HTML
const carList = document.getElementById("car-list");
const pilotForm = document.getElementById("add-pilot-form");
const pilotInput = document.getElementById("pilot-name");

// Renderiza la lista de vehículos
function renderCars() {
    carList.innerHTML = ""; // Limpia la lista
    cars.forEach(car => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${car.name}</strong> 
            <em>${car.pilot ? "Piloto: " + car.pilot : "Sin piloto"}</em>
            <button class="edit-btn" data-id="${car.id}">Editar</button>
            <button class="delete-btn" data-id="${car.id}">Eliminar</button>
        `;
        carList.appendChild(li);
    });
}

// Asigna un piloto a un vehículo
pilotForm.addEventListener("submit", e => {
    e.preventDefault();
    const pilotName = pilotInput.value.trim();
    if (pilotName === "") return alert("Introduce un nombre válido");

    // Asigna el piloto al primer vehículo sin piloto
    const car = cars.find(c => c.pilot === null);
    if (!car) return alert("Todos los vehículos ya tienen piloto asignado.");

    car.pilot = pilotName;
    pilotInput.value = "";
    renderCars();
});

// Elimina un vehículo
carList.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id, 10);
        cars = cars.filter(car => car.id !== id);
        renderCars();
    }
});

// Edita un vehículo
carList.addEventListener("click", e => {
    if (e.target.classList.contains("edit-btn")) {
        const id = parseInt(e.target.dataset.id, 10);
        const car = cars.find(c => c.id === id);
        const newName = prompt("Introduce el nuevo nombre del vehículo:", car.name);
        if (newName) {
            car.name = newName.trim();
            renderCars();
        }
    }
});

// Render inicial
renderCars();
