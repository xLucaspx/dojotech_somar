const db = require("../models");
const NotFoundError = require("../errors/NotFoundError");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async buscaRegistros(where = {}) {
    try {
      return await db[this.nomeDoModelo].findAll({ where: { ...where } });
    } catch (error) {
      throw error;
    }
  }

  async buscaUmRegistro(where = {}) {
    try {
      const registro = await db[this.nomeDoModelo].findOne({
        where: { ...where },
      });
      if (registro) {
        return registro;
      }
      throw new NotFoundError("Registro não encontrado");
    } catch (error) {
      throw error;
    }
  }

  async criaRegistro(dados) {
    try {
      return await db[this.nomeDoModelo].create(dados);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Services;
