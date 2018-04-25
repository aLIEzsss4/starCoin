
const nodeMail = require('nodemailer');
module.exports = function sendMail(content) {
    let mailSend = nodeMail.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: true,
        port: 587,
        auth: {
            user: 'bitcointradebykara@outlook.com',
            pass: 'bitcointrade123'
        }
    })

    let opt = {
        from: 'bitcointradebykara@outlook.com',
        to: '951517835@qq.com',
        cc: '705153958@qq.com',
        subject: '服务报错',
        text: '服务报错',
        html: '<h1>' + content + '<h2>'
    }

    mailSend.sendMail(opt, (err, msg) => {
        if (err) {
            console.log(err)
        } else {
            console.log('mailsend')
        }
    })

}