import { CLOSE_MODAL, OPEN_MODAL } from "constants/actionTypes";

export const open_modal = ({ type, title, children, action }) => ({ type: OPEN_MODAL, payload: { type, title, children, action } });
export const close_modal = () => ({ type: CLOSE_MODAL });
