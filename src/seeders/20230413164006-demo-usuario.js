"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Usuario", [
      {
        nome: "Juca da Silva",
        email: "juca@projetosomar.com",
        usuario: "juca_s", // senha: #senhaJuca01
        hash_senha: "ddbef2b610e422b4985c268c015a55e27e69a911790187413a2adf52bc3647e375d74c58d0c824b74572a469314ea28653006f85d1971d6fcf1fb03c9fbec6ec",
        sal_senha: "2ceb3b70c876ad982127be383fc71a39",
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
        usuario: "silviads", // senha: #senhaSilvia01
        hash_senha: "e3d8dbfe489a0009f42cbc8beae4580439949d431ca109331d293f73be28b4abd23e028b7d7ddf20d4c293f0af08f1d59cf46ef03be5ba51fdba07b26dcfff43",
        sal_senha: "4da5646341c2a95935fd8ff1b2930b99",
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
