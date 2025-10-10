'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // usuario
      Mensaje.belongsTo(models.Usuario, {
        as: 'usuario',
        foreignKey: 'usuario_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // Partido
      Mensaje.belongsTo(models.Chat, {
        as: 'chat',
        foreignKey: 'chat_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Mensaje.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_envio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
      sequelize,
      modelName: 'Mensaje',
      timestamps: false,
    });
  return Mensaje;
};
