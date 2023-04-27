import React from 'react';
import { Navbar, Container, Button, Modal } from "react-bootstrap";
import { Outlet, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

export default function Layout() {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>
    <Navbar bg="dark">
      <Container fluid className="d-flex justify-content-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="fst-italic title mx-3">GoFaster</h1>
        </Link>
        <Button variant="secondary" className="mx-3" onClick={handleShow}>Info</Button>
      </Container>
    </Navbar>

    <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CSDS 221 Project 3</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Owen Hill - oah13<br/>
            <br/>
            This is a MERN app that stores speedrun records for different games. Both the records
            and the games can be created, updated, and deleted from the database. The frontend
            and backend are both hosted on Render, and the source code is available here: <br/>
            <a href="https://github.com/Epik95mkw/csds221-project-3">
              https://github.com/Epik95mkw/csds221-project-3
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    <Outlet />
    </>);
  }