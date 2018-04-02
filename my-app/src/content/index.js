import * as React from "react"
import { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Table } from 'antd'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.css'


class BitCoinDataContent extends Component {
    constructor() {
        super()
        let ctx = this;
        this.state = {
            typingCoin: '' || 'bitcoin',
            tableData: null,
            dataSource: [{
                key: '1',
                name: String,
                fifmin: Number,
                twoHours: Number,
                sixHours: Number,
                oneDay: Number,
                market_cap_cny: Number

            }, {
                key: '2',
                name: String,
                fifmin: Number,
                twoHours: Number,
                sixHours: Number,
                oneDay: Number,
                market_cap_cny: Number
            }],

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
                dataIndex: 'twoHour',
                key: 'twoHour',
            },
            {
                title: '6小时前',
                dataIndex: 'sixHour',
                key: 'sixHour',
            },
            {
                title: '一天前',
                dataIndex: 'oneDay',
                key: 'oneDay',
            }],
        }
    }

    componentWillMount() {
        this.searchCoin();
    }
    //搜索当前交易量
    searchCoin() {
        fetch('http://localhost:3001/coinMarketData', {
            body: JSON.stringify({ "name": this.state.typingCoin }),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/xml'
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
            this.setState({
                tableData: data
            }, this.makeTable())
        }).catch(error => console.log(error))
    }

    //输入框内容
    onChangeCoin(e) {
        this.setState({
            typingCoin: e
        })

    }
    makeTable() {
        console.log(this.state)
        console.log('second')
        //     this.state.tableData.map(index => {
        //         this.setState({
        //             dataSource: [{
        //                 key: index._id,
        //                 name: index.name,
        //                 fifmin: index.price_cny,
        //                 twoHours: index.price_cny,
        //                 sixHours: index.price_cny,
        //                 oneDay: index.price_cny,
        //                 market_cap_cny: index.price_cny
        //             }]
        //         })
        //     })
    }

    //tableData

    render() {
        return (
            <div className="BitCoinDataContent">
                <div className="BitCoinDataContent-searchBar">
                    <TextField
                        placeholder='I am a placeholder.'
                        ariaLabel='Please enter text here'
                        onChanged={this.onChangeCoin.bind(this)}
                    />
                    <button className="BitCoinDataContent-searchBar-btn" onClick={this.searchCoin.bind(this)}>search</button>
                </div>
                <div className="BitCoinDataContent-searchBar-table">
                    <p>资金量变化图表</p>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                    <p>当前资金量价格变化</p>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                    <p>预测</p>
                </div>
            </div>
        );
    }
}
export default BitCoinDataContent;

