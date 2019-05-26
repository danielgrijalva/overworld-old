import {
  LOG_GAME,
  UNLOG_GAME,
  LOAD_ACTIONS,
  LIKE_GAME,
  UNLIKE_GAME,
  ADD_TO_BACKLOG,
  REMOVE_FROM_BACKLOG,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  LOAD_RATING,
  RATE_GAME,
  ACTIONS_LOADING,
  RATING_LOADING
} from "../actions/types";

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
    case LOG_GAME:
      return {
        ...state,
        actions: {
          ...state.actions,
          played: true
        }
      };
    case UNLOG_GAME:
      return {
        ...state,
        actions: {
          ...state.actions,
          played: false
        }
      };
    case LIKE_GAME:
      return {
        ...state,
        actions: {
          ...state.actions,
          liked: true
        }
      };
    case UNLIKE_GAME:
      return {
        ...state,
        actions: {
          ...state.actions,
          liked: false
        }
      };
    case ADD_TO_BACKLOG:
      return {
        ...state,
        actions: {
          ...state.actions,
          backlog: true
        }
      };
    case REMOVE_FROM_BACKLOG:
      return {
        ...state,
        actions: {
          ...state.actions,
          backlog: false
        }
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        actions: {
          ...state.actions,
          wishlist: true
        }
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        actions: {
          ...state.actions,
          wishlist: false
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
      }
    default:
      return state;
  }
}
