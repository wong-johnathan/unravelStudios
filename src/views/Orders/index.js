import CardComponent from "components/CardComponent";
import CardHeader from "components/CardHeader";
import Spacer from "components/Spacer";
import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";

const Orders = () => {
  const receipts = useSelector(({ receipt }) => receipt);
  console.log(receipts);
  return (
    <>
      <CardHeader title='Past Orders' />
      <Spacer />
      <CardComponent noBorder>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map(({ id, order }, index) => {
              let total = 0;
              for (const item of order) total += item.price * item.quantity;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>
                    <ol>
                      {order.map(({ name, quantity, price, id }) => (
                        <li key={id}>
                          {name} - {quantity} - ${price}
                          <br />
                          Total: ${quantity * price}
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td>${total}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardComponent>
    </>
  );
};

export default Orders;
