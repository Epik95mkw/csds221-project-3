import { React, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import useSWR from 'swr';
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import RecordModal from './recordModal.js';
import DeleteModal from './deleteModal.js';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecordList() {
    const { gameId } = useParams();

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");
    
    const { data, mutate } = useSWR(`/api/game/${gameId}/records`, fetcher);
        
    const records = data?.map((r, i) =>
      <tr key={i}><td><Row className="my-3">
        <Col >
          <Link to={`/game/${r._id}`} style={{ textDecoration: 'none' }} className="d-grid">
            <Button variant="light" size="sm">{r.setby}</Button>
          </Link>
        </Col>
        <Col>{r.time}</Col>
        <Col>{r.date}</Col>
        <Col className="d-flex justify-content-end">
          <Button 
            variant="secondary" 
            size="sm" 
            className="mx-2"
            onClick={() => setUpdateId(r._id)}
          >
            Update
          </Button>
          <Button variant="danger" size="sm" onClick={() => setDeleteId(r._id)}>
            Delete
          </Button>
        </Col>
      </Row></td></tr>
    );

    return (
      <Container>
        <RecordModal
          gameId={gameId}
          mode="add"
          show={showAdd}
          onSubmit={mutate}
          onClose={handleCloseAdd}
        />
        <RecordModal
          gameId={gameId}
          mode="edit"
          id={updateId}
          onSubmit={mutate}
          onClose={() => setUpdateId("")}
        />
        <DeleteModal
          mode="record"
          gid={gameId}
          rid={deleteId}
          onSubmit={mutate}
          onClose={() => setDeleteId("")}
        />

        <Row>
          <Table className="mt-5">
            <thead>
              <tr>
                <td className="d-flex justify-content-between">
                  <div className="fs-1">Records</div>
                  <Button variant="light" size="sm" onClick={handleShowAdd}>
                    Add Record
                  </Button>
                </td>
              </tr>
            </thead>
            <tbody>
              {records}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
}