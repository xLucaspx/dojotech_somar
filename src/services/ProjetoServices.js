const Services = require("./Services");
const db = require("../models");

class ProjetoServices extends Services {
  constructor() {
    super("Projeto");
  }

  async buscaProjetosComOds(where = {}) {
    try {
      return await db[this.nomeDoModelo].findAll({
        where: { ...where },
        include: "Ods",
      });
    } catch (error) {
      throw error;
    }
  }

  async buscaProjetosPorOds(ods) {
    const exp = new RegExp(ods, "gi");
    try {
      const projetos = await this.buscaProjetosComOds();
      const projetosFiltrados = [];

      projetos.forEach((projeto) => {
        projeto.dataValues.Ods.forEach((ods) => {
          const name = `${ods.id} - ${ods.nome}`;
          if (name.match(exp)) {
            projetosFiltrados.push(projeto.dataValues);
          }
        });
      });
      return projetosFiltrados;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjetoServices;
