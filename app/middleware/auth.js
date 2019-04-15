
 
 module.exports = (options, app) =>{
    return async function auth (ctx, next){
        // 无需验证的route(path)
        const routes = options.noAuthRoutes;
        // 获取客户端的route
        const clientRouteStr = ctx.request.path;
        const routeArr = clientRouteStr.split('/')
        const clientRoute = `/${routeArr[1]}/`
        const isHasRoute = routes.some(val => {
           if (val === clientRoute) {
               //是无需验证的route(path)
                return true;  
            }
                return false;
        });

        if (!isHasRoute) {
            ctx.status = 403;
            ctx.body = '您还没授权访问';
           // ctx.redirect('/admin/signin')
          } else {
            await next();
          }
    }
};

