
 
 module.exports = (options, app) =>{
    return async function auth (ctx, next){
        // 无需验证的route(path)
        console.log('ctx.isAuthenticated()==>',ctx.isAuthenticated())
        const routes = options.noAuthRoutes;
        // 获取客户端的route
        const clientRouteStr = ctx.request.path;
        const routeArr = clientRouteStr.split('/')
        const clientRoute = `/${routeArr[1]}/`

        console.log('routes==>',routes)
        console.log('clientRoute==>',clientRoute)
        let isHasRoute = false
        if(routes.indexOf(clientRoute) >-1) {
            //是无需验证的route(path)
            isHasRoute = true; 
        }
          
       
        if (!isHasRoute && !ctx.session.admin ) {
            ctx.status = 403;
            ctx.body = '您还没授权访问';
           // ctx.redirect('/admin/signin')
          } else {
            await next();
          }
    }
};

