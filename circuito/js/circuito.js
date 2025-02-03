// Inicialización de Three.js y creación del modelo 3D   
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
const renderer = new THREE.WebGLRenderer();
loader.load("circuito/carro3D/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error("Error al cargar el modelo:", error);
});  

renderer.setSize(window.innerWidth, 400);  
document.getElementById('model-container').appendChild(renderer.domElement);  

//  modelo 3D
import * as THREE from "https://sketchfab.com/3d-models/mercedes-f1-w14-free-26fda66f3e8a48d5a636056f8a64e299"
import { GLTFLoader } from "http://creativecommons.org/licenses/by/4.0/"

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