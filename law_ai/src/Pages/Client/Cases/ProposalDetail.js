import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import ProfileComponent from "../../../Componet/profile/ProfileComponent";

function ProposalDetail({ proposal, job, showHireButton = true }) {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  function calculateAverageRating(ratingsArray) {
    if (ratingsArray.length === 0) {
      setRating(0);
      return;
    }
    const sumOfRatings = ratingsArray.reduce((accumulator, ratingObject) => {
      return accumulator + ratingObject.rating;
    }, 0);
    const averageRating = sumOfRatings / ratingsArray.length;

    setRating(averageRating);
  }

  useEffect(() => {
    calculateAverageRating(proposal.owner.profile.reviews);
  }, []);

  const acceptProposal = () => {
    navigate("/create-contract", { state: { job, proposal } });
  };

  const viewCaseDashboard = () => {
    navigate("/case-dashboard", { state: job._id });
  };

  const contactLawyer = () => {
    navigate("/messages", {
      state: {
        job: job?._id,
        user: proposal?.owner?._id,
      },
    });
  };

  return (
    <Container className="px-0 px-md-5">
      <h3 className="text-center mb-2" style={{ color: "#aa0505" }}>
        Proposal Details
      </h3>
      <hr />
      <div className="row mb-3">
        <div className="col-12 text-end">
          {job.activeCase ? (
            <Button
              style={{ height: "35px" }}
              onClick={viewCaseDashboard}
              className="btn btn-primary align-self-end py-0 my-4"
            >
              Case Dashboard
            </Button>
          ) : showHireButton ? (
            <>
              <Button
                style={{ height: "35px", marginRight: "8px" }}
                onClick={contactLawyer}
                className="btn btn-primary align-self-end py-0 px-3"
              >
                Contact Lawyer
              </Button>
              <Button
                style={{ height: "35px" }}
                onClick={acceptProposal}
                className="btn btn-primary align-self-end py-0 px-3"
              >
                Hire This Lawyer
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <Row className="align-items-center">
        <Col lg={12}>
          <div className="product-details">
            <h6>Proposal:</h6>
            <p className="mb-4">{proposal.summary}</p>
          </div>
        </Col>
      </Row>
      <ProfileComponent user={proposal.owner} />
    </Container>
  );
}

export default ProposalDetail;
