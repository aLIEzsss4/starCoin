const Koa = require('koa');
const app = new Koa();

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
    ctx.set('Access-Control-Allow-Origin', 'http://23.105.217.209', 'http://localhost:3000');
    mailTool.sendMail('951517835@qq.com',ctx.request.body)
    ctx.body  = 'ok'

})


app.use(router.routes());

app.listen(3001, () => console.log('Koa start at 3001...'));