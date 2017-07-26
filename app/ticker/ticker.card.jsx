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

        this.exchangeTypeIndex = {
            'BSE': 1, // Open in column_name
            'NSE': 4 // Last in column_name
        };

        this.noOfDaysInYear = 261;
        this.noOfDaysRisk2 = 23; // make it odd always

        this.getStockData(this.props.ticker.tickerId, this.props.ticker.exchange);
    }

    getStockData(tickerId, exchange) {
        AppService.getPrice(exchange, tickerId, this.noOfDaysInYear)
            .then(res => {
                this.processStockData(res.data, exchange);
            });
    }

    processStockData(data, exchange) {
        let historicalData = data.dataset_data.data;
        if (historicalData) {
            this.processPriceData(historicalData[0], exchange);
            this.calculateRisk(historicalData, exchange);
        }
    }

    processPriceData(data, exchange) {
        try {
            let price = data[this.exchangeTypeIndex[exchange]];
            this.setState({price: price});
        } catch (e) {
            // Could not load price data
        }
    }

    calculateRisk(historicalData, exchange) {
        try {
            let lastIndex = 4;
            let lowIndex = 3;
            let highIndex = 2;
            let risk1Low = historicalData[0][lowIndex];
            let risk1High = historicalData[0][highIndex];
            let monthData = [];

            let i = 0;
            historicalData.forEach((data) => {
                risk1Low = data[lowIndex] < risk1Low ? data[lowIndex] : risk1Low;
                risk1High = data[highIndex] > risk1High ? data[highIndex] : risk1High;
                if (i++ < this.noOfDaysRisk2) {
                    monthData.push(data[lastIndex]);
                }
            });

            this.calculateRisk1(risk1Low, risk1High);
            this.calculateRisk2(monthData, risk1High);
        } catch (e) {
            // failed to calculate risk factors
        }
    }


    calculateRisk1(risk1Low, risk1High) {
        let diff = risk1High - risk1Low;
        let risk1 = (diff >= risk1Low) ? 3 : (diff > risk1Low / 5) ? 2 : 1;
        this.setState({risk1: risk1});
    }


    /**
     * This method calculate risk no 2 using "Straight Line Trend" of "Least Square method"
     * @param data
     * @param exchange
     */
    calculateRisk2(monthlyData, exchange) {
        let sumOfXSquare = 0;
        let X = [];
        let n = this.noOfDaysRisk2;
        let i = 0 - Math.floor(this.noOfDaysRisk2 / 2);
        while (n-- > 0) {
            sumOfXSquare += i * i;
            X.push(i++);
        }

        let XY = [];
        let XYSum = 0;

        monthlyData.reverse();
        monthlyData.forEach((entry, index) => {
            XY[index] = entry * X[index];
            XYSum += XY[index];
        });

        let b = XYSum / sumOfXSquare;  /// b represent slope of the line

        // If b is > 2 say green > 0 Yellow < 0 red
        let risk2 = (b > 2) ? 1 : (b > 0) ? 2 : 3;
        this.setState({risk2: risk2});
    }

    deleteTicker(e) {
        this.props.deleteTicker(e, this.props.ticker.tickerId);
    }

    render() {
        return (
            <tr className="slide-from-top">
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
                <td className="center-aligned"><i title="delete" onClick={this.deleteTicker.bind(this)}
                                                  className="fa fa-times"
                                                  aria-hidden="true"></i></td>
            </tr>
        )
    }
}


export default TickerCard;