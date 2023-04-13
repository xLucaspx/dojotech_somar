const { UsuarioServices } = require("../services");

const usuarioServices = new UsuarioServices();

class UsuarioController {
  static async buscaUsuarios(req, res) {
    try {
      const usuarios = await usuarioServices.buscaRegistros();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscaPorUsuario(req, res) {
    const { usuario } = req.params;

    try {
      const registro = await usuarioServices.buscaUmRegistro({ usuario });
      return res.status(200).json(registro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscaPorEmail(req, res) {
    const { email } = req.params;

    try {
      const registro = await usuarioServices.buscaUmRegistro({ email });
      return res.status(200).json(registro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraUsuario(req, res) {
    const usuario = req.body;

    try {
      const cadastro = await usuarioServices.criaRegistro(usuario);
      return res.status(201).json(cadastro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;
