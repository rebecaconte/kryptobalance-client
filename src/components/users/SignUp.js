import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class SignUp extends Component {

    render() {

        const { onSubmit, error } = this.props

        return (
            <Col className="formContainer signInForm">

                <div>
                    <img className="logoSign" alt="logo" src="./logokbalance.png" />
                </div>

                <Form className="formInput" onSubmit={onSubmit}>
                    <Form.Group className="formSign" controlId="">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control size="lg" required type="email" name="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="formSign" controlId="">
                        <Form.Label>Username</Form.Label>
                        <Form.Control size="lg" required type="text" name="username" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="formSign" controlId="">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="lg" required type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="outline-dark" className="submitButton" type="submit">Submit</Button>
                </Form>

                {
                    error ?
                        <Col>
                            {error.errorMessage}
                        </Col>
                        :
                        <div></div>
                }

            </Col>
        )
    }
}


export default SignUp