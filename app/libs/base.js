'use strict'

class BaseHandler{
    constructor(){

    }
   
    /**
     * 成功时输出信息
     * @param {*} ctx 
     * @param {*} data 
     * @param {*} success_message 
     */
    resSuccess (ctx, data,success_message='') {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            success: true,
            code: 0,
            success_message: success_message,
            data: data
        };
    }


    /**
     * 出错时输出信息
     * @param {*} ctx 
     * @param {*} error_code 
     * @param {*} error_message 
     */
    resError  (ctx, error_code, error_message) {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            success: false,
            code: error_code,
            error_message: error_message
        };
    }

     /**
      * 字符串转换成int类型
      * @param {*} str 
      */
    toInt (str) {
        if (typeof str === 'number') return str;
        if (!str) return str;
        return parseInt(str, 10) || 0;
    }

     /**
      * 判断一个对象是不为空
      * @param {*} obj 输入一个对象
      */
    isEmptyObj (obj){ 
        let ret = false
        if(!obj)
        {
           ret = true
           return ret
        }
        if (JSON.stringify(obj) == "{}"  ) {
           ret = true
           return ret
        }
        return ret
    }
    
     
}

module.exports = new BaseHandler