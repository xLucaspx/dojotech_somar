const usuarios = require("./usuarioRoutes");
const projetos = require("./projetoRoutes");
const ods = require("./odsRoutes");

module.exports = (app) => {
  app.use(usuarios, projetos, ods);
};
