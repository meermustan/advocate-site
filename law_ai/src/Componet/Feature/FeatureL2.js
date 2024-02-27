import React from "react";
import { Container, Row, Col } from "reactstrap";

const features = [
  {
    icon: "flaticon-dashboard",
    background: "#d0faec",
    title: "Dashboard",
    description: "Data at your fingertips.",
  },
  {
    icon: "flaticon-relationship",
    background: "#ffeff8",
    title: "Management",
    description: "Everything in one place.",
  },
  {
    icon: "flaticon-solution",
    background: "#d3f6fe",
    title: "Marketplace",
    description: "Connect with trusted lawyers.",
  },
  {
    icon: "flaticon-system",
    background: "#fff5d9",
    title: "Meetings",
    description: "Stay organized effortlessly.",
  },
  {
    icon: "flaticon-friendship",
    background: "#fdf9ee",
    title: "Secure Payment Terms",
    description: "Worry-free financial transactions.",
  },
  {
    icon: "flaticon-call-center-1",
    background: "#e5f5f5",
    title: "Case Control",
    description: "Command your legal proceedings.",
  },
];

function FeatureL2() {
  return (
    <section>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg="8">
            <div className="mb-5">
              <h2 className="mb-0">
                <span className="font-w-4 d-block">
                  Welcome to Advocate Iron.Tech
                </span>
                where innovation meets justice
              </h2>
            </div>
          </Col>
        </Row>
        <Row>
          {features.map((feature, index) => (
            <Col lg="4" md="6" key={index} className="mt-5">
              <div className="d-flex">
                <div className="me-3">
                  <div
                    className="f-icon-s p-3 rounded"
                    style={{ background: feature.background }}
                  >
                    <i className={`${feature.icon}`}></i>
                    <img
                      src={`../../assets/images/client/${index + 9}.png`}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <h5 className="mb-2">{feature.title}</h5>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeatureL2;
