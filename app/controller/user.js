'USE Strict';

const { Controller } = require('egg');

class UserController extends Controller {
   
  async index() {
    const { ctx } = this;
    const users = [
      {id: 1, name: '黄老五', title: '总经理',gender: 1, address:'春天大道10号', phone:'13808013567', email: '13808013567@163.com'},
      {id: 2, name: '李老三', title: '司机',gender: 1, address:'武侯大道10号', phone:'13908013567', email: '13908013567@163.com'},
      {id: 3, name: '朱二娃', title: '程序员',gender: 1, address:'蜀都大道10号', phone:'13508013567', email: '13508013567@163.com'}
    ]
   
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
  }

  
}

module.exports = UserController;
