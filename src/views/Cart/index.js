import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardComponent from "components/CardComponent";
import CardHeader from "components/CardHeader";
import Inputs from "components/Inputs";
import Spacer from "components/Spacer";
import { INFO } from "constants/modals";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import { checkout, updateItemQuantity } from "store/actions/cart";
import { open_modal } from "store/actions/modals";

const Cart = () => {
  const cart = useSelector(({ cart }) => cart);
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const onChangeQuantity = (item) => dispatch(updateItemQuantity(item));
  const onCheckOut = () => {
    if (!auth.token) return dispatch(open_modal({ type: INFO, children: "Please log in to proceed with the checkout" }));
    dispatch(checkout(cart));
  };
  return (
    <>
      <CardHeader title='Your Cart' />
      <Spacer />
      <CardComponent noBorder>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ name, price, quantity, id, _id }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>${price}</td>
                <td width='15%'>
                  <Inputs type='number' value={quantity} updateState={(e) => onChangeQuantity({ quantity: e.target.value, _id })} />
                </td>
                <td>${price * quantity}</td>
                <td>
                  <Button color='danger' outline size='sm'>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Spacer />
        <Button color='primary' className='m-4' onClick={onCheckOut}>
          Check out
        </Button>
      </CardComponent>
    </>
  );
};

export default Cart;
