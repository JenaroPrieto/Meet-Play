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
      // define association here
    }
  }
  ParticipaEn.init({
    usuario_id: DataTypes.INTEGER,
    partido_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ParticipaEn',
  });
  return ParticipaEn;
};