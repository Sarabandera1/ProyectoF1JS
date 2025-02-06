const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer'); // Para manejar las imágenes
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Carpeta para guardar imágenes

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Ruta para registrar pilotos
app.post('/api/pilotos', upload.single('imagenPiloto'), (req, res) => {
  const { nombrePiloto, edadPiloto, paisPiloto, equipoPiloto } = req.body;
  const imagenPath = req.file ? `/uploads/${req.file.filename}` : null;

  // Crear el nuevo piloto
  const nuevoPiloto = {
    id: Date.now(),
    nombre: nombrePiloto,
    edad: parseInt(edadPiloto),
    pais: paisPiloto,
    equipo: equipoPiloto,
    imagen: imagenPath,
  };

  // Leer y actualizar el archivo JSON
  const filePath = './pilotos.json';
  fs.readFile(filePath, 'utf8', (err, data) => {
    let pilotos = [];
    if (!err && data) {
      pilotos = JSON.parse(data); // Leer pilotos existentes
    }

    pilotos.push(nuevoPiloto); // Agregar el nuevo piloto

    // Guardar en el archivo JSON
    fs.writeFile(filePath, JSON.stringify(pilotos, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error al guardar el archivo JSON:', writeErr);
        return res.status(500).send({ message: 'Error al guardar el piloto' });
      }

      res.status(201).send({ message: 'Piloto registrado exitosamente', piloto: nuevoPiloto });
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
