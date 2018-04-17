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
        // "id": "bitcoin",
        // "name": "Bitcoin",
        // "symbol": "BTC",
        // "rank": "1",
        // "price_usd": "8097.63",
        // "price_btc": "1.0",
        // "24h_volume_usd": "10656600000.0",
        // "market_cap_usd": "136369449831",
        // "available_supply": "16840662.0",
        // "total_supply": "16840662.0",
        // "max_supply": "21000000.0",
        // "percent_change_1h": "-1.51",
        // "percent_change_24h": "-15.12",
        // "percent_change_7d": "-25.74",
        // "last_updated": "1517572469",
        // "price_cny": "50885.50692",
        // "24h_volume_cny": "66966074400.0",
        // "market_cap_cny": "856945622738"


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
        if (nextProps.name.temCoinBefore.length != 0) {
            this.setState({
                dataSource: [
                    {
                        name: nextProps.name.temCoinBefore.name,
                        rank: nextProps.name.temCoinBefore.rank,
                        price_usd: nextProps.name.temCoinBefore.price_usd,
                        price_btc: nextProps.name.temCoinBefore.price_btc,
                        market_cap_usd: (nextProps.name.temCoinBefore.name = 'Bitcoin') ?
                            nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 8).toLocaleString().replace(/,/g, '.') + '亿元' :
                            (Number(nextProps.name.temCoinBefore.market_cap_usd >= 100000000)) ?
                                nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 10).toLocaleString().replace(/,/g, '.') + '亿元' :
                                nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 6).toLocaleString().replace(/,/g, '.') + '万元',
                        // market_cap_usd: nextProps.name.temCoinBefore.market_cap_usd,
                        time: '2018-02-06'
                    },
                    {
                        name: nextProps.name.temCoinNow.name,
                        rank: nextProps.name.temCoinNow.rank,
                        price_usd: nextProps.name.temCoinNow.price_usd,
                        price_btc: nextProps.name.temCoinNow.price_btc,
                        market_cap_usd:
                            (nextProps.name.temCoinBefore.name = 'Bitcoin') ?
                                nextProps.name.temCoinBefore.market_cap_usd.substr(0, nextProps.name.temCoinBefore.market_cap_usd.toString().length - 8).toLocaleString().replace(/,/g, '.') + '亿元' :
                                (Number(nextProps.name.temCoinNow.market_cap_usd >= 100000000)) ?
                                    nextProps.name.temCoinNow.market_cap_usd.toString().substr(0, nextProps.name.temCoinNow.market_cap_usd.toString().length - 10).toLocaleString().replace(/,/g, '.') + '亿元' :
                                    nextProps.name.temCoinNow.market_cap_usd.toString().substr(0, nextProps.name.temCoinNow.market_cap_usd.toString().length - 6).toLocaleString().replace(/,/g, '.') + '万元',
                        market_cap_usdf: Number(nextProps.name.temCoinNow.price_usd) / new Number(nextProps.name.temCoinNow.price_usd),
                        times: Number(nextProps.name.temCoinNow.price_usd) / new Number(nextProps.name.temCoinBefore.price_usd).toString(),
                        time: dateTool.format(new Date(), 'YYYY-MM-DD-HH')
                    }
                ],

            }, () => {

            })
        }
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