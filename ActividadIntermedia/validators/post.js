// validators/post.js
const { check, validationResult } = require("express-validator");

const validatorCreatePost = [
  check("comercioId").notEmpty().withMessage("ComercioId is required"),
  check("ciudad").notEmpty().withMessage("Ciudad is required"),
  check("actividad").notEmpty().withMessage("Actividad is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatorUpdatePost = [
  check("comercioId")
    .optional()
    .notEmpty()
    .withMessage("ComercioId is required"),
  check("ciudad").optional().notEmpty().withMessage("Ciudad is required"),
  check("actividad").optional().notEmpty().withMessage("Actividad is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatorAddReview = [
  check("opinion").notEmpty().withMessage("Opinion is required"),
  check("rating")
    .isInt({ min: 1, max: 10 })
    .withMessage("Rating must be between 1 and 10"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validatorCreatePost,
  validatorUpdatePost,
  validatorAddReview,
};
