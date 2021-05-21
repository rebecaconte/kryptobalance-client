import React, { Component } from 'react';
import { Modal, Button, Form, } from 'react-bootstrap';
import './AddCoin.css';

class AddCoin extends Component {

  render() {
    const { addCoin, handleClose, show } = this.props

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <form onSubmit={addCoin}>

            <Modal.Dialog>
              <Modal.Header className="modalTitle">
                <Modal.Title>Add Coins!  </Modal.Title>
                <Modal.Title> 💰 </Modal.Title>
              </Modal.Header>

              <Modal.Body className="modalTitle" >

                <Form.Group >
                  <label htmlFor="name">CryptoCurrency Name:</label>
                  <Form.Control className="modalInput" name="name" size="sm" type="text" placeholder=" 'bitcoin' " />
                </Form.Group>

                <Form.Group className="modalText">
                  <label className="modalTitle" htmlFor="purchaseDate">Date of Purchase:</label>
                  <Form.Control className="modalInput" name="purchaseDate" size="sm" type="text" placeholder="'10-03-2017'" />
                </Form.Group>

                <Form.Group className="modalText">
                  <label className="modalTitle" htmlFor="amountInvested">Amount of Money Invested:</label>
                  <Form.Control className="modalInput" name="amountInvested" size="sm" type="text" placeholder=" '400'" />
                </Form.Group>

                <Form.Group className="modalText">
                  <label className="modalTitle" htmlFor="currencyUsed">Currency Used:</label>
                  <Form.Control className="modalInput" name="currencyUsed" size="sm" type="text" placeholder=" 'eur' " />
                </Form.Group>

                <p className="modalText text-muted"> Note: Please insert a second purchase or a simulation of '0' in today's date for the Graphic comparison!</p>

              </Modal.Body>

              <Modal.Footer >

                <Button type="button" onClick={handleClose} variant="secondary">Close</Button>
                <Button type="submit" onClick={handleClose} variant="primary">Submit</Button>
              </Modal.Footer>
            </Modal.Dialog>

          </form>

        </section>
      </div>
    )
  }
}



export default AddCoin;
