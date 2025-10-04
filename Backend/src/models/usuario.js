'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Partidos Creados
      Usuario.hasMany(models.Partido, {
        as: 'partidosCreados',
      });
      // partidos
      Usuario.belongsToMany(models.Partido, {
        through: models.ParticipaEn,
        as: 'partidos',
        foreignkey: 'usuario_id',
        otherKey: 'partido_id',
      });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
