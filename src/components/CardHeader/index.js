import React from "react";
import { Row, Col, Card, CardTitle, Container } from "reactstrap";

const CardHeader = ({ title = "Undefined" }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card body className='shadow-sm'>
            <CardTitle tag='h3' className='mb-0'>
              {title}
            </CardTitle>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardHeader;
