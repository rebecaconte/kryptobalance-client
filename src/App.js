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
import Profile from "./components/users/Profile";
import NotFound from "./components/404Page/NotFound";
import MyNavbar from "./components/MyNavbar";
import EditProfile from "./components/users/EditProfile";
import MyFooter from "./components/MyFooter";


class App extends Component {
  state = {
    user: null,
    error: null,
    fetchingUser: true,
    dateOfPurchase: "28-09-1987",
  }

  //delete coin from DB and Dashboard
  handleDelete = (coinName) => {

    axios.delete(`${config.API_URL}/api/coins/delete/${coinName}`, { withCredentials: true })
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch((err) => {
        console.log('Delete failed', err)
      })

  }

  //user signup
  handleSignUp = (e) => {
    e.preventDefault()
    const { email, username, password } = e.target
    let newUser = {
      email: email.value,
      username: username.value,
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
      .catch((errorObj) => {
        console.log('SignUp failed')

        this.setState({
          error: errorObj.response.data
        })
      })
  }

  //user signin
  handleSignIn = async (e) => {
    e.preventDefault()
    const { email, password } = e.target
    let user = {
      email: email.value,
      password: password.value
    }

    axios.post(`${config.API_URL}/api/signin`, user, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data,
          error: null
        }, () => {
          this.props.history.push('/dashboard')
        })
      })
      .catch((errorObj) => {
        console.log(errorObj)
        this.setState({
          error: errorObj.response.data
        })
      })
  }

  //user loggout
  handleLogout = () => {
    axios.post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState({
          user: null
        }, () => {
          this.props.history.push('/')
        })
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.response.data
        })
      })
  }

  //update state of user for the profile edit
  updateUser = (user) => {
    console.log(user);
    this.setState({
      user: user
    }, () => {
      this.props.history.push('/profile')
    })
  }

  componentDidMount() {
    axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data,
          fetchingUser: false,
        })
      })
      .catch((errorObj) => {
        this.setState({
          error: errorObj.data,
          fetchingUser: false,
        })
      })
  }

  render() {

    const { user, error, fetchingUser } = this.state

    if (fetchingUser) {
      return <p>Loading . . . </p>
    }

    //routes 
    return (
      <div>
        <MyNavbar onSignin={this.handleSignIn} onLogout={this.handleLogout} user={user} />

        <Switch>

          <Route exact path="/" render={() => {
            return <HomePage />
          }} />

          <Route exact path="/signup" render={(routeProps) => {
            return <SignUp error={error} onSubmit={this.handleSignUp} {...routeProps} />
          }} />

          <Route exact path="/signin" render={(routeProps) => {
            return <SignIn error={error} onSignIn={this.handleSignIn} {...routeProps} />
          }} />

          <Route path="/about" render={() => {
            return <AboutUs />
          }} />

          <Route exact path="/dashboard" render={() => {
            return <Dashboard onDelete={this.handleDelete} user={user} />
          }} />

          <Route exact path="/profile" render={() => {
            return <Profile user={user} />
          }} />

          <Route exact path="/profile/edit/" render={(routeProps) => {
            return <EditProfile updateUser={this.updateUser} user={user} {...routeProps} />
          }} />

          <Route path="/" component={NotFound} />

        </Switch>

        <MyFooter />
      </div>
    )

  }

}

export default withRouter(App);
