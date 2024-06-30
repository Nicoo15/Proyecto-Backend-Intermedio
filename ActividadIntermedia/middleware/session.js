const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { matchedData } = require("express-validator");
const { userModel, comerModel, postModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { 
      return handleHttpError(res, "NOT_TOKEN", 401);
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      return handleHttpError(res, "ERROR_ID_TOKEN", 401);
    }
    var user = await userModel.findById(dataToken._id);
    if (user == null) {
      user = await comerModel.findById(dataToken._id);
    }

    req.user = user;

    next();
  } catch (err) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

const checkOwnershipOrAdmin = (model) => async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    let resource = await model.findById(id); 
    if (!resource) {
      return handleHttpError(res, "RESOURCE_NOT_FOUND", 404);
    }

    if (
      resource._id.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return handleHttpError(res, "NOT_ALLOWED", 403);
    }

    next();
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

const checkOwnershipPost = (model) => async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    let resource = await model.findById(id);
    if (!resource) {
      return handleHttpError(res, "RESOURCE_NOT_FOUND", 404);
    }

    if (resource.comercioId.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return handleHttpError(res, "NOT_ALLOWED", 403);
    }

    next();
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};
module.exports = { authMiddleware, checkOwnershipOrAdmin, checkOwnershipPost };
