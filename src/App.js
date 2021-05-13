import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import SignIn from "./components/users/SignIn";
import SignUp from "./components/users/SignUp";
import NotFound from "./components/404Page/NotFound";


class App extends Component {
  render() {
    return (
      <div>
        <Switch>

          <Route path="/signup" render={() => {
            return <SignUp />
          }} />

          <Route path="/signin" render={() => {
            return <SignIn />
          }} />




          <Route path="/aboutus" render={() => {
            return <AboutUs />
          }} />

          <Route path="/" component={NotFound} />

        </Switch>
      </div>
    )
  }
}




export default App;
