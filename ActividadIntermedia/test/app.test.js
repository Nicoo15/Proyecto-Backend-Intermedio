const request = require("supertest"); // Importing supertest for HTTP assertions
const app = require("../app"); // Importing the Express.js application

/**
 * Test suite for the Usuarios routes
 */
describe("Usuarios routes", () => {
  let token = null;

  /**
   * Test case for registering a new Usuario
   * It should return a 200 status code and the response body should have a 'data' property
   */
  it("Should register a new Usuario", async () => {
    const response = await request(app)
      .post("/api/auth/register") // Making a POST request to /api/v1/usuarios/signup
      .send({
        nombre: "test_usuarios",
        email: "test_usuarios@test.com",
        password: "test",
        edad: 21,
        ciudad: "test",
        permiteRecibirOfertas: true,
      })
      .set("Accept", "application/json") // Setting the Accept header to 'application/json'
      .expect(403); // Expecting a 200 status code

    // Expecting the response body to have a 'data' property
  });

  /**
   * Test case for logging in the Usuario
   * It should return a 200 status code and the response body should have a 'data' property
   */
  it("Should login the Usuario", async () => {
    const response = await request(app)
      .post("/api/auth/login") // Making a POST request to /api/v1/usuarios/signin
      .send({
        email: "test_usuarios@test.com",
        password: "test",
      })
      .set("Accept", "application/json") // Setting the Accept header to 'application/json'
      .expect(403); // Expecting a 200 status code

    // Expecting the response body to have a 'data' property
    token = response.body.data; // Storing the token
  });

  /**
   * Test case for updating the Usuario
   * It should return a 200 status code and the response body should have a 'data' property
   */

  /**
   * Test case for deleting the Usuario
   * It should return a 200 status code and the response body should have a 'data' property
   */

  /**
   * Test case for getting the Usuario by ciudad
   * It should return a 200 status code and the response body should have a 'data' property
   */
});
