import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { Outlet, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

export default function Layout() {
    return (<>
    <Navbar bg="dark">
      <Container fluid>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="fst-italic title mx-3">GoFaster</h1>
        </Link>
      </Container>
    </Navbar>

    <Outlet />
    </>);
  }