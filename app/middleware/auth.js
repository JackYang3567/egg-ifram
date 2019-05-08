
 const BaseHandler = require('../libs/base')
 module.exports = (options, app) =>{
     /**
      * 验证
      */
    return async function auth (ctx, next){
       // 无需验证的route(path)
       // console.log('ctx.isAuthenticated()==>',ctx.isAuthenticated())
        const noForbidden = options.noForbidden; //开放API无须验证
        const noAuthRoutes = options.noAuthRoutes;
        
        const isSession = await app.sessionStore.get(app.config.session.key)
        // 获取客户端的route
        const clientRoute = `/${ctx.request.path.split('/')[1]}`;
        if(noForbidden.indexOf(clientRoute) !== -1 ) {
            //放行开放路由：站点首页，API,二维码，验证码无须验证 
            return await next() 
        }else{
            const _clientRoute = ctx.request.path
            if(noAuthRoutes.indexOf(_clientRoute) !== -1 ) {
                //登录注册退出无须授权
                return await next() 
            }else{
                //授权
                if(isSession){
                    return await next() 
                }else{
                    const str = '><script>alert("abc") </script><';
    console.log('><script>alert("abc") </script><===',ctx.helper.escape(str));
                    ctx.status = 401;
                    ctx.body = 'Unauthorization'
                    return
                }               
            }
        }
        
        
    }
};
