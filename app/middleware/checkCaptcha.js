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
             const resJosn = {code:1,msg:"对不起！您输入的验证码无效！",data:[]}
            ctx.status = 201;
            ctx.body = JSON.stringify(resJosn);
          
          } else {
            await next();
          }
    }
};
