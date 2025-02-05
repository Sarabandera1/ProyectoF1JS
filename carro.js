// car-renderer.js
export class CarRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gl = canvas.getContext('webgl');
        this.setupWebGL();
    }

    setupWebGL() {
        // Configuración básica de WebGL
        if (this.gl) {
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }
    }

    renderCar(carData) {
        // Renderizado del auto usando WebGL
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar el auto (versión simplificada)
        this.ctx.beginPath();
        this.ctx.moveTo(10, 10);
        this.ctx.lineTo(90, 10);
        this.ctx.lineTo(100, 50);
        this.ctx.lineTo(0, 50);
        this.ctx.closePath();
        this.ctx.fillStyle = carData.color;
        this.ctx.fill();
    }
}