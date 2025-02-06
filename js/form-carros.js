// Carros CRUD Implementation with JSON Server

// Base URL for JSON Server
const API_URL = "http://localhost:3000/carros"

// List of pilots
const pilotos = ["Juan Pérez", "Ana López", "Carlos Martínez", "María Gómez"]

class CarroCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const marca = this.getAttribute("marca")
    const modelo = this.getAttribute("modelo")
    const anio = this.getAttribute("anio")
    const imagen = this.getAttribute("imagen")
    const velocidad = this.getAttribute("velocidad")
    const aceleracion = this.getAttribute("aceleracion")
    const consumo = this.getAttribute("consumo")
    const desgaste = this.getAttribute("desgaste")
    const piloto = this.getAttribute("piloto") || "Sin asignar"
    const id = this.getAttribute("id")

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
                .carro-card button {
                    margin: 5px;
                    padding: 8px 12px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .carro-card button:hover {
                    background-color: #0056b3;
                }
                .carro-card button:nth-child(3) {
                    background-color: #DC3545;
                }
                .carro-card button:nth-child(3):hover {
                    background-color: #c82333;
                }
            </style>
            <div class="carro-card">
                <img src="${imagen}" alt="Imagen del carro">
                <h3>${marca} ${modelo} (${anio})</h3>
                <p>Velocidad: ${velocidad} km/h</p>
                <p>Aceleración: ${aceleracion} s</p>
                <p>Consumo: ${consumo} L/100km</p>
                <p>Desgaste: ${desgaste} %</p>
                <p>Piloto: ${piloto}</p>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
                <button class="asignar">Asignar Piloto</button>
            </div>
        `

    this.shadowRoot.querySelector(".eliminar").addEventListener("click", () => eliminarCarro(id))
    this.shadowRoot.querySelector(".editar").addEventListener("click", () => editarCarroPrompt(id))
    this.shadowRoot.querySelector(".asignar").addEventListener("click", () => asignarPilotoPrompt(id))
  }
}

customElements.define("carro-card", CarroCard)

class CarrosApp extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                form {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                input, button {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #45a049;
                }
                .carros-container {
                    margin-top: 20px;
                }
            </style>
            <div class="container">
                <h1>Gestión de Carros</h1>
                <form id="carroForm">
                    <input type="text" id="marca" placeholder="Marca" required>
                    <input type="text" id="modelo" placeholder="Modelo" required>
                    <input type="number" id="anio" placeholder="Año" required>
                    <input type="url" id="imagen" placeholder="URL de la Imagen" required>
                    <input type="number" id="velocidad" placeholder="Velocidad (km/h)" required>
                    <input type="number" id="aceleracion" placeholder="Aceleración (s)" required>
                    <input type="number" id="consumo" placeholder="Consumo (L/100km)" required>
                    <input type="number" id="desgaste" placeholder="Desgaste (%)" required>
                    <button type="submit">Agregar Carro</button>
                </form>
                <div class="carros-container" id="carrosContainer"></div>
            </div>
        `
  }

  connectedCallback() {
    const form = this.shadowRoot.getElementById("carroForm")
    form.addEventListener("submit", async (event) => {
      event.preventDefault()
      const marca = this.shadowRoot.getElementById("marca").value
      const modelo = this.shadowRoot.getElementById("modelo").value
      const anio = this.shadowRoot.getElementById("anio").value
      const imagen = this.shadowRoot.getElementById("imagen").value
      const velocidad = this.shadowRoot.getElementById("velocidad").value
      const aceleracion = this.shadowRoot.getElementById("aceleracion").value
      const consumo = this.shadowRoot.getElementById("consumo").value
      const desgaste = this.shadowRoot.getElementById("desgaste").value
      await agregarCarro({ marca, modelo, anio, imagen, velocidad, aceleracion, consumo, desgaste })
      form.reset()
    })
    mostrarCarros() // This will load existing cars when the app initializes
  }
}

customElements.define("carros-app", CarrosApp)

