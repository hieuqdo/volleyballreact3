import { API } from "../utils";
import {
  FETCH_GAMES,
  UPDATE_GAMES
} from "./constants";

export const fetchGames = id => ({
  type: FETCH_GAMES,
  payload: API.get(`games${id ? `/${id}` : ''}`, {
    include: ['homeTeam', 'awayTeam', 'location']
  })
});

export const updateGames = values => ({
  type: UPDATE_GAMES,
  payload: API.patch('game', values)
});

export default {
  fetchGames,
  updateGames
}