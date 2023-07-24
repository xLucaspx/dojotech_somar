const bodyParser = require("body-parser");
const usuarios = require("./usuarioRoutes");
const projetos = require("./projetoRoutes");
const ods = require("./odsRoutes");

module.exports = (app) => {
  app.use(bodyParser.json(), usuarios, projetos, ods);
};
