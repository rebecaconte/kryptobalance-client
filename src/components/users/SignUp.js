import React, { Component } from 'react'

class SignUp extends Component {

    render() {

        const { onSubmit } = this.props

        return (
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" />
                </div>
                <div >
                    <label >Email address</label>
                    <input type="email" name="email" />
                    <small className="form-text text-muted">Don't worry, we'll never share your email with anyone else.</small>
                </div>
                <div>
                    <label >Password</label>
                    <input name="password" type="password" />
                </div>
                <button type="submit" >Submit</button>
            </form>
        )
    }
}


export default SignUp