'use strict';
const utils = require('utility')
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Admins', [{
    email: '13808013567@163.com',
    password: await bcrypt.hash('111111', 10),
    username: 'admin',
    gender: 1,
    mobile_phone:13808013567,
    address: "星光路1号",
   // status: 0,
   // weibo: 'dsfsd',
   // weixin: 'sdfasd',
   // receive_remote: false,
   // email_verifyed: true,
   // avatar: 'sdfsd',
    created_at: new Date(),
    updated_at: new Date(),
  }
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Admins', null, {});
  }
};
