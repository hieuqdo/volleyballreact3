import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.css";

import store from './redux/store';
import ScoreScreen from "./components/ScoreScreen";
import Navbar from "./components/Navbar";

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

const App = () => (
  <Provider store={store}>
    <Navbar />
    <ScoreScreen />
  </Provider>
);

render(<App />, document.getElementById("root"));
