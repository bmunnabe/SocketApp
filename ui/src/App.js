import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

export class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/chat" component={Chat}>
          {/* When we use below type, it doesn't give location, history , match on RFC */}
          {/* <Chat /> */}
        </Route>
        <Route exact path="/">
          <Join />
        </Route>
      </Router>
    );
  }
}

export default App;
