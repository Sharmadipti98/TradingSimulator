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
                                <th className="left-aligned">Bourse</th>
                                <th className="left-aligned">Ticker</th>
                                <th className="left-aligned">Name</th>
                                <th className="center-aligned">Price</th>
                                <th className="center-aligned">Risk #1</th>
                                <th className="center-aligned">Risk #2</th>
                                <th className="center-aligned">Action</th>
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