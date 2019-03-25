import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './redux/store';
import Navbar from './components/Navbar';
import { Main, Teams } from './pages';


const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const styleTableCell = {
  padding: '15px',
  textAlign: 'left'
};

const scoreDiv = {
  margin: 'auto',
  width: '90%',
  maxWidth: '1000px',
  textAlign: 'left'
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path="/" exact component={Main} />
          <Route path="/schedule" component={Main} />
          <Route path="/teams" component={Teams} />
        </Router>
      </Provider>
    );
  }
}
