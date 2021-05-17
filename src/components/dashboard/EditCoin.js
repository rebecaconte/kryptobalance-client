import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

class EditCoin extends Component {
    render() {
        const { user } = this.props

        if(!user){
            return <Redirect to={'/signin'} />
        }

        return (
            <div>
                <div>
                    <p>EDIT COIN</p>
                </div>

                <div>
                    <div></div>
                    <p>name of the coin</p>
                    <p>date of investment</p>
                </div>

                <div>
                    <p>save button</p>
                    <p>back button</p>
                </div>
            </div>
        )
    }
}

export default EditCoin;