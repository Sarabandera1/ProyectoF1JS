document.addEventListener('DOMContentLoaded', () => {
    const weatherBtn = document.getElementById('weather-btn');
    const configBtn = document.getElementById('config-btn');
    const classifyBtn = document.getElementById('classify-btn');
    const compareBtn = document.getElementById('compare-btn');
    const selectBtn = document.getElementById('select-btn');
    const registerBtn = document.getElementById('register-btn');
    const weatherStatus = document.getElementById('weather-status');
    const carStats = document.getElementById('car-stats');
    const carName = document.getElementById('car-name');
    const carDescription = document.getElementById('car-description');
    const carImageContainer = document.getElementById('car-image-container');

    const weatherTypes = [
        { name: 'Soleado', icon: '🌤', effect: 1 },
        { name: 'Lluvioso', icon: '🌧', effect: 0.8 },
        { name: 'Clima Extremo', icon: '⛈', effect: 0.6 }
    ];

    let cars = [
        {
            name: 'Red Bull RB19',
            image: './img/fcarroNaranja.jpg',
            stats: {
                Velocidad: 95,
                Aceleracion: 92,
                Manejo: 90,
                ConsumoDeCombustible: 88,
                DesgasteNeumaticos: 85
            }
        },
        {
            name: 'Ferrari SF-23',
            image: './img/fcarroRojo.jpg',
            stats: {
                Velocidad: 60,
                Aceleracion: 90,
                Manejo: 70,
                ConsumoDeCombustible: 59,
                DesgasteNeumaticos: 85
            }
        },
        {
            name: 'Mercedes W14',
            image: './img/fcarroNegro.jpg',
            stats: {
                Velocidad: 65,
                Aceleracion: 90,
                Manejo: 90,
                ConsumoDeCombustible: 93,
                DesgasteNeumaticos: 30
            }
        }
    ];

    let currentCar = null;
    let currentWeather = weatherTypes[0];

    function updateWeather() {
        const newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        currentWeather = newWeather;
        weatherStatus.innerHTML = `${newWeather.icon} ${newWeather.name}`;
        updateCarPerformance();
    }

    function updateCarStats(car) {
        const statsHTML = Object.entries(car.stats).map(([stat, value]) => `
            <div class="stat-item">
                <span class="stat-label">${stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${value * currentWeather.effect}%"></div>
                </div>
            </div>
        `).join('');

        carStats.innerHTML = statsHTML;
    }

    function updateCarPerformance() {
        if (currentCar) {
            updateCarStats(currentCar);
        }
    }

    function updateCarImage(car) {
        carImageContainer.innerHTML = `<img src="${car.image}" alt="${car.name}" class="car-image">`;
    }

    function classifyDrivers() {
        const results = cars.map(car => {
            const baseTime = 80; 
            const weatherImpact = (1 - currentWeather.effect) * 10;
            const carPerformance = (car.stats.Velocidad + car.stats.Manejo) / 200;
            const randomFactor = Math.random() * 2 - 1;

            return {
                name: car.name,
                time: baseTime + weatherImpact - (carPerformance * 5) + randomFactor
            };
        }).sort((a, b) => a.time - b.time);

        carStats.innerHTML = `
            <h3>Resultados</h3>
            ${results.map((result, index) => `
                <div class="stat-item">
                    <span class="stat-label">${index + 1}. ${result.name}</span>
                    <span class="stat-value">${result.time.toFixed(3)}s</span>
                </div>
            `).join('')}
        `;
    }

    function registerCar() {
        const name = prompt("Ingrese el nombre del carro:");
        if (!name) return;

        const image = prompt("Ingrese la URL de la imagen del carro:");
        if (!image) return;

        const stats = {};
        const statNames = ['Velocidad', 'Aceleracion', 'Manejo', 'ConsumoDeCombustible', 'DesgasteNeumaticos'];

        for (const stat of statNames) {
            const value = parseInt(prompt(`Ingrese el valor para ${stat} (0-100):`));
            if (isNaN(value) || value < 0 || value > 100) {
                alert("Valor inválido. El registro ha sido cancelado.");
                return;
            }
            stats[stat] = value;
        }

        const newCar = { name, image, stats };
        cars.push(newCar);
        alert(`${name} ha sido registrado exitosamente.`);
    }

    weatherBtn.addEventListener('click', updateWeather);

    configBtn.addEventListener('click', () => {
        if (!currentCar) {
            alert('Por favor, seleccione un carro primero');
            return;
        }

        const configs = ['Downforce', 'Brake Balance', 'Tire Pressure'];
        const configHTML = configs.map(config => `
            <div class="stat-item">
                <span class="stat-label">${config}</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${Math.random() * 100}%"></div>
                </div>
            </div>
        `).join('');
        carStats.innerHTML = configHTML;
    });

    classifyBtn.addEventListener('click', classifyDrivers);

    compareBtn.addEventListener('click', () => {
        const comparisonHTML = cars.map(car => `
            <div class="car-comparison">
                <h3>${car.name}</h3>
                ${Object.entries(car.stats).map(([stat, value]) => `
                    <div class="stat-item">
                        <span class="stat-label">${stat}</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${value}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('<hr>');
        carStats.innerHTML = comparisonHTML;
    });

    selectBtn.addEventListener('click', () => {
        currentCar = cars[Math.floor(Math.random() * cars.length)];
        carName.textContent = currentCar.name;
        carDescription.textContent = `Vehículo seleccionado: ${currentCar.name}`;
        updateCarStats(currentCar);
        updateCarImage(currentCar);
    });

    registerBtn.addEventListener('click', registerCar);

    // Selecciona un carro al iniciar
    selectBtn.click();
});
