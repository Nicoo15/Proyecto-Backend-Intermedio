require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./config/mongo");
const loggerStream = require("./utils/handleLogger");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(morgan("combined", { stream: loggerStream }));
app.use(express.json());

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnect();
});

module.exports = app;
