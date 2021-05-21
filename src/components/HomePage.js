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
        graphDataLoaded: false,
        amountGrowth: 0
    }

    //to display the growth since purchase in the users preferred currency 
    handleAmountGrowth = (growth) => {
        growth = growth.toFixed(2)

        this.setState({
            amountGrowth: growth
        })
    }

    //grab from the form info about the name of coin invested
    handleGrowthName = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.name = text

        this.setState({
            growth: cloneGrowth
        })
    }

    //grab from the form info about the amount invested
    handleGrowthAmountInvested = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.amountInvested = text

        this.setState({
            growth: cloneGrowth
        })
    }

    //grab from the form info about the currency used
    handleGrowthCurrencyUsed = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.currencyUsed = text

        this.setState({
            growth: cloneGrowth
        })
    }

    //grab from the form info about the purchase date
    handleGrowthPurchaseDate = (event) => {
        let text = event.target.value
        let cloneGrowth = JSON.parse(JSON.stringify(this.state.growth))
        cloneGrowth.purchaseDate = text

        this.setState({
            growth: cloneGrowth
        })
    }

    //display info in the main graph 
    showGrowth = (growth) => {
        console.log(growth);
        const { name, currencyUsed, purchaseDate, amountInvested } = growth

        axios.get(`${config.API_URL}/api/coin/growth/${name}/${currencyUsed}/${purchaseDate}`, {}, { withCredentials: true })
            .then((response) => {
                //console.log(response);
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
        const { graphData, amountGrowth } = this.state
        const graphDataLoaded = this.state.graphDataLoaded

        return (
            <div>
                <div className="homePageTop" >
                    <div className="linksHomePage ">
                        <Link className="spaceLinks" to="/signin">Sign in</Link>
                        <div className="spaceLinks"> | </div>
                        <Link className="spaceLinks" to="/signup">Sign up</Link>
                    </div>
                </div>

                <div >
                    <div className="logoHomePage">
                        <Link to="/"><img className="logoHPage" alt="logo" src="./logokbalance.png" /></Link>
                    </div>
                </div>

                <Col className="middleSpaceHP" md={{ span: 3, offset: 3 }}></Col>

                <Col md={{ span: 6, offset: 3 }}>
                    <Form >
                        <Accordion >
                            <Row className="homePageAcordeon">
                                <Col>
                                    <label className="textLabel" htmlFor="name">CryptoCurrency:</label>
                                    <Form.Control placeholder="'bitcoin'" onChange={this.handleGrowthName} value={this.state.growth.name} />
                                </Col>
                                <Col>
                                    <label className="textLabel" htmlFor="name">Amount Invested:</label>
                                    <Form.Control placeholder=" '2000' " onChange={this.handleGrowthAmountInvested} value={this.state.growth.amountInvested} />
                                </Col>
                                <Col>
                                    <label className="textLabel" htmlFor="name">Date of Investment:</label>
                                    <Form.Control placeholder="'10-03-2016'" onChange={this.handleGrowthPurchaseDate} value={this.state.growth.purchaseDate} />
                                </Col>

                                <Col>
                                    <label className="textLabel" htmlFor="name">Currency Used:</label>
                                    <Form.Control placeholder="'eur'" onChange={this.handleGrowthCurrencyUsed} value={this.state.growth.currencyUsed} />
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

                                        <Col className="textValue">

                                            <p className="textValue">Today's Value: €</p>           {
                                                amountGrowth > 0 ?
                                                    <Col className="textValue">
                                                        {amountGrowth}
                                                    </Col>
                                                    :
                                                    <div></div>
                                            }
                                        </Col>

                                        <Col>
                                            {
                                                graphDataLoaded ?
                                                    <div>
                                                        <Graph graphData={graphData} handleAmountGrowth={this.handleAmountGrowth} />
                                                    </div>
                                                    :
                                                    <div></div>
                                            }
                                        </Col>

                                        <div className="alertMessage" style={{ "width": "300px", "align": "center" }}>
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
                </Col>
            </div>
        )
    }
}


export default HomePage