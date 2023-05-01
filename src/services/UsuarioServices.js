const { NotFoundError } = require("../errors");
const Services = require("./Services");

class UsuarioServices extends Services {
  constructor() {
    super("Usuario");
  }

  async buscaUsuario(filtro) {
    try {
      return await this.buscaUmRegistro(filtro);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError("Usuário não encontrado!");
      }
      throw error;
    }
  }
}

module.exports = UsuarioServices;
