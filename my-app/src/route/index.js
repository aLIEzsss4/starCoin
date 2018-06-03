const Koa = require('koa');
const app = new Koa();
const googleTrends = require('google-trends-api');

//tool
const MailTool = require('../tool/mail');
const mailTool = new MailTool();

//router
const router = require('koa-router')();
//bodyparse
const koaBody = require('koa-body');
const cors = require('koa2-cors')
app.use(cors());

router.post('/sendMail', koaBody(), async (ctx) => {
    console.log(ctx.request.body);
    console.log('>>>>>>>>>>>>')
    ctx.set('Access-Control-Allow-Origin', 'http://149.28.51.186', 'http://localhost:3000');
    mailTool.sendMail(ctx.request.body.mail, ctx.request.body)
    ctx.body = 'ok'

})

router.get('/googleTrend', koaBody(), async (ctx) => {

    ctx.set('Access-Control-Allow-Origin', 'http://149.28.51.186', 'http://localhost:3000');
    let data;
    let respoense = ctx;
    console.log(ctx);
    console.log('ctx1')
    let b = await googleTrends.interestOverTime({ keyword: 'btc',startTime: new Date('2018-05-01'), endTime: new Date('2018-05-02'),granularTimeResolution:true })
        .then(function (results) {
            return results;
        }).catch(err => {
            console.log(err)
        })
    // ctx.body  = 'ok'

    console.log(b);
    ctx.body = { 'data': JSON.parse(b) };

})


app.use(router.routes());

app.listen(3001, () => console.log('Koa start at 3001...'));