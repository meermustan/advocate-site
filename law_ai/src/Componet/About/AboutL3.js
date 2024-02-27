import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Table from "react-bootstrap/Table";

const featureData = [
  "Traditional approach & high cost",
  "Disgracing for meetings with expense",
  "Limited lawyer choices",
  "No secure payment system",
  "No streamlined document automation",
  "Tedious case management",
  "No case control",
  "Cannot change lawyer or refund the money",
  "Problems in recovery of documents from the lawyer",
  "Charge some extra fee",
  "No milestone system & time estimations",
  "No customer support team",
];

const featureData2 = [
  "Cost-effective solutions",
  "Seamless chatbot meetings",
  "Vast selection of lawyers",
  "Secure payment terms",
  "Document automation",
  "Effortless case control and monitoring",
  "Flexible lawyer selection",
  "Lawyer replacement and refund options",
  "Legally document retrieval with support",
  "Transparent, fair pricing",
  "Milestone-based case handling",
  "24/7 customer support and assistance",
];

function AboutL3() {
  return (
    <section className="py-4">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs="12" lg="6">
            <img
              style={{ borderRadius: "40px" }}
              src={require("../../assets/images/about/about.jpg")}
              alt="Image6"
              className="img-fluid"
            />
          </Col>
          <Col xs="12" lg="5" mt="5" mt-lg="0">
            <div className="mb-4">
              <h2>
                <span className="font-w-4 d-block"></span> Why us?
              </h2>
              <p className="lead mb-0">
                Advocate Iron Tech offers a streamlined and customer-oriented
                legal solution, overcoming the limitations of traditional
                methods.
              </p>
            </div>
          </Col>
        </Row>
        <h2 className="text-center my-5">
          Traditional approach VS Advocate Iron
        </h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Drawbacks of Traditional Approach:</th>
              <th>Advantages of Advocate Iron Tech:</th>
            </tr>
          </thead>
          <tbody>
            {featureData.map((feature, index) => (
              <tr>
                <td>
                  <i className="las la-angle-right"></i>
                  {featureData[index]}
                </td>
                <td>
                  <i className="las la-angle-right"></i>
                  {featureData2[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
}

export default AboutL3;
