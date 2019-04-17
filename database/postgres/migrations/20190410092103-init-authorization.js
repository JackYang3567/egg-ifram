'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Authorization', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provider: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: true,
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
    return queryInterface.dropTable('Authorization');
  }
};