"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Projeto_ods", [
      {
        id_ods: 11,
        id_projeto: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_ods: 13,
        id_projeto: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_ods: 15,
        id_projeto: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_ods: 11,
        id_projeto: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_ods: 13,
        id_projeto: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_ods: 15,
        id_projeto: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Projeto_ods", null, {});
  },
};
