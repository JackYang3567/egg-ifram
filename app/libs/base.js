'use strict'

class BaseHandler{
    constructor(){
    }
   
    //成功输出
    resSuccess(ctx, data,success_message=''){
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            success: true,
            code: 0,
            success_message: success_message,
            data: data
        };
    }

    //出错输出
    resError(ctx, error_code, error_message){
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            success: false,
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