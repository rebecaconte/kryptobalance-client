import React, { Component } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";


class InvestmentChart extends Component {

  state = {
    data: [],
    activeIndex: 0,
    setActiveIndex: 0,
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
  }

  renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#000"
        >{`Value € ${value.toFixed(2)}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Percentage ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  //grab info from the DB
  buildPieChart = (array, graphData, coinName) => {
    let sumOfCoinValue = 0;
    let coinPrice = 0;
    let coinAmount = 0;

    //compare equal coin names and sum the amount invested 
    for (let i = 0; i < graphData.length; i++) {
      if (graphData[i].name === coinName) {
        // Get coin price of that specific purchase date in euro
        coinPrice = graphData[i].price.eur;
        // Add the amount invested ex: 200 euros and divide it by the coin price (.52 cent per coin) of that specific date in euro
        // return the total coin amount that you own in crypto currency ex: 384.615 coins
        coinAmount += graphData[i].amountInvested / coinPrice;
        // total amount of money worth of coins accumulates in each purchase date
        sumOfCoinValue = coinAmount * coinPrice;
      }
    }

    // Pushing coin value to pie chart
    array.push({ name: coinName, value: sumOfCoinValue })

    this.setState({
      data: array
    })
  }

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index
    });
  };

  componentDidMount() {
    const { graphData, coinNameArray } = this.props
    console.log(graphData);
    let array = [];

    //extract the info of each coin to later on add the amountInvested
    for (let i = 0; i < coinNameArray.length; i++) {
      this.buildPieChart(array, graphData, coinNameArray[i]);
    }

  }

  render() {

    return (
      <PieChart width={800} height={500}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={this.renderActiveShape}
          data={this.state.data}
          cx={400}
          cy={185}
          innerRadius={80}
          outerRadius={100}
          fill="#000"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        >
          {this.state.data.map((entry, index) => (
            <Cell fill={this.state.colors[index % this.state.colors.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

export default InvestmentChart