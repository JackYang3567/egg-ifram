const BaseHandler = require('../libs/base')

module.exports = (app) =>{
    return async function checkCaptcha (ctx, next){
        // 验证的客户端的captcha
        const {type, captcha} = ctx.request.body;
        let isHasExists = false

        if ( 1 == parseInt(type)) {
            const ret =  await app.redis.exists(`captcha:signin:${captcha.toLowerCase()}`) 
            if(ret == 1) {
                isHasExists = true
            } else{
                isHasExists = false
            }
        }else{
            const ret =  await app.redis.exists(`captcha:signup:${captcha.toLowerCase()}`)
            if(ret == 1) {
                isHasExists = true
            } else{
                isHasExists = false
            }
        }

        if (!isHasExists) {
            const error_code = 2
            const error_message = "对不起！您输入的验证码无效！"
            ctx.status = 200;
            BaseHandler.resError(ctx, error_code, error_message)
          
          } else {
            await next();
          }
    }
};
