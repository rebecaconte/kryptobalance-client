import React, { Component } from 'react'
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

class Graph extends Component {

  state = {
    coinAmount: 0,
    totalInvested: 0,
    dataArr: [],
    graphReady: false,

    styles: {
      container: {
        maxWidth: 700,
        margin: "0 auto"
      },
      tooltipWrapper: {
        background: "#444444",
        border: "none"

      },
      tooltip: {
        color: "#ebebeb"
      }
    }
  }

  buildGraph = async() => {
    const { graphData } = this.props

    let coinAmount = 0;
    let totalInvested = 0;

    for (let i = 0; i < graphData.length; i++) {

      const coinPrice = graphData[i].price.eur;
      coinAmount += graphData[i].amountInvested / coinPrice;
      totalInvested += graphData[i].amountInvested;

      const total = coinAmount * coinPrice;
      const date = dayjs(graphData[i].purchaseDate).format("MM/DD/YYYY");

      this.state.dataArr.push({
        TotalInvested: totalInvested,
        CoinAmount: coinAmount,
        CoinPrice: coinPrice,
        Total: total,
        date: date
      });
      
    }
  }


  componentDidMount(){
    this.buildGraph().then(() => {
      this.setState({
        graphReady: true
      })
    });
  }

  render() {
    if(this.state.graphReady) {
      return (
        <div>
          <div style={this.state.styles.container}>
            <AreaChart data={this.state.dataArr} height={250} width={700}>
              <XAxis dataKey={"date"} />
              <YAxis orientation={"left"}  />
              <YAxis yAxisId="right" orientation="right" />

              <Tooltip
                contentStyle={this.state.styles.tooltipWrapper}
                labelStyle={this.state.styles.tooltip}
                formatter={value => `${value}`}
              />
              <Area
                type="linear"
                dataKey="CoinAmount"
                stroke="none"
                fillOpacity={0.4}
                fill="#55efc4"
                yAxisId="right"
                activeDot={{ strokeWidth: 0 }}
              />
              <Area
                type="linear"
                dataKey="Total"
                stroke="none"
                fillOpacity={0.6}
                fill="#f7931a"
                activeDot={{ strokeWidth: 0 }}
              />
              <Area
                type="linear"
                dataKey="TotalInvested"
                stroke="none"
                fillOpacity={0.6}
                fill="#3498db"
                activeDot={{ strokeWidth: 0 }}
              />
              <Area
                type="linear"
                dataKey="CoinPrice"
                stroke="none"
                fillOpacity={0.6}
                fill="#e84393"
                activeDot={{ strokeWidth: 0 }}
              />
            </AreaChart>
          </div>
        </div>
      )
    } else {
      return <p>Loading Graph . . . </p>
    }
  }
}


export default Graph
