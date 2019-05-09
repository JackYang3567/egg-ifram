/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  let config = {};

  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/public/images/logo.png`
    prefix: '/', 
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554276289406_4155';
  
  config.passportGithub = {
    key: 'c',
    secret: 'd',
  };

  config.session = {
    key: 'EGG_SESSION_ID',//key名字
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,//加密 
    renew:true    //最大时间范围内，刷新，自动增加最大时间
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  };
  config.sequelize = {
    dialect: 'postgres',
    database: 'egg_db',
    host: '127.0.0.1',
    port: '5432',
    username: 'root',
    password: 'root'
  }
/*
   config.sequelize = {
     
     datasources: [
      {
        dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
        
        database: 'egg_db',
        host: '127.0.0.1',
        port: 5432,//3306,//
        username: 'root',
        password: 'myroot',
        delegate: 'model', // load all models to app.model and ctx.model
        baseDir: 'model',  // load models from `app/model/*.js`
        // other sequelize configurations
      },
      {
        dialect: 'postgres', // support: mysql, mariadb, postgres, mssql        
        database: 'egg_db_admin',
        host: '127.0.0.1',
        port: 5432,//3306,//
        username: 'root',
        password: 'myroot',
        delegate: 'admninModel', // load all models to app.adminModel and ctx.adminModel
        baseDir: 'admin_model',  // load models from `app/admin_model/*.js`
        // other sequelize configurations
      },
    ],
  };
 */ 
  config.cors = {
    // {string|Function} origin: '*',
    origin: '*',
    // {string|Array} 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.security = {
     
      csrf: {
        //针对内部 ip 关闭部分安全防范：
        // ignore: ctx => isInnerIp(ctx.ip),
        useSession: false,          // if useSession set to true, the secret will keep in session instead of cookie
        ignoreJSON: false,          // skip check JSON requests if ignoreJSON set to true
        cookieName: 'csrfToken',    // csrf token's cookie name
        sessionName: 'csrfToken',   // csrf token's session name
        headerName: 'x-csrf-token', // request csrf token's name in header
        bodyName: '_csrf',          // 通过 query 传递 CSRF token 的默认字段为 _csrf
        queryName: '_csrf',        // 通过 query 传递 CSRF token 的默认字段为 _csrf
        ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      },
    
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks',
    },
  };

  // 此处添加中间件配置add your middleware config here
  config.middleware = ['auth'];

  // 上面中间件的配置无须验证的route
  config.auth = {
    noForbidden:['/','/qr','/api', '/captcha'],
    noAuthRoutes: ['/unauthorization', '/admin/signin','/admin/signout' ]
}
  // 此处添加用户配置add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
