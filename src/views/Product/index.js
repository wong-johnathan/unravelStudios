import CardComponent from "components/CardComponent";
import Spacer from "components/Spacer";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Row } from "reactstrap";
import ImageDescription from "./components/ImageDescription";
import ImageDisplay from "./components/ImageDisplay";

const Product = ({ match }) => {
  const product = useSelector(({ product }) => product.products.find((product) => product._id === match.params.id));
  return (
    <>
      <CardComponent>
        <Row>
          <Col xs='12' md='5' className='mb-2'>
            <ImageDisplay {...product} />
            {/* {product && <ReactImageGallery items={product.images.map((image) => ({ original: image.url, sizes: "250px", thumbnail: image.url }))} />} */}
          </Col>
          <Col xs='12' md='7' className='mb-2'>
            <ImageDescription {...product} />
          </Col>
        </Row>
        <Spacer />
      </CardComponent>
    </>
  );
};

export default withRouter(Product);
