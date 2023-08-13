const { UsuarioServices } = require("../services");
const { NotFoundError, UnauthorizedError } = require("../errors");
const { ValidationError } = require("sequelize");
const { JsonWebTokenError } = require("jsonwebtoken");
const geraJwt = require("../utils/token/geraJwt");
const verificaJwt = require("../utils/token/verificaJwt");
const autenticaSenha = require("../utils/hash/autenticaSenha");
const criaHashComSalt = require("../utils/hash/criaHashComSalt");
const BadRequestError = require("../errors/BadRequestError");

const usuarioServices = new UsuarioServices();

class UsuarioController {
  static async buscaUsuarios(req, res) {
    try {
      if (!verificaJwt(req.headers.authorization))
        throw new BadRequestError(
          "Não é possível buscar usuários sem um token de autorização!"
        );

      const usuarios = await usuarioServices.buscaRegistros();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res
        .status(error instanceof BadRequestError ? 400 : 500)
        .json({ message: error.message });
    }
  }

  static async buscaUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
      if (!verificaJwt(req.headers.authorization))
        throw new BadRequestError(
          "Não é possível buscar um usuário sem um token de autorização!"
        );

      const usuario = await usuarioServices.buscaUmRegistro({ id });
      return res.status(200).json(usuario);
    } catch (error) {
      if (error instanceof BadRequestError)
        return res.status(400).json({ message: error.message });

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
            message: `O nome de usuário "${fields.usuario}" não está disponível!`,
          });
        } else if (fields && fields.email) {
          return res.status(409).json({
            message: `Já existe uma conta registrada para o email "${fields.email}"!`,
          });
        } else {
          return res.status(400).json({
            message:
              "Por favor, verifique se os campos estão preenchidos corretamente!",
          });
        }
      }
      return res.status(error instanceof BadRequestError ? 400: 500).json({ message: error.message });
    }
  }

  static async logaUsuario(req, res) {
    const { usuario, senha } = req.body;

    try {
      // define se foi digitado nome de usuário ou email e depois busca o usuário
      const { id, nome, hash_senha, salt } = usuario.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
      )
        ? await usuarioServices.buscaUsuarioLogin({ email: usuario })
        : await usuarioServices.buscaUsuarioLogin({ usuario: usuario });

      if (autenticaSenha(senha, salt, hash_senha)) {
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
    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível se autenticar sem um token de autorização!"
        );

      return res.status(200).json(token);
    } catch (error) {
      if (error instanceof BadRequestError)
        return res.status(400).json({ message: error.message });

      return res
        .status(error instanceof UnauthorizedError ? 401 : 500)
        .json({ message: `${error.message}` });
    }
  }

  static async atualizaUsuario(req, res) {
    const { id } = req.params;
    const usuario = req.body;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível editar informações do usuário sem um token de autorização!"
        );
      if (id != token.id)
        throw new UnauthorizedError(
          "Não é possível editar informações de outros usuários!"
        );

      if (usuario.senha) {
        const [salt, hash] = criaHashComSalt(usuario.senha).split(":");
        usuario.hash_senha = hash;
        usuario.salt = salt;
        delete usuario.senha;
      }
      await usuarioServices.atualizaRegistro(usuario, { id });
      return res.status(204).json({});
    } catch (error) {
      if (error instanceof ValidationError) {
        const { fields } = error;
        if (fields && fields.usuario) {
          return res.status(409).json({
            message: `O nome de usuário "${fields.usuario}" não está disponível!`,
          });
        } else if (fields && fields.email) {
          return res.status(409).json({
            message: `Já existe uma conta registrada para o email "${fields.email}"!`,
          });
        } else {
          return res.status(400).json({
            message:
              "Por favor, verifique se os campos estão preenchidos corretamente!",
          });
        }
      } else if (error instanceof UnauthorizedError)
        return res.status(401).json({ message: error.message });

      return res
        .status(error instanceof BadRequestError ? 400 : 500)
        .json({ message: error.message });
    }
  }

  static async deletaUsuario(req, res) {
    const { id } = req.params;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível deletar um usuário sem um token de autorização!"
        );
      if (id != token.id)
        throw new UnauthorizedError("Não é possível deletar outros usuários!");

      await usuarioServices.deletaRegistro({ id });

      return res.status(204).json({});
    } catch (error) {
      if (error instanceof UnauthorizedError)
        return res.status(401).json({ message: error.message });
      return res
        .status(error instanceof BadRequestError ? 400 : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
