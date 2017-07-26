import React from 'react';
import {render} from 'react-dom';
import './toasty.scss';

class MyToasty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToaster: true
        };

        setTimeout(()=> {
            this.setState({showToaster: false});
        }, 1500);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {
                    this.state.showToaster ?
                        <div className="my-toasty slide-from-top">
                            <div className="my-tosty-content ">
                                <p>
                                    {this.props.message}
                                </p>
                            </div>
                        </div>
                        : ""
                }
            </div>
        )
    }
}

export default MyToasty;