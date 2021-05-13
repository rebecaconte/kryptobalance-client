import React, { Component } from 'react'

class SignIn extends Component {
    render() {
        return (
            <form >
                <div >
                    <label >Email address</label>
                    <input type="email" name="email" />
                </div>
                <div >
                    <label >Username</label>
                    <input type="text" name="username" />
                </div>
                <div >
                    <label >Password</label>
                    <input name="password" type="password" />
                </div>

                <button type="submit">Submit</button>
            </form>
        )
    }
}


export default SignIn