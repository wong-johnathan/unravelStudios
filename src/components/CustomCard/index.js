import React from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "assets/logo.svg";
import styles from "./index.module.css";

const CustomCard = (props) => {
  const maxWidth = window.outerWidth > 500 ? "900px" : "90%";
  return (
    <Container className='p-0' style={{ maxWidth, background: "white", marginTop: "200px", borderRadius: "0.25rem" }}>
      <Row className='m-0'>
        <Col xs='12' md='8'>
          {props.children}
        </Col>
        {window.outerWidth > 500 && (
          <Col md='4' xs='hidden-xs' className={styles.rightColumn}>
            <img src={logo} alt='3DCerts' width='70%' />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CustomCard