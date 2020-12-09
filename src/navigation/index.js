import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "../redux/Store";

import Home from "./Router";

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Home />
      </Provider>
    );
  }
}
