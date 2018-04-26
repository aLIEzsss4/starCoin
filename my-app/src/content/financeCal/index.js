//react本体
import * as React from "react"
import { Component } from 'react';
//style
import { Input, Tabs } from 'antd'
import { Table,message } from 'antd'
import { divProperties } from "@uifabric/utilities/lib";
import './index.css'

const TabPane = Tabs.TabPane
const Search = Input.Search


class FinanceCal extends Component {
    constructor() {
        super()
        this.state = {
            typingCoin: String,
            userCoins: [],
            mail: String,
            coins: [],
            finance: Number,
            temKey: 1
        }
    }
    saveUserData() {
        // fetch('http://www.starcoin.site:3001/saveUserData', {
            fetch('http://localhost:3001/saveUserData', {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state)
        }).then(response => {
            if (response.ok) {
                message.info('save success')
                return response.json()
            } else {
                return Promise.reject('something went wrong')
            }
        }).then(data => {

        })
    }
    changeContent(e) {
        console.log(e.target)
        if (e.target.id == "financeCal-content-mail") {
            this.setState({
                mail: e.target.value
            })
        } else if (e.target.id == "financeCal-content-coins") {
            this.setState({
                typingCoin: e.target.value
            })

        } else if (e.target.id == "financeCal-content-finance") {
            (this.state.temKey == 1) ?
                this.setState({
                    finance: { CNY: e.target.value }
                }) : this.setState({
                    finance: { USD: e.target.value }
                })
        }
        this.setState({

        })
    }
    addCoins(e) {
        console.log(e.slice(this.traverseString(e) + 1, e.length))
        let temCoin = { name: e.slice(0, this.traverseString(e)), number: Number(e.slice(this.traverseString(e) + 1, e.length)) }
        console.log(temCoin)
        let a =
            this.setState({
                coins: this.state.coins.concat(temCoin)
            }, () => {
                this.setState({
                    typingCoin: null
                })
            })
    }

    traverseString(String) {
        for (let i = 0; i < String.length; i++) {
            if (String[i] == ":") {
                return i;
            }
        }
    }
    changeKey(e) {
        this.setState({
            temKey: e
        }, () => {
        })
    }
    clearData() {
        this.setState({
            temKey: null
        })

    }
    componentWillUnmount() {
        this.setState({
            userCoins: [],
            mail: String,
            coins: [],
            finance: Number,
            temKey: 1
        })
    }

    render() {
        return (
            <div className="financeCal-content">
                <Tabs onChange={this.changeKey.bind(this)}>
                    <TabPane tab="CNY" key="1" ></TabPane>
                    <TabPane tab="USD" key="2" ></TabPane>
                </Tabs>
                <Input placeholder="请输入您的邮箱(qq邮箱绑定可以直接在微信查看哦)" addonAfter=".com" onChange={this.changeContent.bind(this)} id="financeCal-content-mail" size="large" />
                <Search placeholder="请输入您的币种和数量格式为 xvg:1000(英文分号),每输完一次请点击add" id="financeCal-content-coins" enterButton="Add" value={this.state.typingCoin} onChange={this.changeContent.bind(this)} onSearch={this.addCoins.bind(this)} size="large" />
                <Input placeholder="成本价" addonAfter={(this.state.temKey == 1) ? 'CNY' : 'USD'} id="financeCal-content-finance" onChange={this.changeContent.bind(this)} size="large" />
                <button onClick={this.saveUserData.bind(this)} className="financeCal-content-button">submiit</button>
            </div>
        )
    }
}

export default FinanceCal;