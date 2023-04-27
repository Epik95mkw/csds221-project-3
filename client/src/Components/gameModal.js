import { React, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import { Button, Modal, Form } from "react-bootstrap";



export default function GameModal(props) {
    const addMode = props.mode === 'add';
    const show = addMode ? props.show : props.id;
    const onSubmit = props.onSubmit;
    const onClose = () => { props.onClose(); setForm({ name: "" }); }

    const [form, setForm] = useState({ name: "" });
    const handleNameChange = (ev) => setForm({ name: ev.target.value })

    const addGame = () => {
        if (form.name) {
            fetch('/api/game', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            .then(res => onSubmit())
            .then(() => onClose());
        }
    }

    const updateGame = () => {
        if (form.name) {
            fetch(`/api/game/${props.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            .then(res => onSubmit())
            .then(() => onClose());
        }
    }

    return (
      <Modal centered show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{addMode ? 'Add' : 'Edit'} Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter game title" 
                value={form.name}
                onChange={handleNameChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addMode ? addGame : updateGame}>
            {addMode ? 'Add' : 'Edit'} Game
          </Button>
        </Modal.Footer>
      </Modal>
    );
}