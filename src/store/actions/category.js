import axios from "axios";
import { FETCH_CATEGORIES} from "constants/actionTypes";
import { ERROR } from "constants/modals";
import { open_modal } from "./modals";



export const fetchCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/category");
    if (!data.status) return dispatch(open_modal({ type: ERROR, children: data.message }));
    else dispatch({ type: FETCH_CATEGORIES, payload: data.categories });
  } catch (e) {
    console.log(`ERROR in GET route /api/category: ${e.response.data.message}`);
    dispatch(open_modal({ type: ERROR, children: e.response.data.message }));
  }
};