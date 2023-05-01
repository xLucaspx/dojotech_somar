const Router = require("express");
const ProjetoController = require("../controller/ProjetoController");

const router = Router();

router
  .get("/projetos", ProjetoController.buscaProjetos)
  .get("/projetos/filtro?", ProjetoController.buscaProjetosComFiltro)
  .post("/projetos", ProjetoController.cadastraProjeto);

module.exports = router;
