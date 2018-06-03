import * as React from "react";
import { Component } from 'react';
import ReactDom from 'react-dom';
import googleTrends from 'google-trends-api'
class GoogleTrends extends Component {
    constructor() {
        super()
    }


    componentWillMount() {

    }

    componentDidMount() {
        googleTrends.interestOverTime({ keyword: 'dasda1' })
            .then(function (results) {
                console.log(results);
            })
    }

    render() {
        return (
            <div className={"google-trends"}>

                asdasd
    
            </div>
        )
    }

}

export default GoogleTrends;