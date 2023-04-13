const bodyParser = require("body-parser");
const usuarios = require("./usuarioRoutes");

module.exports = (app) => {
  app.use(bodyParser.json(), usuarios);
};
