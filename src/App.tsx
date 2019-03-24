import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Navbar from './components/Navbar';
import ScoreScreen from './components/ScoreScreen';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const styleTableCell = {
  padding: "15px",
  textAlign: "left"
};

const scoreDiv = {
  margin: "auto",
  width: "90%",
  maxWidth: "1000px",
  textAlign: "left"
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
        <ScoreScreen />
      </Provider>
    );
  }
}
