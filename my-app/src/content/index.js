import * as React from "react"
import { Component } from 'react';
import _ from 'lodash';
import superagent from 'superagent';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Table } from 'antd'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.css'

import TodayCoin from './todayCoin/index'


class BitCoinDataContent extends Component {
    constructor() {
        super()
        const ctx = this;
        this.temTableData = []
        this.state = {
            typingCoin: null || 'bitcoin',
            tableData: [],
            dataSource: [],
            dataSourcePrice: [],

            columns: [{
                title: '币种',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '15分钟前',
                dataIndex: 'fifmin',
                key: 'fifmin',
            }, {
                title: '2小时前',
                dataIndex: 'twoHours',
                key: 'twoHours',
            },
            {
                title: '6小时前',
                dataIndex: 'sixHours',
                key: 'sixHours',
            },
            {
                title: '一天前',
                dataIndex: 'oneDay',
                key: 'oneDay',
            },
            {
                title: '三天前',
                dataIndex: 'threeDay',
                key: 'threeDay',
            },
            {
                title: '五天前',
                dataIndex: 'fiveDay',
                key: 'fiveDay',
            }


            ],
        }
    }

    // componentWillMount() {
    //     this.searchCoin()
    // }
    // componentWillUpdate() {
    //     this.searchCoin()

    // }
    //搜索当前交易量
    searchCoin() {
        fetch('http://23.105.217.209:3001/coinMarketData', {
            // fetch('http://localhost:3001/coinMarketData', {
            body: JSON.stringify({ "name": this.state.typingCoin.toUpperCase() }),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong')
            }
        }).then(data => {
            console.log(this);
            console.log('innerthis')
            this.setState({
                tableData: data,
            }, () => this.makeTable())
        }).catch(error => console.log(error))

    }

    //输入框内容
    onChangeCoin(e) {
        this.setState({
            typingCoin: e
        })

    }
    makeTable() {
        let tableData = [];
        let tableDataTemp = {
            name: '//',
            fifmin: '//',
            twoHours: '//',
            sixHours: '//',
            oneDay: '//',
        }
        let tableDataTempPrice = {
            name: '//',
            fifmin: '//',
            twoHours: '//',
            sixHours: '//',
            oneDay: '//',
        }
        if (this.state.tableData.length != 0) {
            this.state.tableData.map((dataIndex, index) => {
                if (index == 0) {
                    tableDataTemp.key = index;
                    tableDataTemp.name = dataIndex.name;
                    tableDataTemp.fifmin = dataIndex.market_cap_cny;

                    tableDataTempPrice.key = index;
                    tableDataTempPrice.name = dataIndex.name;
                    tableDataTempPrice.fifmin = dataIndex.price_cny;
                } else if (index == 13) {
                    tableDataTemp.twoHours = dataIndex.market_cap_cny;
                    tableDataTempPrice.twoHours = dataIndex.price_cny;
                } else if (index == 26) {
                    tableDataTemp.sixHours = dataIndex.market_cap_cny;
                    tableDataTempPrice.sixHours = dataIndex.price_cny;
                } else if (index == 96) {
                    tableDataTemp.oneDay = dataIndex.market_cap_cny;
                    tableDataTempPrice.oneDay = dataIndex.price_cny;
                } else if (index == 288) {
                    tableDataTemp.threeDay = dataIndex.market_cap_cny;
                    tableDataTempPrice.threeDay = dataIndex.price_cny;
                } else if (index == 480) {
                    tableDataTemp.fiveDay = dataIndex.market_cap_cny;
                    tableDataTempPrice.fiveDay = dataIndex.price_cny;
                }
            }, this.setState({
                dataSource: [tableDataTemp],
                dataSourcePrice: [tableDataTempPrice]
            }))
        } else {

        }
    }
    clearData() {
        this.setState({
            typingCoin: '' || 'bitcoin',
            tableData: null,
            dataSource: [],

            columns: [{
                title: '币种',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '15分钟前',
                dataIndex: 'fifmin',
                key: 'fifmin',
            }, {
                title: '2小时前',
                dataIndex: 'twoHours',
                key: 'twoHours',
            },
            {
                title: '6小时前',
                dataIndex: 'sixHours',
                key: 'sixHours',
            },
            {
                title: '一天前',
                dataIndex: 'oneDay',
                key: 'oneDay',
            },
            {
                title: '三天前',
                dataIndex: 'threeDay',
                key: 'threeDay',
            },
            {
                title: '五天前',
                dataIndex: 'fiveDay',
                key: 'fiveDay',
            }
            ],
        })
    }

    //tableData

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
                    <p>资金量变化图表</p>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                    <p>当前资金量价格变化</p>
                    <Table dataSource={this.state.dataSourcePrice} columns={this.state.columns} />
                </div>
                <div className="BitCoinDataContent-todayCoin">
                    <p>今日明星币种(盈亏自负)</p>
                    <TodayCoin />
                </div>
                <div className="BitCoinDataContent-foot">
                    <p>当前版本为alpha版，明星币种预测已经上线。</p>
                    <p>急需建议，这个产品得idea目前只有根据量级变化预测价格，但是我感觉依靠大数据可以分析出更多的东西。希望有好的建议提交给我，一起建设一个为散户服务的产品！</p>
                    <p className="wechat-piuture"><a href="https://t.zsxq.com/7YVZVzz">我正在「Gakki 带你去月球」和朋友们讨论有趣的话题，你⼀起来吧</a></p>
                </div>
            </div>
        );
    }
}
export default BitCoinDataContent;

