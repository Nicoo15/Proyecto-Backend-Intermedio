const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    opinion: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PostSchema = new mongoose.Schema(
  {
    comercioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comercio",
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    actividad: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
    },
    resumen: {
      type: String,
    },
    textos: {
      type: String,
    },
    fotos: {
      type: String,
    },
    scoring: {
      type: Number,
      default: 0,
    },
    puntuaciones: {
      type: Number,
      default: 0,
    },
    resenias: {
      type: String,
    },
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", PostSchema);
