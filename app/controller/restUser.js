'USE Strict';
const { defaultTo } = require('ramda')
const bcrypt = require('bcrypt')
const { Controller } = require('egg');
const BaseHandler = require('../libs/base')

//const RestController = require('./rest')
const RestRenderController = require('./render')
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


class RestUserController extends RestRenderController {
  constructor(ctx) {
    super(ctx, 'User')
  }

  /**
   * 新增模板页面表单
   */
  async new() {
    const { ctx,app } = this;
    let  context = { 
      title: '新增用户'
     }
    await ctx.render('user/new.njk', context);
    
  }

  /**
   * 编辑表单页面
   */
  async edit() {
    let  context = { 
      opt: 0,
      title: '',           
      users: []
   }
    
    const { ctx } = this;
    const { id, page } = {...ctx.params, ...ctx.query} 
    const users =  await ctx.model.User.findById(BaseHandler.toInt(id));
    context.opt = parseInt(page)
    //context.opt = type
    context.users.push(users)
    console.log('context=====',context)
    await ctx.render('user/edit.njk', context);
    
  }
 
/*
  async list() {
    const { ctx } = this; 
    await ctx.render('user/list.njk', {});
  }
*/


/**
 *  if(!split) split = 10;  //页面显示记录数
 *  if(!page) page = 1;     //当前第几页
 */
  async index () {
    const { ctx } = this; 
    let { page = 1,split = 10, start, end ,username } = {...ctx.params, ...ctx.query} 
    //const users =  await ctx.model.User.findAll({attributes:{ exclude: ['created_at','updated_at'] }});
    // const users =  await ctx.model.User.findAll({});
    let where = {}
    if(username) where.username = defaultTo('',  { $like: `%${username}%` }  )
   
    //if(username) where.username = defaultTo('', username )
    //if(start) where.username = defaultTo('', username )
    //if(end) where.username = defaultTo('', username )
     console.log("where=====",where)
    const data =  await ctx.model.User.findAndCountAll({
      attributes:{ exclude: ['password'] },
      where: where,
      offset: parseInt( (page - 1)* split),    
      limit: parseInt(split),       
      order: [ ['id', 'DESC'] ]
    }); 
    const success_message = "查询数据成功！"
    BaseHandler.resSuccess(ctx, data, success_message)
  }

/**
   * 更新
   */
  async update() {
    const ctx = this.ctx;
    const { id ,props, opt} = {...ctx.params, ...ctx.query,...ctx.request.body} 
    const newinfo = ctx.request.body  
   
    if(opt=='pass'){
       ctx.validate(createRule, ctx.request.body);    
       const { id, oldpass,newpass, repass, username } = {
            ...ctx.params, 
            ...ctx.query, 
            ...ctx.request.body
       } 
    }
    
   
    const user = await ctx.model.User.findById(BaseHandler.toInt(id));
    if (!user) {
      ctx.status = 404;
      return;
    }
    let _user = {}
    let _props = props ? JSON.parse(props) : null;
    if( _props instanceof Object){
      console.log('is object',_props);      
      await user.update(_props,{'where':{'id':{eq:BaseHandler.toInt(id)}}});

    }else{
      console.log('update newinfo111==', newinfo); 
      delete newinfo._csrf;  
      if(newinfo.opt == 'pass') {
        delete newinfo.opt;
        delete newinfo.oldpass;
        delete newinfo.repass;       
        newinfo.password =  newinfo.newpass //await bcrypt.hash(newinfo.newpass, 10)
        console.log('update newinfo==', newinfo);   
        await user.update(newinfo,{'where':{'id':{eq: BaseHandler.toInt(id)}}});
      }
      if(newinfo.opt == 'info') {
        delete newinfo.opt;

        console.log('update newinfo 333==', newinfo); 
        await user.update(newinfo,{'where':{'id':{eq: BaseHandler.toInt(id)}}}); 
      }
      //const { email, password,username,weibo,weixin,receive_remote,email_verifyed,avatar } = ctx.request.body;
     
      //_user = {weibo,weixin,receive_remote:true,email_verifyed:false,avatar,created_at: new Date(),updated_at: new Date()}
    }
  
    await user.update(_user);
  
    const data = user
    const success_message = ""
    BaseHandler.resSuccess(ctx, data, success_message)
  
 }

  /**
   * 登录
   */
  async signin(){
    const ctx = this.ctx;
    const user = ctx.request.body 
    const data = user
    const success_message = "登录成功!"
    BaseHandler.resSuccess(ctx, data, success_message)
  }
  
    
}

module.exports = RestUserController;
