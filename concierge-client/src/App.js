import React, { Component } from 'react';
import UserReduxProvider from "./redux/user/UserReduxProvider"

class App extends Component {
  render() {
    return (
      <div>
        <UserReduxProvider/>
      </div>
    );
  }
}

export default App;
