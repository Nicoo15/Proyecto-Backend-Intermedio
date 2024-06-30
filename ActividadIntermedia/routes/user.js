const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  authMiddleware,
  checkOwnershipOrAdmin,
} = require("../middleware/session");
const checkRol = require("../middleware/rol");
const { userModel } = require("../models");

const router = express.Router();

router.get("/", authMiddleware, checkRol(["admin"]), getUsers);
router.get("/:id", authMiddleware, checkRol(["admin", "user"]), getUser);
router.put(
  "/:id",
  authMiddleware,
  checkOwnershipOrAdmin(userModel),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  checkOwnershipOrAdmin(userModel),
  deleteUser
);

module.exports = router;
