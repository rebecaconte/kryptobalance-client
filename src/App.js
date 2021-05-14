import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import config from './config';
import { Switch, Route, withRouter } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import SignIn from "./components/users/SignIn";
import SignUp from "./components/users/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import CoinDetails from "./components/dashboard/CoinDetails";
import Profile from "./components/users/Profile";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import NotFound from "./components/404Page/NotFound";



class App extends Component {

  state = {
    user: null
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


  render() {
    return (
      <div>
        <Switch>
         
          

          <Route exact path="/signup" render={() => {
            return <SignUp onSubmit={this.handleSignUp} />
          }} />

          <Route exact path="/signin" render={() => {
            return <SignIn />
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


          <Route path="/" component={NotFound} />


        </Switch>
      </div>
    )
  }
}




export default withRouter(App);
