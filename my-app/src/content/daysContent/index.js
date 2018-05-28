import * as React from "react"
import { Component } from 'react';
import ReactDom from 'react-dom'

//method
import _ from 'lodash'


//styles
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { Input } from 'antd';
const Search = Input.Search;


class DaysContent extends Component {
    constructor() {
        super()
        this.onInputSubmit = this.onInputSubmit.bind(this)
        this.state = {
            tabItem: Number,
            inputValue: String,
            calCoin: Object
        }

    }

    handleChange = (event, value) => {
        this.setState({
            tabItem: value
        })
    }

    onInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            inputValue: event.target.value
        })
    }
    onInputSubmit() {

        fetch('https://api.coinmarketcap.com/v2/listings/').then((res) => {
            res.json().then(data => {
                this.setState({
                    calCoin: _.find(data.data, (index) => {
                        return this.state.inputValue.toUpperCase() == index.symbol
                    })
                },()=>{
                    fetch(`https://api.coinmarketcap.com/v2/ticker/${this.state.calCoin.id}/`).then((res)=>{
                        res.json().then(singleCoin=>{
                            console.log(singleCoin)
                        })
                    })
                })
            })
        }).catch(err => {
            console.log('Something went wrong ' + err)
        })
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Tabs value={0} onChange={this.handleChange}>
                        <Tab label="筹码计算器" />
                        <Tab label="社交网络" />
                        <Tab label="待续" href="#basic-tabs" />
                    </Tabs>
                </AppBar>
                <div className={this.state.tabItem === 0 ? 'DaysContent-content' : 'DaysContent-content-hidden'}>
                    <Search type="Search" className="DaysContent-content-search" onChange={this.onInputChange.bind(this)} placeholder="input search text"
                        onSearch={this.onInputSubmit}
                        enterButton >


                    </Search>



                </div>

            </div>
        )

    }

}
export default DaysContent;