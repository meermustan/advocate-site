import moment from "moment";
import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Welcome = ({ name }) => {
  return (
    <Container className="mb-5">
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>
            Welcome, {name}
            </h2>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {moment().format('dddd, MMMM Do')}.
          </Card.Subtitle>
          <Card.Text>
            Here you can manage your Client and related things.
          </Card.Text>

          <Card.Link tag={Link} href="/proposals">Manage Cases</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Welcome;
