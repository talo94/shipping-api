const express = require("express");
const bodyParser = require("body-parser");
const router = require("./network/routes");

const app = express();
app.use(bodyParser.json());
router(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
