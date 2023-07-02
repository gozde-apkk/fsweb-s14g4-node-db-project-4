const express = require("express");
const server = express();
const tarifRouter = require("./tarif/tarif-router");
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Tarif app is working</h1>");
});



module.exports = server;