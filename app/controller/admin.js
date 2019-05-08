'USE Strict';
const bcrypt = require('bcrypt')
const sd = require('silly-datetime');
const { Controller } = require('egg');
const BaseHandler = require('../libs/base')
const RestController = require('./rest')


// 定义创建接口的请求参数规则 email, password, username
const createRule = {
  _csrf: 'string',
  username:'string',
  oldpass: 'string',
  newpass: 'string',
 // tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
  repass:'string',
  opt:{ type: 'string', values: ['pass'], required: false },
};

class AdminController extends Controller {
  
 // constructor(ctx) {
    //super(ctx, 'Admin')
 // }
/**
  * 管理员首页
  */
  async index() {
    const { ctx,app } = this;
    const { page } = {...ctx.params, ...ctx.query} 
    const __session = await app.sessionStore.get(app.config.session.key)
    let  context = {  title: '',           
        admins: [],
        opt: 0
    }    
    if(!__session){
       ctx.redirect('/admin/signin')
       return
    }    
    context.title = '用户列表';
    context.admins.push(__session);

    if(page>=0){
       context.opt = page;
       await ctx.render('admin/info.njk', context);
        return
     }else{
      await ctx.render('admin/index.njk', context);
     }
   
  }

  /**
  * 管理员 - 我的桌面
  */
 async welcome() {
    const { ctx,app } = this;
    const __session = await app.sessionStore.get(app.config.session.key)
    
    let  context = { 
        title: '',           
        userName: __session.username,
        currentTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }
    await this.ctx.render('admin/welcome.njk', context);
  }

  /**
  * 管理员注册
  */
  async signup() {
    const { ctx } = this;
    let  context = { 
        title: 'sign up',           
        users: []
    }
    await ctx.render('admin/signup.njk', context);
  }

  /**
  * 管理员登录
  */
  async signin() {    
    const { ctx,app } = this;
    const {username,password} = ctx.request.body;
    let  context = { 
        req: ctx.request,
        bodyCss:'login-bg',
        title: 'sign in',           
        users: []
    }
  
    if (ctx.request.method == "GET") { 
   	   await ctx.render('admin/signin.njk', context);
    }
    
    if (ctx.request.method == "POST") { 
        const Admin = await ctx.model.Admin.Auth(username,password)
        ctx.session.admininfo = { id:Admin.dataValues.id}

        if(Admin){
          await app.sessionStore.set(app.config.session.key, Admin.dataValues, app.config.session.maxAge)
          const data =[{url:'/admin/'}]
          const success_message = "登录成功"
          BaseHandler.resSuccess(ctx, data, success_message)
        }
       else{
         const error_code = 1 
         const error_message ="对不起！您输入的用户名与密码不匹配！"
         BaseHandler.resError(ctx, error_code, error_message)
       }
  	}    
  }

  /**
   * 修改管理密码
   */
  async update() {
    const {ctx} = this ;
    console.log('ctx.request.body==',ctx.request.body)
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常   
    ctx.validate(createRule, ctx.request.body);    
    const { id, oldpass,newpass, repass, username } = {
          ...ctx.params, 
          ...ctx.query, 
          ...ctx.request.body
    } 
   const siValided = (newpass === repass) ? await ctx.model.Admin.Auth(username,oldpass) : false     
   if(siValided )
     {
        await ctx.service.admin.update({id: id, username, password: newpass}) 
       // 设置响应体和状态码
        ctx.session.admininfo = null
        await app.sessionStore.destroy(app.config.session.key)
        const success_message = "密码修改成功"
        BaseHandler.resSuccess(ctx, [{url:'/admin/signin'}], success_message)
     }else{
        const error_message = "旧密码错误或新旧密码不一致"
        BaseHandler.resError(ctx,100, error_message)
     }
}

/**
 * 退出管理登录帐号
 */
  async signOut() {
    const { ctx,app } = this
    ctx.session.admininfo = null
    const delOk = await app.sessionStore.destroy(app.config.session.key)
    const __session =  await app.sessionStore.get(app.config.session.key)
    if(!delOk || __session){
      await app.sessionStore.destroy(app.config.session.key)
    }

    setTimeout( ()=>{
        ctx.redirect('/admin/signin')
    }, 1000)
  }
}

module.exports = AdminController;
