const fs = require("node:fs");
const path = require("node:path");
const Services = require("./Services");
const db = require("../models");
const { NotFoundError } = require("../errors");
const escapeRegex = require("../utils/escapeRegex");
const { QueryTypes } = require("sequelize");
const criaRelatorioProjetos = require("../utils/criaRelatorioProjetos");

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

  async criaRelatorioProjetos() {
    try {
      const projetos = await this.buscaRegistros();
      const dadosOds = await db.sequelize.query(
        `SELECT
          id_ods AS 'id',
          nome AS 'ods',
          COUNT(id_projeto) AS 'projetos'
        FROM projeto_ods
          INNER JOIN ods ON projeto_ods.id_ods = ods.id
        GROUP BY id_ods;`,
        { type: QueryTypes.SELECT }
      );

      const relatorio = criaRelatorioProjetos(projetos.length, dadosOds);
      const fileName = "../../public/report/relatorio-projetos.txt";
      fs.writeFileSync(path.join(__dirname, fileName), relatorio, {
        encoding: "utf-8",
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjetoServices;
