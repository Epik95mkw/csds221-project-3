import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './style.css';
import { Container, Table, Row, Col } from "react-bootstrap";
import NavBar from './Components/navbar';

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <Container>
        <Row>&nbsp;</Row>
        <Row>
          <Table>
            <thead>
              <tr><td className="fs-1">Games</td></tr>
            </thead>
            <tbody>
              <tr><td>Game 1</td></tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}


