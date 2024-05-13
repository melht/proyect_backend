const asyncHandler = require('express-async-handler');
const Horoscopo = require('../models/HoroscopoModels');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const getAllHoroscopos = asyncHandler(async (req, res) => {
  try {
    const horoscopos = await Horoscopo.find();
    res.json(horoscopos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getHoroscopoBySigno = asyncHandler(async (req, res) => {
  const horoscopo = await Horoscopo.findOne({ signo: req.params.signo });

  if (horoscopo) {
    res.json(horoscopo);
  } else {
    res.status(404).json({ message: 'Horóscopo no encontrado' });
  }
});


const createHoroscopo = asyncHandler(async (req, res) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
    }

    // Split the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.idusuario);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden crear horóscopos.' });
    }

    const horoscopo = new Horoscopo({
      signo: req.body.signo,
      contenido: req.body.contenido
    });

    const newHoroscopo = await horoscopo.save();

    res.status(201).json(newHoroscopo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


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
  getHoroscopoBySigno,
  createHoroscopo,
  updateHoroscopo,
  deleteHoroscopo
};

