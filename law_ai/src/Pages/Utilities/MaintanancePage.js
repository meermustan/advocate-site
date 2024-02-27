import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Background from '../../assets/images/bg/02.png';
import MaintenanceImage from '../../assets/images/maintenance.png';

function Maintenance() {
  return (
    <>
      <div className="page-content">
        <section
          className="fullscreen-banner p-0 overflow-hidden bg-dark"
          style={{
            height: "100vh",
            backgroundSize: "100vw 100vh",
            backgroundImage: `url(${Background})`
          }}
        >
          <Container fluid className="h-100 chimg">
            <Row className="h-100 align-items-center justify-content-center">
              <Col md="5">
                <img className="img-fluid d-inline" src={MaintenanceImage} alt="" />
              </Col>
              <Col md="6">
                <h1 className="text-white mb-0">Oops! <span className="font-w-4 d-block text-primary">Website Under Maintenance</span></h1>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export default Maintenance;
