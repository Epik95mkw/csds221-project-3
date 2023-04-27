import { React, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import useSWR from 'swr';
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import GameModal from './gameModal.js';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GameList() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { data, mutate } = useSWR('/api/games', fetcher);
        
    const games = data?.map((g, i) =>
      <tr key={i}><td><Row className="my-3">
        <Col className="d-grid">
          <Button variant="light" size="sm">{g.name}</Button>
        </Col>
        <Col className="text-muted">Records: {g.records.length}</Col>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" size="sm" className="mx-2">
            Update
          </Button>
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </Col>
      </Row></td></tr>
    );

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
                  <GameModal
                    mode="add"
                    show={show}
                    onSubmit={mutate}
                    onClose={handleClose}
                  />
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