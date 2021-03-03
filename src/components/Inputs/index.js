import React from "react";
import { Input, Label, FormGroup, Row, Col, FormText } from "reactstrap";

const Inputs = ({ value = "", id, label, updateState, placeholder, type, required = true, disabled = false, options = [], rows = 5, subText = "" }) => {
  const props = { type, id, placeholder, required, value, onChange: updateState, disabled };
  switch (type) {
    case "label":
      return (
        <Label for={id} className='text-secondary' style={{ fontSize: "0.85rem" }}>
          {label}
        </Label>
      );
    case "text":
    case "number":
    case "email":
    case "password":
    case "textarea":
      return (
        <FormGroup>
          {label && (
            <Label for={id} className='text-secondary' style={{ fontSize: "0.85rem" }}>
              {label}
            </Label>
          )}
          <Input {...props} rows={rows} />
          {subText && <FormText color='muted'>{subText}</FormText>}
        </FormGroup>
      );
    case "select":
      return (
        <FormGroup>
          <Label for={id} className='text-secondary' style={{ fontSize: "0.85rem" }}>
            {label}
          </Label>
          <Input {...props}>
            <option value=''>{placeholder}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </Input>
        </FormGroup>
      );
    case "checkbox":
      if (!value) value = [];
      const updateCheckBox = (e) => {
        let checked = value.find((value) => value === e.target.id) ? value.filter((value) => value !== e.target.id) : [...value, e.target.id];
        updateState({ target: { id, value: checked } });
      };
      return (
        <>
          {label && (
            <Row>
              <Col xs='auto'>
                <Label for={id} className='text-secondary' style={{ fontSize: "0.85rem" }}>
                  {label}:
                </Label>
              </Col>
            </Row>
          )}
          <Row>
            {options.map((option) => {
              const checked = value.find((v) => v === option.id.toString()) ? true : false;
              return (
                <Col key={option.id} xs='auto'>
                  <FormGroup check>
                    <Label target={option.id} check>
                      <Input type={type} id={option.id} checked={checked} onChange={updateCheckBox} />
                      {option.text}
                    </Label>
                  </FormGroup>
                </Col>
              );
            })}
          </Row>
        </>
      );
    default:
      return "Undefined type";
  }
};

export default Inputs;
