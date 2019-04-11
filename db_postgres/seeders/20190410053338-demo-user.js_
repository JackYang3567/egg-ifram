'use strict';
const utils = require('utility')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [{
    email: '13808013567@163.com',
    password: utils.md5('123456'),
    username: 'admin',
    weibo: 'dsfsd',
    weixin: 'sdfasd',
    receive_remote: false,
    email_verifyed: true,
    avatar: 'sdfsd',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
