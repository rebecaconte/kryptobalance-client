import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import AddCoin from './AddCoin';
import Graph from './Graph';
import PieChart from './PieChart';
import { Card, Accordion, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  state = {
    showModal: false,
    graphData: [],
    dataArr: [],
    coinNameArray: [],
    coinImageArray: [],
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

        if (response.data.length) {

          this.setState({
            graphData: response.data
          })

          let coinArray = [];
          let coinImageArray = [];

          //separate it by the coin name
          this.state.graphData.forEach(coin => {
            if (!coinArray.includes(coin.name)) {
              coinArray.push(coin.name);
            }
          })

          //show the coin image
          this.state.graphData.forEach(coin => {
            if (!coinImageArray.includes(coin.image)) {
              coinImageArray.push(coin.image);
            }
          })

          this.setState({
            coinNameArray: coinArray,
            coinImageArray: coinImageArray,
            graphDataLoaded: true
          });
        }

      })
      .catch((e) => {
        console.log("Error during getCoinGraphData: ", e);
      })
  };

  componentDidMount() {
    this.getCoinGraphData()
  }

  render() {

    const { graphData, coinNameArray, coinImageArray } = this.state
    const graphDataLoaded = this.state.graphDataLoaded
    const { user, onDelete } = this.props

    if (!user) {
      return <Redirect to={'/signin'} />
    }

    return (
      <div>
        <div className="firstLevelDashboard">
          <div className="dashboardAccordeon">
            <Accordion defaultActiveKey="0">
              <Card>
                {/* SLOT 1 */}
                {
                  graphDataLoaded && graphData[0] && coinNameArray[0] ?
                    <div>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <div>
                          <img src={coinImageArray[0]} alt={graphData[0].name} /> {coinNameArray[0]}
                        </div>

                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div>
                            <Graph graphData={graphData} coinName={coinNameArray[0]} />

                            <button onClick={() => { onDelete(coinNameArray[0]) }} >Delete</button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    :
                    <div></div>
                }
                {/* SLOT 2 */}
                {
                  graphDataLoaded && graphData[1] && coinNameArray[1] ?
                    <div>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        <div>
                          <img src={coinImageArray[1]} alt={graphData[1].name} /> {coinNameArray[1]}
                        </div>

                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div>
                            <Graph graphData={graphData} coinName={coinNameArray[1]} />

                            <button onClick={() => { onDelete(coinNameArray[1]) }} >Delete</button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    :
                    <div></div>
                }
                {/* SLOT 3 */}
                {
                  graphDataLoaded && graphData[2] && coinNameArray[2] ?
                    <div>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <div>
                          <img src={coinImageArray[2]} alt={graphData[2].name} /> {coinNameArray[2]}
                        </div>

                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div>
                            <Graph graphData={graphData} coinName={coinNameArray[2]} />

                            <button onClick={() => { onDelete(coinNameArray[2]) }} >Delete</button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    :
                    <div></div>
                }
                {/* SLOT 4 */}
                {
                  graphDataLoaded && graphData[3] && coinNameArray[3] ?
                    <div>
                      <Accordion.Toggle as={Card.Header} eventKey="3">
                        <div>
                          <img src={coinImageArray[3]} alt={graphData[3].name} /> {coinNameArray[3]}
                        </div>

                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <div>
                            <Graph graphData={graphData} coinName={coinNameArray[3]} />

                            <button onClick={() => { onDelete(coinNameArray[3]) }} >Delete</button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    :
                    <div></div>
                }
                {/* SLOT 5 */}
                {
                  graphDataLoaded && graphData[4] && coinNameArray[4] ?
                    <div>
                      <Accordion.Toggle as={Card.Header} eventKey="4">
                        <div>
                          <img src={coinImageArray[4]} alt={graphData[4].name} /> {coinNameArray[4]}
                        </div>

                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey="4">
                        <Card.Body>
                          <div>
                            <Graph graphData={graphData} coinName={coinNameArray[4]} />

                            <button onClick={() => { onDelete(coinNameArray[4]) }} >Delete</button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    :
                    <div></div>
                }
              </Card>
            </Accordion>

            {/* ADD COIN */}

            <div>
              <button type="button" onClick={this.showModal}>
                +Coin
              </button>
            </div>

            <>
              <Button variant="primary" size="lg" block>
                <AddCoin addCoin={this.postCoinPurchaseHistory} show={this.state.show} handleClose={this.hideModal} />

              </Button>
            </>


          </div>
            <div className="pieChart">
              {/* PIE CHART */}
              {
                graphDataLoaded && graphData.length && coinNameArray.length ?
                  <Container>
                    <p>Distribuition of Investment:</p>

                    <div className="totalInvGraph">
                      <PieChart graphData={graphData} coinNameArray={coinNameArray} />
                    </div>


                  </Container>
                  : <div></div>
              }
            </div>
          </div>

      </div >
    )
  }
}


export default Dashboard;