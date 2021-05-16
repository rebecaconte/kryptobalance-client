import React, { Component } from 'react';
import { Form, Col, Button, ButtonGroup, Row, Image } from 'react-bootstrap';


class EditProfile extends Component {
    render() {
        return (
            <div>  
               
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src="../logokbalance.png" rounded />
                        </Col>
                    </Row>

                    <Form>
                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" />
                        </Form.Group>
                    </Form>

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
                    

                    
                    <ButtonGroup aria-label="Basic example">
                        <Button  href="/profile" variant="outline-secondary">Back</Button>
                        <Button href="/profile" variant="outline-info">Save</Button>
                    </ButtonGroup>
            </div>    
           
        )
    }
}


export default EditProfile;