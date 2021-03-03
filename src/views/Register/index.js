import React, { useState } from "react";
import { Row, Col, Container, Card, CardTitle, Button, Form } from "reactstrap";
import Inputs from "components/Inputs";
import Spacer from "components/Spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { close_modal, open_modal } from "store/actions/modals";
import { ERROR, SUCCESS } from "constants/modals";
import { withRouter } from "react-router-dom";
import logo from "assets/logo.svg";

const steps = [
  {
    label: "User Info",
    inputs: [
      { type: "text", id: "name", placeholder: "Full Name", label: "Full Name" },
      { type: "email", id: "email", placeholder: "Email", label: "Email" },
      { type: "text", id: "contact", placeholder: "Contact", label: "Contact" },
    ],
  },
];

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const updateState = (e) => setFields({ ...fields, [e.target.id]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    if (activeStep !== steps.length - 1) setActiveStep(activeStep + 1);
    else
      axios.post("/api/auth/register", fields).then(({ data }) => {
        console.log(data)
        dispatch(open_modal({ type: data.status ? SUCCESS : ERROR, children: data.message }));
        setTimeout(() => {
          history.push("/login");
          dispatch(close_modal());
        }, 3000);
      });
  };

  const previousPage = () => activeStep > 0 && setActiveStep(activeStep - 1);

  const renderForm = () => {
    return steps[activeStep].inputs.map(({ id, placeholder, label, type }) => {
      const props = { id, placeholder, label, type, updateState, value: fields[id] };
      return (
        <Row noGutters key={id}>
          <Col>
            <Inputs {...props} />
          </Col>
        </Row>
      );
    });
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
            Register with us
          </CardTitle>
          <Form onSubmit={register}>
            {renderForm()}
            <Spacer />
            <Row>
              {activeStep !== 0 && (
                <Col xs='auto' className='pr-0'>
                  <Button block onClick={previousPage} color='primary'>
                    <FontAwesomeIcon icon={faArrowLeft} color='white' />
                  </Button>
                </Col>
              )}
              <Col className='ml-auto'>
                <Button block color='primary'>
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
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

export default withRouter(Register);
