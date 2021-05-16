import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import AddCoin from './AddCoin';
import Graph from './Graph';


class Dashboard extends Component {

    state = {
        showModal : false,
        graphData: []
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
        this.getCoinGraphData();
      }
    

      
    render() {

        const { graphData } = this.state

        return (
            <div>
                <div>
                    <AddCoin addCoin={this.postCoinPurchaseHistory} show={this.state.show} handleClose={this.hideModal} />
                    <Graph graphData={graphData} />
                    
                </div>
                <button type="button" onClick={this.showModal}>
          AddCoin
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