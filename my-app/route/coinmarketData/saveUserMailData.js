const superagent = require('superagent');
const getTime = require('date-fns/get_time');
const mongoose = require('mongoose');
const mongodbSchema = require('../mongdb')
const sendMail = require('../mail');

let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/coinmarketData');

//userData
let UserMailSchema = new Schema(mongodbSchema.userMailSchema)
let UserMailModel = mongoose.model('userMailModel', UserMailSchema);

module.exports = function saveUserMailData(mail, coins, finance) {
    let userMailModel = new UserMailModel({
        mail: mail,
        coins: coins,
        finance: finance,
    });
    userMailModel.save((err) => {
        if (err) {
            console.log(err)
            sendMail(err)
        } else {
        }
    })

}