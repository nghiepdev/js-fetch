import React, { Component } from 'react';
import jsFetch from 'js-fetch';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    jsFetch('//maps.googleapis.com/maps/api/js?key=AIzaSyAyWnfCUjOWe6kaZzw5ZGp8Ys6UB_qjvw8', 'google').then(google => {
      new google.maps.Map(this.map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }).catch(err => {
      throw err;
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{width:'100%', height: '400px'}} ref={map => { this.map = map; }}></div>
      </div>
    );
  }
}

export default App;
