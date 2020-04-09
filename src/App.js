import React, { Component } from 'react';
import NavBar from './components/navBar';
import Main from './components/main';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Main/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
