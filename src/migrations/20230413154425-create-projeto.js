"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projeto", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { allowNull: false, type: Sequelize.STRING },
      causa: { allowNull: false, type: Sequelize.STRING },
      objetivo: { allowNull: false, type: Sequelize.STRING },
      cidade: { allowNull: false, type: Sequelize.STRING },
      parceiros: { allowNull: false, type: Sequelize.STRING },
      publico_alvo: { allowNull: false, type: Sequelize.STRING },
      resumo: { allowNull: false, type: Sequelize.TEXT },
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Usuario", key: "id" },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projeto");
  },
};
