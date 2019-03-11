import React from "react";
import { render } from "react-dom";
import ScoreScreen from "./components/ScoreScreen";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";

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
  <div>
    <Navbar />
    <ScoreScreen />
  </div>
);

render(<App />, document.getElementById("root"));
