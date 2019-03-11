import React from "react";
import axios from "axios";
import ScoreTable from "./ScoreTable"
import "bootstrap/dist/css/bootstrap.css";
import 'antd/dist/antd.css'
import moment from "moment";
import API from "../utils/API";

export default class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      unscored_games: [],
      upcoming_games: [],
      modal: false,
      error: false
    };
  }

  componentDidMount() {
    API.get('Games', { include:["awayTeam","homeTeam","location"]})

    // axios
    // .get('https://rbvc.herokuapp.com/api/Games?filter=%7B%22include%22%3A%5B%22awayTeam%22%20%2C%22homeTeam%22%2C%22location%22%5D%7D')
    .then(response => {
      const games = response.data;
      const unscored_games = games.filter((game) => game.awayScore + game.homeScore === 0)
      const upcoming_games = games.filter((game) => moment() <= moment(game.date))

    this.setState(
      { games,
        unscored_games,
        upcoming_games }
    );
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    });
  }

  renderUnscoredgames() {
      if(this.state.unscored_games.length > 0)
        return <ScoreTable 
                title="Unscored Games"
                games = {this.state.unscored_games}
            />;
      return "";
  };

  renderUpcominggames() {
    if(this.state.upcoming_games.length > 0)
        return <ScoreTable 
                title="Upcoming Games"
                games = {this.state.upcoming_games}
            />;
    return "";
  }

  setError = () => {
    this.setState({
      error: true
    });
  };

  render() {
    return (
      <div>
          {this.renderUnscoredgames()}
          {this.renderUpcominggames()}
          <ScoreTable 
            title="All games"
            games={this.state.games}
          />
      </div>
    );
  }
}
