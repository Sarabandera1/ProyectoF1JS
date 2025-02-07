const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = './carros.json';

// Middleware
app.use(express.json());
app.use(cors());

// Rutas

// Obtener todos los carros
app.get('/carros', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ message: 'Error al obtener los carros' });
        }
        const carros = JSON.parse(data || '[]');
        res.json(carros);
    });
});

// Agregar un nuevo carro
app.post('/carros', (req, res) => {
    const nuevoCarro = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ message: 'Error al agregar el carro' });
        }

        const carros = JSON.parse(data || '[]');
        carros.push(nuevoCarro);

        fs.writeFile(DATA_FILE, JSON.stringify(carros, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).json({ message: 'Error al guardar el carro' });
            }
            res.status(201).json({ message: 'Carro agregado exitosamente' });
        });
    });
});

// Actualizar un carro
app.put('/carros/:id', (req, res) => {
    const { id } = req.params;
    const carroActualizado = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ message: 'Error al actualizar el carro' });
        }

        let carros = JSON.parse(data || '[]');
        const index = carros.findIndex((carro) => carro.id == id);

        if (index === -1) {
            return res.status(404).json({ message: 'Carro no encontrado' });
        }

        carros[index] = { ...carros[index], ...carroActualizado };

        fs.writeFile(DATA_FILE, JSON.stringify(carros, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).json({ message: 'Error al actualizar el carro' });
            }
            res.json({ message: 'Carro actualizado exitosamente' });
        });
    });
});

// Eliminar un carro
app.delete('/carros/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ message: 'Error al eliminar el carro' });
        }

        let carros = JSON.parse(data || '[]');
        carros = carros.filter((carro) => carro.id != id);

        fs.writeFile(DATA_FILE, JSON.stringify(carros, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).json({ message: 'Error al eliminar el carro' });
            }
            res.json({ message: 'Carro eliminado exitosamente' });
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
