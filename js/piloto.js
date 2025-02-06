const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());  // Habilitar CORS para permitir solicitudes desde el frontend

app.use(express.json());  // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios

// Ruta para registrar un piloto
app.post('/api/pilotos', (req, res) => {
  // Lógica para manejar los datos del piloto
  console.log(req.body);  // Ver los datos recibidos en la solicitud
  res.json({ message: 'Piloto registrado correctamente' });  // Respuesta de éxito
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
const cors = require('cors');
app.use(cors()); 