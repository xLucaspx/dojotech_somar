const Router = require("express");
const ProjetoController = require("../controller/ProjetoController");

const router = Router();

router
  .get("/projetos", ProjetoController.buscaProjetos)
  .get("/projetos/relatorio", ProjetoController.geraRelatorio)
  .get("/projetos/filtro?", ProjetoController.buscaProjetosComFiltro)
  .get("/projetos/usuario?", ProjetoController.buscaProjetosPorUsuario)
  .get("/projetos/:id", ProjetoController.buscaProjetoPorId)
  .post("/projetos", ProjetoController.cadastraProjeto)
  .post("/projetos/:id/midias", ProjetoController.cadastraMidias)
  .put("/projetos/:id", ProjetoController.atualizaProjeto)
  .delete("/projetos/:id", ProjetoController.deletaProjeto)

module.exports = router;
