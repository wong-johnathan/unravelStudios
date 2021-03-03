import { CONFIRMATION, ERROR, INFO, LOADING, SUCCESS } from "constants/modals";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Modals = ({ isOpen, title, type, children, toggle, action }) => {
  const props = { isOpen, centered: true };
  switch (type) {
    case ERROR:
      return (
        <Modal {...props} toggle={toggle}>
          <ModalHeader toggle={toggle}>Error</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </Modal>
      );
    case LOADING:
      return (
        <Modal {...props}>
          <ModalHeader>Loading</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </Modal>
      );
    case SUCCESS:
      return (
        <Modal {...props} toggle={toggle}>
          <ModalHeader>{title ? title : "Success"}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </Modal>
      );
    case INFO:
      return (
        <Modal {...props} toggle={toggle}>
          <ModalHeader>{title ? title : "Info"}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </Modal>
      );
    case CONFIRMATION:
      return (
        <Modal {...props} toggle={toggle}>
          <ModalHeader>{title ? title : "Confirmation"}</ModalHeader>
          <ModalBody>{children ? children : "Are you sure?"}</ModalBody>
          <ModalFooter>
            <Button outline color='noBg' onClick={toggle}>
              Cancel
            </Button>
            <Button color='primary' onClick={action}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      );
    case "preview":
      return;
    default:
      return null;
  }
};

export default Modals;
