const Services = require("./Services");
const db = require("../models");
const { NotFoundError } = require("../errors");
const escapeRegex = require("../utils/escapeRegex");

class ProjetoServices extends Services {
  constructor() {
    super("Projeto");
  }

  async buscaProjetoPorId(id) {
    try {
      const projeto = await db[this.nomeDoModelo].findOne({
        where: { id },
        include: ["Ods", "Midia"],
      });

      if (projeto) return projeto;

      throw new NotFoundError("Projeto não encontrado!");
    } catch (error) {
      throw error;
    }
  }

  async buscaProjetos(where = {}) {
    try {
      return await db[this.nomeDoModelo].findAll({
        where: { ...where },
        include: ["Ods", "Midia"],
      });
    } catch (error) {
      throw error;
    }
  }

  async buscaProjetosPorOds(ods) {
    const exp = new RegExp(escapeRegex(ods), "gi");

    try {
      const projetos = await this.buscaProjetos();
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

  async deletaProjeto(id) {
    try {
      const projeto = await this.buscaProjetoPorId(id);
      await db["Projeto_ods"].destroy({ where: { id_projeto: id } });
      return await projeto.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjetoServices;
