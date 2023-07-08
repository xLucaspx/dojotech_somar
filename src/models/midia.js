"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Midia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Midia.belongsTo(models.Projeto, {
        foreignKey: { name: "id_projeto", allowNull: false },
      });
    }
  }
  Midia.init(
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      tipo: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      alt: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Midia",
      freezeTableName: true,
    }
  );
  return Midia;
};
