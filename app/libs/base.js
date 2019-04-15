'use strict'

class BaseHandler{
    constructor(){

    }
   
    //成功输出
    resSuccess(ctx, ret){
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            result: true,
            code: 0,
            data: ret
        };
    }

    //出错输出
    resError(ctx, error_code, error_message){
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            result: false,
            code: error_code,
            error_message: error_message
        };
    }

     //转换成int类型
     toInt(str) {
        if (typeof str === 'number') return str;
        if (!str) return str;
        return parseInt(str, 10) || 0;
     }
}

module.exports = new BaseHandler