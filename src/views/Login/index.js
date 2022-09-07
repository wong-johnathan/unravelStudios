import React, { useState } from "react";
import { Row, Col, Container, Card, Button, Form, CardSubtitle } from "reactstrap";
import Inputs from "components/Inputs";
import Spacer from "components/Spacer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "store/actions/auth";
import logo from "assets/logo.png";
import { open_modal } from "store/actions/modals";
import { ERROR } from "constants/modals";

const inputs = [
  { type: "email", id: "email", placeholder: "Input Email", label: "Email",value:"test@gmail.com" },
  { type: "password", id: "password", placeholder: "Input Password", label: "Password",value:"123456789" },
];

const Login = () => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({email:"test@gmail.com",password:"123456789"});
  const updateState = (e) => setFields({ ...fields, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    const { email, password } = fields;
    e.preventDefault();
    if (email !== "test@gmail.com" && password !== "123456789")
      return dispatch(open_modal({ type: ERROR, children: "The account doesn't exists or you have entered a wrong password!" }));
    dispatch(login({ email, password }));
  };
  return (
    <Container style={{ maxWidth: 480, left: 0, right: 0, bottom: 0, top: 0 }} className='mx-auto position-absolute d-flex'>
      <Card body className='d-block align-self-center'>
        <Row noGutters className='mb-4'>
          <Col className='text-center'>
            <img src={logo} style={{ width: "50%" }} alt='3DCerts' />
          </Col>
        </Row>
        <CardSubtitle className='text-center mb-4'>Please enter your username and password.</CardSubtitle>
        <Form onSubmit={onSubmit}>
          {inputs.map(({ id, placeholder, label, type }) => {
            const props = { id, placeholder, label, type, updateState, value: fields[id] };
            return (
              <Row noGutters key={id}>
                <Col>
                  <Inputs {...props} />
                </Col>
              </Row>
            );
          })}
          <Spacer />
          <Row noGutters>
            <Col className='ml-auto'>
              <Button block color='primary'>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
        <Spacer />
        <Row noGutters>
          <Col xs='auto' className='align-self-center'>
            <Link to='/forgot-password' style={{ fontSize: "0.8rem" }}>
              Forgot Password
            </Link>
          </Col>
          <Col xs='auto' className='align-self-center ml-auto'>
            <Link to='/register' style={{ fontSize: "0.8rem" }}>
              Register
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};
export default Login;
