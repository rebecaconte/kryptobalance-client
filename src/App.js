import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs"
import NotFound from "./components/404Page/NotFound";





class App extends Component {
  render() {
    return (
      <div>
        <Switch>
         

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
