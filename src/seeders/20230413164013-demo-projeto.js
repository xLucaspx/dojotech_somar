"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Projeto", [
      {
        nome: "Tramandaí mais Verde",
        causa: "Reflorestamento e arborização",
        objetivo: "Arborizar os espaços públicos de Tramandaí",
        cidade: "Tramandaí",
        parceiros: "Sesc,Senac,Sindicato,Prefeitura Municipal de Tramandaí",
        publico_alvo: "Moradores e frequentadores de Tramandaí",
        resumo: "O objetivo do projeto Tramandaí mais Verde é arborizar os espaços públicos de Tramandaí e, com isso, propiciar uma melhoria no bem-estar dos cidadãos, bem como contribuir para a melhoria da qualidade do ar e da sensação térmica, entre outros benefícios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 árvores em espaços públicos da cidade, em 5 anos.",
        id_usuario: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        nome: "Alvorada mais Verde",
        causa: "Reflorestamento e arborização",
        objetivo: "Arborizar os espaços públicos de Alvorada",
        cidade: "Alvorada",
        parceiros: "Sesc,Senac,Sindicato,Prefeitura Municipal de Alvorada",
        publico_alvo: "Moradores e frequentadores de Alvorada",
        resumo: "O objetivo do projeto Alvorada mais Verde é arborizar os espaços públicos de Alvorada e, com isso, propiciar uma melhoria no bem-estar dos cidadãos, bem como contribuir para a melhoria da qualidade do ar e da sensação térmica, entre outros benefícios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 árvores em espaços públicos da cidade, em 5 anos.",
        id_usuario: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Projeto", null, {});
  },
};
