const fs = require("node:fs");
const path = require("node:path");
const Services = require("./Services");
const db = require("../models");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../errors");
const escapeRegex = require("../utils/escapeRegex");
const { QueryTypes, ValidationError } = require("sequelize");
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

  async cadastraProjeto(projeto) {
    try {
      return await this.criaRegistro(projeto);
    } catch (error) {
      if (error instanceof ValidationError)
        throw new BadRequestError(
          "Por favor, verifique se os campos estão preenchidos corretamente!"
        );

      throw error;
    }
  }

  async atualizaProjeto(dados, ods, id) {
    try {
      let projeto = await this.buscaProjetoPorId(id);

      if (dados.id && dados.id != projeto.id)
        throw new ConflictError("Não é possível editar o id de um projeto!");
      if (dados.id_usuario && dados.id_usuario != projeto.id_usuario)
        throw new ConflictError(
          "Não é possível editar o usuário de um projeto!"
        );

      projeto = await projeto.update(dados);
      await this.deletaOds(id);
      ods.forEach(async (item) => await projeto.addOds(item));

      return projeto;
    } catch (error) {
      if (error instanceof ValidationError)
        throw new BadRequestError(
          "Por favor, verifique se os campos estão preenchidos corretamente!"
        );

      throw error;
    }
  }

  async deletaProjeto(id, idUsuario) {
    try {
      const projeto = await this.buscaProjetoPorId(id);

      if (idUsuario != projeto.id_usuario)
        throw new UnauthorizedError(
          "Não é possível excluir o projeto de outro usuário!"
        );

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
        FROM Projeto_ods
          INNER JOIN Ods ON Projeto_ods.id_ods = Ods.id
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
