'USE Strict';

const { Controller } = require('egg');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class UserController extends Controller {
   
  async newUserForm() {
    const { ctx,app } = this;
    let  context = { 
      title: '新增用户'
     }
    await ctx.render('user/new.njk', context);
    
  }

  async editUserForm() {
    let  context = { 
      opt: 0,
      title: '',           
      users: []
   }
    const { ctx, app } = this;
    const { type, id } = {...ctx.params, ...ctx.query} 
    const users =  await ctx.model.User.findById(toInt(id));
    context.opt = type
    context.users.push(users)
    await ctx.render('user/edit.njk', context);
    
  }
  /**
   * 列表
   */
  async index() {
    const { ctx,app } = this;    
    //const users =  await ctx.model.User.findAll({attributes:{ exclude: ['created_at','updated_at'] }});
    const users =  await ctx.model.User.findAll({});
    let  context = { 
        title: '',           
        users: []
     }
     
     if(ctx.params.id){
            context.title = '用户信息';
            context.users  = users.filter((item,index, arr) => item.id == ctx.params.id);
     }else{
            context.title = '用户列表';
            context.users = users;
     }
     await ctx.render('user/index.njk', context);
    // ctx.body = users    
  }

  

  /**
   * 详情
   */
  async show() {
    const { ctx, app } = this;
    const { id } = {...ctx.params, ...ctx.query} 
    console.log('toInt(id)===>',toInt(id));
    const users =  await ctx.model.User.findById(toInt(id));
    ctx.body = users
  }

  /**
   * 新建email: '13708013567@163.com',
    password: utils.md5('123456'),
    username: 'admin456',
    gender: 1,
    mobile_phone:13808013567,
    address: "星光路1号",
    status: 0,
    weibo: 'dsfsd',
    weixin: 'sdfasd',
    receive_remote: false,
    email_verifyed: true,
    avatar: 'sdfsd',
    created_at: new Date(),
    updated_at: new Date(),
   */
  async create() {
    const ctx = this.ctx;
    const { email, password, username } = ctx.request.body;
   
    const _user = {email, password,username}
    const user = await ctx.model.User.create(_user);
    const resJosn = {code:0,msge:"操作成功！"}
    ctx.status = 201;

    ctx.body = resJosn;
  }

  /**
   * 更新
   */
  async update() {
    const ctx = this.ctx;
    const { type, id } = {...ctx.params, ...ctx.query} 
    console.log('update ===>',toInt(id));
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { email, password,username,weibo,weixin,receive_remote,email_verifyed,avatar } = ctx.request.body;
    const _user = {weibo,weixin,receive_remote:true,email_verifyed:false,avatar,created_at: new Date(),
      updated_at: new Date()}
    await user.update(_user);
    ctx.body = _user;
  }

  /**
   * 删除
   */
  async destroy() {
    const ctx = this.ctx;
    const { id } = {...ctx.params, ...ctx.query} 
    console.log('destroy toInt(id)===>',toInt(id));
    const user = await ctx.model.User.findById(toInt(id));
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
 
    const resJosn = {code:0,msge:"操作成功！"}
    ctx.status = 200;

    ctx.body = resJosn;
  }
  
}

module.exports = UserController;
