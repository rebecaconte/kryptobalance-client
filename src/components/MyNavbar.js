import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MyNavbar extends Component {


    render() {
        return (
            <div>
                <nav class="MyNavbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className="nav-links selected">
                            <li className="nav-links selected">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>

                            <li className="nav-links selected">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>

                            <li className="nav-links selected">
                                <a className="nav-link" href="/signin">SignIn</a>
                            </li>

                            <li className="nav-links selected">
                                <a className="nav-link" href="/signup">SignUp</a>
                            </li>
                        </div>

                        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        |||
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                        <li><a class="dropdown-item" href="#">PROFILE</a></li>
                                        <li><a class="dropdown-item" href="#">DASHBOARD</a></li>
                                        <li><a class="dropdown-item" href="#">CONTACT</a></li>
                                        <li><a class="dropdown-item" href="#">LOGOUTe</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

                export default MyNavbar;