const Koa = require('koa');
const app = new Koa();

//router
const koaRouter = require('koa-router');
const router = koaRouter();


app.use(router['routes']());
router.get('/main', (ctx, next) => {
    ctx.body = 'Hello Koa2.0!';
})


app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3001);