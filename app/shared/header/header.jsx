import React from 'react';
import {render} from 'react-dom';
import style from './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="header full-width">
                <div className="header-top page-width">
                    <div className="header-logo logo-font fl">
                        STOCK IN
                    </div>
                    <div className="header-social fr">
                        <ul>
                            <li><a href=""><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
                            <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>

                    <div className="hide-in-mobile header-menu fr h1-font">
                        <ul>
                            <li><a href="" className="underline-animation">Services</a></li>
                            <li><a href="" className="underline-animation">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="cf">
                    </div>
                </div>

                <div className="header-bottom p-font page-width">
                    <p className="header-bottom-heading slide-from-left">Measure Stock Market Risk</p>

                    <p className="header-bottom-text slide-from-right">Stock tickers risk analysis tool, do your
                        investment with low risk.</p>
                </div>

            </div>
        )

    }
}

export default Header;