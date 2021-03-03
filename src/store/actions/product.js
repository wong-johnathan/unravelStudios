import axios from "axios";
import { FETCH_PRODUCTS, FETCH_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_COUNT } from "constants/actionTypes";
import { ERROR, SUCCESS } from "constants/modals";
import { open_modal } from "./modals";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/product/");
    dispatch({ type: FETCH_PRODUCTS, payload: data.products });
  } catch (e) {
    console.log(`ERROR in POST route /api/product: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};

export const fetchPublicProducts = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/product/shop?${query}`);
    dispatch({ type: FETCH_PRODUCTS, payload: data.products });
    dispatch({ type: SET_COUNT, payload: data.count });
  } catch (e) {
    console.log(`ERROR in POST route /api/product: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/product/id/${id}`);
    console.log(data)
    dispatch({ type: FETCH_PRODUCT, payload: data.product });
  } catch (e) {
    console.log(`ERROR in GET route /api/product/id/${id}: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/product/", product, { headers: { "Content-Type": "multipart/form" } });
    if (!data.status) return dispatch(open_modal({ type: ERROR, children: data.message }));
    dispatch(open_modal({ type: SUCCESS, children: "Product saved!" }));
    console.log(data.product);
    dispatch({ type: CREATE_PRODUCT, payload: data.product });
    return { status: true, _id: data.product._id };
  } catch (e) {
    console.log(`ERROR in POST route /api/product: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};

export const updateProduct = (product, id) => async (dispatch) => {
  console.log(product);
  try {
    const { data } = await axios.patch(`/api/product/id/${id}`, product, { headers: { "Content-Type": "multipart/form" } });
    if (!data.status) return dispatch(open_modal({ type: ERROR, children: data.message }));
    dispatch(open_modal({ type: SUCCESS, children: "Product updated!" }));
    dispatch({ type: UPDATE_PRODUCT, payload: data.product });
    return { status: true, _id: data.product._id };
  } catch (e) {
    console.log(`ERROR in POST route /api/product: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/product/id/${id}`);
    if (!data.status) return dispatch(open_modal({ type: ERROR, children: data.message }));
    dispatch(open_modal({ type: SUCCESS, children: "Product deleted!" }));
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (e) {
    console.log(`ERROR in POST route /api/product: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};
