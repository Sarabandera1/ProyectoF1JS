
import { WeatherSystem } from './simulacion.js';
import { CarRenderer } from './carro.js';
import { TelemetrySystem } from './telerimetria.js';

class QualifyingSimulator extends HTMLElement {
    constructor() {
        super();
        this.weather = new WeatherSystem();
        this.telemetry = new TelemetrySystem();
        this.carRenderer = null;
        this.drivers = [];
        this.currentSession = 'Q1';
    }

    connectedCallback() {
        this.setupCanvas();
        this.loadDrivers();
        this.startSimulation();
    }

    async loadDrivers() {
        try {
            const response = await fetch('http://localhost:3000/drivers');
            this.drivers = await response.json();
        } catch (error) {
            console.error('Error loading drivers:', error);
        }
    }

    setupCanvas() {
        const canvas = document.getElementById('trackCanvas');
        this.carRenderer = new CarRenderer(canvas);
    }

    startSimulation() {
        const weather = this.weather.generateRandomWeather();
        console.log('Weather conditions:', weather);

        this.drivers.forEach(driver => {
            const lapTime = this.calculateLapTime(driver, weather);
            this.updateClassification(driver, lapTime);
        });
    }

    calculateLapTime(driver, weather) {
        const baseTime = 80; // 1:20.000 como tiempo base
        const weatherEffect = this.weather.getWeatherEffect();
        const driverSkill = driver.skill || 1;
        
        return baseTime + (Math.random() * weatherEffect * driverSkill);
    }

    updateClassification(driver, lapTime) {
        // Actualizar la tabla de clasificación
        const classification = document.querySelector('.classification-board');
        const entry = document.createElement('div');
        entry.className = 'classification-entry';
        entry.innerHTML = `
            <span>${driver.position}</span>
            <span>${driver.name}</span>
            <span>${this.formatTime(lapTime)}</span>
        `;
        classification.appendChild(entry);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }
}

customElements.define('qualifying-simulator', QualifyingSimulator);