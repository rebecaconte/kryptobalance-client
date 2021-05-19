import React, { Component } from 'react';
import { Form, Col} from 'react-bootstrap';

class SignUp extends Component {

    render() {

        const { onSubmit } = this.props

        return (
            <Col className="signUpForm">
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" />
                        <small className="form-text text-muted">Don't worry, we'll never share your email with anyone else.</small>
                    </Form.Group>
                    <Form.Group controlId="">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group controlId="">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <button type="submit" >Submit</button>
                </Form>
            </Col>
        )
    }
}


export default SignUp