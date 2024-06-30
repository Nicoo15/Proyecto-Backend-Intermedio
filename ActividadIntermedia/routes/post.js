const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getItemsCiudad,
  getItemsCiudadActividad,
  addReview,
  getOpinions,
} = require("../controllers/post");
const {
  validatorCreatePost,
  validatorUpdatePost,
  validatorAddReview,
} = require("../validators/post");
const {
  authMiddleware,
  checkOwnershipOrAdmin,
  checkOwnershipPost,
} = require("../middleware/session");
const { postModel } = require("../models");
const checkRol = require("../middleware/rol");

const router = express.Router();

/**
 * @openapi
 * /api/post:
 *   get:
 *     tags:
 *       - Post
 *     summary: "Get all posts"
 *     description: Retrieve a list of all posts
 *     responses:
 *       '200':
 *         description: A list of posts
 *       '403':
 *         description: Forbidden
 */
router.get("/", authMiddleware, getItems);

/**
 * @openapi
 * /api/post/{id}:
 *   get:
 *     tags:
 *       - Post
 *     summary: "Get a post by ID"
 *     description: Retrieve a single post by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A post object
 *       '404':
 *         description: Post not found
 */
router.get("/:id", getItem);

/**
 * @openapi
 * /api/post:
 *   post:
 *     tags:
 *       - Post
 *     summary: "Create a new post"
 *     description: Create a new post
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       '200':
 *         description: The created post
 *       '400':
 *         description: Validation error
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  authMiddleware,
  checkRol(["comercio"]),
  validatorCreatePost,
  createItem
);

/**
 * @openapi
 * /api/post/{id}:
 *   put:
 *     tags:
 *       - Post
 *     summary: "Update a post by ID"
 *     description: Update a post by its ID
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
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       '200':
 *         description: The updated post
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Post not found
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  validatorUpdatePost,
  authMiddleware,
  checkOwnershipPost(postModel),
  updateItem
);

/**
 * @openapi
 * /api/post/{id}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: "Delete a post by ID"
 *     description: Delete a post by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post deleted
 *       '404':
 *         description: Post not found
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  authMiddleware,
  checkOwnershipPost(postModel),
  deleteItem
);

/**
 * @openapi
 * /api/post/city/{ciudad}:
 *   get:
 *     tags:
 *       - Post
 *     summary: "Get posts by city"
 *     description: Retrieve posts by city
 *     parameters:
 *       - name: ciudad
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of posts by city
 *       '403':
 *         description: Forbidden
 */
router.get("/city/:ciudad", getItemsCiudad);

/**
 * @openapi
 * /api/post/city/{ciudad}/activity/{actividad}:
 *   get:
 *     tags:
 *       - Post
 *     summary: "Get posts by city and activity"
 *     description: Retrieve posts by city and activity
 *     parameters:
 *       - name: ciudad
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: actividad
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of posts by city and activity
 *       '403':
 *         description: Forbidden
 */
router.get("/city/:ciudad/activity/:actividad", getItemsCiudadActividad);

/**
 * @openapi
 * /api/post/{id}/review:
 *   post:
 *     tags:
 *       - Post
 *     summary: "Add a review to a post"
 *     description: Add a review to a post
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
 *             $ref: "#/components/schemas/Review"
 *     responses:
 *       '200':
 *         description: The added review
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Post not found
 *     security:
 *       - bearerAuth: []
 */
router.post("/:id/review", validatorAddReview, authMiddleware, addReview);

/**
 * @openapi
 * /api/post/{id}/reviews:
 *   get:
 *     tags:
 *       - Post
 *     summary: "Get reviews of a post"
 *     description: Retrieve reviews of a post by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of reviews
 *       '404':
 *         description: Post not found
 */
router.get("/:id/reviews", getOpinions);

module.exports = router;
