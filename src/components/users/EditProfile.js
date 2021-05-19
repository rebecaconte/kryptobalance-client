import React, { Component } from 'react';
import { Form, Col, Button, ButtonGroup, Row, Image } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

class EditProfile extends Component {


    state = {
        user: {}
    }

    onEdit = (e) => {
        console.log(e);
        e.preventDefault()
        console.log(this.state.user);
        axios.post(`${config.API_URL}/api/profile/edit` , {
          image: this.state.user.image,
          name: this.state.user.name,
          currency: this.state.user.currency,
        }, {withCredentials: true})
        .then((response) => {
         /* this.setState({
            user: response.data
          }, () => {
            this.props.history.push('/profile')
          })*/
          this.props.updateUser(response.data)
    
        })
        .catch((err) => {
          console.log('Edit failed' , err)
        }) 
      }

    handleNameChange = (event) => {
        let text = event.target.value
        let cloneUser = JSON.parse(JSON.stringify(this.state.user))
        cloneUser.name = text
        
        this.setState ({
            user: cloneUser
        })
        console.log(this.state.user);
    }
    
    handleCurrencyChange = (event) => {
        let text = event.target.value
        let cloneUser = JSON.parse(JSON.stringify(this.state.user))
        cloneUser.currency = text

        this.setState ({
            user: cloneUser
        })
        console.log(this.state.user);
    }

    handleImageChange = (event) => {
        let image = event.target.files[0]
        let cloneUser = JSON.parse(JSON.stringify(this.state.user))
        cloneUser.image = image

        this.setState ({
            user: cloneUser
        })
        console.log(this.state.user);
    }


    render(userUpdate) {
        
        const { user } = this.state
        const image = user.image 

        if(!user){
            return <Redirect to={'/signin'} />
        }

        return (
            <div>  
               <Form onSubmit={this.onEdit}>
                    <Row>
                        <Col xs={6} md={4}>
                        {
                            image ?
                            <div>
                                
                                <img src={image} alt={user.name} /> 
                            </div>
                            :
                            <Image src="../logokbalance.png" rounded />
                        }
                        </Col>
                    </Row>

        
                    
                    <Form.Group>
                        <Form.File name="image" onChange={this.handleImageChange} accept="image/png image/jpg image/jpeg" id="exampleFormControlFile1" />
                    </Form.Group>
                   

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" onChange={this.handleNameChange} value={user.name}/>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Choose Currency</Form.Label>
                        <Form.Control onChange={this.handleCurrencyChange} as="select" defaultValue="Choose...">
                            <option>euro</option>
                            <option>dollar</option>
                        </Form.Control>
                    </Form.Group>
                    
                    
                    <ButtonGroup aria-label="Basic example">
                        <Button  href="/profile" variant="outline-secondary">Back</Button>
                        <Button  type="submit" variant="outline-info">Save</Button>
                      
                    </ButtonGroup>
                </Form>    
            </div>    
           
        )
    }
}


export default EditProfile;