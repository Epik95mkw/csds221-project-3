import { React, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import useSWR from 'swr';
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import GameModal from './gameModal.js';
import DeleteModal from './deleteModal.js';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GameList() {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");
    
    const { data, mutate } = useSWR('/api/games', fetcher);
        
    const games = data?.map((g, i) =>
      <tr key={i}><td><Row className="my-3">
        <Col >
          <Link to={`/game/${g._id}`} style={{ textDecoration: 'none' }} className="d-grid">
            <Button variant="light" size="sm">{g.name}</Button>
          </Link>
        </Col>
        <Col className="text-muted">Records: {g.records.length}</Col>
        <Col className="d-flex justify-content-end">
          <Button 
            variant="secondary" 
            size="sm" 
            className="mx-2"
            onClick={() => setUpdateId(g._id)}
          >
            Update
          </Button>
          <Button variant="danger" size="sm" onClick={() => setDeleteId(g._id)}>
            Delete
          </Button>
        </Col>
      </Row></td></tr>
    );

    return (
      <Container>
        <GameModal
          mode="add"
          show={showAdd}
          onSubmit={mutate}
          onClose={handleCloseAdd}
        />
        <GameModal
          mode="edit"
          id={updateId}
          onSubmit={mutate}
          onClose={() => setUpdateId("")}
        />
        <DeleteModal
          id={deleteId}
          onSubmit={mutate}
          onClose={() => setDeleteId("")}
        />

        <Row>
          <Table className="mt-5">
            <thead>
              <tr>
                <td className="d-flex justify-content-between">
                  <div className="fs-1">Games</div>
                  <Button variant="light" size="sm" onClick={handleShowAdd}>
                    Add Game
                  </Button>
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