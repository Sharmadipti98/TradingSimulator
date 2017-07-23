import React from 'react';
import {render} from 'react-dom';
import AppService from './services/app.service.jsx';
import Header from './shared/header/header.jsx';
import style from './home.page.scss';
import TickerContainer from './ticker/ticker.container.jsx';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickers: []
        };
        this.loadTickers();
    }

    loadTickers() {
        let obj = {
            'exchange': 'BSE',
            'tickerId': 'ORAC',
            'name': 'Oracle',
            'price': '$20',
            'risk1': 1,
            'risk2': 3
        };

        let obj2 = {
            'exchange': 'BSE',
            'tickerId': 'GOOG',
            'name': 'Google',
            'price': '$20',
            'risk1': 3,
            'risk2': 3
        };
        let obj3 = {
            'exchange': 'BSE',
            'tickerId': 'MRSFT',
            'name': 'Microsoft',
            'price': '$20',
            'risk1': 1,
            'risk2': 1
        };
        this.state.tickers.push(obj);
        this.state.tickers.push(obj2);
        this.state.tickers.push(obj3);
    }

    componentDidMount() {
        AppService.getAllApps()
            .then(resp => {
                this.setState({allApps: resp.data, pageLoading: false});
            });
    }

    onAdd(e) {
        e.preventDefault();
        alert("i ma in")

    }

    deleteTicker(e, tickerId) {
        let tickrs = this.state.tickers.filter((ticker)=> {
            return ticker.tickerId !== tickerId;
        });
        this.setState({tickers: tickrs});
    }

    render() {
        return (
            <div>
                <Header></Header>

                <div className="page-width">
                    <div className="tool-bar">
                        <div className="markets">
                            <select>
                                <option>BSE</option>
                                <option>NSE</option>
                            </select>
                        </div>
                        <div className="search-bar">
                            <form onSubmit={this.onAdd.bind(this)}>
                                <input type="textbox" placeholder="Company Name"/>
                            </form>
                        </div>

                    </div>
                    {
                        this.state.tickers.length == 0 ?
                            <div className="no-ticker">
                                <img width="80" height="80" src="/images/add-2.png"/>

                                <p>Create New Ticker</p>
                            </div>
                            :
                            <TickerContainer
                                deleteTicker={this.deleteTicker.bind(this)}
                                tickers={this.state.tickers}></TickerContainer>
                    }
                </div>
                <div className="footer"></div>
            </div>
        )
    }
}

export default HomePage;