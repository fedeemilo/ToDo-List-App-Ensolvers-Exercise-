import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Jumbo extends Component {
	state = {};
	render() {
		return (
			<div>
				<Jumbotron style={{display: 'flex', justifyContent: 'center', alignItems:'center', height: '91vh', background: '#fff'}}>
					<div class='text-center'>
						<h1 className='display-3'>Welcome to ToDo App!</h1>
						<p className='lead'>
							This is a simple web application that allows you to upload pending
							tasks, as well as mark them as done, edit or delete them.
						</p>
						<p className='lead'>
							<Button color='primary' tag={Link} to='/todos'>ToDo Something</Button>
						</p>
					</div>
				</Jumbotron>
			</div>
		);
	}
}

export default Jumbo;
