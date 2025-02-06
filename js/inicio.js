const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = 3000;
const filePath = './users.json';

// Ruta para registrar usuarios
app.post('/signup', (req, res) => {
    const userData = req.body;

    // Leer el archivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        let users = [];
        if (err && err.code !== 'ENOENT') {
            console.error('Error leyendo el archivo:', err);
            return res.status(500).send({ message: 'Error leyendo el archivo' });
        }

        if (data) {
            try {
                users = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).send({ message: 'Error al parsear JSON' });
            }
        }

        // Agregar el nuevo usuario
        users.push(userData);

        // Guardar los datos actualizados
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error escribiendo el archivo:', writeErr);
                return res.status(500).send({ message: 'Error guardando los datos' });
            }
            console.log('Usuario registrado:', userData);
            res.status(201).send({ message: 'Usuario registrado exitosamente' });
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
