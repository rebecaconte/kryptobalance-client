import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap';

class SignIn extends Component {
    render() {
        const { onSignIn, error } = this.props

        return (
            <Col className="formContainer signInForm">
                <div>
                    <img className="logoSign" alt="logo" src="./logokbalance.png" />
                </div>


                <Form className="formInput" onSubmit={onSignIn}>
                    <Form.Group controlId="">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control style={{ "fontSize": "25px" }} size="lg" required type="email" name="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="lg" required type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="outline-dark" className="submitButton" type="submit" >Sign In</Button>
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


export default SignIn;