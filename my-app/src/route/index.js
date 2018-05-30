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
    ctx.set('Access-Control-Allow-Origin', 'http://149.28.51.186', 'http://localhost:3000');
    mailTool.sendMail(ctx.request.body.mail,ctx.request.body)
    ctx.body  = 'ok'

})


app.use(router.routes());

app.listen(3001, () => console.log('Koa start at 3001...'));