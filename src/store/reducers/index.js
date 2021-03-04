import { combineReducers } from "redux";
import Auth from "./auth";
import Modal from "./modal";
import Product from "./product";
import Cart from "./cart";
import Receipt from './receipt'
export default combineReducers({
  auth: Auth,
  modal: Modal,
  product: Product,
  cart: Cart,
  receipt: Receipt
});
