module.exports = {
    coinmarketDataSchema: {
        "time": Number,
        "id": String,
        "name": String,
        "symbol": String,
        "rank": Number,
        "price_usd": Number,
        "price_btc": Number,
        "24h_volume_usd": Number,
        "market_cap_usd": Number,
        "available_supply": Number,
        "total_supply": Number,
        "max_supply": Number,
        "percent_change_1h": Number,
        "percent_change_24h": Number,
        "percent_change_7d": Number,
        "last_updated": Number,
        "price_cny": Number,
        "24h_volume_cny": Number,
        "market_cap_cny": Number
    },
    userMailSchema:{
        mail:String,
        coins:Array,
        finance:Object
    }
}
