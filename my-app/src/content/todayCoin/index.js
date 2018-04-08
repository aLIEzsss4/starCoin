import * as React from "react"
import { Component } from 'react';
import ReactDom from 'react-dom'
import Animation from 'gsap'

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.css'

let refNode, refNodeText, refNodeCoverText;

class TodayCoin extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    tellMeTodayCoin() {
        Animation.to(refNode, 0.3, {
            opacity: 1
        })
        Animation.to(refNodeCoverText, 0.1, {
            display: 'none'
        })

        Animation.to(refNodeText, 0.3, {
            opacity: 1,
            color: '#fff'
        })

    }

    render() {
        return (
            <div className="BitCoinDataContent-todayCoin-content" onClick={this.tellMeTodayCoin.bind(this)} ref={c => refNode = c}>
                <p className="BitCoinDataContent-todayCoin-content-coverText" ref={x => refNodeCoverText = x}>点我翻牌子</p>
                <div className="BitCoinDataContent-todayCoin-content-text" ref={c => refNodeText = c}>
                    <p >XEM </p>
                    <p >参考binance </p>
                    <p >buy：310聪 sell：351聪 </p></div>
            </div>
        )
    }
}
export default TodayCoin;