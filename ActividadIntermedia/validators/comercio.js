// validators/comercio.js
const { check, validationResult } = require("express-validator");

const validatorCreateItem = [
  check("name").notEmpty().withMessage("Name is required"),
  check("cif").notEmpty().withMessage("CIF is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("direccion").notEmpty().withMessage("Direccion is required"),
  check("telefono").notEmpty().withMessage("Telefono is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatorUpdateItem = [
  check("name").optional().notEmpty().withMessage("Name is required"),
  check("cif").optional().notEmpty().withMessage("CIF is required"),
  check("email").optional().isEmail().withMessage("Valid email is required"),
  check("direccion").optional().notEmpty().withMessage("Direccion is required"),
  check("telefono").optional().notEmpty().withMessage("Telefono is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validatorCreateItem, validatorUpdateItem };
