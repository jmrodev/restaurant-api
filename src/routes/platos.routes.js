const express = require('express');
const platosController = require('../controllers/platos.controller');

const router = express.Router();

router.get('/', (req, res) => platosController.listar(req, res));
router.get('/:id', (req, res) => platosController.obtenerPorId(req, res));
router.post('/', (req, res) => platosController.crear(req, res));
router.put('/:id', (req, res) => platosController.actualizar(req, res));
router.delete('/:id', (req, res) => platosController.eliminar(req, res));

module.exports = router;
