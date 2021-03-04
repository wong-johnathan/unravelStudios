import { SET_COUNT } from "constants/actionTypes";
const initialState = { count: null, page: null, minPrice: null, maxPrice: null, limit: null, order: null, sortBy: null, search: null, category: [] };const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_COUNT:
      return actions.payload;
    case FETCH_PRODUCT:
      return [...state, actions.payload];
    case CREATE_PRODUCT:
      return [...state, actions.payload];
    case UPDATE_PRODUCT:
      return state.map((product) => (product._id !== actions.payload._id ? product : actions.payload));
    case DELETE_PRODUCT:
      return state.filter((product) => product._id !== actions.payload);
    default:
      return state;
  }
};

export default reducer;
