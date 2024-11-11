// server.js
require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const mongoose = require('mongoose');

// Importa tu archivo de configuración de la base de datos
require('./database');

const app = express();
const port = process.env.PORT || 5000;

// Configuración del servidor
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});

