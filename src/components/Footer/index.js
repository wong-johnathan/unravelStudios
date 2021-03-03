import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
  return (
    <>
      <div style={{ height: "40px" }} />
      <div className='position-fixed bg-light w-100' style={{ height: "40px", bottom: 0 }}>
        <Container className="align-items-center d-flex h-100">
          <p className='text-muted m-0'>Made by Johnathan Wong</p>
        </Container>
      </div>
    </>
  );
};

export default Footer;
