import { React, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import { Button, Modal, Form } from "react-bootstrap";



export default function RecordModal(props) {
    const gameId = props.gameId;
    const addMode = props.mode === 'add';
    const show = addMode ? props.show : props.id;
    const onSubmit = props.onSubmit;
    const onClose = () => { props.onClose(); setForm(emptyForm); }

    const emptyForm = { setby: "", time: "", date: "" };
    const [form, setForm] = useState(emptyForm);
    const handleOwnerChange = (ev) => setForm({ ...form, setby: ev.target.value });
    const handleTimeChange  = (ev) => setForm({ ...form, time:  ev.target.value });
    const handleDateChange  = (ev) => setForm({ ...form, date:  ev.target.value });

    const addRecord = () => {
        if (form.setby && form.time && form.date) {
            fetch(`/api/game/${gameId}/record`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            .then(res => onSubmit())
            .then(() => onClose());
            
        }
    }

    const updateRecord = () => {
        if (form.setby && form.time && form.date) {
            fetch(`/api/game/${gameId}/record/${props.id}`, {
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
          <Modal.Title>{addMode ? 'Add' : 'Edit'} Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Record Holder</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter record holder's name" 
                value={form.setby}
                onChange={handleOwnerChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control 
                type="string" 
                placeholder="Enter record time" 
                value={form.time}
                onChange={handleTimeChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Set</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Enter date set" 
                value={form.date}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addMode ? addRecord : updateRecord}>
            {addMode ? 'Add' : 'Edit'} Record
          </Button>
        </Modal.Footer>
      </Modal>
    );
}