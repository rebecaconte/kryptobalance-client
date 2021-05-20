import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

class Graph extends Component {

  // GRAPH FOR THE HOME PAGE

  state = {
    coinAmount: 0,
    dataArr: null,

    styles: {
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
    const { graphData, handleAmountGrowth } = this.props
    
    const coinAmount = graphData.amountInvested / graphData[0][1];
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
      dataArr: array
    })

    handleAmountGrowth(array[array.length - 1].Total)
  }

  componentDidMount() {
      this.buildGraph();
  }

  render() {
    const { styles, dataArr } = this.state

    if(!dataArr) {
      return <p>Loading Graph . . . </p>
    }

    return (
      <div>
        <ResponsiveContainer height={250}>
          <AreaChart data={dataArr}>
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
              fillOpacity={0.6}
              fill="#f5e942"
              yAxisId="right"
              activeDot={{ strokeWidth: 0 }}
            />  
            <Area
              type="linear"
              dataKey="Total"
              stroke="none"
              fillOpacity={0.8}
              fill="#b342f5"
              activeDot={{ strokeWidth: 0 }}
            />  
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}


export default Graph
