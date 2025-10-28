'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipaEn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // usuario
      ParticipaEn.belongsTo(models.Usuario, {
        as: 'usuario',
        foreignKey: 'usuario_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // Partido
      ParticipaEn.belongsTo(models.Partido, {
        as: 'partido',
        foreignKey: 'partido_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  ParticipaEn.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
      sequelize,
      modelName: 'ParticipaEn',
      timestamps: false,
    });
  return ParticipaEn;
};
