"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Ods", [
      {
        id: 1,
        nome: "Erradicação da Pobreza",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_1.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: "Fome Zero e Agricultura Sustentável",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_2.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nome: "Saúde e Bem-Estar",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_3.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nome: "Educação de Qualidade",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_4.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nome: "Igualdade de Gênero",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_5.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        nome: "Água Potável e Saneamento",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_6.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        nome: "Energia Limpa e Acessível",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_7.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        nome: "Trabalho Decente e Crescimento Econômico",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_8.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        nome: "Indústria, Inovação e Infraestrutura",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_9.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        nome: "Redução das Desigualdades",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_10.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        nome: "Cidades e Comunidades Sustentáveis",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_11.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        nome: "Consumo e Produção Responsáveis",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_12.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        nome: "Ação Contra a Mudança Global do Clima",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_13.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        nome: "Vida na Água",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_14.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        nome: "Vida Terrestre",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_15.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        nome: "Paz, Justiça e Instituições Eficazes",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_16.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        nome: "Parcerias e Meios de Implementação",
        url_imagem:
          "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_17.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Ods", null, {});
  },
};
