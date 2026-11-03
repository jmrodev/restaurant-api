const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:secretpassword@localhost:27017/restaurante_db?authSource=admin';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[INFO] Conexión a MongoDB (Mongoose) establecida exitosamente');
  } catch (err) {
    console.error('[ERROR] Error al conectar con MongoDB:', err.message);
    throw err;
  }
}

async function closeDB() {
  await mongoose.connection.close();
}

module.exports = { connectDB, closeDB };
