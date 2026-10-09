const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  creadoEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);