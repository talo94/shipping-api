express = require("express");
const packageRouter = require("../components/package/network");

const routers = (server) => {
  server.use("/api/package", packageRouter);
};

module.exports = routers;
