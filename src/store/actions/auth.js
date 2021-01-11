import { SET_AUTH_TOKEN, FETCH_AUTH_USER, SIGNOUT_USER, INIT_WEB3 } from "constants/actionTypes";
import setHeader from "utils/setHeader";
import axios from "api";
import Web3 from "web3";

export const init = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) setHeader(token);
  const web3 = new Web3(Web3.givenProvider);
  dispatch({ type: INIT_WEB3, payload: web3 });
};

export const login = ({ email, password }) => async (dispatch) => {
  console.log(`Logging in with ${email}`);
  try {
    axios.post("/auth/login", { email, password }).then((result) => {
      const { token, user } = result.data;
      setHeader(token);
      dispatch({ type: SET_AUTH_TOKEN, payload: token });
      localStorage.setItem("token", token);
      dispatch({ type: FETCH_AUTH_USER, payload: user });
    });
  } catch (e) {
    console.log(e.message);
    localStorage.removeItem("token");
  }
};

export const logout = () => async (dispatch) => {
  console.log(`Logging out`);
  try {
    dispatch({ type: SIGNOUT_USER });
    localStorage.removeItem("token");
  } catch (e) {
    console.log(e.message);
  }
};
