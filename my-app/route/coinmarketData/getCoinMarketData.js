/*
获取数据返回到前端 
 */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/coinmarketData');

class getCoinmarketData {
    constructor() {
        let ctx = this;
    }
    getDataFromCoinMartetDataBase(){
        
    }

}
