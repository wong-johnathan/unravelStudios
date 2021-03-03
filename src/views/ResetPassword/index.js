import React, { useEffect, useState } from "react";
import qs from "query-string";
import { Container, Card, Row, Col, Form, CardSubtitle, CardTitle, Button } from "reactstrap";
import Inputs from "components/Inputs";
import Spacer from "components/Spacer";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setupAccount } from "store/actions/auth";
import { close_modal, open_modal } from "store/actions/modals";
import { ERROR, SUCCESS } from "constants/modals";
import logo from "assets/logo.svg";
import axios from "axios";

const inputs = [
  { type: "password", id: "password1", placeholder: "Input Password", label: "Password" },
  { type: "password", id: "password2", placeholder: "Re-enter Password", label: "Password" },
];

const ResetPassword = ({ location, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { token } = qs.parse(location.search);
    setToken(token);
  }, [location.search]);

  const [token, setToken] = useState({});
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (fields.password1 !== fields.password2) return setError("Password mismatch!");
    if (location.pathname === "/setup-account") dispatch(setupAccount({ password: fields.password1, token }));
    else
      axios.post("/api/auth/reset-password", { password: fields.password1, token }).then(({ data}) => {
        if (!data.status) return dispatch(open_modal({ type: ERROR, children: data.message }));
        dispatch(open_modal({ type: SUCCESS, children: data.message }));
        setTimeout(() => {
          history.push("/login");
          dispatch(close_modal());
        }, 2000);
      });
  };

  const updateState = (e) => {
    const newFields = { ...fields, [e.target.id]: e.target.value };
    setFields(newFields);
  };
  return (
    <>
      <Container style={{ maxWidth: 480, left: 0, right: 0, bottom: 0, top: 0 }} className='mx-auto position-absolute d-flex'>
        <Card body className='d-block align-self-center'>
          <Row noGutters className='mb-4'>
            <Col className='text-center'>
              <img src={logo} style={{ width: "50%" }} alt='3DCerts' />
            </Col>
          </Row>
          <CardTitle tag='h5' className='text-center mb-4'>
            Password Reset
          </CardTitle>
          <CardSubtitle className='text-center mb-4'>Please key in your new password.</CardSubtitle>
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
            {error && (
              <Row noGutters>
                <Col>
                  <p className='text-danger' style={{ fontSize: "0.8rem" }}>
                    {error}
                  </p>
                </Col>
              </Row>
            )}
            <Spacer />
            <Row noGutters>
              <Col className='ml-auto'>
                <Button block color='primary'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          <Spacer />
        </Card>
      </Container>
    </>
  );
};

export default withRouter(ResetPassword);
