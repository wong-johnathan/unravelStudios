import { SET_AUTH_USER, SET_AUTH_TOKEN, LOGOUT, OPEN_MODAL } from "constants/actionTypes";
import { ERROR, SUCCESS } from "constants/modals";

const token = "someRandomJwtToken";

export const fetchUser = () => async (dispatch) => {
  try {
    const user = { email: "test@gmail.com", password: "123456789" };
    dispatch({ type: SET_AUTH_USER, payload: user });
  } catch (e) {
    console.log(e.message);
  }
};

export const setupAccount = (user) => async (dispatch) => {
  console.log("Setting up account");
  const { password1, password2, ...userObj } = user;
  try {
    dispatch({ type: SET_AUTH_USER, payload: userObj });
    dispatch({ type: OPEN_MODAL, payload: { type: SUCCESS, children: "Registration Successful" } });
    dispatch({ type: SET_AUTH_TOKEN, payload: token });
  } catch (e) {
    console.log(`Error in POST route /api/auth/reset-password: ${e.message}`);
    dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: e.response.data.message } });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  console.log(`Logging in with ${email}`);
  try {
    dispatch({ type: SET_AUTH_TOKEN, payload: token });
    dispatch({ type: SET_AUTH_USER, payload: { email, password } });
    dispatch({ type: OPEN_MODAL, payload: { type: SUCCESS, children: "Login successful!" } });
  } catch (e) {
    console.log(`Error in POST route /api/auth/login: ${e.message}`);
    dispatch({ type: OPEN_MODAL, payload: { type: ERROR, children: "Invalid password or email!" } });
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
  }
};
