require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const router = require("./network/routes");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.09cprqs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

db(url);

const app = express();
app.use(bodyParser.json());
router(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
