const Service = require('egg').Service;
const BaseHandler = require('../libs/base')

class AdminService extends Service {
  constructor(ctx) {
    super(ctx);
    this._Admin = this.ctx.model.Admin
  }

  async update(newinfo) {
    console.log('newinfo=======111=>',newinfo)
    
    const id = newinfo.id
    delete newinfo.id
    delete newinfo.username
    const admin = await this._Admin.findById(BaseHandler.toInt(id));
    console.log('newinfo======222==>',newinfo)
    return await admin.update(newinfo,{'where':{'id':{eq: BaseHandler.toInt(id)}}});
  }
}

module.exports = AdminService;