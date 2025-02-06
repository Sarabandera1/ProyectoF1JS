const API_URL = "http://localhost:3000/carros"

class CarroCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const carro = JSON.parse(this.getAttribute("data"))
    this.render(carro)
  }

  render(carro) {
    this.shadowRoot.innerHTML = `
            <style>
                .carro-card {
                    background-color: #ffffff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    margin-bottom: 10px;
                }
                .carro-card img {
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    border-radius: 8px;
                    object-fit: cover;
                    margin-bottom: 10px;
                }
                .carro-card h3 {
                    margin: 10px 0;
                    color: #555;
                }
                .carro-card p {
                    margin: 5px 0;
                    color: #777;
                    font-size: 14px;
                }
            </style>
            <div class="carro-card">
                <img src="${carro.imagen}" alt="Imagen del carro">
                <h3>${carro.marca} ${carro.modelo} (${carro.anio})</h3>
                <p>Velocidad: ${carro.velocidad} km/h</p>
                <p>Aceleración: ${carro.aceleracion} s</p>
                <p>Consumo: ${carro.consumo} L/100km</p>
                <p>Desgaste: ${carro.desgaste} %</p>
            </div>
        `
  }
}

class CarrosCards extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.render()
    this.fetchCarros()
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                .carros-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                }
            </style>
            <div class="container">
                <h1>Carros F1</h1>
                <div class="carros-grid" id="carrosGrid"></div>
            </div>
        `
  }

  async fetchCarros() {
    try {
      const response = await fetch(API_URL)
      const carros = await response.json()
      this.displayCarros(carros)
    } catch (error) {
      console.error("Error al obtener los carros:", error)
    }
  }

  displayCarros(carros) {
    const grid = this.shadowRoot.getElementById("carrosGrid")
    carros.forEach((carro) => {
      const carroCard = document.createElement("carro-card")
      carroCard.setAttribute("data", JSON.stringify(carro))
      grid.appendChild(carroCard)
    })
  }
}

customElements.define("carro-card", CarroCard)
customElements.define("carros-cards", CarrosCards)
