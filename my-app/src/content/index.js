//react本体
import * as React from "react"
import { Component } from 'react';
import Animate from 'rc'
//插件
import snapshot from '../snapshot/snapShot20180206'
import _ from 'lodash';
import superagent from 'superagent';
//样式
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Table,message } from 'antd'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.css'

//组件
import FinanceCal from './financeCal/index'
import PriceTimes from './priceTimes/index'
import TodayCoin from './todayCoin/index'


class BitCoinDataContent extends Component {
    constructor() {
        super()
        const ctx = this;
        this.temTableData = []
        this.state = {
            typingCoin: null || 'bitcoin',
            allCoins: [],
            temCoinBefore: [],
            temCoinNow: []
        }
    }
    searchCoin() {
        let dataBefore = [];
        let dataNow = [];
        fetch('https://api.coinmarketcap.com/v1/ticker/?limit=2000').then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong')
            }
        }).then(data => {
            dataBefore = _.find(snapshot, { 'symbol': this.state.typingCoin.toUpperCase() })
            dataNow = _.find(data, { 'symbol': this.state.typingCoin.toUpperCase() })
            if (dataBefore != undefined) {
                this.setState({
                    allCoins: data,
                    temCoinBefore: dataBefore,
                    temCoinNow: dataNow
                })
            } else {
                message.info(this.state.typingCoin+' not exist!')
            }
        }).catch(error => console.log(error))
    }
    //输入框内容
    onChangeCoin(e) {
        this.setState({
            typingCoin: e
        })
    }
    // makeTable() {

    // }
    render() {
        return (
            <div className="BitCoinDataContent">
                <div className="BitCoinDataContent-searchBar">
                    <TextField
                        placeholder='input your coin.'
                        ariaLabel='Please enter text here'
                        onChanged={this.onChangeCoin.bind(this)}
                    />
                    <button className="BitCoinDataContent-searchBar-btn" onClick={this.searchCoin.bind(this)}>search</button>
                </div>
                <div className="BitCoinDataContent-searchBar-table">
                    <PriceTimes name={this.state} />
                </div>
                <div className="BitCoinDataContent-financeCal">
                <FinanceCal/>
                </div>
                <div className="BitCoinDataContent-todayCoin">
                    <p>今日明星币种(盈亏自负)</p>
                    <TodayCoin />
                </div>
                <div className="BitCoinDataContent-foot">
                    <p>当前版本为alpha版，明星币种预测已经上线。</p>
                    <p>资金池走势暂时下线，因为无力承担更贵的数据服务，暂时上线了一个与2月份价格对比，需要建议！</p>
                    <p className="wechat-piuture"><a href="https://t.zsxq.com/7YVZVzz">我正在「Gakki 带你去月球」和朋友们讨论有趣的话题，你⼀起来吧</a></p>
                </div>
            </div>
        );
    }
}
export default BitCoinDataContent;

