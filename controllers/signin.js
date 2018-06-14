// sign in:

var index = 0;
var users = {};

module.exports = {

    //渲染登录界面
    'GET /signin': async (ctx, next) => {
        ctx.render('signin.html');
    },

    //登录请求

    'POST /signin': async (ctx, next) => {
        index ++;
        let name = ctx.request.body.name;
        //检查用户是否存在
        if(users[name]) {
            // ctx.response.redirect('/signin');
            ctx.render('signin.html', {
            name: users[name]
            });
        } else {
            users[name] = name;
            let user = {
                id: index,
                name: name,
                image: index % 10
            };

            //设置cookie
            let value = Buffer.from(JSON.stringify(user)).toString('base64');
            console.log(`Set cookie value: ${value}`);
            ctx.cookies.set('name', value);
            ctx.response.redirect('/');  //重定向
        }
        
    },

    //退出

    'GET /signout': async (ctx, next) => {
        let name = ctx.state.user.name;
        users[name] = '';
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};
