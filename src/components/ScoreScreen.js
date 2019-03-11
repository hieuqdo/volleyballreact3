import React from "react";
import { connect } from 'react-redux';

import "bootstrap/dist/css/bootstrap.css";
import 'antd/dist/antd.css'

import ScoreTable from "./ScoreTable"
import actions from '../redux/actions';
import {
  selectGames,
  selectUnscoredGames,
  selectUpcomingGames
} from "../redux/selectors";

class ScoreScreen extends React.Component {
  state = {
    modal: false
  };

  componentDidMount = () => this.props.getGames();

  render = () => {
    const { games, unscoredGames, upcomingGames } = this.props;

    return (
      <div>
          {unscoredGames.length && (
            <ScoreTable 
              title="Unscored Games"
              games = {unscoredGames}
            />
          )}
          {upcomingGames.length && (
            <ScoreTable 
              title="Upcoming Games"
              games = {upcomingGames}
            />
          )}
          <ScoreTable 
            title="All games"
            games={games}
          />
      </div>
    )
  };
}

const mapStateToProps = state => ({
  games: selectGames(state),
  unscoredGames: selectUnscoredGames(state),
  upcomingGames: selectUpcomingGames(state)
});

export default connect(mapStateToProps, {
  getGames: actions.getGames
})(ScoreScreen);