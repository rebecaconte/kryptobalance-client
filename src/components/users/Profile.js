import React, { Component } from 'react';
import { Row, Col, Button, Container, Image, Form } from 'react-bootstrap';



class Profile extends Component {


    render() {

        return (
            <div>
                <Container>
                    <div>
                        <Button href="/profile/edit" variant="outline-dark">Edit</Button>
                    </div>
                    <div>
                        <div>

                            <Row>
                                <Col xs={6} md={4}>
                                    <Image src="./logokbalance.png" rounded />
                                </Col>
                            </Row>

                        </div>


                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" />
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Choose Currency</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>euro</option>
                                <option>dollar</option>
                            </Form.Control>
                        </Form.Group>


                        <div>
                            <Button href="/dashboard" variant="secondary" size="lg" >
                                My Coins
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}


export default Profile;