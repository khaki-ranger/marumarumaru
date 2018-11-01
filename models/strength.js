'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Strength = loader.database.define('strength', {
  strengthId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  strengthName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: true
  });

module.exports = Strength;
