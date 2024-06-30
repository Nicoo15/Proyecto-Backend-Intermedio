const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/comercio");
const {
  validatorCreateItem,
  validatorUpdateItem,
} = require("../validators/comercio");
const {
  authMiddleware,
  checkOwnershipOrAdmin,
} = require("../middleware/session");
const checkRol = require("../middleware/rol");
const { comerModel } = require("../models");

const router = express.Router();

/**
 * @openapi
 * /api/comercio:
 *   get:
 *     tags:
 *       - Comercio
 *     summary: "Get all comercios"
 *     description: Retrieve a list of all comercios
 *     responses:
 *       '200':
 *         description: A list of comercios
 *       '403':
 *         description: Forbidden
 */
router.get("/", getItems);

/**
 * @openapi
 * /api/comercio/{cif}:
 *   get:
 *     tags:
 *       - Comercio
 *     summary: "Get a comercio by CIF"
 *     description: Retrieve a single comercio by its CIF
 *     parameters:
 *       - name: cif
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A comercio object
 *       '404':
 *         description: Comercio not found
 */
router.get("/:cif", getItem);

/**
 * @openapi
 * /api/comercio/crear:
 *   post:
 *     tags:
 *       - Comercio
 *     summary: "Create a new comercio"
 *     description: Create a new comercio
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comercio"
 *     responses:
 *       '200':
 *         description: The created comercio
 *       '400':
 *         description: Validation error
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/crear",
  validatorCreateItem,
  authMiddleware,
  checkRol(["admin"]),
  createItem
);

/**
 * @openapi
 * /api/comercio/actualizar/{id}:
 *   put:
 *     tags:
 *       - Comercio
 *     summary: "Update a comercio by ID"
 *     description: Update a comercio by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comercio"
 *     responses:
 *       '200':
 *         description: The updated comercio
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Comercio not found
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/actualizar/:id",
  validatorUpdateItem,
  authMiddleware,
  checkOwnershipOrAdmin(comerModel),
  updateItem
);

/**
 * @openapi
 * /api/comercio/borrar/{cif}:
 *   delete:
 *     tags:
 *       - Comercio
 *     summary: "Delete a comercio by CIF"
 *     description: Delete a comercio by its CIF
 *     parameters:
 *       - name: cif
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comercio deleted
 *       '404':
 *         description: Comercio not found
 *     security:
 *       - bearerAuth: []
 */
router.delete("/borrar/:cif", authMiddleware, checkRol(["admin"]), deleteItem);

module.exports = router;
