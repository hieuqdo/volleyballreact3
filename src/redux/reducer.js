import produce from 'immer';
import * as constants from './constants';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const { FETCH_GAMES, FETCH_TEAMS } = constants;

const defaultState = {
  games: [],
  teams: []
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_GAMES:
      draft.games = action.payload;
      break;
    case FETCH_TEAMS:
      draft.teams = action.payload;
      break;
    default:
      break;
  }
}, defaultState);

export default history => combineReducers({
  router: connectRouter(history),
  reducer
});
