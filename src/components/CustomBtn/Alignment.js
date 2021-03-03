import React from "react";
import Input from "components/Inputs";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignCenter, faAlignRight } from "@fortawesome/free-solid-svg-icons";

const Alignment = ({ alignment, setAlignment }) => {
  const set = (type) => {
    setAlignment(type);
  };

  return (
    <Row>
      <Col>
        <Input input={{ type: "label", label: "Decorations" }} />
        <Row>
          <Col xs='auto' className='pr-0'>
            <Button onClick={() => set("left")} color={alignment === "left" ? "primary" : "white"}>
              <FontAwesomeIcon icon={faAlignLeft} size='sm' />
            </Button>
          </Col>
          <Col xs='auto' className='pr-0'>
            <Button onClick={() => set("center")} color={alignment === "center" ? "primary" : "white"}>
              <FontAwesomeIcon icon={faAlignCenter} size='sm' />
            </Button>
          </Col>
          <Col xs='auto' className='pr-0'>
            <Button onClick={() => set("right")} color={alignment === "right" ? "primary" : "white"}>
              <FontAwesomeIcon icon={faAlignRight} size='sm' />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Alignment;