async function agregarCarro(carro) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carro),
    })
    const newCarro = await response.json()

    // Create and display the new card
    const container = document.querySelector("carros-app").shadowRoot.getElementById("carrosContainer")
    const card = document.createElement("carro-card")
    card.setAttribute("id", newCarro.id)
    card.setAttribute("marca", newCarro.marca)
    card.setAttribute("modelo", newCarro.modelo)
    card.setAttribute("anio", newCarro.anio)
    card.setAttribute("imagen", newCarro.imagen)
    card.setAttribute("velocidad", newCarro.velocidad)
    card.setAttribute("aceleracion", newCarro.aceleracion)
    card.setAttribute("consumo", newCarro.consumo)
    card.setAttribute("desgaste", newCarro.desgaste)
    card.setAttribute("piloto", newCarro.piloto || "Sin asignar")

    container.appendChild(card)
  } catch (error) {
    console.error("Error al agregar carro:", error)
  }
}

async function eliminarCarro(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    mostrarCarros()
  } catch (error) {
    console.error("Error al eliminar carro:", error)
  }
}

async function editarCarroPrompt(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    const carro = await response.json()

    const nuevaMarca = prompt("Editar Marca:", carro.marca)
    const nuevoModelo = prompt("Editar Modelo:", carro.modelo)
    const nuevoAnio = prompt("Editar Año:", carro.anio)
    const nuevaImagen = prompt("Editar URL de la Imagen:", carro.imagen)
    const nuevaVelocidad = prompt("Editar Velocidad (km/h):", carro.velocidad)
    const nuevaAceleracion = prompt("Editar Aceleración (s):", carro.aceleracion)
    const nuevoConsumo = prompt("Editar Consumo (L/100km):", carro.consumo)
    const nuevoDesgaste = prompt("Editar Desgaste (%):", carro.desgaste)

    if (
      nuevaMarca &&
      nuevoModelo &&
      nuevoAnio &&
      nuevaImagen &&
      nuevaVelocidad &&
      nuevaAceleracion &&
      nuevoConsumo &&
      nuevoDesgaste
    ) {
      await editarCarro(id, {
        nuevaMarca,
        nuevoModelo,
        nuevoAnio,
        nuevaImagen,
        nuevaVelocidad,
        nuevaAceleracion,
        nuevoConsumo,
        nuevoDesgaste,
      })
    }
  } catch (error) {
    console.error("Error al obtener carro para editar:", error)
  }
}

async function editarCarro(id, carroActualizado) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carroActualizado),
    })
    mostrarCarros()
  } catch (error) {
    console.error("Error al editar carro:", error)
  }
}

async function asignarPilotoPrompt(id) {
  try {
    const container = document.querySelector("carros-app").shadowRoot.getElementById("carrosContainer")
    container.innerHTML = "" // Clear existing content

    const response = await fetch(API_URL)
    const carros = await response.json()

    carros.forEach((carro) => {
      const card = document.createElement("carro-card")
      card.setAttribute("id", carro.id)
      card.setAttribute("marca", carro.marca)
      card.setAttribute("modelo", carro.modelo)
      card.setAttribute("anio", carro.anio)
      card.setAttribute("imagen", carro.imagen)
      card.setAttribute("velocidad", carro.velocidad)
      card.setAttribute("aceleracion", carro.aceleracion)
      card.setAttribute("consumo", carro.consumo)
      card.setAttribute("desgaste", carro.desgaste)
      card.setAttribute("piloto", carro.piloto || "Sin asignar")

      container.appendChild(card)
    })
  } catch (error) {
    console.error("Error al mostrar carros:", error)
  }
}

async function mostrarCarros() {
  try {
    const container = document.querySelector("carros-app").shadowRoot.getElementById("carrosContainer")
    container.innerHTML = "" // Clear existing content

    const response = await fetch(API_URL)
    const carros = await response.json()

    carros.forEach((carro) => {
      const card = document.createElement("carro-card")
      card.setAttribute("id", carro.id)
      card.setAttribute("marca", carro.marca)
      card.setAttribute("modelo", carro.modelo)
      card.setAttribute("anio", carro.anio)
      card.setAttribute("imagen", carro.imagen)
      card.setAttribute("velocidad", carro.velocidad)
      card.setAttribute("aceleracion", carro.aceleracion)
      card.setAttribute("consumo", carro.consumo)
      card.setAttribute("desgaste", carro.desgaste)
      card.setAttribute("piloto", carro.piloto || "Sin asignar")

      container.appendChild(card)
    })
  } catch (error) {
    console.error("Error al mostrar carros:", error)
  }
}

// Start the app
document.body.innerHTML = `<carros-app></carros-app>`
mostrarCarros()
