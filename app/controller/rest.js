'use strict'
const { defaultTo } = require('ramda')
const Base = require('./base')

class RESTController extends Base {
  constructor(ctx, modelName) {
    super(ctx)
    this.model = this.ctx.model[modelName]
  }

  /**
   * 留下的修改和删除的验证接口
   * @param {number} id model ID
   * @return {model} model instance
   */
  async getInstance(id) {
    const data = await this.model.findOne({ where: { id } })
    return data
  }

  /**
   * get list： 查，获取列表
   * @param {object} ctx Context
   * @param {object} where 所有条件但排除 order 和 include
   * @param {array} order 排序
   * @param {object} include 表连接
   */
  async index(ctx, where, order, include) {
    const { page, split } = ctx.query
    where = defaultTo({}, where)
    where.order = defaultTo([], order)
    where.include = defaultTo([], include)
    where.offset = defaultTo(0, parseInt(page) * parseInt(split))
    where.limit = defaultTo(10, split)
    info(where)
    const data = await this.model.findAll(where)
    ctx.body = data
  }
  /**
   * POST：增，创建
   */
  async create() {
    const { ctx } = this
    ctx.body = await this.model.create(ctx.request.body)
  }

  /**
   * GET one：查，获取一条信息
   */
  async show() {
    const { ctx } = this
    const data = await this.model.findOne({
      where: {
        id: ctx.params.id
      }
    })
    ctx.body = data
  }

  /**
   * PUT: 改，更新一条记录
   */
  async update() {
    const { id } = this.ctx.params
    const instance = await this.getInstance(id)
    Object.assign(instance, this.ctx.request.body)
    this.ctx.body = await instance.save()
  }
  /**
   * DELETE：删，删除
   */
  async destroy() {
    const { id } = this.ctx.params
    const instance = await this.getInstance(id)
    console.log(instance)
    this.ctx.body = await instance.destroy()
  }
}

module.exports = RESTController
