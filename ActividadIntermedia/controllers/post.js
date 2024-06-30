const { handleHttpError } = require("../utils/handleError");
const { postModel } = require("../models");
const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");

/**
 * Obtener todas las publicaciones, opcionalmente ordenadas por el puntaje.
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const { sortByScoring } = req.query;
    let query = postModel.find({});
    if (sortByScoring === "true") {
      query = query.sort({ scoring: -1 });
    }
    const data = await query.exec();
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEMS", 403);
  }
};

/**
 * Obtener una publicación por su ID.
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await postModel.findOne({ _id: id });
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

/**
 * Obtener publicaciones por ciudad.
 * @param {*} req
 * @param {*} res
 */
const getItemsCiudad = async (req, res) => {
  try {
    const ciudad = req.params.ciudad;
    let data = await postModel.find({ ciudad });

    const { sortByScoring } = req.query;
    if (sortByScoring === "true") {
      data = data.sort((a, b) => b.scoring - a.scoring);
    }
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_GET_ITEMS_CIUDAD");
  }
};

/**
 * Obtener publicaciones por ciudad y actividad.
 * @param {*} req
 * @param {*} res
 */
const getItemsCiudadActividad = async (req, res) => {
  try {
    const { ciudad, actividad } = req.params;
    let data = await postModel.find({ ciudad, actividad });

    const { sortByScoring } = req.query;
    if (sortByScoring === "true") {
      data = data.sort((a, b) => b.scoring - a.scoring);
    }
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEMS_CIUDAD_ACTIVIDAD");
  }
};

/**
 * Crear una nueva publicación.
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const newItem = req.body;
    newItem.comercioId = req.user.id;

    const data = await postModel.create(newItem);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Actualizar una publicación por su ID.
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await postModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

/**
 * Borrar una publicación por su ID.
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await postModel.deleteOne({ _id: id });
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params; // ID del post
    const { opinion, rating } = req.body;
    const userId = req.user._id;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    post.reviews.push({ userId, opinion, rating }); 

    // Recalcular la puntuación y la cantidad de opiniones
    const totalRatings = post.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    post.puntuaciones = post.reviews.length;
    post.scoring = totalRatings / post.reviews.length;

    await post.save();

    res.send(post);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_ADDING_REVIEW", 500);
  }
};
const getOpinions = async (req, res) => {
  try {
    const { id } = req.params; // ID del post

    const post = await postModel
      .findById(id)
      .populate("reviews.userId", "name email"); // Populate user details if needed
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send(post.reviews);
  } catch (err) {
    handleHttpError(res, "ERROR_GETTING_OPINIONS", 500);
  }
};

/**
 * Añadir una puntuación a una publicación.
 * @param {*} req
 * @param {*} res
 */

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemsCiudad,
  getItemsCiudadActividad,
  addReview,
  getOpinions,
};
