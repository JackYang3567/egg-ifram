'use strict'


const RestController = require('./rest')

class RenderController extends RestController {
    constructor(ctx, modelName) {
        super(ctx, modelName)
        this.modelName = modelName
    }
    
    async list() {
        const { ctx } = this; 
        await ctx.render(`${this.modelName}/list.njk`, {});
    }
}

module.exports = RenderController
