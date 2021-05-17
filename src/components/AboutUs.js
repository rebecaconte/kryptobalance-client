import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'


class AboutUs extends Component {
    render() {
        return (
            <div>
                <div>
                <Link to="/"><img className="logoHomePage" alt="logo" src="/public/logokbalance.png" /></Link>
                </div>

                <div>
                    <a href="/signin">Sign in</a>
                    <a href="/signup">Sign up</a>
                </div>


                <div>
                    <h2>About us:</h2>
                    <p>KryptoBalance is an app that allows users to create the perfect environment to keep track of their investments in crypto currency. The available tools such as graphics, conversions, history and alerts simplifies and connects all information in one single board.</p>

                    <p>The user has right in hand all the needed information of all his investments in one place.</p>
                </div>

                <div>
                    <h2>Contact us:</h2>
                    <p> Keep in touch! Write us an email with doubts, suggestions. Anything! </p>
                    <p>kryptobalanceproject@gmail.com</p>
                </div>

                <div>
                    {/*social media icons*/}
                </div>
            </div>
        )
    }
}


export default AboutUs