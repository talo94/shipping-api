const db = require("mongoose");

db.Promise = global.Promise;

const connect = (url) => {
  db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("[db] Conectada con éxito"))
    .catch((error) => console.log("[db] Error al conectar", error));
};

module.exports =  connect;
