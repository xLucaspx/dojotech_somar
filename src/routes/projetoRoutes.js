const Router = require("express");
const ProjetoController = require("../controller/ProjetoController");

const router = Router();

router
  .get("/projetos", ProjetoController.buscaProjetos)
  .post("/projetos", ProjetoController.cadastraProjeto);

module.exports = router;
