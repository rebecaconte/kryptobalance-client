import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import AddCoin from './AddCoin';
import Graph from './Graph';
import { Card, Accordion, ListGroup, Row, Col, Container, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  state = {
    showModal: false,
    graphData: [],
    dataArr: [],
    coinNameArray: [],
    graphDataLoaded: false,
    coinAmount: 0,
    coinName: ''
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
      user: this.props.user
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

  //get all purchase history to display in the graph
  getCoinGraphData = async () => {
    const { user } = this.props

    axios.get(`${config.API_URL}/api/coin/${user._id}/history/all`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          graphData: response.data,
          graphDataLoaded: true
        });
      })
      .catch((e) => {
        console.log("Error during getCoinGraphData: ", e);
      })
  };

  componentDidMount() {
    this.getCoinGraphData()
  }

  render() {

    const { graphData } = this.state
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
                        <img src={graphData[0].image} alt={graphData[0].name} /> {graphData[0].name}
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
                          <Graph graphData={graphData} coinName={this.state.coinNameArray[0]} />
                        </div>
                        :
                        <div></div>
                    }

                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  {
                    graphDataLoaded ?
                      <div>
                        <img src={graphData[0].image} alt={graphData[0].name} /> {graphData[0].name}
                      </div>
                      :
                      <div></div>
                  }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {
                      graphDataLoaded ?
                        <div>
                          <Graph graphData={graphData} coinName={this.state.coinNameArray[1]} />
                        </div>
                        :
                        <div></div>
                    }

                  </Card.Body>
                </Accordion.Collapse>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  {
                    graphDataLoaded ?
                      <div>
                        <img src={graphData[0].image} alt={graphData[0].name} /> {graphData[0].name}
                      </div>
                      :
                      <div></div>
                  }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    {
                      graphDataLoaded ?
                        <div>
                          <Graph graphData={graphData} coinName={this.state.coinNameArray[2]} />
                        </div>
                        :
                        <div></div>
                    }

                  </Card.Body>
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