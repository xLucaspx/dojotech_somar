const { UsuarioServices } = require("../services");
const { NotFoundError, UnauthorizedError } = require("../errors");
const { ValidationError } = require("sequelize");
const { JsonWebTokenError } = require("jsonwebtoken");
const geraJwt = require("../utils/token/geraJwt");
const verificaJwt = require("../utils/token/verificaJwt");
const autenticaSenha = require("../utils/hash/autenticaSenha");
const criaHashComSalt = require("../utils/hash/criaHashComSalt");

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

  static async buscaUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioServices.buscaUmRegistro({ id });
      return res.status(200).json(usuario);
    } catch (error) {
      return res
        .status(error instanceof NotFoundError ? 404 : 500)
        .json({ message: error.message });
    }
  }

  static async cadastraUsuario(req, res) {
    const usuario = req.body;

    try {
      const [salt, hash] = criaHashComSalt(usuario.senha).split(":");
      usuario.hash_senha = hash;
      usuario.salt = salt;
      delete usuario.senha;

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
          return res.status(400).json({
            message:
              "Por favor, verifique se os campos estão preenchidos corretamente!",
          });
        }
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async logaUsuario(req, res) {
    const { usuarioDigitado, senhaDigitada } = req.body;

    try {
      // define se foi digitado nome de usuário ou email e depois busca o usuário
      const { id, nome, hash_senha, salt } = usuarioDigitado.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
      )
        ? await usuarioServices.buscaUsuarioLogin({ email: usuarioDigitado })
        : await usuarioServices.buscaUsuarioLogin({ usuario: usuarioDigitado });

      if (autenticaSenha(senhaDigitada, salt, hash_senha)) {
        const tokenJwt = geraJwt({ id, nome });
        return res.status(200).json(tokenJwt);
      }
      throw new UnauthorizedError("Senha incorreta!");
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof UnauthorizedError) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async autenticaUsuario(req, res) {
    const { tokenJwt } = req.body;

    try {
      const token = verificaJwt(tokenJwt);
      return res.status(200).json(token);
    } catch (error) {
      return res
        .status(error instanceof JsonWebTokenError ? 401 : 500)
        .json({ message: `${error.message}` });
    }
  }
}

module.exports = UsuarioController;
