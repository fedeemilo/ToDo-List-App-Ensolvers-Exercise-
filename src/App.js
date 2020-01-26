import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './Main';
import HomeTodo from './HomeTodo';
import User from './User';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: [], 
            isLoaded: false
        }
    }

	render() {
		return (
			<Router>
				<Switch>
					<Route path='/' exact={true} component={Main} />
					<Route path='/todos' exact={true} component={HomeTodo} />
				</Switch>
			</Router>
		);
	}
}

export default App;
