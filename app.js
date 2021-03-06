// {app_root}/app.js

'use strict'

//const { globalBaseInitial } = require('./init')
//globalBaseInitial(__dirname)



 module.exports = app => {

  if (app.config.env === 'local' || app.config.env === 'unittest') {
     
    app.beforeStart(async () => {
     // await app.model.sync({force: true}); //是同步 model 到数据库，主要是同步数据库表和字段
    });
  }

  app.sessionStore = {
      async get(key) {
        const res = await app.redis.get(key);
        if (!res) return null;
        return JSON.parse(res);
      },

      async set(key, value, maxAge) {
        // maxAge not present means session cookies
        // we can't exactly know the maxAge and just set an appropriate value like one day
        if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
        value = JSON.stringify(value);
        await app.redis.set(key, value, 'PX', maxAge);
      },

      async destroy(key) {
       const res = await app.redis.del(key);
       if (!res) return null;
       return JSON.parse(res);
      },
  };

  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    // 从数据库中查找用户信息
    //
    // Authorization Table
    // column   | desc
    // ---      | --
    // provider | provider name, like github, twitter, facebook, weibo and so on
    // uid      | provider unique id
    // user_id  | current application user id
    const auth = await ctx.model.Authorization.findOne({
      uid: user.id,
      provider: user.provider,
    });
    const existsUser = await ctx.model.User.findOne({ id: auth.user_id });
    if (existsUser) {
      return existsUser;
    }
    // 调用 service 注册新用户
    const newUser = await ctx.service.user.register(user);
    return newUser;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
  // 处理 user
  // ...
  // return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
  // 处理 user
  // ...
  // return user;
  });
};