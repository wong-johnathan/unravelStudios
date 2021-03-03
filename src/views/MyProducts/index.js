import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardComponent from "components/CardComponent";
import CardHeader from "components/CardHeader";
import Spacer from "components/Spacer";
import { CONFIRMATION } from "constants/modals";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { open_modal } from "store/actions/modals";
import { deleteProduct, fetchProducts } from "store/actions/product";

const MyProducts = ({ history }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(({ product }) => product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <CardHeader title='My Product Listings' />
      <Spacer />
      <CardComponent noBorder>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, name, price }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td className='actionColumn'>
                  <Button color='primary' size='sm' onClick={() => history.push(`/product/edit/${_id}`)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color='danger' size='sm' onClick={() => dispatch(open_modal({ type: CONFIRMATION, action: () => dispatch(deleteProduct(_id)) }))}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardComponent>
    </>
  );
};

export default withRouter(MyProducts);
