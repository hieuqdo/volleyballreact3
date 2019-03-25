import produce from 'immer';
import * as constants from './constants';

const { FETCH_GAMES, FETCH_TEAMS } = constants;

const defaultState = {
  games: [],
  teams: []
};

export default produce((draft, action) => {
  switch (action.type) {
    case FETCH_GAMES:
      draft.games = action.payload;
      break;
    case FETCH_TEAMS:
      draft.teams = action.payload;
      break;
    default:
  }
}, defaultState);
