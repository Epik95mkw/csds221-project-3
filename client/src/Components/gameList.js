import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style.css';
import useSWR from 'swr';
import { Container, Table, Row } from "react-bootstrap";

const httpReq = (url) => fetch(url).then((res) => res.json());

export default function GameList() {
    const { data, error } = useSWR('/api/games', httpReq);
    
    const games = data?.map((g, i) =>
      <tr><td>{g.name}</td></tr>
    );

    return (
      <Container>
        <Row>&nbsp;</Row>
        <Row>
          <Table>
            <thead>
              <tr><td className="fs-1">Games</td></tr>
            </thead>
            <tbody>
              {games}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
}