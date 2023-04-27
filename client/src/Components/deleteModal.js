import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import { Button, Modal } from "react-bootstrap";



export default function DeleteModal(props) {
    const id = props.id;
    const onSubmit = props.onSubmit;
    const onClose = props.onClose;

    const deleteGame = () => {
        fetch(`/api/game/${props.id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => onClose())
        .then(() => onSubmit());
    }

    return (
        <Modal centered show={id} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteGame}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      );
}