import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Table } from 'antd'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.css'


class BitCoinDataContent extends Component {
    constructor() {
        super()
        let ctx = this;
        this.state = {
            typingCoin: String,
            tableData: null,
            dataSource: [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }],

            columns: [{
                title: '币种',
                dataIndex: 'name',
                key: 'coinCate',
            }, {
                title: '15分钟前',
                dataIndex: 'age',
                key: 'fifMinAgo',
            }, {
                title: '2小时前',
                dataIndex: 'address',
                key: 'twoHourAgo',
            },
            {
                title: '6小时前',
                dataIndex: 'address',
                key: 'sixHourAgo',
            },
            {
                title: '一天前',
                dataIndex: 'address',
                key: 'oneDayAgo',
            }],
        }
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
        }).then((err, res) => {
            if (err) {
                console.log(err)
            } else {
                res.json()
            }
        })
    }

    //输入框内容
    onChangeCoin(e) {
        console.log(this);
        this.setState({
            typingCoin: e
        })

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
                    {/* <p>当前资金量价格变化</p>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                    <p>预测</p> */}
                </div>
            </div>
        );
    }
}
export default BitCoinDataContent;

