'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Partidos
      Deporte.hasMany(models.Partido, {
        as: 'partidos',
        foreignKey: 'deporte_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Deporte.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    max_participantes: {
      type: DataTypes.INTEGER,
    },
  },
    {
      sequelize,
      modelName: 'Deporte',
      timestamps: false,
    });
  return Deporte;
};
