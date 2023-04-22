import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function NavBar() {
    return (
    <Navbar bg="dark">
      <Container fluid>
        <h1 className="fst-italic title">GoFaster</h1>
      </Container>
    </Navbar>
    );
  }