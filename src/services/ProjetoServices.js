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
      return await this.buscaUmRegistro({ id });
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new NotFoundError("Projeto não encontrado!");

      throw error;
    }
  }

  async buscaProjetosPorOds(ods) {
    const exp = new RegExp(escapeRegex(ods), "gi");

    try {
      const projetos = await this.buscaRegistros();
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

  async atualizaProjeto(dados, id) {
    try {
      await this.atualizaRegistro(dados, { id });
    } catch (error) {
      throw error;
    }
  }

  async atualizaOds(idProjeto, ods) {
    try {
      const projeto = await this.buscaProjetoPorId(idProjeto);
      await this.deletaOds(idProjeto);
      ods.forEach(async (item) => await projeto.addOds(item));
    } catch (error) {
      throw error;
    }
  }

  async deletaProjeto(id) {
    try {
      const projeto = await this.buscaProjetoPorId(id);
      await this.deletaOds(id);
      return await projeto.destroy();
    } catch (error) {
      throw error;
    }
  }

  async deletaOds(idProjeto) {
    try {
      await db["Projeto_ods"].destroy({ where: { id_projeto: idProjeto } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjetoServices;
