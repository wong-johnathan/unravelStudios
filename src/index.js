import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./store/reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/index.scss";
import { init } from "store/actions/auth";

const store = createStore(reducer, applyMiddleware(thunk));

init();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
