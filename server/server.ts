import express, { Request, Response } from 'express';
const morgan = require("morgan");
const mongoose = require('mongoose');
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();
const mongoURI = process.env.ATLAS_URI;
app.use(morgan("dev"));


if (!mongoURI) {
  console.error('La URI de MongoDB no está definida.');
} else {
  console.log('Conectando a MongoDB:', mongoURI);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas exitosamente');
  })
  .catch((error: unknown) => {
    console.error('Error al conectar a MongoDB:', error);
  });
// Settings

app.set("port", process.env.PORT || 5300);

// Middleware
app.use(express.json()); // para interpretar json

// Routes
app.use('/user',require("./routes/user"));

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:`, app.get("port"));
});
