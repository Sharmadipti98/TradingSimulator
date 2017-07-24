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
            tickers: [],
            searchInput: '',
            searchResult: [],
            isSearching: false,
            exchange: 'BSE'
        };
        this.loadTickers();
        this.searchTimeOutId = 0;
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
    }

    onAdd(item, e) {
        this.setState({isSearching: false});
        let tick = {
            'exchange': item.EXCHANGE,
            'tickerId': item.TICKER_ID,
            'name': item.NAME,
            'price': '',
            'risk1': 0,
            'risk2': 0
        };
        this.state.tickers.push(tick);
    }

    handleSearchChange(e) {
        let oldVal = this.state.searchInput;
        this.setState({isSearching: true, searchInput: e.target.value}, function () {
            if (this.state.searchInput != oldVal || this.state.searchResult.length === 0) {
                clearTimeout(this.searchTimeOutId);
                this.searchTimeOutId = setTimeout(() => {
                    this._doSearch(this.state.searchInput);
                }, 300);
            }
        }.bind(this));
    }

    _doSearch(searchInput) {
        AppService.getSearchItems(searchInput, this.state.exchange)
            .then(res => {
                this.setState({searchResult: res.data})
            })
    }

    deleteTicker(e, tickerId) {
        let tickrs = this.state.tickers.filter((ticker)=> {
            return ticker.tickerId !== tickerId;
        });
        this.setState({tickers: tickrs});
    }

    disableIsSearching() {
        setTimeout(()=> {
            this.setState({isSearching: false});
            clearTimeout(this.searchTimeOutId);
        }, 200);
    }

    onExchange(e) {
        alert(e.target.value);
        this.setState({exchange: e.target.value, searchInput: '', searchResult: []});
        clearTimeout(this.searchTimeOutId);
    }

    render() {
        let showSearchResult = this.state.isSearching ? {
            display: 'block'
        } : {
            display: 'none'
        };
        return (
            <div>
                <Header></Header>

                <div className="page-width">
                    <div className="tool-bar">
                        <div className="markets">
                            <select onChange={this.onExchange.bind(this)}>
                                <option>BSE</option>
                                <option>NSE</option>
                            </select>
                        </div>
                        <div className="search-bar">
                            <input
                                onChange={this.handleSearchChange.bind(this)}
                                onFocus={this.handleSearchChange.bind(this)}
                                onBlur={this.disableIsSearching.bind(this)}
                                type="textbox"
                                placeholder="Company Name"
                                value={this.state.searchInput}/>

                            <div style={showSearchResult} className="header-search-bar-result">
                                <ul>
                                    {
                                        this.state.searchResult.map(item =>
                                                <li key={item.TICKER_ID}
                                                    onClick={this.onAdd.bind(this, item)}>
                                                    {item.NAME}
                                                </li>
                                        )
                                    }


                                </ul>
                            </div>

                        </div>

                    </div>
                    {
                        this.state.tickers.length == 0 ?
                            <div className="no-ticker">
                                <img width="80" height="80" src="/images/add-2.png"/>

                                <p>Create New Ticker</p>
                            </div>
                            :
                            <div>
                                <TickerContainer
                                    deleteTicker={this.deleteTicker.bind(this)}
                                    tickers={this.state.tickers}></TickerContainer>

                                <div className="risk-description cf">
                                    <ul>
                                        <li><i className="fa fa-circle low-risk-desc" aria-hidden="true"
                                               title="Low Risk"></i>
                                            <span>Low Risk</span>
                                        </li>

                                        <li><i className="fa fa-circle medium-risk-desc" aria-hidden="true"
                                               title="Medium Risk"></i>
                                            <span>Medium Risk</span>
                                        </li>
                                        <li><i className="fa fa-circle high-risk-desc" aria-hidden="true"
                                               title="High Risk"></i>
                                            <span>High Risk</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    }
                </div>
                <div className="footer"></div>
            </div>
        )
    }
}

export default HomePage;