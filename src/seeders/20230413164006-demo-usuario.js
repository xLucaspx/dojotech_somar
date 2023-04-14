"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Usuario", [
      {
        nome: "Juca da Silva",
        email: "juca@projetosomar.com",
        usuario: "juca_s",
        senha: "#SenhaJuca01",
        telefone: "51 98765-0987",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Sílvia Dias",
        email: "silvia@projetosomar.com",
        usuario: "silviads",
        senha: "#SenhaSilvia01",
        telefone: "51 99875-0876",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Usuario", null, {});
  },
};
