import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './index.css'


class BitCoinDataContent extends Component {
    constructor() {
        super()
        let ctx = this;
        this.state = {
            typingCoin: String
        }
    }
    //搜索当前交易量
    searchCoin() {
        


    }

    //输入框内容
    onChangeCoin(e) {
        console.log(this);
        this.setState({
            typingCoin: e
        })

    }
    render() {
        return (
            <div className="BitCoinDataContent">
                <div className="BitCoinDataContent-searchBar">
                    <TextField
                        placeholder='I am a placeholder.'
                        ariaLabel='Please enter text here'
                        onChanged={this.onChangeCoin.bind(this)}
                    />
                    <button className="BitCoinDataContent-searchBar-btn" onClick={this.searchCoin}>search</button>
                </div>
            </div>
        );
    }
}
export default BitCoinDataContent;

