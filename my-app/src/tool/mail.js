
const nodeemail = require('nodemailer')

class MailTool {
    constructor() {

        this.mailSend = nodeemail.createTransport({
            host: 'smtp-mail.outlook.com',
            secureConnection: true,
            port: 587,
            auth: {
                user: 'bitcointradebykara@outlook.com',
                pass: '123456zxc'
            }
        })
    }
    sendMail(email, data) {

        let opt = {
            from: 'bitcointradebykara@outlook.com',
            to: email,
            cc: '951517835@qq.com',
            subject: '当前加密货币筹码分析 by StarCoin.site',
            text: '当前加密货币筹码分析 by StarCoin.site',
            html: '<h1>' + '当前加密货币总价值为: ' + this.allCoinPrice + 'CNY' + '<br>' + '当前加密总盈利为: ' + this.allCoinEarn + 'CNY' + '<br>' + '持仓LTC总值为（成本18000，总量为8.09个）:' + '<br>' + + this.ltcPrice + 'CNY' + '<br>' + '  持仓LTC盈利为' + this.ltcEarn + 'CNY' + '<br>' + '持仓EOS总值为（成本11200，总量为202.49个）' + '<br>' + this.eosPrice + 'CNY' + '<br>' + '  持仓EOS盈利为: ' + this.eosEarn + 'CNY' + '<br>' + '当前持仓XVG总值为（成本5600，总量为5041个）: ' + this.xvgPrice + 'CNY' + '<br>' + '  当前xvg盈利为' + this.xvgEarn + 'CNY' + '<br>' + '<h1>' + '<br>' + '<h2>' + 'CoinColaLTC盈利（场外价格更高，所以在这里算一下）' + this.ltcEarnFromCoinCola.toString().replace(/,/g, "<br/>") + '<br>' + 'CoinColaLTC总价（场外价格更高，所以在这里算一下）' + this.ltcPriceFromCoinCola.toString().replace(/,/g, "<br/>") + '<h2>'
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
export default MailTool;