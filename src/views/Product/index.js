import CardComponent from "components/CardComponent";
import Spacer from "components/Spacer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { fetchProduct } from "store/actions/product";
import ImageDescription from "./components/ImageDescription";
import ImageDisplay from "./components/ImageDisplay";

const Product = ({ match }) => {
  const dispatch = useDispatch();
  const product = useSelector(({ product }) => product.products.find((product) => product._id === match.params.id));
  useEffect(() => !product && dispatch(fetchProduct(match.params.id)), [product, dispatch,match.params.id]);
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
        {/* <Row>
          <Col className='ml-auto' xs='12' md='auto'>
            <Button color='primary' block>
              <FontAwesomeIcon icon={faShoppingCart} className='mr-2' /> Add to Cart
            </Button>
          </Col>
        </Row> */}
      </CardComponent>
    </>
  );
};

export default withRouter(Product);
