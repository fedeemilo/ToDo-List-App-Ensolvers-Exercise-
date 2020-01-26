import React, { Component } from 'react';
import { Nav, NavItem, NavLink, NavbarBrand, Navbar, Media } from 'reactstrap';

class AppNav extends Component {
	state = {};
	render() {
		return (
			<div>
				<Navbar color='dark' dark expand='md'>
					<NavbarBrand href='/'>
						<h2 className="float-left">ToDo</h2>
						<img src="img/check.png" style={{filter: 'invert(100%', float: 'left'}} />
					</NavbarBrand>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink href='/'><img src="img/house.png" style={{filter: 'invert(100%'}} /></NavLink>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default AppNav;
