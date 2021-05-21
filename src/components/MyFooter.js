import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MyFooter extends Component {
    render() {
        return (
            <footer className="MyFooter">
                <div>
                    <div className="text-muted">
                        <Link to="/about" className="text-muted"><span className="text-footer">About Us</span></Link>
                        <Link to="/about" className="text-muted"><span className="text-footer">Contact</span></Link>
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