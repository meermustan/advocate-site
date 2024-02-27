import React from "react";
import CountUp from "react-countup";
import { Row, Col } from "reactstrap";

const featuresData = [
  {
    icon: "flaticon-prototype-1",
    title: "Document Automation",
    description:
      "Made Effortless Leverage AdvocateIron Tech's cutting-edge technology for seamless document automation and streamline your legal workflows.",
  },
  {
    icon: "flaticon-lightbulb",
    title: "AI Legal Research",
    description:
      "Harness the power of AdvocateIron Tech's advanced AI technology for comprehensive legal research, streamlining your legal workflows.",
  },
  {
    icon: "flaticon-friendship",
    title: "Legal Marketplace",
    description:
      "Leveraging AdvocateIron Tech's design and layouts, our platform connects clients with lawyers and lawyers with potential clients seamlessly.",
  },
];

const countersData = [
  {
    value: 50,
    label: "Trained Languages",
    duration: 5,
  },
  {
    value: 350,
    label: "Past judgement",
    duration: 5,
  },
  {
    value: 10,
    label: "Lawyers network",
    duration: 5,
  },
];

function FeatureL4() {
  return (
    <section>
      <div className="container">
        <Row className="align-items-center">
          <Col lg="4">
            <div>
              <h2 className="mb-0">
                <span className="font-w-4 d-block">
                  Automating legal practice with{" "}
                </span>
                Powerful AI tools:
              </h2>
            </div>
          </Col>
          <Col lg="8" mt="3" mt-lg="0">
            <Row className="align-items-center">
              {countersData.map((counter, index) => (
                <Col key={index} xs="12" sm="4">
                  <div className="counter">
                    <div className="counter-desc">
                      <CountUp
                        className="count-number h2 text-primary"
                        end={counter.value}
                        duration={counter.duration}
                      />
                      <span className="h2 text-primary">
                        {counter.label != "Trained Languages" && "K"} +
                      </span>
                      <h6 className="text-muted mb-0">{counter.label}</h6>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row className="align-items-center mt-6">
          {featuresData.map((feature, index) => (
            <Col key={index} lg="4" md="6" mt-lg="0" className="mt-3">
              <div className="p-5" style={{ backgroundColor: "#aa050535" }}>
                <div className="f-icon">
                  {" "}
                  <i className={feature.icon} style={{color:"#aa0505"}}></i>
                </div>
                <h5 className="mt-4 mb-3">{feature.title}</h5>
                <p className="mb-0">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default FeatureL4;
