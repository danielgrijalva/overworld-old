import {
  TOGGLE_PLAYED,
  LOAD_ACTIONS,
  TOGGLE_LIKE,
  TOGGLE_BACKLOG,
  TOGGLE_WISHLIST,
  LOAD_RATING,
  RATE_GAME,
  ACTIONS_LOADING,
  RATING_LOADING
} from "./actionTypes";

const initialState = {
  actions: {},
  loadingActions: null,
  loadingRating: null,
  rating: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIONS:
      return {
        ...state,
        actions: action.payload,
        loadingActions: false
      };
    case ACTIONS_LOADING:
      return {
        ...state,
        loadingActions: true
      };
    case TOGGLE_PLAYED:
      return {
        ...state,
        actions: {
          ...state.actions,
          played: action.payload.value
        }
      };
    case TOGGLE_LIKE:
      return {
        ...state,
        actions: {
          ...state.actions,
          liked: action.payload.value
        }
      };
    case TOGGLE_BACKLOG:
      return {
        ...state,
        actions: {
          ...state.actions,
          backlog: action.payload.value
        }
      };
    case TOGGLE_WISHLIST:
      return {
        ...state,
        actions: {
          ...state.actions,
          wishlist: action.payload.value
        }
      };
    case RATE_GAME:
    case LOAD_RATING:
      return {
        ...state,
        rating: action.payload.rating,
        loadingRating: false
      };
    case RATING_LOADING:
      return {
        ...state,
        loadingRating: true,
        rating: 0
      };
    default:
      return state;
  }
}
