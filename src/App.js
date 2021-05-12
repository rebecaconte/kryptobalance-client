import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/404Page/NotFound";





class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <HomePage />

          <Route path="/" component={NotFound} />

        </Switch>
      </div>
    )
  }
}




export default App;
