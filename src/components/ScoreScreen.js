import React from "react";
import ScoreTable from "./ScoreTable"
import "bootstrap/dist/css/bootstrap.css";
import 'antd/dist/antd.css'
import moment from "moment";
import { connect } from 'react-redux';
import actions from '../redux/actions';

class ScoreScreen extends React.Component {
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
    this.props.getGames()
      .then(() => {
        const unscored_games = this.props.games.filter((match) => (match.awayScore + match.homeScore === 0) && (moment() > moment(match.date)))
        const upcoming_games = this.props.games.filter((match) => moment() <= moment(match.date))
        this.setState(
          { unscored_games,
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
            games={this.props.games}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  games: state.games
})

export default connect(mapStateToProps, {
  getGames: actions.getGames
})(ScoreScreen);