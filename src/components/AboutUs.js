import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


class AboutUs extends Component {
    render() {
        return (
            <div  >
                <Col className="aboutPage" >

                    <div className="linksAboutPage ">
                        <Link className="spaceLinks" to="/signin">Sign in</Link>
                        <div className="spaceLinks"> | </div>
                        <Link className="spaceLinks" to="/signup">Sign up</Link>
                    </div>

                    <div className="aboutPage">
                        <div className="logoAboutPage">
                            <Link to="/"><img className="logoAPage" alt="logo" src="./logokbalance.png" /></Link>
                        </div>
                    </div>

                    <Col xs={2} md={10} className="textAboutPage">
                        <div className="infoAboutUs" >
                            <h2>About us:</h2>
                            <p>KryptoBalance is an app that allows users to create the perfect environment to keep track of their investments in crypto currency. The available tools such as graphics, conversions, history and alerts simplifies and connects all information in one single board.</p>

                            <p>The user has right in hand all the needed information of all his investments in one place.</p>
                        </div>

                        <div className="infoAboutUs">
                            <h2>Contact us:</h2>
                            <p> Keep in touch! Write us an email with doubts, suggestions. Anything! </p>
                            <p className="email">kryptobalanceproject@gmail.com</p>
                        </div>
                    </Col>

                    <Row>
                        {/*social media icons*/}
                    </Row>
                </Col>
            </div>
        )
    }
}


export default AboutUs