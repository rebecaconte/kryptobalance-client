import React, { Component } from 'react'
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

class Graph extends Component {

  state = {
    coinAmount: 0,
    totalInvested: 0,
    dataArr: [],

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

  //graph of each currency
  buildGraph = () => {
    const { graphData } = this.props

    let coinAmount = 0;
    let totalInvested = 0;
    let array = [];

    // If data on the database contains any coin purchase dates
    if (graphData.length) {

      // Loop through all coin purchase dates ex: 20-09-2021, 21-09-2021, 22-09-2021 etc.
      for (let i = 0; i < graphData.length; i++) {

        // Get coin price of that specific purchase date in euro
        const coinPrice = graphData[i].price.eur;
        // Add the amount invested ex: 200 euros and divide it by the coin price (.52 cent per coin) of that specific date in euro
        // This will get you the total coin amount that you own ex: 384.615 coins
        coinAmount += graphData[i].amountInvested / coinPrice;
        // Total invested ex: 20-09-2021 -> 200 euro 21-09-2021 -> 200 euro = 400 euro etc.
        totalInvested += graphData[i].amountInvested;

        // total amount of money worth of coins accumulates in each purchase date
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
        </ResponsiveContainer>
      </div>
    )
  }
}


export default Graph
