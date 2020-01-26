import React, { Component } from 'react';
import AppNav from './components/AppNav';
import Jumbo from './components/Jumbo';

class Main extends Component {
	state = {};
	render() {
		return (
			<div>
				<AppNav />
                <Jumbo />
			</div>
		);
	}
}

export default Main;
