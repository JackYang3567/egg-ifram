'use strict';

/*
* @type Egg.EggPlugin 
*/

/*
module.exports = {

  // had enabled by egg
   static: {
     enable: true,
   },

};
*/

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};

exports.session = {
  enable: true,
  package: 'egg-session',
};

exports.security = {
 // domainWhiteList: [ 'http://192.168.33.10:8080/' ],
 //domainWhiteList: [ '*' ],
};


