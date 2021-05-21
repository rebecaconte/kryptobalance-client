import React, { Component } from 'react';
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

class Graph extends Component {

   // GRAPH FOR THE DASHBOARD

  state = {
    coinAmount: 0,
    // totalInvested: 0,
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
    const { graphData, coinName } = this.props

    let coinAmount = 0;
    // let totalInvested = 0;
    let array = [];

    // If data on the database contains any coin purchase dates
    if (graphData.length) {

      // Loop through all coin purchase dates ex: 20-09-2021, 21-09-2021, 22-09-2021 etc.
      for (let i = 0; i < graphData.length; i++) {

        //check if there's any coin available with the same name
        if (graphData[i].name === coinName) {
          // Get coin price of that specific purchase date in euro
          const coinPrice = graphData[i].price.eur;
          // Add the amount invested ex: 200 euros and divide it by the coin price (.52 cent per coin) of that specific date in euro
          // return the total coin amount that you own in crypto currency ex: 384.615 coins
          coinAmount += graphData[i].amountInvested / coinPrice;
          // Total invested ex: 20-09-2021 -> 200 euro 21-09-2021 -> 200 euro = 400 euro etc.
          //totalInvested += graphData[i].amountInvested;

          // total amount of money worth of coins accumulates in each purchase date
          const total = coinAmount * coinPrice;
          const date = dayjs(graphData[i].purchaseDate).format("MM/DD/YYYY");

          array.push({
            Coins: coinAmount,
            TotalEur: total,
            CoinPrice: coinPrice,
            date: date
          });
        }
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

    if (!dataArr) {
      return <p>Loading Graph . . . </p>
    }

    return (
      <div>
        <ResponsiveContainer height={300}>
          <AreaChart data={dataArr}>
            <XAxis dataKey={"date"} />
            <YAxis orientation={"left"} />
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip
              contentStyle={styles.tooltipWrapper}
              labelStyle={styles.tooltip}
              formatter={value => `${value}`}
            />
            
            <Area
              type="linear"
              dataKey="TotalEur"
              stroke="none"
              fillOpacity={0.2}
              fill="#f7931a"
              activeDot={{ strokeWidth: 0 }}
            />
            <Area
              type="linear"
              dataKey="Coins"
              stroke="none"
              fillOpacity={0.4}
              fill="#55efc4"
              yAxisId="right"
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