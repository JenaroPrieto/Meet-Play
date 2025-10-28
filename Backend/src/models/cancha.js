'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cancha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Partidos
      Cancha.hasMany(models.Partido, {
        as: 'partidos',
        foreignKey: 'cancha_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Cancha.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(255),
    },
    comuna: {
      type: DataTypes.STRING(100),
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 7),
    },
    longitud: {
      type: DataTypes.DECIMAL(10, 7),
    },
    contacto: {
      type: DataTypes.STRING(100),
    },
    propietario: {
      type: DataTypes.STRING(100),
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
    {
      sequelize,
      modelName: 'Cancha',
      timestamps: false,
    });
  return Cancha;
};
