import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';

const counters = [
  { icon: "flaticon-project", end: 28, label: "Project Completed", duration: 10 },
  { icon: "flaticon-group", end: 50, label: "Support Member", duration: 10 },
  { icon: "flaticon-opinion", end: 99, label: "People Love Us", duration: 10 },
  { icon: "flaticon-affection", end: 120, label: "Happy Customers", duration: 20 },
];

function CounterL3() {
  return (
    <section>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg="8">
            <div className="mb-5">
              <h2><span className="font-w-4 d-block">We're the best company</span> always deliver more than expected</h2>
              <p className="lead mb-0">We use the latest technologies it voluptatem accusantium doloremque laudantium.</p>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center text-center">
          {counters.map((counter, index) => (
            <Col key={index} xs="12" sm="6" lg="3" className={index > 0 ? "mt-4 mt-lg-0" : ""}>
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <i className={`ic-3x text-primary me-2 ${counter.icon}`} />
                  <CountUp className="count-number display-4 text-dark" end={counter.end} duration={counter.duration} />
                  <span className="display-4 text-dark">+</span>
                </div>
                <h6 className="text-light mb-0">{counter.label}</h6>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default CounterL3;
