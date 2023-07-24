"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Projeto, {
        foreignKey: { name: "id_usuario", allowNull: false },
      });
    }
  }
  Usuario.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 75] },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [10, 50],
          is: /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g,
        },
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true, len: [3, 20], is: /^[\w-]*$/g },
      },
      hash_senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [128, 128],
        },
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [32, 32],
        },
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 25],
          is: /^[(]?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])[)]? ?(?:[2-8]|9 ?[1-9])[0-9]{3}[-]? ?[0-9]{4}$/g,
        },
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [8, 9], is: /^[\d]{5}-?[\d]{3}$/g },
      },
      logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [0, 100] },
      },
      complemento: { type: DataTypes.STRING, validate: { len: [0, 50] } },
      numero: { type: DataTypes.STRING, validate: { len: [0, 10] } },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [0, 50] },
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [2, 50] },
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [2, 2] },
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      freezeTableName: true,
      defaultScope: {
        attributes: [
          "id",
          "nome",
          "usuario",
          "email",
          "telefone",
          "cep",
          "logradouro",
          "complemento",
          "numero",
          "bairro",
          "cidade",
          "uf",
        ],
      },
      scopes: {
        login: {
          attributes: ["id", "nome", "hash_senha", "salt"],
        },
      },
    }
  );
  return Usuario;
};
