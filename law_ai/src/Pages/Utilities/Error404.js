import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function Error404() {
  return (
    <div className="page-content">
      <section className="fullscreen-banner p-0 my-5">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col className="text-center h-100 d-flex align-items-center">
              <div className="w-100">
                <img className="img-fluid d-inline mb-5 mt-5" src={require("../../assets/images/404.png")} alt="" />
                <h2>Oops! Page Not Found</h2>
                <h6>You’re either misspelling the URL or requesting a page that's no longer here.</h6>
                <Link className="btn btn-primary mt-4" to="/">
                  Back To Home Page
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Error404;
