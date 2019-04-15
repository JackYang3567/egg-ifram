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

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.security = {
 // domainWhiteList: [ 'http://192.168.33.10:8080/' ],
 //domainWhiteList: [ '*' ],
};


