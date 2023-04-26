import { React, useState, useReducer } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import useSWR from 'swr';
import { Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GameList() {
    const [form, setForm] = useState({ name: "" });
    const handleNameChange = (ev) => setForm({ name: ev.target.value })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { data, mutate } = useSWR('/api/games', fetcher);
        
    const games = data?.map((g, i) =>
      <tr key={i}><td><Row className="my-3">
        <Col>{g.name}</Col>
        <Col className="text-muted">Records: {g.records.length}</Col>
        <Col className="d-flex justify-content-end">buttons</Col>
      </Row></td></tr>
    );

    const addGame = () => {
        if (form.name) {
            fetch('/api/game', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            .then(res => handleClose())
            .then(() => mutate());
        }
    }

    return (
      <Container>
        <Row>
          <Table className="mt-5">
            <thead>
              <tr>
                <td className="d-flex justify-content-between">
                  <div className="fs-1">Games</div>
                  <Button variant="light" size="sm" onClick={handleShow}>
                    Add Game
                  </Button>
                  
                  <Modal show={show} onHide={handleClose}>
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
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={addGame}>
                        Add Game
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            </thead>
            <tbody>
              {games}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
}