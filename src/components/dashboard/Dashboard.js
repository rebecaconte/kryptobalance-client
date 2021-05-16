import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import AddCoin from './AddCoin';
import Graph from './Graph';
import dayjs from "dayjs";
import { Alert, Form, Row, Col, Card, Accordion, Button } from 'react-bootstrap';

class Dashboard extends Component {

    state = {
        showModal : false,
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
    
        axios.post(`${config.API_URL}/api/coin/add`, newCoinPurchase)
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log('Adding coin failed:', e)
          })
      }

      buildGraph = () => {
        const { graphData } = this.state

        let coinAmount = 0;
        let totalInvested = 0;
        let array = [];

        if(graphData.length) {
      
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

        return (
            <div>
                <div>

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
                      Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                  <AddCoin addCoin={this.postCoinPurchaseHistory} show={this.state.show} handleClose={this.hideModal} />

                </div>

                
                <button type="button" onClick={this.showModal}>

                  + Coin
                </button>

                <div>
                    <p>total value of investments</p>
                </div>

                <div>
                    <p>graphic pie and growth chart</p>
                    <p>button flip</p>
                </div>

                <div>
                    <div>
                        <p>favorites</p>
                    </div>

                    <div>
                        <p>top performers</p>
                    </div>

                    <div>
                        <p>alerts</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Dashboard;