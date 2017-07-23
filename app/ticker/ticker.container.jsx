import React from 'react';
import style from './ticker.container.scss';
import TickerCard from './ticker.card.jsx';
class TickerContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickers: [],
            pageLoading: true
        }
    }

    render() {
        return (
            <div>

                <div className="ticker-container">
                    <div className="ticker-table">
                        <table>
                            <tr>
                                <th>Bourse</th>
                                <th>Ticker</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Risk #1</th>
                                <th>Risk #2</th>
                                <th>Action</th>
                            </tr>
                            {
                                this.props.tickers.map(ticker =>
                                        <TickerCard ticker={ticker}
                                                    key={ticker.ticker}
                                                    deleteTicker={this.props.deleteTicker}
                                            ></TickerCard>
                                )
                            }
                        </table>
                    </div>

                </div>
            </div>
        )
    }

}

export default TickerContainer;