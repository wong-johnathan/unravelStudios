import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardComponent from "components/CardComponent";
import CardHeader from "components/CardHeader";
import Inputs from "components/Inputs";
import Spacer from "components/Spacer";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Col, Form, Row } from "reactstrap";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "store/actions/category";
import { createProduct, fetchProduct, updateProduct } from "store/actions/product";
import { LOADING } from "constants/modals";
import { open_modal } from "store/actions/modals";

const initialInputs = [
  { type: "select", id: "category", placeholder: "-----", label: "Product Category", options: [], required: false },
  { type: "text", id: "name", placeholder: "Product Name", label: "Product Name" },
  { type: "number", id: "price", placeholder: "Price", label: "Price" },
  { type: "textarea", id: "description", placeholder: "Product Description", label: "Product Description", required: false },
];

const EditMyProduct = ({ match, history }) => {
  const dispatch = useDispatch();
  const categories = useSelector(({ category }) => category);
  const {products} = useSelector(({ product }) => product);
  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    else setInputs(initialInputs.map((input) => (input.id !== "category" ? input : { ...input, options: categories.map(({ _id, name }) => ({ id: _id, text: name })) })));
  }, [categories, dispatch]);

  useEffect(() => {
    if (match.params.id !== "new" && match.params.id.match(/.{24}/)) {
      const product = products.find((product) => product._id === match.params.id);
      if (!product) return dispatch(fetchProduct(match.params.id));
      setFields({ ...product, imageList: product.images.map((image) => ({ data_url: image.url, ...image })) });
    }
  }, [match.params.id, products, dispatch]);
  const [fields, setFields] = useState({ imageList: [] });
  const [inputs, setInputs] = useState(initialInputs);
  const [deleted, setDeleted] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (const key of Object.keys(fields)) key !== "imageList" && key !== "images" && formData.append(key, fields[key]);
    if (match.params.id === "new") {
      dispatch(open_modal({ type: LOADING, children: "Creating Product..." }));
      for (const file of fields.imageList) formData.append("photos", file.file);
      dispatch(createProduct(formData)).then(({ _id }) => _id && history.push(`/product/edit/${_id}`));
    } else {
      for (const file of fields.imageList) if (file.file) formData.append("photos", file.file);
      formData.append("deleted", JSON.stringify(deleted));
      dispatch(updateProduct(formData, match.params.id));
    }
  };

  return (
    <>
      <CardHeader title={match.params.id === "new" ? "New Product" : "Edit Product"} />
      <Spacer />
      <Form onSubmit={onSubmit}>
        <CardComponent title='Details'>
          <Row>
            {inputs.map((input) => (
              <Col key={input.id} xs='12'>
                <Inputs {...input} updateState={(e) => setFields({ ...fields, [e.target.id]: e.target.value })} value={fields[input.id]} />
              </Col>
            ))}
          </Row>
          <ImageUploading multiple value={fields.imageList} onChange={(e) => setFields({ ...fields, imageList: e })} maxNumber={5} dataURLKey='data_url'>
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, dragProps }) => {
              return (
                <>
                  <Row>
                    <Col xs='12' md='auto' className='mb-2'>
                      <Button color='primary' outline block onClick={onImageUpload} {...dragProps}>
                        Click or Drag Image Here
                      </Button>
                    </Col>
                    <Col xs='12' md='auto' className='mb-2'>
                      <Button color='primary' outline block onClick={onImageRemoveAll}>
                        Remove All
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    {imageList.map((image, index) => {
                      return (
                        <Col key={index} xs='auto' className='mb-2'>
                          <div style={{ minHeight: "100px", minWidth: "100px" }} className='d-flex border rounded align-items-center justify-content-center'>
                            <img src={image.data_url} alt='' style={{ maxHeight: "100px", maxWidth: "100px" }} />
                          </div>
                          <Spacer />
                          <div className='d-flex justify-content-around'>
                            <Button
                              color='primary'
                              onClick={() => {
                                onImageUpdate(index);
                                if (image._id) setDeleted([...deleted, image._id]);
                              }}>
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                              color='danger'
                              onClick={() => {
                                onImageRemove(index);
                                if (image._id) setDeleted([...deleted, image._id]);
                              }}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              );
            }}
          </ImageUploading>
          <Row>
            <Col xs='12' md='auto'></Col>
          </Row>
          <Row>
            <Col xs='12' md='auto' className='ml-auto'>
              <Button color='primary' block>
                <FontAwesomeIcon icon={faSave} className='mr-2' />
                Submit
              </Button>
            </Col>
          </Row>
        </CardComponent>
      </Form>
    </>
  );
};

export default withRouter(EditMyProduct);
