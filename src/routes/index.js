const bodyParser = require("body-parser");
const usuarios = require("./usuarioRoutes");
const projetos = require("./projetoRoutes");

module.exports = (app) => {
  app.use(bodyParser.json(), usuarios, projetos);
};
