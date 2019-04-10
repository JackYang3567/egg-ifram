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
