import React from 'react';
import style from './ticker.card.scss';
import AppService from '../services/app.service.jsx';

class TickerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: '',
            risk1: 0,
            risk2: 0
        };

        this.riskBg = {
            1: {'color': "#90EE90"}, // Green
            2: {'color': "#FFFF33"}, // Yellow
            3: {'color': "#B22222"}  // Red
        };

        this.riskWarning = {
            1: "Low Risk",
            2: "Medium Risk",
            3: "High Risk"
        };

        this.calculateRisk1(this.props.ticker.tickerId, this.props.ticker.exchange);
        this.calculateRisk2(this.props.ticker.tickerId, this.props.ticker.exchange);

        this.initPrice();

        this.exchangeTypeIndex = {
            'BSE': 1, // Open in column_name
            'NSE': 4 // Last in column_name
        }
    }

    initPrice() {
        let exchange = this.props.ticker.exchange;
        AppService.getPrice(exchange, this.props.ticker.tickerId)
            .then(res => {
                this.processPriceData(res.data, exchange);
            })
    }

    processPriceData(data, exchange) {
        let price = this.getPrice(data.dataset_data.data[0], exchange);
        console.log(data.dataset_data.data, price, exchange, this.exchangeTypeIndex[exchange]);
        this.setState({price: price});
    }

    getPrice(data, exchange) {
        return data[this.exchangeTypeIndex[exchange]];
    }

    calculateRisk1(ticker, exchange) {
        setTimeout(()=> {
            let num = Math.floor(Math.random() * (4 - 1) + 1);
            this.setState({risk1: num});
        }, 1400);
    }

    calculateRisk2(ticker, exchange) {
        setTimeout(()=> {
            let num = Math.floor(Math.random() * (4 - 1) + 1);
            this.setState({risk2: num});
        }, 1400);
    }

    deleteTicker(e) {
        this.props.deleteTicker(e, this.props.ticker.tickerId);
    }

    render() {
        return (
            <tr>
                <td className="left-aligned">{this.props.ticker.exchange}</td>
                <td className="left-aligned">{this.props.ticker.tickerId}</td>
                <td className="left-aligned">{this.props.ticker.name}</td>
                <td className='center-aligned'>{this.state.price === '' ?
                    <img width="12" height="12" src="/images/spinner.gif"/>
                    :
                    this.state.price
                }</td>
                <td className='center-aligned'>
                    {
                        this.state.risk1 === 0 ?
                            <img width="12" height="12" src="/images/spinner.gif"/>
                            :
                            <i className="fa fa-circle" aria-hidden="true"
                               title={this.riskWarning[this.state.risk1]} style={this.riskBg[this.state.risk1]}></i>
                    }
                </td>
                <td className='center-aligned'>
                    {
                        this.state.risk2 === 0 ?
                            <img width="12" height="12" src="/images/spinner.gif"/>
                            :
                            <i className="fa fa-circle" aria-hidden="true"
                               title={this.riskWarning[this.state.risk2]} style={this.riskBg[this.state.risk2]}></i>
                    }
                </td>
                <td className="center-aligned"><i title="delete" onClick={this.deleteTicker.bind(this)} className="fa fa-times"
                       aria-hidden="true"></i></td>
            </tr>
        )
    }
}


export default TickerCard;