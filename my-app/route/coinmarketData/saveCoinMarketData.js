/*
get coinmarket data and save data to mongodb
*/
const superagent = require('superagent');
const getTime = require('date-fns/get_time');
const mongoose = require('mongoose');
const mongodbSchema = require('../mongdb')
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/coinmarketData');

//conmarketDataSchema
let coinmarketDataSchema = new Schema(mongodbSchema.coinmarketDataSchema)
let CoinmarketDataModel = mongoose.model('CoinmarketDataModel', coinmarketDataSchema);

class saveCoinmarketData {
    constructor() {
        let ctx = this;
    }
    getCoinmarketData() {
        superagent.get('https://api.coinmarketcap.com/v1/ticker/?convert=CNY&limit=10').end((err, res) => {
            if (err) {
                console.log(err)
            } else {
                let timeNow = getTime(new Date());
                res.body.map((index) => {
                    let coinmarketDataModel = new CoinmarketDataModel({
                        "time": timeNow,
                        "id": index.id,
                        "name": index.name,
                        "symbol": index.symbol,
                        "rank": index.rank,
                        "price_usd": index.price_usd,
                        "price_btc": index.price_btc,
                        "24h_volume_usd": index[6],
                        "market_cap_usd": index.market_cap_usd,
                        "available_supply": index.available_supply,
                        "total_supply": index.total_supply,
                        "max_supply": index.max_supply,
                        "percent_change_1h": index.percent_change_1h,
                        "percent_change_24h": index.percent_change_24h,
                        "percent_change_7d": index.percent_change_7d,
                        "last_updated": index.last_updated,
                        "price_cny": index.price_cny,
                        "24h_volume_cny": index[16],
                        "market_cap_cny": index.market_cap_cny
                    });
                    coinmarketDataModel.save((err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                })
            }
        })
    }
}
let saveCoinmarketDataStart = new saveCoinmarketData();
setInterval(() => {
    saveCoinmarketDataStart.getCoinmarketData()
}, 300000)