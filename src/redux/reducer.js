import produce from 'immer';
import * as constants from './constants';

const { FETCH_GAMES } = constants;

const defaultState = {
  games: []
};

export default produce((draft, action) => {
  switch (action.type) {
    case FETCH_GAMES:
      draft.games = action.payload;
      break;
    default:
  }
}, defaultState);
