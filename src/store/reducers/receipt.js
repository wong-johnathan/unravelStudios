import { CREATE_RECEIPT} from "constants/actionTypes";

const initialState = [];
const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CREATE_RECEIPT:
      return [...state, actions.payload];
    default:
      return state;
  }
};

export default reducer;
