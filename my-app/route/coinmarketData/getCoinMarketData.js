/*
获取数据返回到前端 
 */
const mongoose = require('mongoose');
const mongodbSchema = require('../mongdb')
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/coinmarketData');
//conmarketDataSchema
let coinmarketDataSchema = new Schema(mongodbSchema.coinmarketDataSchema)

let CoinmarketDataModel = mongoose.model('CoinmarketDataModel', coinmarketDataSchema);

//获取单个coin
module.exports = function getDataFromCoinMartetDataBase(singleCoin) {
    let result = new Promise((resolve, reject) => {
        CoinmarketDataModel.find({ 'id': 'bitcoin' }, (err, res) => {
            console.log(singleCoin)
            if (err) {
                console.log(err + 'this is an err!')
            } else {
                console.log(res)
                console.log('this is res')
                resolve(res);
            }
        }).sort("-time").limit(289)
    })
    return result;
}


