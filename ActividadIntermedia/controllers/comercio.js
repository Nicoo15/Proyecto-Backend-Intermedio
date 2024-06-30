//controllers/comercio.js
const { handleHttpError } = require("../utils/handleError");

const { comerModel } = require("../models");
const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");

//Obtener todos los comercios ordenados por cif
const getItems = async (req, res) => {
  try {
    const ordenarPorCif = req.query.ordenarPorCif === "true";
    let query = comerModel.find({});
    // Ordenar por cif
    if (ordenarPorCif) {
      query = query.sort({ cif: "asc" });
    } //consulta
    const data = await query.exec();
    console.log(data);
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEMS", 403);
  } //error
};
//Obtener un comercio por su cif
const getItem = async (req, res) => {
  try {
    const cif = req.params.cif;
    const data = await comerModel.findOne({ cif: cif }); //consulta por cif

    res.send(data);
  } catch (err) {} //error
};

//Guardar un nuevo comercio
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);

    const dataUser = await comerModel.create(body); //crea un nuevo comercio con los datos proporcionados

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEMS"); //error
  }
};
// Actualizar un comercio por su CIF
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log(id + " " + updates);

    // Validar si hay actualizaciones
    if (!updates || Object.keys(updates).length === 0) {
      return res
        .status(400)
        .send({ message: "No se proporcionaron datos para actualizar." }); //error
    }

    const comercio = await comerModel.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    }); //actualiza el comercio con los datos proporcionados

    // si no se encuentra el comercio error
    if (!comercio) {
      return res.status(404).send({
        message: "No se encontró un comercio con el CIF proporcionado.",
      });
    }

    res.send(comercio);
  } catch (err) {
    console.error("Error al actualizar el comercio:", err);
    res.status(500).send({ message: "Error al actualizar el comercio." }); //error
  }
};

// Borrar un comercio por su CIF (lógico o físico)
const deleteItem = async (req, res) => {
  try {
    const { cif } = req.params;
    const { tipo } = req.query;

    //validacion de tipo de borrado
    let deletedComercio;
    if (tipo === "logico") {
      deletedComercio = await comerModel.findOneAndUpdate(
        { cif },
        { isDeleted: true },
        { new: true }
      );
    } else if (tipo === "fisico") {
      deletedComercio = await comerModel.findOneAndDelete({ cif });
    } else {
      return res.status(400).send({
        message: "Tipo de borrado no válido. Use 'logico' o 'fisico'.",
      }); //error
    }
    // si no se encuentra el comercio error
    if (!deletedComercio) {
      return res.status(404).send({
        message: "No se encontró un comercio con el CIF proporcionado.",
      });
    }

    res.send({
      message: `Comercio con CIF ${cif} borrado ${
        tipo === "logico" ? "lógicamente" : "físicamente"
      }.`,
      deletedComercio,
    }); //mensaje de borrado
  } catch (error) {
    console.error("Error al borrar el comercio:", error);
    res.status(500).send({ message: "Error al borrar el comercio." });
  } //error
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
