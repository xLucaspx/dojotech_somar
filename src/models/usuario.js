"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Projeto, {
        foreignKey: { name: "id__usuario", allowNull: false },
      });
    }
  }
  Usuario.init(
    {
      nome: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
      senha: { type: DataTypes.STRING, allowNull: false },
      telefone: { type: DataTypes.STRING, allowNull: false },
      cep: { type: DataTypes.STRING, allowNull: false },
      logradouro: { type: DataTypes.STRING, allowNull: false },
      complemento: { type: DataTypes.STRING },
      numero: { type: DataTypes.STRING },
      bairro: { type: DataTypes.STRING, allowNull: false },
      cidade: { type: DataTypes.STRING, allowNull: false },
      uf: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Usuario",
      freezeTableName: true,
    }
  );
  return Usuario;
};
