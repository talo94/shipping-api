require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");
const db = require("./db");
const router = require("./network/routes");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.09cprqs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

db(url);

app.use(cors());

app.use(bodyParser.json());
socket.connect(server);
router(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});


