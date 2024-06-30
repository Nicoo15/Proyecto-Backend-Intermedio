const mongoose = require("mongoose");

const ComercioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cif: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    ciudad: { type: String },
    actividad: { type: String },
    titulo: { type: String },
    resumen: { type: String },
    textos: { type: String },
    fotos: { type: String },
    scoring: { type: Number, default: 0 },
    puntuaciones: { type: Number, default: 0 },
    resenias: { type: String },
    role: {
      type: String,
      default: "comercio", // Asigna "comercio" como valor predeterminado para todos los documentos
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Comercio", ComercioSchema);
