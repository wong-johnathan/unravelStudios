import { SET_AUTH_USER, SET_AUTH_TOKEN, LOGOUT, OPEN_MODAL, UPDATE_AUTH_USER } from "constants/actionTypes";
import setHeader from "utils/setHeader";
import axios from "axios";
import { ERROR, INFO, SUCCESS } from "constants/modals";
import { open_modal } from "./modals";

export const init = () => localStorage.getItem("token") && setHeader(localStorage.getItem("token"));

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/auth/me");
    if (!response.data.status) dispatch(open_modal({ type: ERROR, children: response.data.message }));
    dispatch({ type: SET_AUTH_USER, payload: response.data.authUser });
  } catch (e) {
    console.log(`Error in POST route /api/auth/reset-password: ${e.message}`);
    localStorage.removeItem("accessLevel");
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: e.response.data.message } });
  }
};

export const setupAccount = ({ password, token }) => async (dispatch) => {
  console.log("Setting up account");
  try {
    const { data } = await axios.post("/api/auth/reset-password", { token, password });
    if (!data.status) return dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: data.message } });
    setHeader(token);
    const response = await axios.get("/api/auth/me");
    localStorage.setItem("token", token);
    dispatch({ type: SET_AUTH_USER, payload: response.data.user });
    dispatch({ type: OPEN_MODAL, payload: { type: INFO, children: data.message } });
    dispatch({ type: SET_AUTH_TOKEN, payload: token });
  } catch (e) {
    console.log(`Error in POST route /api/auth/reset-password: ${e.message}`);
    dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: e.response.data.message } });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  console.log(`Logging in with ${email}`);
  try {
    const response = await axios.post("/api/auth/login", { email, password });
    const { token, user } = response.data;
    setHeader(token);
    dispatch({ type: SET_AUTH_TOKEN, payload: token });
    localStorage.setItem("token", token);
    dispatch({ type: SET_AUTH_USER, payload: user });
    dispatch({ type: OPEN_MODAL, payload: { type: SUCCESS, children: "Login successful!" } });
  } catch (e) {
    console.log(`Error in POST route /api/auth/login: ${e.message}`);
    localStorage.removeItem("token");
    dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: "Invalid password or email!" } });
  }
};

export const updateAuthUser = ({ name, contact }) => async (dispatch) => {
  console.log(`Updating user: ${name}`);
  try {
    const response = await axios.patch("/api/auth/me", { name, contact });
    if (!response.data.status) throw new Error(response.data.message);
    dispatch({ type: UPDATE_AUTH_USER, payload: response.data.user });
    dispatch({ type: OPEN_MODAL, payload: { type: SUCCESS, children: "Update Successful!" } });
  } catch (e) {
    console.log(`Error in PATCH route /api/auth/me: ${e.message}`);
    dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: e.response.data.message } });
  }
};

export const logout = () => async (dispatch) => {
  console.log(`Logging out`);
  try {
    dispatch({ type: LOGOUT });
  } catch (e) {
    console.log(`ERROR in logout route: ${e.message}`);
    dispatch({ type: LOGOUT });
    localStorage.removeItem("token");
    localStorage.remove("accessLevel");
  }
};
