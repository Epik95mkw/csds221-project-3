import { React, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import { Button, Modal, Form } from "react-bootstrap";



export default function GameModal(props) {
    const mode = props.mode;
    const show = props.show;
    const onSubmit = props.onSubmit;
    const onClose = props.onClose;

    const [form, setForm] = useState({ name: "" });
    const handleNameChange = (ev) => setForm({ name: ev.target.value })

    const sendRequest = () => {
        if (form.name) {
            fetch('/api/game', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            .then(res => onClose())
            .then(() => onSubmit());
        }
    }

    return (
      <Modal centered show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Game</Modal.Title>
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
          <Button variant="primary" onClick={sendRequest}>
            Add Game
          </Button>
        </Modal.Footer>
      </Modal>
    );
}