import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, UPDATE_ITEM_QUANTITY } from "constants/actionTypes";

const initialState = [];
const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_TO_CART:
      if (state.find((item) => item._id === actions.payload._id))
        return state.map((item) => (item._id !== actions.payload._id ? item : { ...item, quantity: (item.quantity += actions.payload.quantity) }));
      return [...state, actions.payload];
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== actions.payload);
    case UPDATE_ITEM_QUANTITY:
      return state.map((item) => {
        if (item._id !== actions.payload._id) return item;
        return { ...item, quantity: actions.payload.quantity };
      });
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
};

export default reducer;
