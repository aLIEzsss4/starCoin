const Koa = require('koa');
const app = new Koa();
const getCoinmarketData = require('./coinmarketData/getCoinMarketData')
//router
const router = require('koa-router')();
//bodyparse
const koaBody = require('koa-body');
const cors = require('koa2-cors')
app.use(cors());

router.post('/coinMarketData', koaBody(), async (ctx) => {
    console.log(ctx.request.body);
    console.log('>>>>>>>>>>>>')
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ctx.set('Access-Control-Allow-Origin', 'http://23.105.217.209', 'http://localhost:3000');
    const result = await getCoinmarketData(ctx.request.body.name);
    ctx.body = result
})

app.use(router.routes());

app.listen(3001);
