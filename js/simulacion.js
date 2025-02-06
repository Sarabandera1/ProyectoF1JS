document.addEventListener('DOMContentLoaded', () => {
    
    const weatherBtn = document.getElementById('weather-btn');
    const configBtn = document.getElementById('config-btn');
    const classifyBtn = document.getElementById('classify-btn');
    const compareBtn = document.getElementById('compare-btn');
    const selectBtn = document.getElementById('select-btn');
    const weatherStatus = document.getElementById('weather-status');
    const carStats = document.getElementById('car-stats');
    
    
    const weatherTypes = [
        { name: 'soleado', icon: '🌤', effect: 1 },
        { name: 'lluvioso', icon: '🌧', effect: 0.8 },
        { name: 'clima extremo', icon: '⛈', effect: 0.6 }
    ];
    
    const cars = [
        {
            name: 'Red Bull RB19',
            stats: {
                Velocidad: 95,
                aceleracion: 92,
                manejo: 90,
                consumoDeCombustible: 88,
                desgasteNeumaticos: 85
            }
        },
        {
            name: 'Ferrari SF-23',
            stats: {
                Velocidad: 60,
                aceleracion: 90,
                manejo: 70,
                consumoDeCombustible: 59,
                desgasteNeumaticos: 85
            }
        },
        {
            name: 'Mercedes W14',
            stats: {
                Velocidad: 65,
                aceleracion: 90,
                manejo: 90,
                consumoDeCombustible: 93,
                desgasteNeumaticos: 30
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

    function classifyDrivers() {
        const results = cars.map(car => {
            const baseTime = 80; 
            const weatherImpact = (1 - currentWeather.effect) * 10;
            const carPerformance = (car.stats.speed + car.stats.handling) / 200;
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
        document.getElementById('car-name').textContent = currentCar.name;
        updateCarStats(currentCar);
    });
});