const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Usuario = database.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascimento: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0 
  },
  mensagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('online', 'offline'),
    allowNull: false,
    defaultValue: 'offline' 
  }
});

module.exports = Usuario;
