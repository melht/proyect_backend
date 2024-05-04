const express = require('express');
const router = express.Router();
const horoscoposController = require('../controllers/HoroscopoController');

// Obtener todos los horóscopos
router.get('/', horoscoposController.getAllHoroscopos);

// Obtener un horóscopo por su ID
router.get('/:id', horoscoposController.getHoroscopoById);

// Crear un nuevo horóscopo
router.post('/', horoscoposController.createHoroscopo);

// Actualizar un horóscopo existente
router.put('/:id', horoscoposController.updateHoroscopo);

// Eliminar un horóscopo existente
router.delete('/:id', horoscoposController.deleteHoroscopo);

module.exports = router;
