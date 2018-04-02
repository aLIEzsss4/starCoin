const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParse = require('koa-bodyparser');
const app = new Koa();
//databasefunction
const getCoinmarketData = require('./coinmarketData/getCoinMarketData')

//router
const koaRouter = require('koa-route');

//bodyParse
app.use(bodyParse({
    enableTypes: ['json', 'form']
}))

//跨域
app.use(cors());

const coinMarketData = async ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const result = await getCoinmarketData();
    ctx.body = JSON.stringify(result)
}
app.use(koaRouter.post('/coinMarketData', coinMarketData))
app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3001);