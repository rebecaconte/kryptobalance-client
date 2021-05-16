import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MyFooter extends Component {
    render() {
        return (
            <footer className="MyFooter ">
                <div className="FooterContainer">

                    <div className="text-muted">
                        <Link to="/about" className="text-muted"> About Us</Link>
                        <Link to="/about"className="text-muted"> Contact</Link>
                    </div>

                    <div>
                    {/*social media icons*/}
                    </div>
                </div>
            </footer>
        )
    }
}

export default MyFooter;