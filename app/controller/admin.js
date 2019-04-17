'USE Strict';
const bcrypt = require('bcrypt')
const sd = require('silly-datetime');
const { Controller } = require('egg');
const BaseHandler = require('../libs/base')



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
  async index() {
    const { ctx } = this;
    const { page } = {...ctx.params, ...ctx.query} 
    let  context = {  title: '',           
        admins: [],
        opt: 0
    }
   

    if(!ctx.session.admin){
     ctx.redirect('/admin/signin')
     //ctx.session.returnTo = ctx.path;
      return
    }
  
    context.title = '用户列表';
    context.admins.push(ctx.session.admin);
    if(page>=0){
        context.opt = page;
        console.log('====context===>',context)
      await ctx.render('admin/info.njk', context);
      return
     }
    await ctx.render('admin/index.njk', context);
  }

 async welcome() {
    const { ctx } = this;
    const _admin = ctx.session.admin
    
    let  context = { 
        title: '',           
        userName: _admin.username,
        currentTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }
    await this.ctx.render('admin/welcome.njk', context);
  }

  async signup() {
    const { ctx } = this;
    let  context = { 
        title: 'sign up',           
        users: []
    }
    await ctx.render('admin/signup.njk', context);
  }


  async signin() {
    
    const { ctx } = this;
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
        if(Admin){
         // const _ss= await ctx.login('admin',[Admin.dataValues,'aaa'])
         // console.log('_ss===>',_ss)
          ctx.session.admin = Admin.dataValues;
         
          const data =[{url:'/admin'}]
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
   * 更新
   */
  async update() {
     const {ctx} = this ;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常   
    ctx.validate(createRule, ctx.request.body);
    const { id } = {...ctx.params, ...ctx.query} 
    const { newpass, username } = ctx.request.body;
    // 调用 service 创建一个 user
    const data  = await ctx.service.admin.update({id: id, username, password: newpass})
    // 设置响应体和状态码
    const success_message = "密码修改成功"
    BaseHandler.resSuccess(ctx, data, success_message)
  
}

  async signOut() {
    const { ctx } = this;
    ctx.session.admin = null;
    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/admin/signin');
  }
}

module.exports = AdminController;
