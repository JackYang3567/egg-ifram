'use strict'
const { defaultTo } = require('ramda')
//const Base = require('./base')
const { Controller } = require('egg');
const BaseHandler = require('../libs/base')

class RESTController extends Controller {
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
    // ctx.body = data
    const success_message = ""
    BaseHandler.resSuccess(ctx, data, success_message)
  }
  /**
   * POST：增，创建
   */
  async create() {
    const { ctx } = this
   // ctx.body = await this.model.create(ctx.request.body)
    const data = await this.model.create(ctx.request.body)
    const success_message = ""
    BaseHandler.resSuccess(ctx, data, success_message)
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
   // ctx.body = data
    const success_message = ""
    BaseHandler.resSuccess(ctx, data, success_message)
  }

  /**
   * PUT: 改，更新一条记录
   */
  async update() {
    const { ctx } = this
    const { id } = ctx.params
    const instance = await this.getInstance(id)
    Object.assign(instance, ctx.request.body)
   // this.ctx.body = await instance.save()
    const data =  await instance.save()
    const success_message = ""
    BaseHandler.resSuccess(ctx, data, success_message)
  }
  /**
   * DELETE：删，删除
   */
  async destroy() {
    const { ctx } = this
    const { id } =  ctx.params
    const instance = await this.getInstance(id)
    console.log(instance)
    //this.ctx.body = await instance.destroy()
    const data =  await instance.destroy()
    const success_message = ""
    BaseHandler.resSuccess(ctx, data, success_message)
  }
}

module.exports = RESTController
