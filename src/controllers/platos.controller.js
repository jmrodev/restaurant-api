const Plato = require('../models/plato.model');
const mongoose = require('mongoose');

class PlatosController {
  // 1. Obtener todos los platos (con filtros opcionales por idoneidad dietética)
  async listar(req, res) {
    try {
      const filtro = {};
      if (req.query.apto_celiacos !== undefined) filtro.apto_celiacos = req.query.apto_celiacos === 'true';
      if (req.query.apto_veganos !== undefined) filtro.apto_veganos = req.query.apto_veganos === 'true';
      if (req.query.apto_diabeticos !== undefined) filtro.apto_diabeticos = req.query.apto_diabeticos === 'true';

      const platos = await Plato.find(filtro).sort({ nombre: 1 });
      res.json(platos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // 2. Obtener un plato por ID
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `Identificador '${id}' inválido. Debe ser un ObjectId de 24 caracteres hex.` });
      }

      const plato = await Plato.findById(id);
      if (!plato) {
        return res.status(404).json({ error: `Plato con ID '${id}' no encontrado.` });
      }

      res.json(plato);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // 3. Crear nuevo plato (Alta)
  async crear(req, res) {
    try {
      const nuevoPlato = new Plato(req.body);
      const guardado = await nuevoPlato.save();
      res.status(201).json(guardado);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ error: `Ya existe un plato registrado con el nombre '${req.body.nombre}'.` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  }

  // 4. Modificar plato existente (Modificación - PUT)
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `Identificador '${id}' inválido.` });
      }

      const actualizado = await Plato.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!actualizado) {
        return res.status(404).json({ error: `Plato con ID '${id}' no encontrado para actualizar.` });
      }

      res.json(actualizado);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }
      if (err.code === 11000) {
        return res.status(409).json({ error: `Ya existe otro plato con el nombre especificado.` });
      }
      res.status(500).json({ error: err.message });
    }
  }

  // 5. Eliminar plato (Baja - DELETE)
  async eliminar(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `Identificador '${id}' inválido.` });
      }

      const eliminado = await Plato.findByIdAndDelete(id);
      if (!eliminado) {
        return res.status(404).json({ error: `Plato con ID '${id}' no encontrado para eliminar.` });
      }

      res.json({ success: true, message: `Plato '${eliminado.nombre}' eliminado correctamente.` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new PlatosController();
