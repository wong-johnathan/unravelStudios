import React from "react";
import Input from "components/Inputs";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";

const Decoration = ({ decoration, setDecoration }) => {
  const set = (type) => {
    if (decoration.includes(type)) setDecoration(decoration.filter((decoration) => decoration !== type));
    else setDecoration([...decoration, type]);
  };

  return (
    <Row>
      <Col>
        <Input input={{ type: "label", label: "Decorations" }} />
        <Row>
          <Col xs='auto' className="pr-0">
            <Button onClick={() => set("bold")} color={decoration.includes("bold") ? "primary" : "white"}>
              <FontAwesomeIcon icon={faBold} size='sm' />
            </Button>
          </Col>
          <Col xs='auto' className="pr-0">
            <Button onClick={() => set("italic")} color={decoration.includes("italic") ? "primary" : "white"}>
              <FontAwesomeIcon icon={faItalic} size='sm' />
            </Button>
          </Col>
          <Col xs='auto' className="pr-0">
            <Button onClick={() => set("underline")} color={decoration.includes("underline") ? "primary" : "white"}>
              <FontAwesomeIcon icon={faUnderline} size='sm' />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Decoration;
