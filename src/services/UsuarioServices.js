const { ValidationError } = require("sequelize");
const { NotFoundError, ConflictError, BadRequestError } = require("../errors");
const db = require("../models");
const Services = require("./Services");

class UsuarioServices extends Services {
  constructor() {
    super("Usuario");
  }

  async buscaUsuario(filtro) {
    try {
      return await this.buscaUmRegistro(filtro);
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundError("Usuário não encontrado!");

      throw error;
    }
  }

  async buscaUsuarioLogin(filtro) {
    try {
      const usuario = await db[this.nomeDoModelo].scope("login").findOne({
        where: { ...filtro },
      });

      if (usuario) return usuario;

      throw new NotFoundError("Usuário não encontrado!");
    } catch (error) {
      throw error;
    }
  }

  async cadastraUsuario(usuario) {
    try {
      return await this.criaRegistro(usuario);
    } catch (error) {
      if (error instanceof ValidationError) {
        const { fields } = error;

        if (!fields)
          throw new BadRequestError(
            "Por favor, verifique se os campos estão preenchidos corretamente!"
          );

        if (fields.usuario)
          throw new ConflictError(
            `O nome de usuário "${fields.usuario}" não está disponível!`
          );

        if (fields.email)
          throw new ConflictError(
            `Já existe uma conta registrada para o email "${fields.email}"!`
          );
      }
      throw error;
    }
  }

  async atualizaUsuario(dados, id) {
    try {
      const usuario = await this.buscaUsuario({ id });
      return await usuario.update(dados);
    } catch (error) {
      if (error instanceof ValidationError) {
        const { fields } = error;

        if (!fields)
          throw new BadRequestError(
            "Por favor, verifique se os campos estão preenchidos corretamente!"
          );

        if (fields.usuario)
          throw new ConflictError(
            `O nome de usuário "${fields.usuario}" não está disponível!`
          );

        if (fields.email)
          throw new ConflictError(
            `Já existe uma conta registrada para o email "${fields.email}"!`
          );
      }
      throw error;
    }
  }
}

module.exports = UsuarioServices;
