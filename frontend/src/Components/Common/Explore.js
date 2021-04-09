import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Explore(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          What is SocioMark?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          SocioMark is an all-new platform that lets you upload images and
          secure them with a personalized encryption using Machine Learning
          encoders. SocioMark is the future of image ownership!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Explore;
