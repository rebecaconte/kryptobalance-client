import React, { Component } from 'react';
import { Alert, Form, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div>
                <div>
                    <p className="mb-0">
                        <Link to="/signin">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </p>
                    <h3>Under construction</h3>

                    <div>
                        <img alt="logo" src="./logokbalance.png" />
                    </div>
                </div>

                <Form>
                    <Accordion>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Coin Name" />
                            </Col>
                            <Col>
                                <Form.Control placeholder=" € Amount invested" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Date of investment" />
                            </Col>
                            <Col>
                                <Card style={ {"width": "60px" } }>
                                    <Accordion.Toggle as={Button} variant="light" eventKey="0">
                                    ▶
                                    </Accordion.Toggle>
                                </Card>
                            </Col>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Graphic Here!

                                    <Alert variant="success">
                                        <Alert.Heading>Hey, nice to see you here!</Alert.Heading>
                                        <p>
                                            How about keeping track of ALL your investments in cryptocurrency?
                                            <br></br>
                                            Create an account today!
                                        </p>
                                        <hr />
                                        <p className="mb-0">
                                            <Link to="/signup">Sign Up</Link>
                                        </p>
                                    </Alert>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Row>
                    </Accordion>
                </Form>
            </div>
        )
    }
}


export default HomePage