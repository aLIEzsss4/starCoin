
const nodeemail = require('nodemailer')

class MailTool {
    constructor() {

        this.mailSend = nodeemail.createTransport({
            host: 'smtp-mail.outlook.com',
            secureConnection: true,
            port: 587,
            auth: {
                user: 'bitcointradebykara@outlook.com',
                pass: '1234567890zxc'
            }
        })
    }
    sendMail(email, data) {
        console.log(data.data);
        console.log('maildata>>>>>')
        let opt = {
            from: 'bitcointradebykara@outlook.com',
            to: email,
            cc: '951517835@qq.com',
            subject: '当前加密货币筹码分析 by StarCoin.site',
            text: '当前加密货币筹码分析 by StarCoin.site',
            html: '<p>' + '币种和价格： ' + data.data.data.name + '  ' + data.data.data.quotes.USD.price + '<p>' +
                '<p>' + '当前总量： ' + data.data.data.max_supply + '<p>' +
                '<p>' + '当前流通量： ' + data.data.data.circulating_supply + '<p>' +
                '<p>' + '当前市值： ' + data.data.data.quotes.USD.market_cap + '<p>' +
                '<p>' + '24小时流通量： ' + data.data.data.quotes.USD.volume_24h + '<p>' +
                '<p>' + '24小时流通量占流通量百分比： ' + data.data.data.quotes.USD.volume_24h / data.data.data.quotes.USD.price / data.data.data.circulating_supply + '<p>' +
                '<p>' + '24小时价格涨跌： ' + data.data.data.quotes.USD.percent_change_24h + '<p>'
        }
        this.mailSend.sendMail(opt, (err, msg) => {
            if (err) {
                console.log(err)
            } else {
                console.log(msg);
                console.log('index', { title: "已接收：" + msg.accepted });
            }
        })

    }

}
module.exports = MailTool;