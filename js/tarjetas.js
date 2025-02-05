document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    const cars = [
        { modelo: "F1-2024", velocidad: "350 km/h", aceleracion: "2.5s", consumo: "30 L/100km", desgaste: "Alto", piloto: "Lewis Hamilton" },
        { modelo: "RB20", velocidad: "355 km/h", aceleracion: "2.4s", consumo: "28 L/100km", desgaste: "Medio", piloto: "Max Verstappen" },
        { modelo: "SF-24", velocidad: "348 km/h", aceleracion: "2.6s", consumo: "32 L/100km", desgaste: "Alto", piloto: "Charles Leclerc" },
        { modelo: "W15", velocidad: "345 km/h", aceleracion: "2.7s", consumo: "29 L/100km", desgaste: "Medio", piloto: "George Russell" },
        { modelo: "AMR24", velocidad: "342 km/h", aceleracion: "2.8s", consumo: "31 L/100km", desgaste: "Alto", piloto: "Fernando Alonso" },
        { modelo: "MCL60", velocidad: "350 km/h", aceleracion: "2.5s", consumo: "30 L/100km", desgaste: "Medio", piloto: "Lando Norris" },
        { modelo: "AT04", velocidad: "340 km/h", aceleracion: "2.9s", consumo: "33 L/100km", desgaste: "Alto", piloto: "Yuki Tsunoda" },
        { modelo: "VF-24", velocidad: "338 km/h", aceleracion: "3.0s", consumo: "34 L/100km", desgaste: "Alto", piloto: "Kevin Magnussen" },
        { modelo: "C44", velocidad: "344 km/h", aceleracion: "2.7s", consumo: "29 L/100km", desgaste: "Medio", piloto: "Valtteri Bottas" },
        { modelo: "A524", velocidad: "346 km/h", aceleracion: "2.6s", consumo: "30 L/100km", desgaste: "Medio", piloto: "Esteban Ocon" }
    ];

    cars.forEach(car => {
        const card = document.createElement("div");
        card.classList.add("car-card");
        card.innerHTML = `
            <h3>${car.modelo}</h3>
            <p><strong>Velocidad:</strong> ${car.velocidad}</p>
            <p><strong>Aceleración:</strong> ${car.aceleracion}</p>
            <p><strong>Consumo:</strong> ${car.consumo}</p>
            <p><strong>Desgaste:</strong> ${car.desgaste}</p>
            <p><strong>Piloto:</strong> ${car.piloto}</p>
        `;
        cardContainer.appendChild(card);
    });
});
