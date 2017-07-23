import React from 'react';
import {render} from 'react-dom';
import style from './footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="full-width footer-container">
                <div className="page-width footer-content">
                    <div>
                    </div>

                    <div className="social-button">
                        <a href="https://www.facebook.com/omegio" target="_blank"><img
                            src={appContextPath + '/images/social/fb-64-white.gif'}/></a>
                        <a href="https://twitter.com/omegioco" target="_blank"><img
                            src={appContextPath + '/images/social/tw-64-white.gif'}/></a>
                        <a href="https://plus.google.com/116276431869561642991" target="_blank"><img
                            src={appContextPath + '/images/social/gp-64-white.gif'}/></a>
                        <a href="https://www.instagram.com/omegio.co/" target="_blank"><img
                            src={appContextPath + '/images/social/ig-64-white.gif'}/></a>
                    </div>

                    <div className="terms-button">
                        <a href={appContextPath + "/terms"} target="_blank">Terms</a>
                        <a href={appContextPath + "/privacypolicy"} target="_blank">Privacy</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default Footer;