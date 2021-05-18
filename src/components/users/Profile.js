import React, { Component } from 'react';
import { Row, Col, Button, Container, Image, Form } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom'



class Profile extends Component {


    render() {

        const { user } = this.props

        if(!user){
            return <Redirect to={'/signin'} />
        }

        return (
            <div>
                <Container>
                    <div>
                        <Button variant="outline-dark"><Link to="/profile/edit" user={user}> Edit Profile </Link> </Button>
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
                            <Form.Control type="text" value={user.name} placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Choose Currency</Form.Label>
                            <Form.Control as="select" defaultValue={user.currency}>
                                <option>euro</option>
                                <option>dollar</option>
                            </Form.Control>
                        </Form.Group>


                        <div>
                            <Button href="/dashboard" variant="secondary" size="lg" >
                                My Dashboard
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}


export default Profile;