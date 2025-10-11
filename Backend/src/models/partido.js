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
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // Canchas
      Partido.belongsTo(models.Cancha, {
        as: 'cancha',
        foreignKey: 'cancha_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // Deportes
      Partido.belongsTo(models.Deporte, {
        as: 'deporte',
        foreignKey: 'deporte_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // participantes
      Partido.belongsToMany(models.Usuario, {
        through: models.ParticipaEn,
        as: 'participantes',
        foreignKey: 'partido_id',
        otherKey: 'usuario_id'
      });
      // Chats
      Partido.hasMany(models.Chat, {
        as: 'chats',
        foreignKey: 'partido_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Partido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['abierto', 'cerrado'],
      defaultValue: 'abierto',
    },
  }, {
      sequelize,
      modelName: 'Partido',
      timestamps: false,
    });
  return Partido;
};
