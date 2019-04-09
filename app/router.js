'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin', controller.admin.index);
  router.get('/admin/welcome', controller.admin.welcome);
  router.get('/admin/signup', controller.admin.signup);
  router.get('/admin/signin', controller.admin.signin);
  router.post('/admin/signin', controller.admin.signin);
  router.get('/admin/signout', controller.admin.signout);

  router.get('/admin/user', controller.user.index);
  router.get('/', controller.home.index);
  router.get('/:name', controller.home.index);
  router.get('/qr/:text', controller.utils.qrcode);
  router.get('/captcha/:type', controller.utils.captcha); //type 0:注册，1：登录
  
};
