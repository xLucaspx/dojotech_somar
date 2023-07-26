"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projeto_ods extends Model {
    static associate(models) {}
  }
  Projeto_ods.init(
    {},
    {
      sequelize,
      modelName: "Projeto_ods",
      freezeTableName: true,
      defaultScope: {
        attributes: ["id_ods", "id_projeto"],
      },
    }
  );
  return Projeto_ods;
};
