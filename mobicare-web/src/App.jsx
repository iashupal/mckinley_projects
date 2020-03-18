import React, { Component } from "react";
import "./App.css";
import AppSwitch from "./routes/AppSwitch";
import AuthSwitch from "./routes/AuthSwitch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    if (!!localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    const { loggedIn } = this.state;
    return loggedIn ? <AppSwitch /> : <AuthSwitch />;
  }
}

export default App;
