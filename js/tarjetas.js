const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Ruta para obtener los autos desde autos.json
app.get("/api/autos", (req, res) => {
  const filePath = "./autos.json";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo JSON:", err);
      return res.status(500).send({ message: "Error al cargar los autos." });
    }
    const autos = JSON.parse(data || "[]");
    res.status(200).json(autos);
  });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
