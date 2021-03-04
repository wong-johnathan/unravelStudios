import Header from "components/Header";
import Modals from "components/Modals";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { close_modal } from "store/actions/modals";
// import ForgotPassword from "views/ForgotPassword";
import Login from "views/Login";
import Product from "views/Product";
import Products from "views/Products";
import Register from "views/Register";
import Signout from "views/Signout";
import Footer from "components/Footer";
import Spacer from "components/Spacer";
import { fetchUser } from "store/actions/auth";
import Cart from "views/Cart";
import Orders from "views/Orders";

const App = ({ history, location }) => {
  const dispatch = useDispatch();
  const modal = useSelector(({ modal }) => modal);
  const auth = useSelector(({ auth }) => auth);
  useEffect(() => {
    if (auth.token) {
      if (location.pathname === "/login" || location.pathname === "/forgot-password" || location.pathname === "/register") history.push("/");
      if (!auth.authUser) dispatch(fetchUser());
    }
  }, [auth, history, location, dispatch]);
  return (
    <>
      <Modals {...modal} toggle={() => dispatch(close_modal())} />
      <Header />
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
        <Route path='/signout' render={() => <Signout />} />
        <Route path='/checkout/cart' render={() => <Cart />} />
        <Route path='/checkout/orders' render={()=><Orders/>}/>
        <Route path='/:id' render={() => <Product />} />
        <Route path='/' render={() => <Products />} />
      </Switch>
      <Spacer />
      <Footer />
    </>
  );
};

export default withRouter(App);
