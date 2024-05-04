const mongoose = require('mongoose');

const horoscopoSchema = new mongoose.Schema({
  signo: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  contenido: { type: String, required: true },
});

module.exports = mongoose.model('Horoscopo', horoscopoSchema);
