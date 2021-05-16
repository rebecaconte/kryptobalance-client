import React, { Component } from 'react'
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

class Graph extends Component {

  state = {
    coinAmount: 0,
    totalInvested: 0,
    dataArr: null,

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

    let coinAmount = 0;
    let totalInvested = 0;
    let array = [];

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
      dataArr: array
    })
  }


  componentDidMount(){
    this.buildGraph();
  }

  render() {
    const { styles, dataArr } = this.state

    if(!dataArr) {
      return <p>Loading Graph . . . </p>
    }

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
  }
}


export default Graph
