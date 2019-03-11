import React from "react";
import axios from "axios";
import ScoreTable from "./ScoreTable"
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";

const matches_url = "https://volleyballapi.herokuapp.com/matches";

export default class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      unscored_matches: [],
      upcoming_matches: [],
      modal: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get(matches_url)
      .then(response => {
        const matches = response.data.matches;
        const unscored_matches = matches.filter((match) => match.away_score + match.home_score === 0)
        const upcoming_matches = matches.filter((match) => moment() <= moment(match.date))

        this.setState(
          { matches,
            unscored_matches,
            upcoming_matches }
        );
      })
      .catch(error => {
        console.log("error");
        console.log(error);
      });
  }

  renderUnscoredMatches() {
      if(this.state.unscored_matches.length > 0)
        return <ScoreTable 
                title="Unscored Matches"
                matches = {this.state.unscored_matches}
                matches_url={matches_url}
            />;
      return "";
  };

  renderUpcomingMatches() {
    if(this.state.upcoming_matches.length > 0)
        return <ScoreTable 
                title="Upcoming Matches"
                matches = {this.state.upcoming_matches}
                matches_url={matches_url}
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
          {this.renderUnscoredMatches()}
          {this.renderUpcomingMatches()}
          <ScoreTable 
            title="All Matches"
            matches={this.state.matches}
            matches_url={matches_url}
          />
      </div>
    );
  }
}
