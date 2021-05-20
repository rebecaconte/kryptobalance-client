import React, { Component } from 'react';
import { Row, Col, Button, Container, Image, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';



class Profile extends Component {

    render() {

        const { user } = this.props

        if (!user) {
            return <Redirect to={'/signin'} />
        }

        return (
            <div>
                <Container className="formContainer">

                    <div>
                        <div className="">

                            <Row className="formContainer">
                                <Col xs={6} md={4}>
                                    {
                                        user.image ?
                                            <div>
                                                <img className="profileImage" src={user.image} alt={user.name} />
                                            </div>
                                            :
                                            <Image className="profileImage" src="../logokbalance.png" rounded />
                                    }
                                </Col>
                                <div className=" editIcon">
                                    <Button variant=""><Link className=" editIcon" to="/profile/edit" user={user}> edit ✎</Link> </Button>
                                </div>
                            </Row>

                        </div>

                        <Form.Group className="formInput" controlId="formGroupEmail">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={user.name} placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="formInput" as={Col} controlId="formGridState">
                            <Form.Label>Currency:</Form.Label>
                            <Form.Control as="text" defaultValue={user.currency}>
                                <option>euro</option>
                            </Form.Control>
                        </Form.Group>

                        <div>
                            <Button className="formInput" href="/dashboard" className="buttonProfile" variant="secondary" size="lg" >
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