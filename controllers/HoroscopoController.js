const asyncHandler = require('express-async-handler');
const Horoscopo = require('../models/HoroscopoModels');

// Obtener todos los horóscopos
const getAllHoroscopos = asyncHandler(async (req, res) => {
  try {
    const horoscopos = await Horoscopo.find();
    res.json(horoscopos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un horóscopo por su ID
const getHoroscopoById = asyncHandler(async (req, res) => {
  const horoscopo = await Horoscopo.findById(req.params.id);
  if (horoscopo) {
    res.json(horoscopo);
  } else {
    res.status(404).json({ message: 'Horóscopo no encontrado' });
  }
});

// Crear un nuevo horóscopo
const createHoroscopo = asyncHandler(async (req, res) => {
  const horoscopo = new Horoscopo({
    signo: req.body.signo,
    contenido: req.body.contenido
  });
  try {
    const newHoroscopo = await horoscopo.save();
    res.status(201).json(newHoroscopo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un horóscopo existente
const updateHoroscopo = asyncHandler(async (req, res) => {
  const { signo, contenido } = req.body;
  const horoscopo = await Horoscopo.findById(req.params.id);
  if (horoscopo) {
    horoscopo.signo = signo;
    horoscopo.contenido = contenido;
    const updatedHoroscopo = await horoscopo.save();
    res.json(updatedHoroscopo);
  } else {
    res.status(404).json({ message: 'Horóscopo no encontrado' });
  }
});

// Eliminar un horóscopo existente
const deleteHoroscopo = asyncHandler(async (req, res) => {
  const horoscopo = await Horoscopo.findById(req.params.id);
  if (horoscopo) {
    await horoscopo.remove();
    res.json({ message: 'Horóscopo eliminado' });
  } else {
    res.status(404).json({ message: 'Horóscopo no encontrado' });
  }
});

module.exports = {
  getAllHoroscopos,
  getHoroscopoById,
  createHoroscopo,
  updateHoroscopo,
  deleteHoroscopo
};
