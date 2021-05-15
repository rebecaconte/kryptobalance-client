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
import Graph from './components/dashboard/Graph';
import AddCoin from './components/dashboard/AddCoin';





class App extends Component {
  state = {
    user: null,
    error: null,
    fetchingUser: true,
    dateOfPurchase: "28-09-1987",
    graphData: [],
    showModal: false
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

  constructor() {
    super();
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  postCoinPurchaseHistory = (e) => {
    e.preventDefault()
    const { name, purchaseDate, amountInvested, currencyUsed } = e.target

    let newCoinPurchase = {
      name: name.value,
      purchaseDate: purchaseDate.value,
      amountInvested: amountInvested.value,
      currencyUsed: currencyUsed.value,
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
      const coinResponse = await fetch(`${config.API_URL}/api/coin/history/all`);
      const response = await coinResponse.json();

      this.setState({
        graphData: response
      });

    } catch (e) {
      console.log("Error during getCoinGraphData: ", e);
    }
  };

  componentDidMount() {
    this.getCoinGraphData();
  }


  render() {

    const { graphData, user, error, fetchingUser } = this.state

    return (
      <div>
        <MyNavbar onSignin={this.handleSignIn} user={user} />

        <AddCoin addCoin={this.postCoinPurchaseHistory} show={this.state.show} handleClose={this.hideModal} />
        <Graph graphData={graphData} />

        <button type="button" onClick={this.showModal}>
          AddCoin
        </button>

        <Switch>


          <Route exact path="/" render={() => {
            return <HomePage />
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


          <Route path="/" component={NotFound} />


        </Switch>
      </div>
    )

  }

}

export default withRouter(App);
