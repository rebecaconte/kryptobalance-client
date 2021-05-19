import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class CoinDetails extends Component {
    render() {
        const { user } = this.props

        if(!user){
            return <Redirect to={'/signin'} />
        }

        return (
            <div>
                <div>
                    <p>COIN NAME</p>
                </div>

                <div>
                    <div></div>
                    <p>graphic growth chart</p>
                    <p>price coin</p>
                    <p>growth arrow up of down</p>
                </div>

                <div>
                    <p>Growth since investment:</p>
                    <p>amount of growth in </p>
                    <p>amount of growth in euro</p>
                    <p>button convert</p>
                </div>
            </div>
        )
    }
}


export default CoinDetails;