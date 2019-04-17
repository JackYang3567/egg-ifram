'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth(app.config.auth, app);
  const checkCaptcha = app.middleware.checkCaptcha(app);

  router.get('/admin',  controller.admin.index);
  router.get('/admin/welcome', controller.admin.welcome);
  router.get('/admin/signup', controller.admin.signup);
  router.get('/admin/signin', controller.admin.signin);
  router.post('/admin/signin', checkCaptcha, controller.admin.signin);
  router.put('/admin/:id', controller.admin.update); // type:0,编辑个人信息，1：修改密码

  app.passport.mount('github');
  router.get('/admin/signout', controller.admin.signOut);


  app.router.resources('user', '/api/v1/user', app.controller.user);
  /*
  router.get('/user',  controller.user.index);
  router.post('/user', controller.user.create);
  router.get('/user/new', controller.user.newUserForm);
  router.get('/user/:type/:id', controller.user.editUserForm);
  router.put('/user/:id', controller.user.update); // type:0,编辑个人信息，1：修改密码
  router.delete('/user/:id',controller.user.destroy)
*/
  router.get('/', controller.home.index);
  router.get('/:name', controller.home.index);
  router.get('/qr/:text', controller.utils.qrcode);
  router.get('/captcha/:type', controller.utils.captcha); //type 0:注册，1：登录

  //API RESTful

  app.router.resources('user', '/api/v2/user', app.controller.restUser);
  /*
  router.get('/api/user', controller.restUser.index);
  router.post('/api/user', controller.restUser.create);
  router.get('/api/user/new', controller.restUser.newUserForm);
  router.get('/api/user/:type/:id', controller.restUser.editUserForm);
  router.put('/api/user/:id', controller.restUser.update); // type:0,编辑个人信息，1：修改密码
  router.delete('/api/user/:id',controller.restUser.destroy)
  */
};
