import { LOAD_GAME, CLEAR_GAME } from "../actions/types";

const initialState = {
  gameId: "",
  game: {},
  countries: ["WILD WILD"],
  isLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        gameId: action.gameId,
        game: action.payload,
        isLoading: false
      };
    case CLEAR_GAME:
      return state;
    default:
      return state;
  }
}
