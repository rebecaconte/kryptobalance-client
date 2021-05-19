import React, { Component } from 'react'
import './AddCoin.css'

class AddCoin extends Component {

  render() {
    const { addCoin, handleClose, show } = this.props

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
       <section className="modal-main">
          <form onSubmit={addCoin}>
            <label htmlFor="name">Coin name</label>
            <input name="name" type="text" placeholder="Enter type of coin"/>
            <label htmlFor="purchaseDate">Date of Purchase</label>
            <input name="purchaseDate" type="text" placeholder="Enter Date Of Purchase"/>
            <label htmlFor="amountInvested">Amount of money invested</label>
            <input name="amountInvested" type="text" placeholder="Amount of money invested"/>
            <label htmlFor="currencyUsed">Currency used</label>
            <input name="currencyUsed" type="text" placeholder="Currency used"/>
            <button type="submit" >Submit</button>
          </form>

          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    )
  }
}

export default AddCoin
