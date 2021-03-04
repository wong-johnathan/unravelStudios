import { ADD_TO_CART, CREATE_RECEIPT, EMPTY_CART, REMOVE_FROM_CART, UPDATE_ITEM_QUANTITY } from "constants/actionTypes";
import { ERROR, INFO, SUCCESS } from "constants/modals";
import { open_modal } from "./modals";

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: { ...product, id: Math.round(Math.random() * 99999) } });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const updateItemQuantity = (payload) => ({ type: UPDATE_ITEM_QUANTITY, payload });
export const checkout = (cart) => (dispatch) => {
  dispatch({ type: EMPTY_CART });
  dispatch({ type: CREATE_RECEIPT, payload: { id: Math.round(Math.random() * 9999), order: cart } });
  if(cart.length>0)
  dispatch(open_modal({type:SUCCESS,children:"Items have been checked out!"}))
  else dispatch(open_modal({type:INFO,children:"No Items to checkout"}))
};
