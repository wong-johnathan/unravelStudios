import { SET_AUTH_USER, SET_AUTH_TOKEN, LOGOUT, UPDATE_AUTH_USER } from "constants/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_AUTH_TOKEN:
      return { ...state, token: actions.payload };
    case SET_AUTH_USER:
      return { ...state, authUser: actions.payload };
    case UPDATE_AUTH_USER:
      return { ...state, authUser: { ...state.authUser, ...actions.payload } };
    case LOGOUT:
      localStorage.removeItem("token");
      return { token: null, authUser: {} };
    default:
      return state;
  }
};

export default reducer;
