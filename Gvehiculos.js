document.addEventListener("DOMContentLoaded", function () {
    // Cambio de pestañas
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");

            gsap.fromTo("#" + tab.dataset.tab, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        });
    });

    // Información de vehículos con imágenes
    const vehicles = {
        tesla: { name: "Tesla Model X", speed: "250 km/h", acceleration: "3.2 seg (0-100 km/h)", fuel: "Eléctrico", wear: "Bajo", img: "./img/carro1.png" },
        bmw: { name: "BMW M3", speed: "290 km/h", acceleration: "3.8 seg (0-100 km/h)", fuel: "12 km/L", wear: "Medio", img: "./img/carro2.png" },
        audi: { name: "Audi R8", speed: "330 km/h", acceleration: "3.1 seg (0-100 km/h)", fuel: "8 km/L", wear: "Alto", img: "./img/carro3.png" },
        lambor: { name: "lambor Model X", speed: "250 km/h", acceleration: "3.2 seg (0-100 km/h)", fuel: "", wear: "Bajo", img: "./img/carro4.png" }
    };

    const vehicleSelect = document.getElementById("vehicle-select");
    const vehicleImage = document.getElementById("vehicle-image");

    vehicleSelect.addEventListener("change", function () {
        let v = vehicles[this.value];

        document.getElementById("vehicle-name").textContent = v.name;
        document.getElementById("speed").textContent = v.speed;
        document.getElementById("acceleration").textContent = v.acceleration;
        document.getElementById("fuel").textContent = v.fuel;
        document.getElementById("wear").textContent = v.wear;

        // Animación para cambiar la imagen
        gsap.to(vehicleImage, { opacity: 0, duration: 0.3, onComplete: () => {
            vehicleImage.src = v.img;
            gsap.to(vehicleImage, { opacity: 1, duration: 0.3 });
        }});
    });

    // Selección para simulación
    // document.getElementById("simulate-btn").addEventListener("click", function () {
    //     let selectedVehicle = vehicleSelect.value;
    //     document.getElementById("selected-vehicle").textContent = "Vehículo seleccionado: " + vehicles[selectedVehicle].name;
    // });
});
