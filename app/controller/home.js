'USE Strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
   // ctx.body = 'Hello world';
    const utils = [
      {title: '生成二维码', ctlname: 'qrcode',path: 'qr/github.com?size=10&margin=10'},
      {title: '生成验证码captcha/type 0:注册，1：登录', ctlname: 'captcha',path: 'captcha/1'},
      {title: '', ctlname: '',path: ''}
    ]
    const  urls = [
      { name: 'baidu', url: 'https://www.baidu.com/' },
      { name: '589ty', url: 'https://m.589ty.cn/#/' },
    ]
    let  domains = { 
            dir: [],           
            list: [],
            utils:[]
        }

        if(ctx.params.name){
           domains.list  = urls.filter(
             (item,index, arr) => item.name == ctx.params.name);
        }else{
          domains.dir = urls;
          domains.utils = utils;
       }
     await ctx.render('home/index.njk', domains);
  }

}

module.exports = HomeController;
