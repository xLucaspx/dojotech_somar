"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projeto.belongsTo(models.Usuario, {
        foreignKey: { name: "id_usuario", allowNull: false },
        onDelete: "CASCADE",
      });
      Projeto.hasMany(models.Midia, {
        foreignKey: { name: "id_projeto", allowNull: false },
        onDelete: "CASCADE",
      });

      Projeto.belongsToMany(models.Ods, {
        through: models.Projeto_ods,
        foreignKey: { name: "id_projeto", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  Projeto.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 75] },
      },
      causa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 75] },
      },
      objetivo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [10, 125] },
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 50] },
      },
      parceiros: { type: DataTypes.STRING },
      publico_alvo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 75] },
      },
      resumo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true, len: [10, 475] },
      },
    },
    {
      sequelize,
      modelName: "Projeto",
      freezeTableName: true,
      defaultScope: {
        attributes: [
          "id",
          "nome",
          "causa",
          "objetivo",
          "cidade",
          "parceiros",
          "publico_alvo",
          "resumo",
          "id_usuario",
        ],
        include: ["Ods", "Midia"],
      },
    }
  );
  return Projeto;
};
