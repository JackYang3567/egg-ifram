const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this._User = this.ctx.model.User
  }

  async create(user) {
    return await this._User.create(user)
  }
}

module.exports = UserService;