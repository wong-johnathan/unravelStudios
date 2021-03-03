import { FETCH_CATEGORIES } from "constants/actionTypes";
const reducer = (state = [], actions) => {
  switch (actions.type) {
    case FETCH_CATEGORIES:
      return actions.payload;
    default:
      return state;
  }
};

export default reducer;
