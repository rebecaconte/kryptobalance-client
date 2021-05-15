import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class MyFooter extends Component {
    render() {
        return (
            <footer className="MyFooter shadow">
                <div className="FooterContainer">

                    <div className="text-muted">
                        <span className="text-muted"> About Us</span>
                        <span className="text-muted"> Contact</span>
                        
                        <span className="text-muted"> Sign In</span>
                        <span className="text-muted"> Sign Up</span>

                    </div>
                </div>
            </footer>
        )
    }
}

export default MyFooter;