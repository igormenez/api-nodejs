'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allownull: false
      },
      name:{
        type: Sequelize.STRING,
        allownull: false
      },
      email:{
        type: Sequelize.STRING,
        unique: true,
        allownull: false
      },
      password_hash:{
        type: Sequelize.STRING,
        allownull:false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
