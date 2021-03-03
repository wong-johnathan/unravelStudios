import React from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

const CardComponent = ({ title, children, style = {}, noBorder = false }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card body className={`shadow-sm ${noBorder&&'p-0'}`}>
            {title && (
              <CardTitle tag='h4' className='mb-0'>
                {title}
              </CardTitle>
            )}
            {children && <CardBody style={style} className={`${noBorder&&'p-0'}`}>{children}</CardBody>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardComponent;
