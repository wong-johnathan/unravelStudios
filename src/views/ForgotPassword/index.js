import React, { useState } from "react";
import { Row, Col, Container, Card, CardTitle, Button, Form, CardSubtitle } from "reactstrap";
import Inputs from "components/Inputs";
import Spacer from "components/Spacer";
import { Link, withRouter } from "react-router-dom";
import { forgotPassword } from "apiRoutes";
import { useDispatch } from "react-redux";
import { close_modal, open_modal } from "store/actions/modals";
import { ERROR, SUCCESS } from "constants/modals";
import logo from 'assets/logo.svg'

const inputs = [{ type: "text", id: "email", placeholder: "Input Email", label: "Email" }];

const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const updateState = (e) => setEmail(e.target.value);
  const login = async (e) => {
    e.preventDefault();
    const { status, message } = await forgotPassword(email);
    if (!status) dispatch(open_modal({ type: ERROR, children: message }));
    else {
      dispatch(open_modal({ type: SUCCESS, children: message }));
      setTimeout(() => {
        history.push("/login");
        dispatch(close_modal());
      }, 3000);
    }
    // if (!response.data.status) this.props.openModal({ title: "Error", children: response.data.message });
    // else this.props.openModal({ title: "Success", children: response.data.message });
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
            Forgot your password?
          </CardTitle>
          <CardSubtitle className='text-center mb-4'>Please key in the email registered to 3DCerts.</CardSubtitle>
          <Form onSubmit={login}>
            {inputs.map(({ id, placeholder, label, type }) => {
              const props = { id, placeholder, label, type, updateState, value: email };
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
                <Button block>Send</Button>
              </Col>
            </Row>
          </Form>
          <Spacer />
          <Row noGutters>
            <Col xs='auto' className='align-self-center'>
              <Link to='/login' style={{ fontSize: "0.8rem" }}>
                Remember your password?
              </Link>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default withRouter(ForgotPassword);
