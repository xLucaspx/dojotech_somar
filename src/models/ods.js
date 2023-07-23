"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ods.belongsToMany(models.Projeto, {
        through: models.Projeto_ods,
        foreignKey: { name: "id_ods", allowNull: false },
      });
    }
  }
  Ods.init(
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      url_imagem: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Ods",
      freezeTableName: true,
      defaultScope: {
        attributes: ["id", "nome", "url_imagem"],
      },
    }
  );
  return Ods;
};
