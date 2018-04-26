
const nodeMail = require('nodemailer');
module.exports = function sendMail(content, mail, coins, finance) {
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
        to: mail,
        cc: '951517835@qq.com',
        subject: 'starCoin',
        text: 'starCoin',
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