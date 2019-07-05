import {
  LOAD_PROFILE,
  FOLLOW,
  UNFOLLOW,
  EDIT_PROFILE_SUCCESS,
  LOAD_JOURNAL
} from "./actionTypes";

const initialState = {
  isLoading: true,
  profile: {},
  journal: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case FOLLOW:
      return {
        ...state,
        profile: { ...state.profile, followingUser: true }
      };
    case UNFOLLOW:
      return {
        ...state,
        profile: { ...state.profile, followingUser: false }
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case LOAD_JOURNAL:
      return {
        ...state,
        journal: action.payload
      };
    default:
      return state;
  }
}
