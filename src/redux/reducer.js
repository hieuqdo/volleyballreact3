import produce from 'immer';
import * as constants from './constants';

const { GET_GAMES } = constants;

const defaultState = {};

export default produce(
  (draft, action) => {
    switch (action.type) {
      case GET_GAMES:
        draft.games = action.payload;
      default:
    }
  },
  defaultState
);