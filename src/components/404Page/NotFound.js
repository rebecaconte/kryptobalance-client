import React, { Component } from 'react';
import './NotFound.css';
import { Row, Col, Container, Button } from 'react-bootstrap';

class NotFound extends Component {
   render() {
      return (
         <div className="notFoundBG">
            <div style={{
               backgroundImage: `url("https://res.cloudinary.com/dolsf1bmj/image/upload/v1621541330/404BG_k54rqw.png")`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: '80%',
               paddingBottom: '50em',
               width: '100%',
               height: '800px',
               margin: '0',

            }}>

               <Container fluid>
                  <Row className="textContainer">

                     <Col xs={6}><h2 className="header">  404 PAGE NOT FOUND!</h2></Col>
                     <Col xs={6}><p>Uh oh.. seems like our code went down the tubes.... </p>
                        <span>click here for your way out!</span>
                     </Col>
                     <Col xs={6}> <div className="homeBtn" xs={4} md={2}><Button href="/" variant="outline-dark"> 💰 </Button></div></Col>
                  </Row>
               </Container>
            </div>
         </div>
      )
   }
}


export default NotFound