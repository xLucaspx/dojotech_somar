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
      });
      Projeto.hasMany(models.Midia, {
        foreignKey: { name: "id_projeto", allowNull: false },
      });

      Projeto.belongsToMany(models.Ods, {
        through: 'Projeto_ods',
        foreignKey: { name: "id_projeto", allowNull: false },
      });
    }
  }
  Projeto.init(
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      causa: { type: DataTypes.STRING, allowNull: false },
      objetivo: { type: DataTypes.STRING, allowNull: false },
      cidade: { type: DataTypes.STRING, allowNull: false },
      parceiros: { type: DataTypes.STRING, allowNull: false },
      publico_alvo: { type: DataTypes.STRING, allowNull: false },
      resumo: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Projeto",
      freezeTableName: true,
    }
  );
  return Projeto;
};
