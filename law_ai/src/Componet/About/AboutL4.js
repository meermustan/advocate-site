import React from "react";
import { Container, Row, Col } from "reactstrap";

const featuresData = [
  {
    color: "#aa0505",
    text: `Post Your Case:
    Clients post their legal case descriptions.
    Our Client Data Gathering Bot engages in a conversation to gather essential details.`,
  },
  {
    color: "#2f2f41",
    text: ` Find Your Lawyer:
    Lawyers apply to handle the case.
    Clients review proposals, lawyer profiles, and pricing`,
  },
  {
    color: "#aa0505",
    text: `Seamless Case Management:
    Instant communication with lawyers and our AI-powered Legal Research Bot.
    Automated document handling and quick legal research.
    `,
  },
];

function AboutL4() {
  return (
    <Container>
      <Row className="mb-5">
        <Col className="text-center">
          <h2>Change your legal practices</h2>
          <h2>Join the community!</h2>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between">
        <Col xs="12" lg="6" mb="6" mb-lg="0">
          <img
            src={require("../../assets/images/app/04.jpeg")}
            alt="Image"
            className="img-fluid"
          />
        </Col>
        <Col xs="12" lg="6" xl="5">
          <div>
            <h2>
              <span className="font-w-4 d-block">How it works</span> in just 3
              steps
            </h2>
            <p className="lead">
              Unlock a world of opportunities with AdvocateIron Tech's cutting-edge
              technology. Join the community and start connecting with clients
              effortlessly in just three simple steps:
            </p>
          </div>
          <div>
            {featuresData.map((feature, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <span
                      className="list-dot"
                      style={{ backgroundColor: feature.color }}
                    ></span>
                  </div>
                  <p className="mb-0">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutL4;
