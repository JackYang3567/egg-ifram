'USE Strict';
const bcrypt = require('bcrypt')
const { Controller } = require('egg');
const BaseHandler = require('../libs/base')


// 定义创建接口的请求参数规则 email, password, username
const createRule = {
  _csrf: 'string',
  email: 'string',
  username: 'string',
 // tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
  password: 'string',
  repass:'string'
};

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
    const users =  await ctx.model.User.findById(BaseHandler.toInt(id));
    context.opt = type
    context.users.push(users)
    await ctx.render('user/edit.njk', context);
    
  }
  /**
   * 列表
   */
  async index() {
    const { ctx,app } = this; 
    let req = {...ctx.params, ...ctx.query}
    let { pageSize,curPage } = {...ctx.params, ...ctx.query} 
    if(!pageSize) pageSize = 10;
    if(!curPage) curPage = 1;
    let context = { 
      totalCount: 0,
      title: '',           
      users: []
    }
   
    //const users =  await ctx.model.User.findAll({attributes:{ exclude: ['created_at','updated_at'] }});
   // const users =  await ctx.model.User.findAll({});
    const users =  await ctx.model.User.findAndCountAll({
      attributes:{ exclude: ['password'] },
      offset: (curPage - 1)* pageSize,    
      limit: pageSize,      
      order: [ ['id', 'DESC'] ]
    });
    
/*
   const users =  await ctx.model.User.findAndCountAll({
      limit: pagesize,
      offset: (curpage - 1) * pagesize,
    //  where: {},
     // order: [
     //     ['created_at', 'DESC'],
     // ],
     // include: [{
     //     model: OrderInfo,
     //     as: 'order_info',
     // }],
      distinct: true
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });

   */
    
    
      context.title = '用户列表';
      context.users = users.rows;
      context.totalCount = users.count;
     
     console.log("req=======>>",req)
     await ctx.render('user/index.njk', context);
    // ctx.body = users    
  }

  

  /**
   * 详情
   */
  async show() {
    const { ctx, app } = this;
    const { id } = {...ctx.params, ...ctx.query} 
    console.log('toInt(id)===>',BaseHandler.toInt(id));
    const users =  await ctx.model.User.findById(BaseHandler.toInt(id));
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
    const {ctx} = this ;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常   
    ctx.validate(createRule, ctx.request.body);
    const { email, password, username } = ctx.request.body;
    // 调用 service 创建一个 user
    const user  = await ctx.service.user.create({ email, password, username })
    // 设置响应体和状态码
    ctx.status = 201;
    BaseHandler.resSuccess(ctx,user)
  
  }

  /**
   * 更新
   */
  async update() {
    const ctx = this.ctx;
    const { id ,props} = {...ctx.params, ...ctx.query} 
    const newinfo = ctx.request.body  
   
   
    const user = await ctx.model.User.findById(BaseHandler.toInt(id));
    if (!user) {
      ctx.status = 404;
      return;
    }
    let _user = {}
    let _props = props ? JSON.parse(props) : null;
    if( _props instanceof Object){
      console.log('is object',_props);      
      await user.update(_props,{'where':{'id':{eq: BaseHandler.toInt(id)}}});

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
  
    const resJosn = {code:0,msge:"操作成功！"}
    ctx.status = 200;
    ctx.body = resJosn;
  
}

  /**
   * 删除
   */
  async destroy() {
    const ctx = this.ctx;
    let { id,ids } = {...ctx.params, ...ctx.query} 
    console.log('destroy toInt(id)===>', BaseHandler.toInt(id));
    let user 

    if(BaseHandler.toInt(id)>0) { 
      user = await ctx.model.User.findById( BaseHandler.toInt(id))
      if (!user) {
        ctx.status = 404;
        return;
      }
      await user.destroy();
    }else{
      let idArr = ids.split(',');
      idArr.forEach( async id=>{  
         user = await ctx.model.User.findById( BaseHandler.toInt(id))
         if (!user) {
          ctx.status = 404;
          return;
         }
        await user.destroy();
      });
    };
    const resJosn = {code:0,msge:"操作成功！"}
    ctx.status = 200;
    ctx.body = resJosn;
  }
  
}

module.exports = UserController;
