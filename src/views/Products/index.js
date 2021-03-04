import CardComponent from "components/CardComponent";
import CardHeader from "components/CardHeader";
import ProductCard from "components/ProductCard";
import Spacer from "components/Spacer";
import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Products = () => {
  const {products} = useSelector(({ product }) => product);
  return (
    <>
      <CardHeader title='Products' />
      <Spacer />
      <CardComponent>
        <Row>
          {products.map((product, index) => (
            <Col key={index} xs='12' md='4' className='mb-4'>
              <Link to={product._id} style={{ textDecoration: "none" }}>
                <ProductCard {...product} />
              </Link>
            </Col>
          ))}
        </Row>
        <Row></Row>
      </CardComponent>
    </>
  );
};

export default Products;
