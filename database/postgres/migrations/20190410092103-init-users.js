'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      mobile_phone:{
        allowNull: true,
        type:Sequelize.BIGINT
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status:{
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      weibo: {
        allowNull: true,
        defaultValue: '',
        type: Sequelize.STRING
      },
      weixin: {
        allowNull: true,
        defaultValue: '',
        type: Sequelize.STRING
      },
      receive_remote: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      email_verifyed: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      avatar: {
        allowNull: true,
        defaultValue: '',
        type: Sequelize.STRING
      },
      created_at: {
        
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updated_at: {
        
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};