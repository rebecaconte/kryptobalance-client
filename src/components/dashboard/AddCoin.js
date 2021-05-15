import React, { Component } from 'react'

class AddCoin extends Component {

  render() {
    const { addCoin } = this.props

    return (
      <form onSubmit={addCoin}>
        <label htmlFor="name">Coin name</label>
        <input name="name" type="text" placeholder="Enter type of coin"/>
        <label htmlFor="purchaseDate">Date of Purchase</label>
        <input name="purchaseDate" type="text" placeholder="Enter Date Of Purchase"/>
        <label htmlFor="amount">Amount of Coins</label>
        <input name="amount" type="text" placeholder="Amount of coins"/>
        <button type="submit" >Submit</button>
      </form>
    )
  }
}

export default AddCoin