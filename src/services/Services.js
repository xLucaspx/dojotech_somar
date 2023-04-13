const db = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async buscaRegistros(where = {}) {
    return db[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async buscaUmRegistro(where = {}) {
    return db[this.nomeDoModelo].findOne({ where: { ...where } });
  }

  async criaRegistro(dados) {
    return db[this.nomeDoModelo].create(dados);
  }
}

module.exports = Services;
