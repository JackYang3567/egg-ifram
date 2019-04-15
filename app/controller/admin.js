'USE Strict';
const bcrypt = require('bcrypt')
const sd = require('silly-datetime');
const { Controller } = require('egg');
const BaseHandler = require('../libs/base')



const admins = [
    {id: 1, username: 'admin', name: '黄老五', title: '总经理',gender: 1, address:'春天大道10号', phone:'13808013567', email: '13808013567@163.com'},
    {id: 2, username: 'super', name: '李老三', title: '司机',gender: 1, address:'武侯大道10号', phone:'13908013567', email: '13908013567@163.com'},
    {id: 3, username: 'manager', name: '朱二娃', title: '程序员',gender: 1, address:'蜀都大道10号', phone:'13508013567', email: '13508013567@163.com'}
  ]

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    if(!ctx.session.admin){
      ctx.redirect('/admin/signin')
      return
    }
   
    let  context = { 
            title: '',           
            admins: []
         }

        if(ctx.params.id){
            context.title = '用户信息';
            context.admins  = admins.filter((item,index, arr) => item.id == ctx.params.id);
        }else{
            context.title = '用户列表';
            context.admins = admins;
       }
     await this.ctx.render('admin/index.njk', context);
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
        const User = await ctx.model.User.AuthByUserName(username,password)
       // console.log("ctx.request=User.dataValues==>>",User.dataValues)
        ctx.session.admin = User.dataValues;
        
       if(JSON.stringify(ctx.session.admin) != "{}"){
          const ret =[{url:'/admin'}]
          BaseHandler.resSuccess(ctx,ret)    
       }
       else{
         const error_code = 1 
         const error_message ="对不起！您输入用户名与密码不匹配！"
         BaseHandler.resError(ctx, error_code, error_message)
       }
       // ctx.redirect('/admin/signin')
      
  	}    
  }

  async signout() {
    const { ctx } = this;
    ctx.session.admin = null;
    ctx.redirect('/admin/signin')
  }
}

module.exports = AdminController;
