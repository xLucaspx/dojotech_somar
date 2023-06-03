const Router = require("express");
const ProjetoController = require("../controller/ProjetoController");

const router = Router();

router
  .get("/projetos", ProjetoController.buscaProjetos)
  .get("/projetos/filtro?", ProjetoController.buscaProjetosComFiltro)
  .get("/projetos/:id", ProjetoController.buscaProjetoPorId)
  .post("/projetos", ProjetoController.cadastraProjeto)
  .post("/projetos/:id/midias", ProjetoController.cadastraMidias);

module.exports = router;
