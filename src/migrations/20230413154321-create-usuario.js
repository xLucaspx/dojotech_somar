"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Usuario", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { allowNull: false, type: Sequelize.STRING },
      email: { allowNull: false, unique: true, type: Sequelize.STRING },
      usuario: { allowNull: false, unique: true, type: Sequelize.STRING },
      hash_senha: { allowNull: false, type: Sequelize.STRING },
      salt: { allowNull: false, type: Sequelize.STRING },
      telefone: { allowNull: false, type: Sequelize.STRING },
      cep: { allowNull: false, type: Sequelize.STRING },
      logradouro: { allowNull: false, type: Sequelize.STRING },
      complemento: { type: Sequelize.STRING },
      numero: { type: Sequelize.STRING },
      bairro: { allowNull: false, type: Sequelize.STRING },
      cidade: { allowNull: false, type: Sequelize.STRING },
      uf: { allowNull: false, type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Usuario");
  },
};
