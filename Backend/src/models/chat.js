'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Partido
      Chat.belongsTo(models.Partido, {
        as: 'partido',
        foreignKey: 'partido_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      // Mensajes
      Chat.hasMany(models.Mensaje, {
        as: 'mensajes',
        foreignKey: 'chat_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
    {
      sequelize,
      modelName: 'Chat',
      timestamps: false,
    });
  return Chat;
};
