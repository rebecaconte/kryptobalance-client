import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import config from './config';
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import SignIn from "./components/users/SignIn";
import SignUp from "./components/users/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import CoinDetails from "./components/dashboard/CoinDetails";
import Profile from "./components/users/Profile";
import NotFound from "./components/404Page/NotFound";
import MyNavbar from "./components/MyNavbar";
import EditProfile from "./components/users/EditProfile";


class App extends Component {
  state = {
    user: null,
    error: null,
    fetchingUser: true,
    dateOfPurchase: "28-09-1987"
  }


  handleSignUp = (e) => {
    e.preventDefault()
    const { username, email, password } = e.target
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    axios.post(`${config.API_URL}/api/signup`, newUser, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data
        }, () => {
          this.props.history.push('/dashboard')
        })
      })
      .catch(() => {
        console.log('SignUp failed')
      })
  }

  handleSignIn = async (e) => {
    e.preventDefault()
    const { email, password } = e.target
    let newUser = {
      email: email.value,
      password: password.value
    }

    axios.post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data,
          error: null
        }, () => {
          this.props.history.push('/dasboard')
        })
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data
        })
      })
  }


  handleLogout = () => {
    axios.post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState({
          user: null
        })
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data
        })
      })
  }

  render() {

    const { user, error } = this.state

    return (
      <div>
        <MyNavbar onSignin={this.handleSignIn} user={user} />

        <Switch>

          <Route exact path="/" render={(routeProps) => {
            return <HomePage {...routeProps} />
          }} />

          <Route exact path="/signup" render={() => {
            return <SignUp onSubmit={this.handleSignUp} />
          }} />

          <Route exact path="/signin" render={(routeProps) => {
            return <SignIn error={error} onSignIn={this.handleSignIn} {...routeProps} />
          }} />

          <Route path="/about" render={() => {
            return <AboutUs />
          }} />

          <Route exact path="/dashboard" render={() => {
            return <Dashboard />
          }} />
          <Route exact path="/dashboard/:idcoin/" render={() => {
            return <CoinDetails />
          }} />

          <Route exact path="/profile" render={() => {
            return <Profile />
          }} />

          <Route exact path="/profile/:edit/" render={() => {
            return <EditProfile />
          }} />


          <Route path="/" component={NotFound} />


        </Switch>
      </div>
    )

  }

}

export default withRouter(App);
