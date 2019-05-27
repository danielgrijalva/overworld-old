import { LOAD_PROFILE } from "../actions/types";

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
    default:
      return state;
  }
}
