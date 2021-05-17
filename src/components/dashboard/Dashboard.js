import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import AddCoin from './AddCoin';
import Graph from './Graph';
import dayjs from "dayjs";
import { Card, Accordion, ListGroup, Row, Col, Container, Image } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'

class Dashboard extends Component {

  state = {
    showModal: false,
    graphData: [],
    graphDataLoaded: false,
    coinAmount: 0,
    coinName: ''
  }

  constructor() {
    super();
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  postCoinPurchaseHistory = (e) => {
    e.preventDefault()
    const { name, purchaseDate, amountInvested, currencyUsed } = e.target

    let newCoinPurchase = {
      name: name.value,
      purchaseDate: purchaseDate.value,
      amountInvested: amountInvested.value,
      currencyUsed: currencyUsed.value,
      user: this.state.user
    }

    // add coin info in the DB
    axios.post(`${config.API_URL}/api/coin/add`, newCoinPurchase)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log('Adding coin failed:', e)
      })
  }

  //graph of each currency
  buildGraph = () => {
    const { graphData } = this.state

    let coinAmount = 0;
    let totalInvested = 0;
    let array = [];

    if (graphData.length) {

      for (let i = 0; i < graphData.length; i++) {

        const coinPrice = graphData[i].price.eur;
        coinAmount += graphData[i].amountInvested / coinPrice;
        totalInvested += graphData[i].amountInvested;

        const total = coinAmount * coinPrice;
        const date = dayjs(graphData[i].purchaseDate).format("MM/DD/YYYY");

        array.push({
          TotalInvested: totalInvested,
          CoinAmount: coinAmount,
          CoinPrice: coinPrice,
          Total: total,
          date: date
        });
      }

      this.setState({
        dataArr: array,
        graphDataLoaded: true,
        coinAmount: coinAmount
      })
    }
  }

  //get all purchase history to display in the graph
  getCoinGraphData = async () => {

    try {
      const coinResponse = await fetch(`${config.API_URL}/api/coin/history/all`);
      const response = await coinResponse.json();

      this.setState({
        graphData: response
      });

    } catch (e) {
      console.log("Error during getCoinGraphData: ", e);
    }
  };

  componentDidMount() {
    this.getCoinGraphData().then(() => {
      this.buildGraph();
    })
  }


  render() {

    const { graphData, coinAmount } = this.state
    const graphDataLoaded = this.state.graphDataLoaded
    const { user } = this.props

    if (!user) {
      return <Redirect to={'/signin'} />
    }

    return (
      <div>
        <div className="firstLevelDashboard">
          <div className="dashboardAccordeon">
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  {
                    graphDataLoaded ?
                      <div>
                        <img src={graphData[0].image} alt={graphData[0].name} /> {graphData[0].name}  {coinAmount}
                      </div>
                      :
                      <div></div>
                  }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {
                      graphDataLoaded ?
                        <div>
                          <Graph buildGraph={this.buildGraph} graphData={graphData} />
                        </div>
                        :
                        <div></div>
                    }

                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Another coin
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>render graph here</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <div>
              <button type="button" onClick={this.showModal}>
                +Coin
              </button>
            </div>

            <AddCoin addCoin={this.postCoinPurchaseHistory} show={this.state.show} handleClose={this.hideModal} />

          </div>

          <div>
            <Container>
              <p>Total of Investments:</p>
              <Row>
                <Col xs={6} md={4}>
                  <Image className="totalInvGraph" alt="logo" src="./logokbalance.png" roundedCircle />
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        
        


        <div className="secondLevelDashboard">
          <div>
            <Container>
              <p>Distribuition of Investment:</p>
              <Row>
                <Col xs={6} md={4}>
                  <Image alt="logo" src="./logokbalance.png" roundedCircle />
                </Col>
              </Row>
            </Container>
          </div>

          <div>

            <ListGroup>
              <p>Top Performers</p>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </div>

          <div>

            <ListGroup>
              <p>Alerts</p>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </div>

        </div>
      </div >
    )
  }
}


export default Dashboard;