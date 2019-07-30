import { GET_POPULAR, GET_GAME_DATA, GET_GENRES } from "./actionTypes";

const initialState = {
  popular: [],
  gameData: [],
  genres: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR:
      return {
        ...state,
        popular: action.payload,
        isLoadingPopular: false
      };
    case GET_GAME_DATA: {
      const gameData = [...new Set([...state.gameData, ...action.payload])]; //concat arrays and remove duplicates
      return {
        ...state,
        gameData: gameData
      };
    }
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      }
    default:
      return state;
  }
}
