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
        let tableData = [];
        let tableDataTemp = {
            name: 'String',
            fifmin: 133,
            twoHours: 122,
            sixHours: 222,
            oneDay: 333,
        }
        console.log(this.state)
        console.log('second');
        if (this.state.tableData != null) {
            this.state.tableData.map((dataIndex, index) => {
                console.log(index)
                if (index == 0) {
                    tableDataTemp.key = index;
                    tableDataTemp.name = dataIndex.name;
                    tableDataTemp.fifmin = dataIndex.market_cap_cny;
                } else if (index == 13) {
                    tableDataTemp.twoHours = dataIndex.market_cap_cny;
                } else if (index == 26) {
                    tableDataTemp.sixHours = dataIndex.market_cap_cny;
                } else if (index == 289) {
                    tableDataTemp.oneDay = dataIndex.market_cap_cny;
                }
                console.log(tableDataTemp)
            }, this.setState({
                dataSource: [tableDataTemp]
            }))
        } else {

        }
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

