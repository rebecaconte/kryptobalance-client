import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom'

class MyNavbar extends Component {

    render() {

        const { user, onLogout } = this.props;

        if(user) {
            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href=""></Navbar.Brand>
                        <Navbar.Brand href="/">KryptoBalance</Navbar.Brand>
                        <Nav className="mr-auto">

                        <img src="./logokbalance.png" className="nav-profile-img" alt="user-avatar"/>

                            <NavDropdown title="" id="dropdown-menu-align-right" >                             
                                <NavDropdown.Item><Link to="/profile" user={user}>Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/dashboard" user={user}>Dashboard</Link></NavDropdown.Item>
                                <NavDropdown.Item href="/about">Contact</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <button onClick={onLogout}>Logout</button>
                            </NavDropdown>

                        </Nav>
                    </Navbar>
                </div >
            )
        } else {
            return null;
        }
    }
}

export default MyNavbar;