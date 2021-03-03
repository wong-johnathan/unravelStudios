import { OPEN_MODAL, CLOSE_MODAL } from "constants/actionTypes";
const initialState = {
  isOpen: false,
  type: null,
  title: null,
  children: null,
  action: null,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case OPEN_MODAL:
      return { ...actions.payload, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false, type: null, children: null, title: null, action: null };
    default:
      return state;
  }
};

export default reducer;
