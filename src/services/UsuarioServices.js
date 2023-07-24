const { NotFoundError } = require("../errors");
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
}

module.exports = UsuarioServices;
