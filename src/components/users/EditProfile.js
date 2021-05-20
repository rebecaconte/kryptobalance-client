import React, { Component } from 'react';
import { Form, Col, Button, Container, ButtonGroup, Row, Image } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

class EditProfile extends Component {


    state = {
        user: {}
    }

    onEdit = (e) => {
        console.log(e);
        e.preventDefault()
        // update image
        let image = e.target.image.files[0]
        let formData = new FormData()
        formData.append('image', image)

        axios.post(`${config.API_URL}/api/upload`, formData, { withCredentials: true })
            .then((response) => {
                this.state.user.image = response.data
                this.props.updateUser(this.state.user)
            })
            .catch((e) => {
                console.log('Upload Failed', e)
            })

        console.log(this.state.user);


        //update name
        axios.post(`${config.API_URL}/api/profile/edit`, {
            name: this.state.user.name,
            currency: this.state.user.currency,
        }, { withCredentials: true })
            .then((response) => {
                this.props.updateUser(response.data)

            })
            .catch((err) => {
                console.log('Edit failed', err)
            })
    }

    handleNameChange = (event) => {
        let text = event.target.value
        let cloneUser = JSON.parse(JSON.stringify(this.state.user))
        cloneUser.name = text

        this.setState({
            user: cloneUser
        })
        console.log(this.state.user);
    }

    handleCurrencyChange = (event) => {
        let text = event.target.value
        let cloneUser = JSON.parse(JSON.stringify(this.state.user))
        cloneUser.currency = text

        this.setState({
            user: cloneUser
        })
        console.log(this.state.user);
    }



    render() {

        const { user } = this.props

        if (!user) {
            return <Redirect to={'/signin'} />
        }

        return (
            <div >
                <Container className="formContainer" >
                    <Form onSubmit={this.onEdit}>
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
                        </Row>

                        <Form.Group className="formInput">
                            <Form.File variant="outline-info" name="image" type="file" onChange={this.handleImageChange} accept="image/png image/jpg image/jpeg" id="exampleFormControlFile1" />
                        </Form.Group>

                        <Form.Group className="formInput" controlId="formGroupEmail">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" onChange={this.handleNameChange} value={user.name} />
                        </Form.Group>

                        <Form.Group className="formInput" as={Col} controlId="formGridState">
                            <Form.Label>Choose Currency:</Form.Label>
                            <Form.Control onChange={this.handleCurrencyChange} as="select" defaultValue="Choose...">
                                <option>euro</option>
                            </Form.Control>
                        </Form.Group>

                        <div className="formInput" className="buttonProfile">
                            <ButtonGroup aria-label="Basic example">
                                <Button> <Link to="/profile" variant="outline-secondary">Back </Link></Button>
                                <Button type="submit" variant="outline-info">Save</Button>

                            </ButtonGroup>
                        </div>
                    </Form>
                </Container>
            </div>

        )
    }
}


export default EditProfile;