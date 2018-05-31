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
        this.sendMail = this.sendMail.bind(this)
        this.state = {
            tabItem: Number || 0,
            inputValue: null || 'BTC',
            calCoin: Object,
            temCoin: Object,
            mail: 'String'
        }

    }

    componentDidMount() {
        this.onInputSubmit()
    }
    handleChange = (event, value) => {
        this.setState({
            tabItem: value
        })
    }

    onInputChange = (event) => {
        console.log(event.target.id)
        if (event.target.id == 'DaysContent-content-searchButton') {
            // console.log(event.target.value);
            this.setState({
                inputValue: event.target.value
            })
        } else {
            this.setState({
                mail: event.target.value
            })
        }
    }
    onInputSubmit() {

        fetch('https://api.coinmarketcap.com/v2/listings/').then((res) => {
            res.json().then(data => {
                this.setState({
                    calCoin: _.find(data.data, (index) => {
                        if (this.state.inputValue.toUpperCase() == index.website_slug.toUpperCase()) {
                            return this.state.inputValue.toUpperCase() == index.website_slug.toUpperCase()
                        } else {
                            return this.state.inputValue.toUpperCase() == index.symbol;
                        }
                    })
                }, () => {
                    console.log(this.state)
                    if (this.state.calCoin != null) {
                        fetch(`https://api.coinmarketcap.com/v2/ticker/${this.state.calCoin.id}||1/`).then((res) => {
                            res.json().then(singleCoin => {
                                this.setState({
                                    temCoin: singleCoin
                                })
                            })
                        }).catch(err => {
                            console.log('Oops something went wrong' + err)
                        })
                    } else {
                        message.info('你的币没找到，请使用全名试试 !', 5)
                    }
                })
            })
        }).catch(err => {
            console.log('出错了 ' + err)
        })
    }
    sendMail() {
        console.log(this.state.temCoin)
        if (this.state.mail.toString().includes('@') && this.state.temCoin && this.state.temCoin.data != undefined) {
            fetch('http://149.28.51.186:3001/sendMail', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({ 'mail': this.state.mail, 'data': this.state.temCoin }), // data can be `string` or {object}!
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);
                message.info('您的邮件已发送！若未收到请到垃圾箱查看！', 5)
                // res.json().then(index=>{
                //     console.log(index)
                // })
            }).catch(err => {
                console.log('Something went wrong  ' + err)
            })
        } else {
            message.info('请输入正确的邮箱且币种搜索完毕', 5)
        }

    }

    render() {
        return (
            <div className="DaysContent">
                <AppBar position="static">
                    <Tabs value={0} onChange={this.handleChange}>
                        <Tab label="筹码计算器" />
                        <Tab label="社交网络" />
                        <Tab label="待续" />
                    </Tabs>
                </AppBar>
                <div className={'DaysContent-content'}>
                    <div className="DaysContent-content-search">
                        <Search type="Search" className="DaysContent-content-searchButton" id="DaysContent-content-searchButton" onChange={this.onInputChange.bind(this)} placeholder="input search text"
                            onSearch={this.onInputSubmit}
                            enterButton="Search"
                            size="large"
                        >
                        </Search>
                        <Search type="Search" className="DaysContent-content-searchMail" id="DaysContent-content-searchMail" onChange={this.onInputChange.bind(this)} placeholder="输入邮箱将该数据发到你的邮箱（可选）"
                            onSearch={this.sendMail}
                            enterButton="发送"
                            size="large"
                        >
                        </Search>

                    </div>

                    <div className={'DaysContent-content-list'}>

                        <Card bordered={false} >
                            <div><i className={'iconfont icon-6'}></i><p>{this.state.temCoin.data != undefined ? this.state.temCoin.data.name + '  ' + this.state.temCoin.data.quotes.USD.price : ' /'}</p>当前币种及价格</div>
                            <div><i className={'iconfont icon-yonggongzongliang'}></i><p> {this.state.temCoin.data != undefined ? this.state.temCoin.data.max_supply : ' /'}</p>当前总量</div>
                            <div><i className={'iconfont icon-liuliang1'}></i><p>{this.state.temCoin.data != undefined ? this.state.temCoin.data.circulating_supply : '/'}</p>当前流通量</div>
                            <div><i className={'iconfont icon--quanbujiao'}></i><p>{this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.market_cap : '/'}</p>当前市值</div>
                            <div><i className={'iconfont icon-24xiaoshifuwu'}></i><p>{this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.volume_24h / this.state.temCoin.data.quotes.USD.price : '/'}</p>24小时流通量</div>
                            <div><i className={'iconfont icon-lvzhou_zhanbi'}></i><p>{this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.volume_24h / this.state.temCoin.data.quotes.USD.price / this.state.temCoin.data.circulating_supply : '/'}</p>24小时流通量占流通量百分比</div>
                            <div><i className={this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.percent_change_24h > 0 ? 'iconfont icon-jiantou7' : 'iconfont icon-jiantou22' : '/'}></i><p>{this.state.temCoin.data != undefined ? this.state.temCoin.data.quotes.USD.percent_change_24h : '/'}</p>24小时价格涨跌</div>
                        </Card>

                        {/* <p>搜索完毕币种才可以发送邮件，否则会失败，建议使用简称搜索，如果简称搜索不到再换成全名搜索，不区分大小写，bug请提jose.xiaohang@gmail.com</p> */}

                    </div>

                </div>

                <div className={'DaysContent-content-footer'}>
                    dasda

                    </div>

            </div>
        )

    }

}
export default DaysContent;