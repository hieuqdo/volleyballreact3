import { createSelector } from 'reselect';
import moment from 'moment';

const getGames = state => state.reducer.games;
const getPath = state => state.router.location.pathname;

export const selectGames = createSelector(
  getGames,
  games => games
);

export const selectUnscoredGames = createSelector(
  getGames,
  games =>
    games.filter(match => !match.awayScore && !match.homeScore && moment() > moment(match.date))
);

export const selectUpcomingGames = createSelector(
  getGames,
  games => games.filter(match => moment() <= moment(match.date))
);

export const selectPath = createSelector(
  getPath,
  path => path
);
