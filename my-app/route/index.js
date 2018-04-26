const Koa = require('koa');
const app = new Koa();
//func
const sendMail = require('./mail/mail')
const saveUserData = require('./coinmarketData/saveUserMailData')
const getCoinmarketData = require('./coinmarketData/getCoinMarketData')
//router
const router = require('koa-router')();
//bodyparse
const koaBody = require('koa-body');
const cors = require('koa2-cors')
app.use(cors());

router.post('/saveUserData', koaBody(), (ctx) => {
    // ctx.set('Access-Control-Allow-Origin', 'http://www.starcoin.site/3001');
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000/');
    saveUserData(ctx.request.body.mail, ctx.request.body.coins, ctx.request.body.finance);
    sendMail('恭喜您成功注册了starcoin资金收益服务', ctx.request.body.mail, ctx.request.body.coins, ctx.request.body.finance)
    ctx.body = { state: 'success' }
})

router.post('/coinMarketData', koaBody(), async (ctx) => {
    console.log(ctx.request.body);
    console.log('>>>>>>>>>>>>')
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ctx.set('Access-Control-Allow-Origin', 'http://23.105.217.209', 'http://localhost:3000');
    const result = await getCoinmarketData(ctx.request.body.name);
    ctx.body = result
})


app.use(router.routes());

app.listen(3001, () => console.log('Koa start at 3001...'));
