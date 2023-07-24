"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Midia", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { allowNull: false, type: Sequelize.STRING },
      tipo: { allowNull: false, type: Sequelize.STRING },
      url: { allowNull: false, type: Sequelize.STRING },
      alt: { allowNull: true, type: Sequelize.STRING },
      id_projeto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Projeto", key: "id" },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Midia");
  },
};
