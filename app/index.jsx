
import React from 'react';
import {render} from 'react-dom';
import {Route, Redirect, Router, IndexRoute, browserHistory} from 'react-router';
import HomePage from './home.page.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={HomePage}>
                    <Redirect from='*' to='/'/>
                </Route>
            </Router>
        )

    }
}

render(<App/>, document.getElementById('app'));