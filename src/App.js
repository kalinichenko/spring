import React, { Component } from 'react';
import './App.css';
import User from './components/User';
import Comments from './components/Comments';
import {getUserWithComments} from './Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getUserWithComments(1).then(res => {
      this.setState(res);
    });
  }

  render() {
    return (
      <div className="App">
        <User {...this.state} />
        <Comments {...this.state} />
      </div>
    );
  }
}

export default App;
