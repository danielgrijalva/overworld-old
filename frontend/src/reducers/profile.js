import {
  LOAD_PROFILE,
  FOLLOW,
  UNFOLLOW,
  EDIT_PROFILE_SUBMIT,
  EDIT_PROFILE_SUCCESS
} from "../actions/types";

const initialState = {
  isLoading: true,
  profile: {}
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
    case EDIT_PROFILE_SUBMIT:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      }
    default:
      return state;
  }
}
