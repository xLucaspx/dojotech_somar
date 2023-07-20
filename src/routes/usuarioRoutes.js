const Router = require("express");
const UsuarioController = require("../controller/UsuarioController");

const router = Router();

router
  .get("/usuarios", UsuarioController.buscaUsuarios)
  .get("/usuarios/:id", UsuarioController.buscaUsuarioPorId)
  .post("/usuarios", UsuarioController.cadastraUsuario)
  .post("/usuarios/login", UsuarioController.logaUsuario)
  .post("/usuarios/autenticar", UsuarioController.autenticaUsuario);

module.exports = router;
