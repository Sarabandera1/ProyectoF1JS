// Función para crear auto  
document.getElementById('createCar').addEventListener('click', () => {  
    const name = document.getElementById('name').value;  
    const maxSpeed = document.getElementById('maxSpeed').value;  
    const acceleration = document.getElementById('acceleration').value;  
    const tireConsumption = document.getElementById('tireConsumption').value;  

    if (!name || !maxSpeed || !acceleration || !tireConsumption) {  
        alert("Por favor, completa todos los campos.");  
        return;  
    }  

    vehicles.push({ name, maxSpeed, acceleration, tireConsumption });  
    displayVehicles();  
    clearInputs();  
});  

// Función para buscar auto  
document.getElementById('searchCar').addEventListener('click', () => {  
    const name = prompt("Ingrese el nombre del auto para buscar:");  
    const result = vehicles.find(vehicle => vehicle.name.toLowerCase() === name.toLowerCase());  
    if (result) {  
        alert(`Auto encontrado:\nNombre: ${result.name}\nVelocidad Máxima: ${result.maxSpeed} km/h\nAceleración: ${result.acceleration} s\nConsumo de Neumáticos: ${result.tireConsumption}`);  
    } else {  
        alert("Auto no encontrado.");  
    }  
});  

// Función para editar auto  
document.getElementById('editCar').addEventListener('click', () => {  
    const name = prompt("Ingrese el nombre del auto que desea editar:");  
    const vehicle = vehicles.find(v => v.name.toLowerCase() === name.toLowerCase());  

    if (vehicle) {  
        const newName = prompt("Nuevo nombre:", vehicle.name);  
        const newMaxSpeed = prompt("Nueva velocidad máxima (km/h):", vehicle.maxSpeed);  
        const newAcceleration = prompt("Nueva aceleración (s):", vehicle.acceleration);  
        const newTireConsumption = prompt("Nuevo consumo de neumáticos:", vehicle.tireConsumption);  

        vehicle.name = newName;  
        vehicle.maxSpeed = newMaxSpeed;  
        vehicle.acceleration = newAcceleration;  
        vehicle.tireConsumption = newTireConsumption;  

        displayVehicles();  
    } else {  
        alert("Auto no encontrado.");  
    }  
});  

// Función para eliminar auto  
document.getElementById('deleteCar').addEventListener('click', () => {  
    const name = prompt("Ingrese el nombre del auto que desea eliminar:");  
    const index = vehicles.findIndex(vehicle => vehicle.name.toLowerCase() === name.toLowerCase());  

    if (index !== -1) {  
        vehicles.splice(index, 1);  
        displayVehicles();  
        alert("Auto eliminado.");  
    } else {  
        alert("Auto no encontrado.");  
    }  
});  

// Función para mostrar autos  
function displayVehicles() {  
    const vehicleList = document.getElementById('vehicle-list');  
    vehicleList.innerHTML = "";  

    vehicles.forEach(vehicle => {  
        const vehicleItem = document.createElement('div');  
        vehicleItem.className = 'vehicle-item';  
        vehicleItem.textContent = `${vehicle.name} - Vel. Max: ${vehicle.maxSpeed} km/h - Acel.: ${vehicle.acceleration} s - Consumo: ${vehicle.tireConsumption}`;  
        vehicleList.appendChild(vehicleItem);  
    });  
}  

// Función para limpiar inputs  
function clearInputs() {  
    document.getElementById('name').value = '';  
    document.getElementById('maxSpeed').value = '';  
    document.getElementById('acceleration').value = '';  
    document.getElementById('tireConsumption').value = '';  
}