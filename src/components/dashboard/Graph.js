import React, { Component } from 'react'

class Graph extends Component {

  state = {
    numOfDays: 0,
    coinAmount: 0,
    totalInvested: 0,
    dataArr: []
  }

  buildGraph = () => {
    const { graphData } = this.props
    console.log(graphData);

//this.state.numOfDays = graphData.prices.length;



  }


  componentDidMount(){
    this.buildGraph();
  }

  render() {
    const { graphData } = this.props

    return (
      <div>

      </div>
    )
  }
}


export default Graph
