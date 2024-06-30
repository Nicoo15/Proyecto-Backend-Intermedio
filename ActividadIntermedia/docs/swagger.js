// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "u-tad",
        url: "https://u-tad.com",
        email: "nicolas.montejano@live.u-tad.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        user: {
          type: "object",
          required: ["name", "age", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            age: {
              type: "integer",
              example: 30,
            },
            email: {
              type: "string",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
            ciudad: {
              type: "string",
              example: "Madrid",
            },
            intereses: {
              type: "string",
              example: "Reading, Traveling",
            },
            permiteRecibirOfertas: {
              type: "boolean",
              example: true,
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              example: "user",
            },
          },
        },
        login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
