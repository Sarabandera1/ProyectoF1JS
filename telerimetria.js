export class TelemetrySystem {
    constructor() {
        this.template = document.getElementById('telemetry-template');
        this.data = {
            position: 1,
            driverName: '',
            currentLap: 0,
            bestLap: 0,
            speed: 0,
            tyreWear: 100,
            tyrePressure: 21.0,
            engineTemp: 90
        };
    }

    updateTelemetry(data) {
        this.data = { ...this.data, ...data };
        this.render();
    }

    render() {
        
        document.querySelector('.position').textContent = this.data.position;
        document.querySelector('.driver-name').textContent = this.data.driverName;
        document.querySelector('.speed').textContent = Math.round(this.data.speed);
    
    }
}
