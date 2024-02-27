import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import moment from "moment";

function ProposalDetails({ proposal }) {
  const navigate = useNavigate();

  const viewCaseDashboard = () => {
    navigate("/case-dashboard", { state: proposal.job._id });
  };

  return (
    <Container className="px-0 px-md-5">
      <h3 className="text-center mb-2" style={{ color: "#aa0505" }}>
        Proposal Details
      </h3>
      <hr />
      <div className="row">
        <div className="col-12 text-end">
          {proposal.isActive && (
            <Button
              style={{ height: "35px" }}
              onClick={viewCaseDashboard}
              className="btn btn-primary align-self-end py-0"
            >
              Case Dashboard
            </Button>
          )}
        </div>
        <div className="col-12 mt-3">
          <h5>Your Proposal:</h5>
        </div>
      </div>
      <Row className="align-items-center mt-2">
        <Col lg={12}>
          <div className="product-details">
            <p className="mb-4">{proposal.summary}</p>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="align-items-center">
        <Col lg={12}>
          <div className="product-details">
            <h6>Case Title: {proposal.job.title}</h6>
            <ul className="list-unstyled my-4">
              <li className="mb-2 text-black">
                Location:{" "}
                <span className="text-muted">{proposal.job.city}</span>
              </li>
              <li className="mb-2 text-black">
                Time:{" "}
                <span className="text-muted">
                  {moment(proposal.job.createdAt).fromNow()}
                </span>
              </li>
              <li className="text-black">
                Last Activity:{" "}
                <span className="text-muted">
                  {moment(proposal.job.updatedAt).fromNow()}
                </span>
              </li>
            </ul>
            <h6>Case Summary:</h6>
            <p className="mb-4">{proposal.job.summary}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProposalDetails;
