import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import productImg from "assets/318x180.svg";
import "./index.css";
const ProductCard = ({ description = "", name = "", price = 0, images = [] }) => {
  return (
    <Card className='productBox'>
      <div className='overflow-hidden border'>
        <CardImg top src={images[0] ? images[0].url : productImg} width='100%' alt='Product' />
      </div>
      <CardBody>
        <CardTitle tag='h5' className='text-primary'>
          {name}
        </CardTitle>
        <CardText>{description.length > 100 ? `${description.slice(0, 100).trim()}...` : description}</CardText>
        <Row>
          <Col xs='auto' className='text-primary'>
            ${price}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
