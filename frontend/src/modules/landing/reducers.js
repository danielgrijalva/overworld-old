import { GET_POPULAR, GET_BACKDROP } from "./actionTypes";

const initialState = {
  backdrop: {},
  popular: [],
  isLoadingPopular: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR:
      return {
        ...state,
        popular: action.payload,
        isLoadingPopular: false
      };
    case GET_BACKDROP:
      return {
        ...state,
        backdrop: action.payload
      };
    default:
      return state;
  }
}
