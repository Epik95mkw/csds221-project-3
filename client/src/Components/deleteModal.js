import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import { Button, Modal } from "react-bootstrap";



export default function DeleteModal(props) {
    const recordMode = props.mode === 'record';
    const onSubmit = props.onSubmit;
    const onClose = props.onClose;
    const show = recordMode ? props.rid : props.gid;

    const deleteGame = () => {
        fetch(`/api/game/${props.gid}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => onClose())
        .then(() => onSubmit());
    }

    const deleteRecord = () => {
        fetch(`/api/game/${props.gid}/record/${props.rid}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => onClose())
        .then(() => onSubmit());
    }

    return (
        <Modal centered show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={recordMode ? deleteRecord : deleteGame}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      );
}