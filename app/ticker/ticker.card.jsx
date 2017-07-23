import React from 'react';
import style from './ticker.card.scss';

class TickerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                <td>{this.props.ticker.exchange}</td>
                <td>{this.props.ticker.tickerId}</td>
                <td>{this.props.ticker.name}</td>
                <td>{this.props.ticker.price}</td>
                <td>
                    {
                        this.state.risk1 === 0 ?
                            <img width="12" height="12" src="/images/spinner.gif"/>
                            :
                            <i className="fa fa-circle" aria-hidden="true"
                               title={this.riskWarning[this.state.risk1]} style={this.riskBg[this.state.risk1]}></i>
                    }
                </td>
                <td>
                    {
                        this.state.risk2 === 0 ?
                            <img width="12" height="12" src="/images/spinner.gif"/>
                            :
                            <i className="fa fa-circle" aria-hidden="true"
                               title={this.riskWarning[this.state.risk2]} style={this.riskBg[this.state.risk2]}></i>
                    }
                </td>
                <td><i onClick={this.deleteTicker.bind(this)} className="fa fa-times" aria-hidden="true"></i></td>
            </tr>
        )
    }
}


export default TickerCard;