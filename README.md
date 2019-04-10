# ifram

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