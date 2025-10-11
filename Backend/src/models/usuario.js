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
        foreignKey: 'creador_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // partidos
      Usuario.belongsToMany(models.Partido, {
        through: models.ParticipaEn,
        as: 'partidos',
        foreignKey: 'usuario_id',
        otherKey: 'partido_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // Mensajes
      Usuario.hasMany(models.Mensaje, {
        as: 'mensajes',
        foreignKey: 'usuario_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
    },
    direccion: {
      type: DataTypes.STRING(255),
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 7),
    },
    longitud: {
      type: DataTypes.DECIMAL(10, 7),
    },
  },
    {
      sequelize,
      modelName: 'Usuario',
      timestamps: false,
    });
  return Usuario;
};
