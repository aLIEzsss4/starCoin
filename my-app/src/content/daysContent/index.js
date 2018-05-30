import * as React from "react";
import { Component } from 'react';
import ReactDom from 'react-dom';
import './index.css';

//method
import _ from 'lodash';


//styles
import { Card } from 'antd';
import { message } from 'antd';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { Input } from 'antd';
const Search = Input.Search;


class DaysContent extends Component {
    constructor() {
        super()
        this.onInputSubmit = this.onInputSubmit.bind(this)
        this.state = {
            tabItem: Number || 0,
            inputValue: null || 'BTC',
            calCoin: Object,
            temCoin: Object
        }

    }

    handleChange = (event, value) => {
        this.setState({
            tabItem: value
        })
    }

    onInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            inputValue: event.target.value
        })
    }
    onInputSubmit() {

        fetch('https://api.coinmarketcap.com/v2/listings/').then((res) => {
            res.json().then(data => {
                this.setState({
                    calCoin: _.find(data.data, (index) => {
                        return this.state.inputValue.toUpperCase() == index.symbol
                    })
                }, () => {
                    if (this.state.calCoin != null) {
                        fetch(`https://api.coinmarketcap.com/v2/ticker/${this.state.calCoin.id}||1/`).then((res) => {
                            res.json().then(singleCoin => {
                                console.log(singleCoin)
                                this.setState({
                                    temCoin: singleCoin
                                })
                            })
                        }).catch(err => {
                            console.log('Oops something went wrong' + err)
                        })
                    } else {
                        message.info('This coin you find not exist !', 5)
                    }
                })
            })
        }).catch(err => {
            console.log('Something went wrong ' + err)
        })
    }

    render() {
        return (
            <div className="DaysContent">
                <AppBar position="static">
                    <Tabs value={0} onChange={this.handleChange}>
                        <Tab label="筹码计算器" />
                        <Tab label="社交网络" />
                        <Tab label="待续" href="#basic-tabs" />
                    </Tabs>
                </AppBar>
                <div className={'DaysContent-content'}>
                    <div className="DaysContent-content-search">
                        <Search type="Search" className="DaysContent-content-searchButton" onChange={this.onInputChange.bind(this)} placeholder="input search text"
                            onSearch={this.onInputSubmit}
                            enterButton="Search"
                            size="large"
                        >
                        </Search>
                        <Search type="Search" className="DaysContent-content-searchMail" onChange={this.onInputChange.bind(this)} placeholder="输入邮箱将该数据发到你的邮箱（可选）"
                            onSearch={this.onInputSubmit}
                            enterButton="发送"
                            size="large"
                        >
                        </Search>

                    </div>

                    <div className={'DaysContent-content-list'}>

                        <Card title="Your Coin" bordered={false} >
                        <p>当前币种及价格 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.name + '  ' + this.state.temCoin.data.quotes.USD.price : ' /'}</p>
                        <p>当前总量 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.max_supply : ' /'}</p>
                        <p>当前流通量 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.circulating_supply : '/'}</p>
                        <p>当前市值 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.market_cap : '/'}</p>
                        <p>24小时流通量 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.volume_24h / this.state.temCoin.data.quotes.USD.price : '/'}</p>
                        <p>24小时流通量占流通量百分比 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.volume_24h / this.state.temCoin.data.quotes.USD.price / this.state.temCoin.data.circulating_supply : '/'}</p>
                        <p>24小时价格涨跌 : {this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.percent_change_24h : '/'}</p>
                        </Card>
                      
                    </div>

                </div>

            </div>
        )

    }

}
export default DaysContent;