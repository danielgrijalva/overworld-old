import { GET_POPULAR, GET_GAME_DATA } from "./actionTypes";

const initialState = {
  popular: [],
  gameData: []
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
    default:
      return state;
  }
}
