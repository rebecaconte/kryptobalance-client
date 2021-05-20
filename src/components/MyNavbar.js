import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class MyNavbar extends Component {

    render() {

        const { user, onLogout } = this.props;

        if (user) {
            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand> <Link className="navbar-home-link" to="/">KryptoBalance </Link> </Navbar.Brand>
                        <Nav>

                            <Navbar.Brand >Hello, {user.name}! </Navbar.Brand>

                            <NavDropdown title="" id="dropdown-menu-align-left">
                                <NavDropdown.Item className="linksDropDown"><Link className="linksDropDown" to="/profile" user={user}>Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item className="linksDropDown"><Link className="linksDropDown" to="/dashboard" user={user}>Dashboard</Link></NavDropdown.Item>
                                <NavDropdown.Item className="linksDropDown" ><Link className="linksDropDown" to="/about">Contact </Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <button onClick={onLogout}>Logout</button>
                            </NavDropdown>
                            {
                                user.image ?
                                    <div>
                                        <img className="nav-profile-img" alt="user-avatar" src={user.image} alt={user.name} />
                                    </div>
                                    :
                                    <Image className="nav-profile-img" alt="user-avatar" src="../logokbalance.png" rounded />
                            }
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