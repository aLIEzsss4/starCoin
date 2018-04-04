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
        fetch('http://23.105.217.209:3001/coinMarketData', {
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
            name: '//',
            fifmin: '//',
            twoHours: '//',
            sixHours: '//',
            oneDay: '//',
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
                } else if (index == 288) {
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

                    <p>预测</p>
                    <p>当前版本为beta版，下一板块为价格变化和明星币种预测，请加下面群反映问题和建议</p>
                    <p>急需建议，这个产品得idea目前只有根据量级变化预测价格，但是我感觉依靠大数据可以分析出更多的东西。希望有好的建议提交给我，一起建设一个为散户服务的产品！</p>
                    <p className="wechat-piuture"><img src="https://s1.ax1x.com/2018/04/04/Cpc06e.png" /></p>
                </div>
            </div>
        );
    }
}
export default BitCoinDataContent;

