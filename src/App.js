import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import BoilerPlate from "views/Boilerplate";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Switch>
        <Route path='/' render={() => <BoilerPlate />} />
      </Switch>
    );
  }
}

export default App;
