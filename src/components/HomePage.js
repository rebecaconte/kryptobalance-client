import React, { Component } from 'react';
import { Alert, Form, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Graph from './Graph'


class HomePage extends Component {

    state = {
        growth: {
            name: '',
            amountInvested: '',
            currencyUsed: '',
            purchaseDate: ''
        },
        graphData: [],
        graphDataLoaded: false
    }

    handleGrowthName = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.name = text

        this.setState({
            growth: cloneGrowth
        })
    }

    handleGrowthAmountInvested = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.amountInvested = text

        this.setState({
            growth: cloneGrowth
        })
    }

    handleGrowthCurrencyUsed = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.currencyUsed = text

        this.setState({
            growth: cloneGrowth
        })
    }

    handleGrowthPurchaseDate = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.purchaseDate = text

        this.setState({
            growth: cloneGrowth
        })
    }

    showGrowth = (growth) => {
        console.log(growth);
        const { name, currencyUsed, purchaseDate, amountInvested } = growth

        axios.get(`${config.API_URL}/api/coin/growth/${name}/${currencyUsed}/${purchaseDate}`, {}, { withCredentials: true })
            .then((response) => {
                console.log(response);
                response.data.data.data.prices.amountInvested = amountInvested;

                this.setState({
                    graphData: response.data.data.data.prices,
                    graphDataLoaded: true
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    render() {
        const { graphData } = this.state
        const graphDataLoaded = this.state.graphDataLoaded

        return (
            <div>
                <div>
                    <p className="mb-0">
                        <Link to="/signin">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </p>
                    <h3>Under construction</h3>

                    <div>
                        <img className="logoHomePage" alt="logo" src="./logokbalance.png" />
                    </div>
                </div>

                <Form>
                    <Accordion>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Coin Name" onChange={this.handleGrowthName} value={this.state.growth.name} />
                            </Col>
                            <Col>
                                <Form.Control placeholder=" € Amount invested" onChange={this.handleGrowthAmountInvested} value={this.state.growth.amountInvested} />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Date of investment" onChange={this.handleGrowthPurchaseDate} value={this.state.growth.purchaseDate} />
                            </Col>

                            <Col>
                                <Form.Control placeholder="Currency used" onChange={this.handleGrowthCurrencyUsed} value={this.state.growth.currencyUsed} />
                            </Col>
                            <Col>
                                <Card style={{ "width": "60px" }}>
                                    <Accordion.Toggle onClick={() => { this.showGrowth(this.state.growth) }} as={Button} variant="light" eventKey="0">
                                        ▶
                                    </Accordion.Toggle>
                                </Card>
                            </Col>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>

                                    <Col>
                                        <p>GROWTH:</p>
                                            <div>
                                                <Graph graphData={graphData} />);
                                            </div>
                                    </Col>

                                    <Col>

                                        { 
                                            graphDataLoaded ? 
                                            <div>
                                                <Graph graphData={graphData} />);
                                            </div>
                                            :
                                            <div></div>
                                        }


                                    </Col>

                                    <div className="alertMessage" style={{ "width": "400px", "align": "center" }}>

                                        <Alert variant="success">
                                            <p>Hey, nice to see you here!</p>
                                            <p >
                                                How about keeping track of ALL your investments in cryptocurrency?
                                                <br></br>
                                                Create an account today!
                                            </p>
                                            <hr />
                                            <p className="mb-0">
                                                <Link to="/signup">Sign Up</Link>
                                            </p>
                                        </Alert>

                                    </div>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Row>
                    </Accordion>
                </Form>
            </div>
        )
    }
}


export default HomePage