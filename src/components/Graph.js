import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import dayjs from "dayjs";

class Graph extends Component {

  state = {
    coinAmount: 0,
    totalInvested: 0,
    dataArr: null,
    amountGrowth: 0,

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

  buildGraph = () => {
    const { graphData } = this.props

    const coinAmount  = graphData.amountInvested / graphData[0][1];
    let array = [];

    for (let i = 0; i < graphData.length; i++) {
      
      const coinPrice = graphData[i][1];
      const total = coinAmount * coinPrice;
      const date = new Date(graphData[i][0]).toLocaleDateString("en-US");

      array.push({
        CoinAmount: coinAmount,
        Total: total,
        date: date
      });    
    }

    this.setState({
      dataArr: array,
      amountGrowth: array[array.length - 1].Total
    })
  }

  componentDidMount() {
      this.buildGraph();
  }

  render() {
    const { styles, dataArr } = this.state

    if(!dataArr) {
      return <p>Loading Graph . . . </p>
    }

    // TODO: Make the currency dynamic! it is static here

    return (
      <div>
        <div style={styles.container}>
          <AreaChart data={dataArr} height={250} width={700}>
            <XAxis dataKey={"date"} />
            <YAxis orientation={"left"}  />
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip
              contentStyle={styles.tooltipWrapper}
              labelStyle={styles.tooltip}
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
              fillOpacity={0.8}
              fill="#cf55c8"
              activeDot={{ strokeWidth: 0 }}
            />  
          </AreaChart>
        </div>
      </div>
    )
  }
}


export default Graph
