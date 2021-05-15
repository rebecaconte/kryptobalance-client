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



class App extends Component {
  state = {
    dateOfPurchase: "28-09-1987",
    graphData: [],
    user: "benny"
  }

  postCoinPurchaseHistory = (e) => {
    e.preventDefault()
    const { name, purchaseDate, amount } = e.target

    let newCoinPurchase = {
      name: name.value,
      purchaseDate: purchaseDate.value,
      amount: amount.value,
      user: this.state.user
    }

    axios.post(`${config.API_URL}/api/coin/add`, newCoinPurchase)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log('Adding coin failed:', e)
      })
  }

  getCoinGraphData = async () => {

    try {
      const coinResponse = await fetch(`${config.API_URL}/api/coin/all`);
      const response = await coinResponse.json();

      this.setState({
        graphData: response.data.data
      });

      console.log(response);

    } catch (e) {
      console.log("Error during getCoinGraphData: ", e);
    }
  };

  componentDidMount() {
    this.getCoinGraphData();
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

          <Route exact path="/" render={() => {
            return <HomePage />
          }} />

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
