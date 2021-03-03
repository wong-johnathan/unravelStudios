import { combineReducers } from "redux";
import Auth from "./auth";
import Modal from "./modal";
import Category from "./category";
import Product from "./product";

export default combineReducers({
  auth: Auth,
  modal: Modal,
  category: Category,
  product: Product,
});
