const { ValidationError } = require("sequelize");
const { UsuarioServices } = require("../services");
const NotFoundError = require("../errors/NotFoundError");

const usuarioServices = new UsuarioServices();

class UsuarioController {
  static async buscaUsuarios(req, res) {
    try {
      const usuarios = await usuarioServices.buscaRegistros();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscaPorUsuario(req, res) {
    const { usuario } = req.params;

    try {
      const registro = await usuarioServices.buscaUmRegistro({ usuario });
      return res.status(200).json(registro);
    } catch (error) {
      return res
        .status(error instanceof NotFoundError ? 404 : 500)
        .json({ message: error.message });
    }
  }

  static async buscaPorEmail(req, res) {
    const { email } = req.params;

    try {
      const registro = await usuarioServices.buscaUmRegistro({ email });
      return res.status(200).json(registro);
    } catch (error) {
      return res
        .status(error instanceof NotFoundError ? 404 : 500)
        .json({ message: error.message });
    }
  }

  static async cadastraUsuario(req, res) {
    const usuario = req.body;

    try {
      const cadastro = await usuarioServices.criaRegistro(usuario);
      return res.status(201).json(cadastro);
    } catch (error) {
      if (error instanceof ValidationError) {
        const { fields } = error;
        if (fields && fields.usuario) {
          return res.status(409).json({
            message: `O nome de usuário ${fields.usuario} não está disponível!`,
          });
        } else if (fields && fields.email) {
          return res
            .status(409)
            .json({ message: `O email ${fields.email} já foi cadastrado!` });
        } else {
          return res.status(400).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
