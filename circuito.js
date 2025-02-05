export class WeatherSystem {
    constructor() {
        this.conditions = ['DRY', 'WET', 'EXTREME'];
        this.currentCondition = 'DRY';
        this.temperature = 25;
    }

    generateRandomWeather() {
        this.currentCondition = this.conditions[Math.floor(Math.random() * this.conditions.length)];
        this.temperature = Math.floor(Math.random() * (40 - 15) + 15);
        return {
            condition: this.currentCondition,
            temperature: this.temperature
        };
    }

    getWeatherEffect() {
        const effects = {
            'DRY': 1,
            'WET': 1.2,
            'EXTREME': 1.4
        };
        return effects[this.currentCondition];
    }
}