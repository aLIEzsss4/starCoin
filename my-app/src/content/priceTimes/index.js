//react本体
import * as React from "react"
import { Component } from 'react';
//插件
import _ from 'lodash';
import superagent from 'superagent';
import dateTool from 'date-fns'
//样式
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Table } from 'antd'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.css'
import { divProperties } from "@uifabric/utilities/lib";

class PriceTimes extends Component {
    constructor(props) {
        super()

        this.state = {
            temCoinBefore: [],
            temCoinNow: [],
            dataSource: [],
            columns: [
                {
                    title: '币种',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '排名',
                    dataIndex: 'rank',
                    key: 'rank',
                }, {
                    title: '价格(美元)',
                    dataIndex: 'price_usd',
                    key: 'price_usd',
                }, {
                    title: '价格(BTC)',
                    dataIndex: 'price_btc',
                    key: 'price_btc',
                }, {
                    title: '资金池',
                    dataIndex: 'market_cap_usd',
                    key: 'market_cap_usd',
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                    key: 'time',
                }, {
                    title: '倍数',
                    dataIndex: 'times',
                    key: 'times',
                }],
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.clearData()
        if (nextProps.name.temCoinBefore.length != 0) {
            this.setState({
                dataSource: [
                    {
                        name: nextProps.name.temCoinBefore.name,
                        rank: nextProps.name.temCoinBefore.rank,
                        price_usd: nextProps.name.temCoinBefore.price_usd,
                        price_btc: nextProps.name.temCoinBefore.price_btc,
                        market_cap_usd: (nextProps.name.temCoinBefore.name === 'Bitcoin') ?
                            nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 8).toString().replace(/,/g, '.') + '亿美元' :
                            (Number(nextProps.name.temCoinBefore.market_cap_usd) >= 100000000) ?
                                nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 10).toString().replace(/,/g, '.') + '亿美元' :
                                nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 7).toString().replace(/,/g, '.') + '万美元',
                        // market_cap_usd: nextProps.name.temCoinBefore.market_cap_usd,
                        time: '2018-02-06'
                    },
                    {
                        name: nextProps.name.temCoinNow.name,
                        rank: nextProps.name.temCoinNow.rank,
                        price_usd: nextProps.name.temCoinNow.price_usd,
                        price_btc: nextProps.name.temCoinNow.price_btc,
                        market_cap_usd:
                            (nextProps.name.temCoinNow.name === 'Bitcoin') ?
                                nextProps.name.temCoinNow.market_cap_usd.substr(0, nextProps.name.temCoinNow.market_cap_usd.toString().length - 8).toString().replace(/,/g, '.') + '亿美元' :
                                (Number(nextProps.name.temCoinNow.market_cap_usd) >= 100000000) ?
                                    Number(nextProps.name.temCoinNow.market_cap_usd).toString().substr(0, nextProps.name.temCoinNow.market_cap_usd.length - 10) + '亿美元' :
                                    Number(nextProps.name.temCoinNow.market_cap_usd).toString().substr(0, nextProps.name.temCoinNow.market_cap_usd.length - 10) + '万美元',
                        market_cap_usdf: Number(nextProps.name.temCoinNow.market_cap_usd).toString().substr(0, nextProps.name.temCoinNow.market_cap_usd.length - 10),
                        times: Number(nextProps.name.temCoinNow.price_usd) / new Number(nextProps.name.temCoinBefore.price_usd).toString(),
                        time: dateTool.format(new Date(), 'YYYY-MM-DD-HH')
                    }
                ],

            }, () => {
                console.log(this.state);
                console.log('state')

            })
        }
    }
    clearData() {
        this.setState({

        })
    }

    render() {
        return (
            <div className="BitCoinDataContent-priceTimes">
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        )
    }
}
export default PriceTimes;