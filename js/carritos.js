document.addEventListener("DOMContentLoaded", () => {
    renderUI();
    mostrarPilotos();
});

// 🎨 Renderizar UI
function renderUI() {
    document.getElementById("app").innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; background-color: #222; color: white; padding: 20px;">
            <h1 style="color: #ffcc00;">Registro de Pilotos</h1>
            <form id="registroForm" style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <input type="text" id="nombre" placeholder="Nombre" required>
                <input type="text" id="rol" placeholder="Rol" required>
                <input type="text" id="equipo" placeholder="Equipo" required>
                <input type="number" id="id" placeholder="ID" required>
                <button type="submit" style="background-color: #ffcc00; padding: 10px; border: none; cursor: pointer;">Guardar</button>
            </form>

            <h2 style="color: #ffcc00;">Lista de Pilotos</h2>
            <table style="width: 80%; margin: auto; border-collapse: collapse; background: #333;">
                <thead>
                    <tr style="background: #444; color: #ffcc00;">
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Equipo</th>
                        <th>ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaPilotos"></tbody>
            </table>
        </div>
    `;

    document.getElementById("registroForm").addEventListener("submit", manejarPiloto);
}

// 📥 Obtener pilotos de localStorage
function obtenerPilotos() {
    return JSON.parse(localStorage.getItem("pilotos")) || [];
}

// ✅ Guardar o editar piloto
function guardarPiloto(piloto) {
    let pilotos = obtenerPilotos();
    let index = pilotos.findIndex((p) => p.id == piloto.id);

    if (index !== -1) {
        pilotos[index] = piloto; // Editar existente
    } else {
        pilotos.push(piloto); // Agregar nuevo
    }

    localStorage.setItem("pilotos", JSON.stringify(pilotos));
}

// 📋 Mostrar pilotos
function mostrarPilotos() {
    let pilotos = obtenerPilotos();
    let tablaPilotos = document.getElementById("tablaPilotos");
    tablaPilotos.innerHTML = "";

    pilotos.forEach((piloto) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td style="padding: 10px; border: 1px solid #ffcc00;">${piloto.nombre}</td>
            <td style="padding: 10px; border: 1px solid #ffcc00;">${piloto.rol}</td>
            <td style="padding: 10px; border: 1px solid #ffcc00;">${piloto.equipo}</td>
            <td style="padding: 10px; border: 1px solid #ffcc00;">${piloto.id}</td>
            <td style="padding: 10px; border: 1px solid #ffcc00;">
                <button onclick="editarPiloto(${piloto.id})" style="margin-right: 5px;">✏️</button>
                <button onclick="eliminarPiloto(${piloto.id})">❌</button>
            </td>
        `;
        tablaPilotos.appendChild(fila);
    });
}

// ✏️ Editar piloto
function editarPiloto(id) {
    let pilotos = obtenerPilotos();
    let piloto = pilotos.find((p) => p.id == id);

    if (piloto) {
        document.getElementById("nombre").value = piloto.nombre;
        document.getElementById("rol").value = piloto.rol;
        document.getElementById("equipo").value = piloto.equipo;
        document.getElementById("id").value = piloto.id;
    }
}

// ❌ Eliminar piloto
function eliminarPiloto(id) {
    let pilotos = obtenerPilotos().filter((p) => p.id != id);
    localStorage.setItem("pilotos", JSON.stringify(pilotos));
    mostrarPilotos();
}

// 📤 Manejo del formulario
function manejarPiloto(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let rol = document.getElementById("rol").value;
    let equipo = document.getElementById("equipo").value;
    let id = document.getElementById("id").value;

    guardarPiloto({ nombre, rol, equipo, id });
    event.target.reset();
    mostrarPilotos();
}