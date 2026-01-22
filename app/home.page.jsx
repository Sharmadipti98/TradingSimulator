import React, { useState, useEffect } from 'react';
import Header from './shared/header/header.jsx';
import TickerContainer from './ticker/ticker.container.jsx';
import './home.page.scss';

const HomePage = () => {
    const [tickers, setTickers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [exchange, setExchange] = useState('BSE');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchInput) {
                AppService.getSearchItems(searchInput, exchange)
                    .then(res => setSearchResult(res.data))
                    .catch(err => console.error(err));
            }
        }, 300);

        return () => clearTimeout(timeoutId); // Cleanup debounce
    }, [searchInput, exchange]);

    const handleAddTicker = (item) => {
        if (!tickers.some(t => t.exchange === item.EXCHANGE && t.tickerId === item.TICKER_ID)) {
            setTickers([...tickers, { exchange: item.EXCHANGE, tickerId: item.TICKER_ID, name: item.NAME }]);
        }
        setIsSearching(false);
    };

    const handleDeleteTicker = (tickerId) => {
        setTickers(tickers.filter(t => t.tickerId !== tickerId));
    };

    return (
        <div>
            <Header />
            <div className="page-width">
                {/* Toolbar */}
                <div className="tool-bar">
                    <div className="markets">
                        <select onChange={(e) => setExchange(e.target.value)}>
                            <option>BSE</option>
                            <option>NSE</option>
                        </select>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by Ticker or Company Name"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={() => setIsSearching(true)}
                            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                        />
                        {isSearching && (
                            <div className="header-search-bar-result">
                                <ul>
                                    {searchResult.map(item => (
                                        <li key={item.TICKER_ID} onClick={() => handleAddTicker(item)}>
                                            {item.NAME}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* Tickers */}
                {tickers.length === 0 ? (
                    <div className="no-ticker">
                        <img width="80" height="80" src="/images/add-2.png" />
                        <p>Create New Ticker</p>
                    </div>
                ) : (
                    <TickerContainer tickers={tickers} deleteTicker={handleDeleteTicker} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
