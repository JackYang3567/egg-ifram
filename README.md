# ifram
This project name egg-ifram_1 是后台，前端name  vueworks下的vue-demo-pro
https://github.com/JackYang3567/egg-ifram.git

//integer,varchar,timestamp,text,boolean
// update user set authentication_string=password("root") where user="root";
//ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
//npx sequelize model:generate --name User --attributes email:varchar,password:varchar,username:varchar,weibo:varchar, weixin:varchar,receive_remote:bit,email_verifyed:bit,avatar:varchar

//.sequelizerc
/*
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
}
*/
//1, npx sequelize init
//2, npx sequelize model:generate --name User --attributes email:string,password:string,username:string,weibo:string,weixin:string,receive_remote:boolean,email_verifyed:boolean,avatar:string
//3, npx sequelize db:migrate
//修改 config/database.json中的密码 myroot  数据库egg_db
//4, npx sequelize seed:generate --name demo-user
/*
一、脚本创建数据库egg_db，并制定默认的字符集是utf8mb4。
CREATE DATABASE egg_db DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;
二、授权
grant all privileges on egg_db.* to root@'%' identified by 'myroot';

flush privileges; //刷新系统权限表
*/

//5, npx sequelize db:seed:all

## https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-dataType

### 1、初始化 Migrations 配置文件和目录
```
npx sequelize init:config
npx sequelize init:migrations
```

### 2、修改一下 database/postgres/config.json 中的内容，将其改成我们项目中使用的数据库配置：
```
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "egg_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "egg_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "egg_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

```
### 3、用Migration 文件来创建数据表
```
npx sequelize migration:generate --name=init-users
```
执行完后会在 database/migrations 目录下生成一个 migration 文件(${timestamp}-init-users.js)，我们修改它来处理初始化 users 表：
```
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
      weibo: {
        type: Sequelize.STRING
      },
      weixin: {
        type: Sequelize.STRING
      },
      receive_remote: {
        type: Sequelize.BOOLEAN
      },
      email_verifyed: {
        type: Sequelize.BOOLEAN
      },
      avatar: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
```
### 4、执行 migrate 进行数据库变更
```
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```
### 5、生成测试数据文件
```
 npx sequelize seed:generate --name demo-user
```
修改生成的文件：
```
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

```
### 6、生成测试数据
```
 npx sequelize db:seed:all
```


## QuickStart
git remote add origin https://github.com/JackYang3567/egg-ifram.git
<!-- add docs here for user -->
http://docs.sequelizejs.com/manual/migrations.html
see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
yarn add ioredis egg-redis
yarn add egg-sequelize  pg pg-hstore