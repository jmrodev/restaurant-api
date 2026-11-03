const express = require('express');
const { connectDB } = require('./config/db');
const platosRoutes = require('./routes/platos.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'restaurant-api', timestamp: new Date() });
});

// Rutas de Platos
app.use('/api/platos', platosRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[INFO] Servidor de Restaurante corriendo en: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[FATAL] No se pudo arrancar el servidor:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
