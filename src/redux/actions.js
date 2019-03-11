import { API } from "../utils";
import { GET_GAMES } from "./constants";

export const getGames = () => ({
  type: GET_GAMES,
  payload: API.get('games', {
    include: ['homeTeam', 'awayTeam', 'location']})
});

export default {
  getGames
}

export const test = 'test';