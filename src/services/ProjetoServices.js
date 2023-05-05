const Services = require("./Services");
const db = require("../models");
const { NotFoundError } = require("../errors");

class ProjetoServices extends Services {
  constructor() {
    super("Projeto");
  }

  async buscaProjetoPorId(id) {
    try {
      return await db[this.nomeDoModelo].findOne({
        where: { id },
        include: "Ods",
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError("Projeto não encontrado!");
      }
      throw error;
    }
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
      const projetosFiltrados = new Set();

      projetos.forEach((projeto) => {
        projeto.dataValues.Ods.forEach((ods) => {
          const name = `${ods.id} - ${ods.nome}`;
          if (name.match(exp)) {
            projetosFiltrados.add(projeto.dataValues);
          }
        });
      });
      return Array.from(projetosFiltrados);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjetoServices;
