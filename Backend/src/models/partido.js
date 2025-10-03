'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Creadores
      Partido.belongsTo(models.Usuario, {
        as: 'creador',
        foreignKey: 'creador_id',
      });
      // participantes
      Partido.belongsToMany(models.Usuario, {
        throgh: models.ParticipaEn,
        as: 'participantes',
        foreignkey: 'partido_id',
        otherKey: 'usuario_id',
      });
    }
  }
  Partido.init({
    nombre: DataTypes.STRING,
    deporte: DataTypes.STRING,
    hora_inicio: DataTypes.DATE,
    direccion: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Partido',
  });
  return Partido;
};
