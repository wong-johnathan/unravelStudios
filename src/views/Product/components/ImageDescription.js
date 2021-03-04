import { faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inputs from "components/Inputs";
import {  SUCCESS } from "constants/modals";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { addToCart } from "store/actions/cart";
import { open_modal } from "store/actions/modals";

const ImageDescription = ({ name = "", description = "", price = 0, _id, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const onAddToCart = () => {
    dispatch(addToCart({ _id, price, description, name, quantity }));
    dispatch(open_modal({ type: SUCCESS, children: "Item added to cart!" }));
  };
  return (
    <>
      <h4>{name}</h4>
      <p>${price}</p>
      <p>{description}</p>
      <Inputs type='number' value={quantity} updateState={(e) => setQuantity(e.target.value)} label='Quantity' />
      <div>
        <Button onClick={onAddToCart} color='primary' className='mr-2'>
          <FontAwesomeIcon icon={faPlus} className='mr-2' /> Add to Cart
        </Button>
        <Button onClick={() => history.push("/checkout/cart")} color='primary'>
          <FontAwesomeIcon icon={faShoppingCart} className='mr-2' /> Go To Cart
        </Button>
      </div>
    </>
  );
};

export default withRouter(ImageDescription);
