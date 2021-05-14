import React, { Component } from 'react'

class MyNavbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="40" height="35" className="d-inline-block align-text-top" />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About Us</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#">Features</a>
                                </li>


                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div>
                                            <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">PROFILE</a></li>
                                        <li><a className="dropdown-item" href="#">DASHBOARD</a></li>
                                        <li><a className="dropdown-item" href="#">CONTACT</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">LOGOUT</a></li>
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