// database.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // Obtén la URI desde las variables de entorno

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB Atlas exitosamente');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

